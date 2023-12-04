import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function Report() {
  
  const [dataType, setDataType] = useState('income');
  const [dateRange, setDateRange] = useState('monthly');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [chartData, setChartData] = useState({
    currentData: [],
    previousData: [],
  });

  const chartRef = useRef(null);

  // Mock data, you should replace this with your actual data fetching logic
  const fetchData = () => {
    // Fetch data for income, spend, and investment based on the selected date range
    // Replace this with your actual data fetching logic
    const currentData = {
      income: [500, 800, 1000, 1200, 1500], // Replace with your actual income data
      spend: [300, 400, 500, 600, 800], // Replace with your actual spend data
      investment: [200, 300, 400, 500, 700], // Replace with your actual investment data
    };

    const previousData = {
      income: [400, 750, 950, 1100, 1400], // Replace with your actual income data
      spend: [250, 350, 450, 550, 750], // Replace with your actual spend data
      investment: [180, 290, 380, 480, 680], // Replace with your actual investment data
    };

    setChartData({
      currentData: currentData[dataType],
      previousData: previousData[dataType],
    });
  };

  useEffect(() => {
    fetchData();
  }, [dataType, dateRange]);

  useEffect(() => {
    // Chart.js - Graphical Representation
    const ctx = document.getElementById('myChart');
    
    // Destroy previous Chart instance if it exists
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    chartRef.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: getLabels(),
        datasets: [
          {
            label: `Current ${dataType.charAt(0).toUpperCase() + dataType.slice(1)}`,
            data: chartData.currentData,
            backgroundColor: 'rgba(75, 192, 192, 0.7)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
          {
            label: `Previous ${dataType.charAt(0).toUpperCase() + dataType.slice(1)}`,
            data: chartData.previousData,
            backgroundColor: 'rgba(255, 99, 132, 0.7)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }, [chartData, dataType, dateRange]);

  const getLabels = () => {
    if (dateRange === 'monthly') {
      return ['Month 1', 'Month 2', 'Month 3', 'Month 4', 'Month 5'];
    } else if (dateRange === 'yearly') {
      return ['Jan', 'Feb', 'Mar', 'Apr', 'May'];
    } else {
      // Custom date range, generate labels dynamically based on the selected range
      const labels = [];
      const currentDate = startDate;
      while (currentDate <= endDate) {
        labels.push(currentDate.toDateString().slice(4, 10));
        currentDate.setMonth(currentDate.getMonth() + 1);
      }
      return labels;
    }
  };

  const handleDataTypeChange = (type) => {
    setDataType(type);
  };

  const handleDateRangeChange = (range) => {
    setDateRange(range);
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 p-4 border rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-4">Financial Dashboard</h1>
      <div className="mb-4">
        <div className="flex mb-2">
          <label className="mr-4">
            <input
              type="radio"
              value="income"
              checked={dataType === 'income'}
            onChange={() => handleDataTypeChange('income')}
          />
          <span className="ml-2">Income</span>
        </label>
        <label className="mr-4">
          <input
            type="radio"
            value="spend"
            checked={dataType === 'spend'}
            onChange={() => handleDataTypeChange('spend')}
          />
          <span className="ml-2">Spend</span>
        </label>
        <label>
          <input
            type="radio"
            value="investment"
            checked={dataType === 'investment'}
            onChange={() => handleDataTypeChange('investment')}
          />
          <span className="ml-2">Investment</span>
        </label>
      </div>
      <div className="flex mb-2">
        <label className="mr-4">
          <input
            type="radio"
            value="monthly"
            checked={dateRange === 'monthly'}
            onChange={() => handleDateRangeChange('monthly')}
          />
          <span className="ml-2">Monthly</span>
        </label>
        <label className="mr-4">
          <input
            type="radio"
            value="yearly"
            checked={dateRange === 'yearly'}
            onChange={() => handleDateRangeChange('yearly')}
          />
          <span className="ml-2">Yearly</span>
        </label>
        <label>
          <input
            type="radio"
            value="custom"
            checked={dateRange === 'custom'}
            onChange={() => handleDateRangeChange('custom')}
          />
          <span className="ml-2">Custom</span>
        </label>
      </div>
      {dateRange === 'custom' && (
        <div className="flex mb-2">
          <div className="mr-4">
            <label>Start Date:</label>
            <DatePicker selected={startDate} onChange={handleStartDateChange} />
          </div>
          <div>
            <label>End Date:</label>
            <DatePicker selected={endDate} onChange={handleEndDateChange} />
          </div>
        </div>
      )}
      <canvas id="myChart" width="400" height="200"></canvas>
    </div>
  </div>
);
};


 
 export default Report
 
