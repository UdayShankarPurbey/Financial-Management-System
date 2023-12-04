
// import React, { useState } from 'react';

// function AddTransaction() {

//   const [transactionType, setTransactionType] = useState('addExpense');
//   const [credentials ,setCredentials] = useState({})


//   const handleTransactionTypeChange = (type) => {
//     setTransactionType(type)
//   };

//   const onChange = (e)=>{
//     setCredentials({...credentials, [e.target.name]: e.target.value})
//   }


//   const handleAddTransaction =async () => {
//     const response = await fetch("http://localhost:5000/api/trans/addtransaction",{

//       method : 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'auth-token'  :'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU2YzNjMmNiNjU1OTAxODQzNDJmMDY2In0sImlhdCI6MTcwMTU5MjEzMX0.Ndl5EbWTIRu38qvU9oy6pxjD54Zbo6GElDNMqFELnVg'
//     },


//     body: JSON.stringify({label : credentials.label, money : credentials.money,tag : credentials.tag,description : credentials.description,transactionType : transactionType})
//   });
//   const json = await response.json()
//   console.log(json);
      
//  setCredentials({label : "" , money : "" ,tag : "",description : ""})
//   setTransactionType('addExpense')


//   alert("transaction added successfully")

//   };

//   return (
//     <div className="max-w-md mx-auto mt-8 p-4 border rounded-md shadow-md">
//       <h1 className="text-2xl font-bold mb-4">Expense Tracker</h1>
//       <div className="mb-4">
//         <label className="block text-sm font-medium text-gray-600">Transaction Type</label>
//         <div className="flex">
//           <label className="mr-4">
//             <input
//               type="radio"
//               value="addExpense"
//               checked={transactionType === 'addExpense'}
//               onChange={() => handleTransactionTypeChange('addExpense')}
//             />
//             <span className="ml-2">Add Expense</span>
//           </label>
//           <label>
//             <input
//               type="radio"
//               value="addIncome"
//               checked={transactionType === 'addIncome'}
//               onChange={() => handleTransactionTypeChange('addIncome')}
//             />
//             <span className="ml-2">Add Income</span>
//           </label>
//         </div>
//       </div>
//       <div className="mb-4">
//         <label className="block text-sm font-medium text-gray-600">Label</label>
//         <input
//           type="text"
//           className="mt-1 p-2 border rounded-md w-full"
//           placeholder="e.g., Grocery"
//           name='label'
//           value={credentials.label}
//           onChange={onChange}
//         />
//       </div>
//       <div className="mb-4">
//         <label className="block text-sm font-medium text-gray-600">Money</label>
//         <input
//           type="number"
//           className="mt-1 p-2 border rounded-md w-full"
//           placeholder="Enter amount"
//           name='money'
//           value={credentials.money}
//           onChange={onChange}
//         />
//       </div>
//    <div className="mb-4">
//       <label className="block text-sm font-medium text-gray-600">Tag</label>
//       {transactionType === 'addIncome' ? (
//         <select
//         className="mt-1 p-2 border rounded-md w-full"
//         name='tag'
//         value={credentials.tag}
//         onChange={onChange}
//       >
       
//       <option value="">Select Tag</option>        
//       <option value="Salary">Salary</option>
//       <option value="Freelance">Freelance</option>
//       <option value="Business">Business</option>
//       <option value="Investments">Investments</option>
//       <option value="Side Hustle">Side Hustle</option>
//       <option value="Bonuses">Bonuses</option>
//       <option value="Gifts">Gifts</option>
//       <option value="Refunds">Refunds</option>
//       <option value="Rental Income">Rental Income</option>
//       <option value="Royalties">Royalties</option>      
//       <option value="Other">Other</option>
//         {/* Add more options as needed */}
//       </select>
//       ) : (
//         <select
//             className="mt-1 p-2 border rounded-md w-full"
//             name='tag'
//             value={credentials.tag}
//             onChange={onChange}
//           >
           
