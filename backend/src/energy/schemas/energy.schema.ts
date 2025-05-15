import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {Field} from "@nestjs/graphql";

@Schema()
export class Energy extends Document {
    @Prop({ required: true })
    datetime: string;

    @Prop()
    category: string;

    @Prop()
    subcategory: string;

    @Prop()
    value: number;
}

export const EnergySchema = SchemaFactory.createForClass(Energy);
