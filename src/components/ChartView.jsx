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

// Clean professional light palette (No AI neon)
const PALETTE = {
  da: {
    line: ['#2563eb', '#0284c7', '#059669'],
    lineFill: ['rgba(37,99,235,0.08)', 'rgba(2,132,199,0.06)', 'rgba(5,150,105,0.06)'],
    bar: 'rgba(37,99,235,0.85)',
    barBorder: '#2563eb',
    scatter: '#2563eb',
    scatterBorder: '#1d4ed8',
  },
  ds: {
    line: ['#7c3aed', '#d97706', '#059669'],
    lineFill: ['rgba(124,58,237,0.08)', 'rgba(217,119,6,0.06)', 'rgba(5,150,105,0.06)'],
    bar: 'rgba(124,58,237,0.85)',
    barBorder: '#7c3aed',
    scatter: '#7c3aed',
    scatterBorder: '#6d28d9',
  },
};

const baseOptions = (title, xLabel, yLabel, mode) => ({
  responsive: true,
  maintainAspectRatio: false,
  animation: { duration: 400, easing: 'easeOutQuart' },
  plugins: {
    legend: {
      labels: {
        color: '#475569',
        font: { size: 11, family: 'Plus Jakarta Sans, Inter, system-ui', weight: '600' },
        padding: 12,
        boxWidth: 10,
        boxHeight: 10,
        usePointStyle: true,
      },
    },
    title: {
      display: !!title,
      text: title,
      color: '#0f172a',
      font: { size: 13, weight: '700', family: 'Plus Jakarta Sans, Inter, system-ui' },
      padding: { bottom: 12 },
    },
    tooltip: {
      backgroundColor: '#0f172a',
      borderColor: '#e2e8f0',
      borderWidth: 1,
      titleColor: '#ffffff',
      bodyColor: '#cbd5e1',
      padding: 10,
      cornerRadius: 8,
      boxPadding: 4,
    },
  },
  scales: {
    x: {
      grid: { color: '#f1f5f9', drawBorder: false },
      ticks: { color: '#64748b', font: { size: 11, family: 'Plus Jakarta Sans, Inter, system-ui' } },
      title: { display: !!xLabel, text: xLabel, color: '#64748b', font: { size: 11, weight: '600' } },
    },
    y: {
      grid: { color: '#f1f5f9', drawBorder: false },
      ticks: { color: '#64748b', font: { size: 11, family: 'Plus Jakarta Sans, Inter, system-ui' } },
      title: { display: !!yLabel, text: yLabel, color: '#64748b', font: { size: 11, weight: '600' } },
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
        tension: 0.35,
        fill: false,
        pointRadius: 4.5,
        pointHoverRadius: 7,
        borderWidth: 2.2,
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
      tension: 0.35,
      fill: true,
      pointRadius: 4.5,
      pointHoverRadius: 7,
      borderWidth: 2.2,
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
      borderWidth: 1,
      borderRadius: 6,
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
      borderWidth: 1,
      pointRadius: 5.5,
      pointHoverRadius: 8,
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
  return <div style={{ textAlign: 'center', color: '#64748b', padding: '2rem' }}>Jenis grafik: {caseData.chartType}</div>;
}
