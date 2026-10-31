import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Chart as ChartJS,
  CategoryScale, LinearScale, PointElement, LineElement,
  BarElement, Title, Tooltip, Legend, Filler,
} from 'chart.js';
import { Line, Bar, Scatter } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale, LinearScale, PointElement, LineElement,
  BarElement, Title, Tooltip, Legend, Filler,
);

// DA colors = blue family, DS colors = purple family
const PALETTE = {
  da: {
    line: ['rgba(79,158,255,1)', 'rgba(34,211,238,1)', 'rgba(52,211,153,1)'],
    lineFill: ['rgba(79,158,255,0.12)', 'rgba(34,211,238,0.10)', 'rgba(52,211,153,0.10)'],
    bar: 'rgba(79,158,255,0.75)',
    barBorder: 'rgba(79,158,255,1)',
    scatter: 'rgba(79,158,255,0.7)',
    scatterBorder: 'rgba(79,158,255,1)',
  },
  ds: {
    line: ['rgba(191,127,255,1)', 'rgba(251,146,60,1)', 'rgba(52,211,153,1)'],
    lineFill: ['rgba(191,127,255,0.12)', 'rgba(251,146,60,0.10)', 'rgba(52,211,153,0.10)'],
    bar: 'rgba(191,127,255,0.75)',
    barBorder: 'rgba(191,127,255,1)',
    scatter: 'rgba(191,127,255,0.7)',
    scatterBorder: 'rgba(191,127,255,1)',
  },
};

const baseOptions = (title, xLabel, yLabel, mode) => ({
  responsive: true,
  maintainAspectRatio: false,
  animation: { duration: 600, easing: 'easeInOutQuart' },
  plugins: {
    legend: {
      labels: {
        color: '#94a3b8',
        font: { size: 11, family: 'Inter, system-ui' },
        padding: 14,
        boxWidth: 12,
        boxHeight: 12,
      },
    },
    title: {
      display: !!title,
      text: title,
      color: '#f0f4ff',
      font: { size: 13, weight: '700', family: 'Inter, system-ui' },
      padding: { bottom: 14 },
    },
    tooltip: {
      backgroundColor: '#0f1422',
      borderColor: mode === 'da' ? 'rgba(79,158,255,0.4)' : 'rgba(191,127,255,0.4)',
      borderWidth: 1,
      titleColor: '#f0f4ff',
      bodyColor: '#b8c4e0',
      padding: 10,
      cornerRadius: 10,
      boxPadding: 4,
    },
  },
  scales: {
    x: {
      grid: { color: 'rgba(42,53,80,0.6)', drawBorder: false },
      ticks: { color: '#6b7fa3', font: { size: 10, family: 'Inter, system-ui' } },
      title: { display: !!xLabel, text: xLabel, color: '#6b7fa3', font: { size: 10 } },
    },
    y: {
      grid: { color: 'rgba(42,53,80,0.6)', drawBorder: false },
      ticks: { color: '#6b7fa3', font: { size: 10, family: 'Inter, system-ui' } },
      title: { display: !!yLabel, text: yLabel, color: '#6b7fa3', font: { size: 10 } },
    },
  },
});

function buildLine(caseData, p) {
  if (caseData.datasets) {
    return {
      labels: caseData.labels,
      datasets: caseData.datasets.map((ds, i) => ({
        label: ds.label,
        data: ds.values,
        borderColor: p.line[i % p.line.length],
        backgroundColor: p.lineFill[i % p.lineFill.length],
        tension: 0.4, fill: false, pointRadius: 5, pointHoverRadius: 8, borderWidth: 2.5,
      })),
    };
  }
  return {
    labels: caseData.labels,
    datasets: [{
      label: caseData.yLabel,
      data: caseData.values,
      borderColor: p.line[0],
      backgroundColor: p.lineFill[0],
      tension: 0.4, fill: true, pointRadius: 5, pointHoverRadius: 8, borderWidth: 2.5,
      pointBackgroundColor: p.line[0],
    }],
  };
}

function buildBar(caseData, p) {
  return {
    labels: caseData.labels,
    datasets: [{
      label: caseData.yLabel,
      data: caseData.values,
      backgroundColor: p.bar,
      borderColor: p.barBorder,
      borderWidth: 1.5,
      borderRadius: 8,
      borderSkipped: false,
      hoverBackgroundColor: p.barBorder,
    }],
  };
}

function buildScatter(caseData, p) {
  return {
    datasets: [{
      label: 'Data Points',
      data: caseData.scatterData,
      backgroundColor: p.scatter,
      borderColor: p.scatterBorder,
      borderWidth: 1.5,
      pointRadius: 7,
      pointHoverRadius: 10,
    }],
  };
}

export default function ChartView({ caseData, mode: modeProp }) {
  const ctx = useApp();
  const mode = modeProp || ctx?.perspectiveMode || 'da';
  const p = PALETTE[mode];
  const opts = baseOptions(caseData.title, caseData.xLabel, caseData.yLabel, mode);

  if (caseData.chartType === 'line') return <Line data={buildLine(caseData, p)} options={opts} />;
  if (caseData.chartType === 'bar')  return <Bar  data={buildBar(caseData, p)}  options={opts} />;
  if (caseData.chartType === 'scatter') return (
    <Scatter
      data={buildScatter(caseData, p)}
      options={{
        ...opts,
        scales: {
          ...opts.scales,
          x: { ...opts.scales.x, type: 'linear' },
        },
      }}
    />
  );
  return <div style={{ textAlign: 'center', color: 'var(--color-text-3)', padding: '2rem' }}>Jenis grafik tidak dikenali: {caseData.chartType}</div>;
}
