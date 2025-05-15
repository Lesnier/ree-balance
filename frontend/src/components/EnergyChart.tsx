
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    TimeScale,
    ChartOptions
} from 'chart.js';
// @ts-ignore
import 'chartjs-adapter-date-fns';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    TimeScale
);

export default function EnergyChart({ data }: { data: any[] }) {

    const renovable = data.filter(i => i.category === 'Renovable');
    const demanda = data.filter(i => i.category === 'Demanda');


    const chartData = {
        labels: (demanda.length > renovable.length) ? demanda.map(item => new Date(item.datetime)) : renovable.map(item => new Date(item.datetime)),
        datasets: [
            {
                label: 'Generación Hidráulica',
                data: renovable.map(item => item.value ),
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
            },
            {
                label: 'Demanda en b.c.',
                data: demanda.map(item => item.value ),
                fill: false,
                borderColor: 'rgb(255, 99, 132)',
                tension: 0.1,
            }
        ]
    };

    const options: ChartOptions<'line'> = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'hour',
                },
                title: {
                    display: true,
                    text: 'Fecha',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'MW',
                },
            },
        },
    };


    return (
        <div style={{ width: '100%', height: 200 }}>
            <Line data={chartData} options={options} />
        </div>
    );
}
