import { use, useEffect, useState } from "react";
import TransactionForm from "./TransactionForm";
import TransactionList from "./TransactionList";
import "./TransactionPage.css";
import ExpensePieChart from "./ExpensePieChart";

export default function TransactionPage() {
  let [transactions, setTransactions] = useState(() => {
    let saved = localStorage.getItem("transactions");
    return saved ? JSON.parse(saved) : [];
  });

  let [editingTransaction, setEditingTransaction] = useState(null);
  let [filter, setFilter] = useState("all");
  let [sort, setSort] = useState("newest");

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
  let handleEdit = (transaction) => {
    setEditingTransaction(transaction);
  };
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  let filteredTransactions = transactions.filter((tx) => {
    //why to use ==== instead of ==
    if (filter === "income") return tx.amount > 0;
    else if (filter === "expense") return tx.amount < 0;
    return true;
  });

  if (sort === "newest") {
    filteredTransactions.sort((a, b) => new Date(b.date) - new Date(a.date));
  } else if (sort === "oldest") {
    filteredTransactions.sort((a, b) => new Date(a.date) - new Date(b.date));
  } else if (sort === "high") {
    filteredTransactions.sort((a, b) => b.amount - a.amount);
  } else if (sort === "low") {
    filteredTransactions.sort((a, b) => a.amount - b.amount);
  }

  return (
    <div className="page-container">
      <div className="summary">
        <h4>Balance: {total}</h4>

        <h4 style={{ fontStyle: "bold" }}>
          Income: <span style={{ color: "green" }}>{income}</span>
        </h4>
        <h4>
          Expense: <span style={{ color: "red" }}>{expense}</span>
        </h4>
      </div>
      <h4>Add Transaction</h4>
      <TransactionForm
        initialValues={
          editingTransaction || {
            name: "",
            description: "",
            amount: "",
            type: "expense",
            id: "",
            date: "",
            category: "other"
          }
        }
        onSubmit={(transaction) => {
          if (editingTransaction) {
            setTransactions((prev) =>
              prev.map((t) => (t.id === transaction.id ? transaction : t))
            );
            setEditingTransaction(null);
          } else {
            setTransactions((prev) => [...prev, transaction]);
          }
        }}
      />
      <div className="transaction-container">
        <div className="controls">
          <label htmlFor="filter"><span className="material-symbols-outlined">tune 
            
            </span></label>
          <select
            name="filter"
            id="filter"
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>

          <label htmlFor="sort"><span className="material-symbols-outlined">sort</span> </label>
          <select
            name="sort"
            id="sort"
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="newest">Date( Newest first )</option>
            <option value="oldest">Date (Oldest first)</option>
            <option value="high">Amount( High to low )</option>
            <option value="low">Amount(Low to high)</option>
          </select>
        </div>
        <TransactionList
          transactions={filteredTransactions}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
        <ExpensePieChart transactions={transactions}/>
      </div>
    </div>
  );
}
