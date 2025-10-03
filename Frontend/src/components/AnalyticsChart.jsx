// src/components/AnalyticsChart.jsx
import React from 'react';
import {
  Line
} from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const AnalyticsChart = () => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Profile Views',
        data: [50, 120, 80, 150, 200, 170],
        borderColor: '#2CA5F6',
        backgroundColor: 'rgba(44, 165, 246, 0.2)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: '#333',
        },
      },
      title: {
        display: true,
        text: 'Monthly Profile Views',
        color: '#333',
        font: {
          size: 18,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#666',
        },
        grid: {
          color: '#eee',
        },
      },
      y: {
        ticks: {
          color: '#666',
        },
        grid: {
          color: '#eee',
        },
      },
    },
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-6 w-full max-w-4xl mx-auto mt-8">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Analytics</h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default AnalyticsChart;



// import AnalyticsChart from './components/AnalyticsChart';

// function Dashboard() {
//   return (
//     <div className="p-6 bg-[#F9FAFB] min-h-screen">
//       {/* Other dashboard sections like sidebar, profile cards */}
//       <AnalyticsChart />
//     </div>
//   );
// }
