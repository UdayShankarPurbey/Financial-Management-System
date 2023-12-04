// import React, { useEffect ,useState } from 'react'
// import TransactionCard from './Transactioncard';

// const Transaction = () => {

    
//     const [income ,setIncome] =useState([])
//     const [expense ,setExpense] = useState([])


// useEffect( () => {
//     const userData = async () => {
//         try {
//             const response = await fetch("http://localhost:5000/api/trans/fetchalltransaction", {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//             'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU2YzNjMmNiNjU1OTAxODQzNDJmMDY2In0sImlhdCI6MTcwMTU5MjEzMX0.Ndl5EbWTIRu38qvU9oy6pxjD54Zbo6GElDNMqFELnVg'
//           },
//         });
//         const json = await response.json();

//         const incomeResponse = json
//         .filter(transaction => transaction.transactionType === 'addIncome')
//         setIncome(incomeResponse)

//         const expenseResponse = json
//         .filter(transaction => transaction.transactionType === 'addExpense')
//         setExpense(expenseResponse)

            
//         } catch (error) {
//             console.error("Error fetching data:", error);
//             alert("An error occurred while fetching data");
//           }
//     }

//     userData();
// } ,[])


//   const handleEdit = (id) => {
//     console.log(`Edit transaction with id ${id}`);
//     // Add your edit logic here
//   };

//   const handleDelete = (id) => {
//     console.log(`Delete transaction with id ${id}`);
//     // Add your delete logic here
//   };

//     const [selectedOption, setSelectedOption] = useState('both');
  
//     const handleOptionChange = (event) => {
//       setSelectedOption(event.target.value);
//     };

//     const radioLabelStyle = {
//         flex: 1,
//         margin: '10px',
//         padding: '10px',
//         border: '1px solid #ccc',
//         borderRadius: '5px',
//         cursor: 'pointer',
//         backgroundColor: '#f0f0f0',
//         fontSize: '16px',
//         textAlign: 'center',
//       };
    
//       const containerStyle = {
//         display: 'flex',
//         justifyContent: 'space-around',
//         alignItems: 'center',
//         marginTop: '20px',
//       };
    

//   return (
//     <>
//      <div style={containerStyle}>
//       <label style={radioLabelStyle}>
//         <input
//           type="radio"
//           value="income"
//           checked={selectedOption === 'income'}
//           onChange={handleOptionChange}
//         />
//         Income
//       </label>

//       <label style={radioLabelStyle}>
//         <input
//           type="radio"
//           value="expense"
//           checked={selectedOption === 'expense'}
//           onChange={handleOptionChange}
//         />
//         Expense
//       </label>

//       <label style={radioLabelStyle}>
//         <input
//           type="radio"
//           value="both"
//           checked={selectedOption === 'both'}
//           onChange={handleOptionChange}
//         />
//         Both
//       </label>

//     </div>
    
    
//     <div className="transaction-list">
//     {income.map((transaction) => (
//       <TransactionCard key={transaction._id} transaction={transaction} />
//     ))}
//   </div>
//   <div className="transaction-list ">
//     {expense.map((transaction) => (
//       <TransactionCard key={transaction._id} transaction={transaction} />
//     ))}
//   </div>
//   </>
  
    
//   );

// }


// export default Transaction



import React, { useEffect, useState } from 'react';
import TransactionCard from './Transactioncard';
import AddTransaction from './AddTransaction'; // Import your AddTransaction component

const Transaction = () => {
  const [transactions, setTransactions] = useState([]);
  const [income, setIncome] = useState([]);
  const [expense, setExpense] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/trans/fetchalltransaction", {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': 'YOUR_AUTH_TOKEN_HERE',
          },
        });

        const json = await response.json();

        if (json.success) {
          setTransactions(json.data);
          const incomeResponse = json.data.filter(transaction => transaction.transactionType === 'addIncome');
          const expenseResponse = json.data.filter(transaction => transaction.transactionType === 'addExpense');
          setIncome(incomeResponse);
          setExpense(expenseResponse);
        } else {
          console.error("Error fetching data:", json.message);
          alert("An error occurred while fetching data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("An error occurred while fetching data");
      }
    };

    fetchData();
  }, []);

  const handleEdit = (id) => {
    // Implement the logic to open the edit form with the data of the selected transaction
    // You can use a state variable to control whether the AddTransaction component is in edit mode
    // and pass the transaction data to it
    // For simplicity, let's assume you have a state variable called "editTransaction" in Transaction component
    const editTransaction = transactions.find(transaction => transaction._id === id);
    // Now you can set the state to trigger the AddTransaction component with edit mode and data
    // For example, setEditTransaction(editTransaction);
    // You'll need to handle this state in your AddTransaction component to populate the form with editTransaction data
  };

  const handleDelete = async (id) => {
    // Implement the logic to delete the selected transaction
    // You can make a DELETE request to your API endpoint
    // After successful deletion, update the state accordingly
    try {
      const response = await fetch(`http://localhost:5000/api/trans/deletetransaction/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': 'YOUR_AUTH_TOKEN_HERE',
        },
      });

      const json = await response.json();

      if (json.success) {
        // Update the state after successful deletion
        setTransactions(prevTransactions => prevTransactions.filter(transaction => transaction._id !== id));
        alert('Transaction deleted successfully');
      } else {
        console.error('Error deleting transaction:', json.message);
        alert(`An error occurred while deleting the transaction: ${json.message}`);
      }
    } catch (error) {
      console.error('Error deleting transaction:', error);
      alert('An error occurred while deleting the transaction');
    }
  };

  return (
    <div>
      {/* Display the transactions */}
      {transactions.map(transaction => (
        <TransactionCard
          key={transaction._id}
          transaction={transaction}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ))}
      {/* Display the AddTransaction component */}
      <AddTransaction />
    </div>
  );
};

export default Transaction;
