import { Injectable, Logger  } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import axios from 'axios';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Energy } from './schemas/energy.schema';
import * as console from "node:console";

@Injectable()
export class EnergyService {

    private readonly logger = new Logger(EnergyService.name);

    constructor(
        @InjectModel(Energy.name) private energyModel: Model<Energy>,
    ) {}

    async fetchNowManually() {
        await this.fetchAndSaveEnergyData();
    }

    @Cron('0 * * * *') // cada hora
    async fetchAndSaveEnergyData() {
        const now = new Date();
        const endDate = now.toISOString().split('T')[0];
        const startDate = new Date(now.setDate(now.getHours() - 1))
            .toISOString()
            .split('T')[0];
        console.log("endDate " + endDate)
        console.log("startDate " + startDate)
       // const url = `https://apidatos.ree.es/es/datos/balance/balance-electrico?start_date=${startDate}T00:00&end_date=${endDate}T23:59&time_trunc=day`;
         const url = `https://apidatos.ree.es/es/datos/balance/balance-electrico?start_date=2019-01-01T00:00&end_date=2019-01-31T23:59&time_trunc=day`;

        try {
            const { data } = await axios.get(url);
            const included = data?.included;
            console.log("included " + included)

            if (!included || !Array.isArray(included)) {
                this.logger.warn('No se encontraron valores en la respuesta.');
                return;
            }

            let count = 0;

            for (const group of included) {
                const {type, attributes} = group;

                for (const supGroup of attributes?.content) {

                    if (supGroup.type === 'Hidráulica' || supGroup.type === 'Demanda en b.c.') {
                        for (const item of supGroup.attributes?.values) {
                            const { datetime, value } = item;
                            count = count + 1;
                            await this.energyModel.create(
                                { datetime, category: type, subcategory: supGroup.type, value: value },
                            );
                        }
                    }
                }
            }


            this.logger.log(`Se guardaron ${count} registros.`);
        } catch (error) {
            this.logger.error('Error al consultar la API de REE', error);
        }
    }

    async getByDateRange(startDate: string, endDate: string): Promise<Energy[]> {
        return this.energyModel.find({
            datetime: {
                $gte: startDate,
                $lte: endDate,
            },
        }).sort({ datetime: 1 });
    }

}

