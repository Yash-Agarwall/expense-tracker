import { useState } from "react";

export default function AddTransaction() {
  //newExpense(new transaction handling object, expensObj(stores amount only))

  let [newExpense, setNewExpense] = useState({
    name: "",
    description: "",
    amount: "",
    type: "expense",
  });
  let [transactions, setTransactions] = useState([]);

  let handleChange = (event) => {
    // let name = event.target.name;
    // let value = event.target.value;
    //this is a shortcut for above to lines
    let { name, value } = event.target;

    // console.log(event.target);
    // setTransactions([...transactions, Number(value)]);
    //this is necessary, without this a zero will appear in the input box, which u cant remove
    // setNewExpense({value === "" ? "" : Number(value)});
    //the [name]: value stores different input fields one by one
    setNewExpense({ ...newExpense, [name]: value });
  };

  let handleAddBtn = () => {
    if (
      newExpense.name === "" ||
      newExpense.amount === "" ||
      isNaN(newExpense.amount)
    ) {
      return;
    }

    //this will store the complete object but with amount as a number instead of a string
    let signedAmount =
      newExpense.type === "expense"
        ? -Math.abs(Number(newExpense.amount))
        : Math.abs(Number(newExpense.amount));
    let expenseObj = {
      ...newExpense,
      amount: signedAmount,
    };

    setTransactions([...transactions, expenseObj]);
    setNewExpense({ name: "", description: "", amount: "", type: "expense" });
  };

  let total = transactions.reduce(
    (totalExpense, spend) => totalExpense + spend.amount,
    0
  );

  let income = transactions
    .filter((transaction) => transaction.amount > 0)
    .reduce((totalIncome, transaction) => totalIncome + transaction.amount, 0);

  let expense = transactions
    .filter((transaction) => transaction.amount < 0)
    .reduce((totalExpense, transaction) => totalExpense + transaction.amount, 0);

  let handleDelete = (index) =>{
    //splice creates a new array, tho it can also be used
    //arr.filter(ele, index)--> ele= actual item, index= its position in the array
    
    setTransactions(transactions.filter((_, i) => i!= index));
    
  }

  return (
    <>
      <h4>Balance: {total}</h4>

      <h4>Income: <span style={{color:"green"}}>{income}</span></h4>
      <h4>Expense: <span style={{color:"red"}}>{expense}</span></h4>

      <h4>Add Transaction</h4>

      <label htmlFor="name">Expense name: </label>
      <input
        type="text"
        id="name"
        name="name"
        value={newExpense.name}
        onChange={handleChange}
      />
      <br />
      <label htmlFor="type">Type: </label>
      <select
        name="type"
        id="type"
        onChange={handleChange}
        value={newExpense.type}
      >
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>
      <br />
      <label htmlFor="amount">Transaction amount: </label>
      <input
        type="number"
        id="amount"
        name="amount"
        value={newExpense.amount}
        onChange={handleChange}
      />
      <br />

      <label htmlFor="desc">Expense Description: </label>
      <input
        type="text"
        id="desc"
        name="description"
        value={newExpense.description}
        onChange={handleChange}
      />
      <br />
      <br />

      <button className="Add" onClick={handleAddBtn}>
        Add
      </button>

      <h4>Transactions</h4>
      <ul>
        {transactions.map((transaction, i) => (
          <div key={i}>
            <h5>{transaction.name}</h5>
            <p>{transaction.description}</p>
            <p>{transaction.amount}</p>
            <p>{transaction.type}</p>
            {/* <button onClick={handleDelete(i)}> --> this immediately calls the function without rendering(before any click)*/}
            <button onClick={() => handleDelete(i)}>Delete</button>
          </div>
        ))}
      </ul>
    </>
  );
}
