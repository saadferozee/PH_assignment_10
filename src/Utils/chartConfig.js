import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    Filler,
} from 'chart.js';

// Register all Chart.js components globally
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    Filler
);

// Default chart options
export const defaultChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: 'top',
        },
        tooltip: {
            backgroundColor: 'rgba(85, 107, 47, 0.9)',
            titleColor: '#F7F3E9',
            bodyColor: '#F7F3E9',
            borderColor: '#F7F3E9',
            borderWidth: 1,
        },
    },
    scales: {
        y: {
            beginAtZero: true,
            grid: {
                color: 'rgba(85, 107, 47, 0.1)',
            },
            ticks: {
                color: '#556B2F',
            },
        },
        x: {
            grid: {
                color: 'rgba(85, 107, 47, 0.1)',
            },
            ticks: {
                color: '#556B2F',
            },
        },
    },
};

// Doughnut chart specific options
export const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: 'bottom',
            labels: {
                color: '#556B2F',
                padding: 20,
            },
        },
        tooltip: {
            backgroundColor: 'rgba(85, 107, 47, 0.9)',
            titleColor: '#F7F3E9',
            bodyColor: '#F7F3E9',
            borderColor: '#F7F3E9',
            borderWidth: 1,
        },
    },
};

// Line chart specific options with fill
export const lineChartOptions = {
    ...defaultChartOptions,
    elements: {
        line: {
            tension: 0.4,
        },
        point: {
            radius: 4,
            hoverRadius: 6,
        },
    },
    plugins: {
        ...defaultChartOptions.plugins,
        filler: {
            propagate: false,
        },
    },
};

// Brand colors for consistent theming
export const brandColors = {
    primary: '#556B2F',
    secondary: '#6B8E23',
    tertiary: '#8FBC8F',
    quaternary: '#9ACD32',
    light: '#F7F3E9',
    gradients: {
        primary: 'rgba(85, 107, 47, 0.1)',
        secondary: 'rgba(107, 142, 35, 0.1)',
        tertiary: 'rgba(143, 188, 143, 0.1)',
        quaternary: 'rgba(154, 205, 50, 0.1)',
    },
};

// Dataset configurations
export const createLineDataset = (label, data, color = brandColors.primary) => ({
    label,
    data,
    borderColor: color,
    backgroundColor: brandColors.gradients.primary,
    tension: 0.4,
    fill: true,
    pointBackgroundColor: color,
    pointBorderColor: brandColors.light,
    pointBorderWidth: 2,
});

export const createBarDataset = (label, data, color = brandColors.primary) => ({
    label,
    data,
    backgroundColor: color,
    borderColor: color,
    borderWidth: 1,
    borderRadius: 4,
});

export const createDoughnutDataset = (data, colors = [
    brandColors.primary,
    brandColors.secondary,
    brandColors.tertiary,
    brandColors.quaternary,
]) => ({
    data,
    backgroundColor: colors,
    borderWidth: 2,
    borderColor: brandColors.light,
    hoverBorderWidth: 3,
});