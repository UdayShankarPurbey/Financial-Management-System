import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';


function Dashboard() {
  const [monthlyIncome, setMonthlyIncome] = useState(0);
  const [monthlyExpense, setMonthlyExpense] = useState(0);
  const [incomeData, setIncomeData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);
  const chartRef = useRef(null);

  // Mock data, you should replace this with your actual data fetching logic  

   useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/trans/fetchalltransaction", {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU2YzNjMmNiNjU1OTAxODQzNDJmMDY2In0sImlhdCI6MTcwMTU5MjEzMX0.Ndl5EbWTIRu38qvU9oy6pxjD54Zbo6GElDNMqFELnVg'
          },
        });
        const json = await response.json();
        console.log("json data " ,json);

         const incomeResponse = json
        .filter(transaction => transaction.transactionType === 'addIncome')
        .map(transaction => transaction.money);
        
         const expenseResponse = json
          .filter(transaction => transaction.transactionType === 'addExpense')
          .map(transaction => transaction.money);

          setIncomeData(incomeResponse);
          setExpenseData(expenseResponse);  

      } catch (error) {
        console.error("Error fetching data:", error);
        alert("An error occurred while fetching data");
      }
    };
      fetchData();
    }, []);


  useEffect(() => {
    
      // Calculate monthly income and expense
    const totalIncome = incomeData.reduce((acc, income) => acc + income, 0);
    const totalExpense = expenseData.reduce((acc, expense) => acc + expense, 0);

    setMonthlyIncome(totalIncome);
    setMonthlyExpense(totalExpense);

    const ctx = document.getElementById('myChart');

    // Destroy previous Chart instance if it exists
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    chartRef.current = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Income', 'Expense'],
        datasets: [{
          data: [totalIncome, totalExpense],
          backgroundColor: ['#4CAF50', '#FF5722'],
        }],
      },
    });

    
    
  }, [incomeData.length, expenseData.length]);

  const total = monthlyIncome - monthlyExpense;

  return (
    <div className="max-w-2xl mx-auto mt-8 p-4 border rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-4">Monthly Summary</h1>
      <div className="flex justify-between mb-4">
        <div>
          <p className="text-gray-600">Monthly Income</p>
          <p className="text-2xl font-bold text-green-500">${monthlyIncome}</p>
        </div>
        <div>
          <p className="text-gray-600">Monthly Expense</p>
          <p className="text-2xl font-bold text-red-500">${monthlyExpense}</p>
        </div>
        <div>
          <p className="text-gray-600">Total</p>
          <p className="text-2xl font-bold">${total}</p>
        </div>
      </div>
      <div className="mb-4">
        <canvas id="myChart" width="400" height="400"></canvas>
      </div>
    </div>
  );
};



export default Dashboard
