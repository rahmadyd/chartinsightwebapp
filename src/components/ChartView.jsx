import React from 'react';
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
  Filler,
} from 'chart.js';
import { Line, Bar, Scatter } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const CHART_COLORS = [
  'rgba(59, 130, 246, 1)',
  'rgba(168, 85, 247, 1)',
  'rgba(34, 197, 94, 1)',
  'rgba(251, 146, 60, 1)',
];

const CHART_BG_COLORS = [
  'rgba(59, 130, 246, 0.15)',
  'rgba(168, 85, 247, 0.15)',
  'rgba(34, 197, 94, 0.15)',
  'rgba(251, 146, 60, 0.15)',
];

const baseOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: {
        color: '#94a3b8',
        font: { size: 12, family: 'Inter, system-ui, sans-serif' },
        padding: 16,
      },
    },
    tooltip: {
      backgroundColor: '#1e293b',
      borderColor: '#334155',
      borderWidth: 1,
      titleColor: '#f1f5f9',
      bodyColor: '#94a3b8',
      padding: 10,
      cornerRadius: 8,
    },
  },
  scales: {
    x: {
      grid: { color: 'rgba(51, 65, 85, 0.5)' },
      ticks: { color: '#64748b', font: { size: 11, family: 'Inter, system-ui, sans-serif' } },
    },
    y: {
      grid: { color: 'rgba(51, 65, 85, 0.5)' },
      ticks: { color: '#64748b', font: { size: 11, family: 'Inter, system-ui, sans-serif' } },
    },
  },
};

function buildLineData(caseData) {
  if (caseData.datasets) {
    return {
      labels: caseData.labels,
      datasets: caseData.datasets.map((ds, i) => ({
        label: ds.label,
        data: ds.values,
        borderColor: CHART_COLORS[i % CHART_COLORS.length],
        backgroundColor: CHART_BG_COLORS[i % CHART_BG_COLORS.length],
        tension: 0.4,
        fill: false,
        pointRadius: 5,
        pointHoverRadius: 8,
        borderWidth: 2.5,
      })),
    };
  }
  return {
    labels: caseData.labels,
    datasets: [
      {
        label: caseData.yLabel,
        data: caseData.values,
        borderColor: CHART_COLORS[0],
        backgroundColor: CHART_BG_COLORS[0],
        tension: 0.4,
        fill: true,
        pointRadius: 5,
        pointHoverRadius: 8,
        borderWidth: 2.5,
      },
    ],
  };
}

function buildBarData(caseData) {
  return {
    labels: caseData.labels,
    datasets: [
      {
        label: caseData.yLabel,
        data: caseData.values,
        backgroundColor: caseData.labels.map((_, i) =>
          CHART_BG_COLORS[0].replace('0.15', '0.7')
        ),
        borderColor: CHART_COLORS[0],
        borderWidth: 1.5,
        borderRadius: 6,
        borderSkipped: false,
      },
    ],
  };
}

function buildScatterData(caseData) {
  return {
    datasets: [
      {
        label: 'Data Points',
        data: caseData.scatterData,
        backgroundColor: CHART_BG_COLORS[1].replace('0.15', '0.6'),
        borderColor: CHART_COLORS[1],
        borderWidth: 1.5,
        pointRadius: 7,
        pointHoverRadius: 10,
      },
    ],
  };
}

export default function ChartView({ caseData }) {
  const { chartType, xLabel, yLabel, title } = caseData;

  const options = {
    ...baseOptions,
    plugins: {
      ...baseOptions.plugins,
      title: {
        display: true,
        text: title,
        color: '#e2e8f0',
        font: { size: 15, weight: '600', family: 'Inter, system-ui, sans-serif' },
        padding: { bottom: 16 },
      },
    },
    scales: {
      ...baseOptions.scales,
      x: {
        ...baseOptions.scales.x,
        title: {
          display: true,
          text: xLabel,
          color: '#64748b',
          font: { size: 11, family: 'Inter, system-ui, sans-serif' },
        },
      },
      y: {
        ...baseOptions.scales.y,
        title: {
          display: true,
          text: yLabel,
          color: '#64748b',
          font: { size: 11, family: 'Inter, system-ui, sans-serif' },
        },
      },
    },
  };

  if (chartType === 'line') {
    return <Line data={buildLineData(caseData)} options={options} />;
  }
  if (chartType === 'bar') {
    return <Bar data={buildBarData(caseData)} options={options} />;
  }
  if (chartType === 'scatter') {
    return (
      <Scatter
        data={buildScatterData(caseData)}
        options={{
          ...options,
          scales: {
            ...options.scales,
            x: {
              ...options.scales.x,
              type: 'linear',
              title: {
                display: true,
                text: xLabel,
                color: '#64748b',
                font: { size: 11 },
              },
            },
          },
        }}
      />
    );
  }
  return <div className="text-text-muted text-center py-8">Jenis grafik tidak dikenali: {chartType}</div>;
}
