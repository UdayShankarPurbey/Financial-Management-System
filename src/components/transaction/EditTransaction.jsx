import React, { useState, useEffect } from 'react';

const EditTransaction = ({ transactionId, onClose, onUpdate }) => {
  const [editedTransaction, setEditedTransaction] = useState({
    label: '',
    money: 0,
    tag: '',
    description: '',
  });

  useEffect(() => {
    // Fetch the transaction details from the database based on the transactionId
    const fetchTransactionDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/trans/gettransaction/${transactionId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'auth-token' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU2YzNjMmNiNjU1OTAxODQzNDJmMDY2In0sImlhdCI6MTcwMTU5MjEzMX0.Ndl5EbWTIRu38qvU9oy6pxjD54Zbo6GElDNMqFELnVg'
        },
        });

        const json = await response.json();

        if (json.success) {
          // Update the state with the fetched transaction details
          setEditedTransaction({
            label: json.transaction.label,
            money: json.transaction.money,
            tag: json.transaction.tag,
            description: json.transaction.description,
          });
        } else {
          console.error('Error fetching transaction details:', json.message);
        }
      } catch (error) {
        console.error('Error fetching transaction details:', error);
      }
    };

    fetchTransactionDetails();
  }, [transactionId]);

  const handleInputChange = (e) => {
    setEditedTransaction({
      ...editedTransaction,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateTransaction = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/trans/updatetransaction/${transactionId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'auth-token' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU2YzNjMmNiNjU1OTAxODQzNDJmMDY2In0sImlhdCI6MTcwMTU5MjEzMX0.Ndl5EbWTIRu38qvU9oy6pxjD54Zbo6GElDNMqFELnVg'
        },
        body: JSON.stringify({
          label: editedTransaction.label,
          money: editedTransaction.money,
          tag: editedTransaction.tag,
          description: editedTransaction.description,
        }),
      });

      const json = await response.json();

      if (json.success) {
        alert('Transaction updated successfully');
        onUpdate(); // Trigger a callback to refresh the transactions after update
        onClose(); // Close the edit modal
      } else {
        console.error('Error updating transaction:', json.message);
        alert('An error occurred while updating the transaction');
      }
    } catch (error) {
      console.error('Error updating transaction:', error);
      alert('An error occurred while updating the transaction');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 border rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-4">Edit Transaction</h1>
      {/* Add input fields for editing transaction details */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">Label</label>
        <input
          type="text"
          className="mt-1 p-2 border rounded-md w-full"
          placeholder="e.g., Grocery"
          name="label"
          value={editedTransaction.label}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">Money</label>
        <input
          type="number"
          className="mt-1 p-2 border rounded-md w-full"
          placeholder="Enter amount"
          name="money"
          value={editedTransaction.money}
          onChange={handleInputChange}
        />
      </div>
      {/* Add similar input fields for 'tag' and 'description' */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">Tag</label>
        <input
          type="text"
          className="mt-1 p-2 border rounded-md w-full"
          placeholder="Enter tag"
          name="tag"
          value={editedTransaction.tag}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">Description</label>
        <textarea
          className="mt-1 p-2 border rounded-md w-full"
          placeholder="Enter description"
          name="description"
          value={editedTransaction.description}
          onChange={handleInputChange}
        ></textarea>
      </div>

      <div className="flex justify-end">
        <button
          className="mr-2 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          onClick={handleUpdateTransaction}
        >
          Update Transaction
        </button>
        <button
          className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditTransaction;
