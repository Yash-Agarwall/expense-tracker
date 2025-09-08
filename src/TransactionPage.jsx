import { useEffect, useState } from "react";
import TransactionForm from "./TransactionForm";

export default function TransactionPage() {
  let [transactions, setTransactions] = useState(() => {
    let saved = localStorage.getItem("transactions");
    return saved ? JSON.parse(saved) : [];
  });

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
        initialValues={{
          name: "",
          description: "",
          amount: "",
          type: "expense",
          id: "",
          date: "",
        }}
        onSubmit={(transaction) =>
          setTransactions([...transactions, transaction])
        }
      />

      <h4>Transactions</h4>
      <ul>
        {transactions.map((transaction) => (
          <div key={transaction.id}>
            <h5>{transaction.name}</h5>
            <p>{transaction.description}</p>
            <p>{transaction.amount}</p>
            <p>{transaction.type}</p>
            <p>{transaction.date}</p>
            <button onClick={() => handleDelete(transaction.id)}>Delete</button>
          </div>
        ))}
      </ul>
    </>
  );
}
