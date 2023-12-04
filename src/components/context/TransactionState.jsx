import React, { useState } from 'react';
import ContextTransaction from "./ContextTransaction"

const NoteState = (props) => {
    const host = "http://localhost:5000";
   
    const transInitial = []

    const [trans, setTrans] = useState(transInitial);

    //Fetch all Transaction
    const getTransaction = async () =>{
      //todo api call
      const response = await fetch(`${host}/api/trans/fetchalltransaction`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "authtoken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU2YzNjMmNiNjU1OTAxODQzNDJmMDY2In0sImlhdCI6MTcwMTU5MjEzMX0.Ndl5EbWTIRu38qvU9oy6pxjD54Zbo6GElDNMqFELnVg"        }
      });
      const json = await response.json();
      setTrans(json);

    }

    //Add a Transaction

  
    const addTransaction = async (label,money, tag, description,transactionType) =>{
      
      //todo api call
      const response = await fetch(`${host}/api/trans/addtransaction`, {
        method: "POST",
        
        headers: {
          "Content-Type": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU2YzNjMmNiNjU1OTAxODQzNDJmMDY2In0sImlhdCI6MTcwMTU5MjEzMX0.Ndl5EbWTIRu38qvU9oy6pxjD54Zbo6GElDNMqFELnVg"        
        },

        body: JSON.stringify({label,money, tag, description,transactionType}), 
      });

      
      const tran = await response.json();
      setTrans(trans.concat(tran))

    }

    //Delete a Transactioin
    const deleteTransaction = async (id) =>{
        //  todo api call
        const response = await fetch(`${host}/api/trans/deletetransaction/${id}`, {
          method: "DELETE",
          
          headers: {
            "Content-Type": "application/json",
            "authtoken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU2YzNjMmNiNjU1OTAxODQzNDJmMDY2In0sImlhdCI6MTcwMTU5MjEzMX0.Ndl5EbWTIRu38qvU9oy6pxjD54Zbo6GElDNMqFELnVg"        
          }
          
          
        });
        const json = await response.json(); 
        console.log(json);

        const newTrans = trans.filter((tran)=> {return tran._id !== id})
        setTrans(newTrans)

    }

    //Edit a Transaction

    const editTransaction = async (id,label,money, tag, description,transactionType) =>{ 
      //api call
      const response = await fetch(`${host}/api/trans/updatetransaction/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "authtoken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU2YzNjMmNiNjU1OTAxODQzNDJmMDY2In0sImlhdCI6MTcwMTU5MjEzMX0.Ndl5EbWTIRu38qvU9oy6pxjD54Zbo6GElDNMqFELnVg"        
        },
        
        body: JSON.stringify({label,money, tag, description,transactionType}), 
      });
      const json = await response.json(); 
      console.log(json);

      let newTrans = JSON.parse(JSON.stringify(trans));

      //logic to edit in client
      for (let index = 0; index < newTrans.length; index++) {
        const element = newTrans[index];
        if (element._id === id) {
          newTrans[index].label = label;
          newTrans[index].money = money;
          newTrans[index].tag = tag;
          newTrans[index].description = description;
          newTrans[index].transactionType = transactionType;
          break;
        }
        setTrans(newTrans)
      }
      
    }

   
    return(
        <ContextTransaction.Provider value={{trans,addTransaction ,deleteTransaction, editTransaction, getTransaction}}>
          {props.children}
        </ContextTransaction.Provider>
    )
}

export default NoteState;