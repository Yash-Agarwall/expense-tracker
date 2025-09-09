import { useEffect, useState } from "react";
import TransactionForm from "./TransactionForm";
import TransactionList from "./TransactionList";

export default function TransactionPage() {
  let [transactions, setTransactions] = useState(() => {
    let saved = localStorage.getItem("transactions");
    return saved ? JSON.parse(saved) : [];
  });

  let [editingTransaction, setEditingTransaction] = useState(null);

  let total = transactions.reduce(
    (totalExpense, spend) => totalExpense + spend.amount,
    0 
  );

  let income = transactions
    .filter((transaction) => transaction.amount > 0)
    .reduce((totalIncome, transaction) => totalIncome + transaction.amount, 0);

  let expense = transactions
    .filter((transaction) => transaction.amount < 0)
    .reduce(
      (totalExpense, transaction) => totalExpense + transaction.amount,
      0
    );

  let handleDelete = (id) => {
    setTransactions(
      transactions.filter((transaction) => transaction.id !== id)
    );
  };
  let handleEdit=(transaction)=>{
    setEditingTransaction(transaction);
  }
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  return (
    <>
      <h4>Balance: {total}</h4>

      <h4>
        Income: <span style={{ color: "green" }}>{income}</span>
      </h4>
      <h4>
        Expense: <span style={{ color: "red" }}>{expense}</span>
      </h4>

      <h4>Add Transaction</h4>

      <TransactionForm
        initialValues={editingTransaction || {
          name: "",
          description: "",
          amount: "",
          type: "expense",
          id: "",
          date: "",
        }}
        onSubmit={(transaction) => {
          if(editingTransaction){
            setTransactions((prev)=> 
              prev.map((t)=>(t.id === transaction.id ? transaction:t))
            );
            setEditingTransaction(null);
          }else{
            setTransactions((prev)=>[...prev, transaction]);
          }
          
        }
          
        }
      />
      <TransactionList transactions={transactions} onDelete={handleDelete} onEdit={handleEdit}/>
      
    </>
  );
}