//           <option value="">Select Tag</option>        
//           <option value="Food">Food</option>
//           <option value="House">House</option>
//           <option value="Health">Health</option>
//           <option value="Eating Out">Eating Out</option>
//           <option value="Toiletry">Toiletry</option>
//           <option value="Entertainment">Entertainment</option>
//           <option value="Sports">Sports</option>
//           <option value="Clothes">Clothes</option>
//           <option value="Communication">Communication</option>
//           <option value="Gifts">Gifts</option>
//           <option value="Pets">Pets</option>
//           <option value="Bills">Bills</option>
//           <option value="Travel">Travel</option>
//           <option value="Personal Expense">Personal Expense</option>
//           <option value="Other">Other</option>
//             {/* Add more options as needed */}
//           </select>
//       )}
          
        
//       </div>

  
//       <div className="mb-4">
//         <label className="block text-sm font-medium text-gray-600">Description</label>
//         <textarea
//           className="mt-1 p-2 border rounded-md w-full"
//           placeholder="Enter description"
//           name='description'
//           value={credentials.description}
//           onChange={onChange}
//         ></textarea>
//       </div>
      
//       <button
//         className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
//         onClick={handleAddTransaction}
//       >
//         Add Transaction
//       </button>
//     </div>
//   );
// };



// export default AddTransaction



import React, { useState, useEffect } from 'react';

function AddTransaction() {
  const [transactionType, setTransactionType] = useState('addExpense');
  const [credentials, setCredentials] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [editTransactionId, setEditTransactionId] = useState(null);

  const handleTransactionTypeChange = (type) => {
    setTransactionType(type);
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleAddTransaction = async () => {
    const url = editMode
      ? `http://localhost:5000/api/trans/updatetransaction/${editTransactionId}`
      : 'http://localhost:5000/api/trans/addtransaction';

    const method = editMode ? 'PUT' : 'POST';

    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'auth-token' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU2YzNjMmNiNjU1OTAxODQzNDJmMDY2In0sImlhdCI6MTcwMTU5MjEzMX0.Ndl5EbWTIRu38qvU9oy6pxjD54Zbo6GElDNMqFELnVg'
      },
      body: JSON.stringify({
        label: credentials.label,
        money: credentials.money,
        tag: credentials.tag,
        description: credentials.description,
        transactionType,
      }),
    });

    const json = await response.json();

    if (json.success) {
      alert(editMode ? 'Transaction updated successfully' : 'Transaction added successfully');
      setCredentials({ label: '', money: '', tag: '', description: '' });
      setTransactionType('addExpense');
      setEditMode(false);
      setEditTransactionId(null);
    } else {
      console.error('Error:', json.message);
      alert(`An error occurred: ${json.message}`);
    }
  };

  const handleEdit = async (id) => {
    // Fetch the transaction details based on the id
    const response = await fetch(`http://localhost:5000/api/trans/gettransaction/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU2YzNjMmNiNjU1OTAxODQzNDJmMDY2In0sImlhdCI6MTcwMTU5MjEzMX0.Ndl5EbWTIRu38qvU9oy6pxjD54Zbo6GElDNMqFELnVg'
      },
    });

    const json = await response.json();

    if (json.success) {
      // Set the retrieved values in the form
      setCredentials({
        label: json.transaction.label,
        money: json.transaction.money,
        tag: json.transaction.tag,
        description: json.transaction.description,
      });
      setTransactionType(json.transaction.transactionType);
      setEditMode(true);
      setEditTransactionId(id);
    } else {
      console.error('Error:', json.message);
      alert(`An error occurred: ${json.message}`);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 border rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-4">{editMode ? 'Edit Transaction' : 'Add Transaction'}</h1>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">Transaction Type</label>
        <div className="flex">
          <label className="mr-4">
            <input
              type="radio"
              value="addExpense"
              checked={transactionType === 'addExpense'}
              onChange={() => handleTransactionTypeChange('addExpense')}
            />
            <span className="ml-2">Add Expense</span>
          </label>
          <label>
            <input
              type="radio"
              value="addIncome"
              checked={transactionType === 'addIncome'}
              onChange={() => handleTransactionTypeChange('addIncome')}
            />
            <span className="ml-2">Add Income</span>
          </label>
        </div>
      </div>
      {/* ... (Other input fields remain the same) */}
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        onClick={handleAddTransaction}
      >
        {editMode ? 'Update Transaction' : 'Add Transaction'}
      </button>
      {editMode && (
        <button
          className="ml-2 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400"
          onClick={() => setEditMode(false)}
        >
          Cancel Edit
        </button>
      )}
    </div>
  );
}

export default AddTransaction;
