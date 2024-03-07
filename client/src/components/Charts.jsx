import React from 'react'
import { Line, Doughnut } from 'react-chartjs-2'
import { purpleLight, purple, orange, matBlack } from './styles/color';
import { getLast7Days } from '../lib/feature';
import {
    Chart as ChartJS,
    Tooltip,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    Filler,
    Legend,
} from 'chart.js';

ChartJS.register(
    Tooltip,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    Filler,
    Legend,
);

const lineChartOptions = {
    responsive: true,
    plugins: {
        legend: {
            display: false,
        },
        title: {
            display: false,
        },
    },
    scales: {
        x: {
            grid: {
                display: false,
            }
        },
        y: {
            beginAtZero: true,
            grid: {
                display: false,
            }
        }
    }
};

const doughnutOptions = {
    responsive: true,
    plugins: {
        legend: {
            display: false,
        },
    },
    cutout: 110,
};

const labels = getLast7Days();
const LineChart = ({ value = [] }) => {

    const data = {
        labels: labels,
        datasets: [{
            data: value,
            fill: true,
            backgroundColor: purpleLight,
            borderColor: purple,
            tension: 0.4.toExponential(2),
        }]
    };

    return <Line data={data} options={lineChartOptions} />;
}

const DoughnutChart = ({value = [], labels = []}) => {
    const data = {
        labels: labels,
        datasets: [{
            data: value,
            labels: 'Total Chats vs Group Chats',
            backgroundColor: [purpleLight, orange],
            hoverBackgroundColor: ['#00008B', matBlack],
            borderColor: [purple, orange],
            offset: 15,
        }]
    };
    return <Doughnut data={data} options={doughnutOptions} style={{zIndex: 1}} />;
}

export { LineChart, DoughnutChart }