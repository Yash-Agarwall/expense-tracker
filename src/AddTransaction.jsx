import { useEffect, useState } from "react";
import TransactionForm from "./TransactionForm";

export default function AddTransaction() {
  //newExpense(new transaction handling object, expensObj(stores amount only))

  // let [newExpense, setNewExpense] = useState({
  //   name: "",
  //   description: "",
  //   amount: "",
  //   type: "expense",
  //   id: "",
  //   date: "",
  // });

  let [transactions, setTransactions] = useState(() => {
    //getItem-> fetches the striing we stored earlier
    //.parse--> converts it back to array/object
    let saved = localStorage.getItem("transactions");
    //if we found something after loading, then update transaction array
    return saved ? JSON.parse(saved) : [];
  });

  // let handleChange = (event) => {
  //   // let name = event.target.name;
  //   // let value = event.target.value;
  //   //this is a shortcut for above to lines
  //   let { name, value } = event.target;

  //   // setTransactions([...transactions, Number(value)]);
  //   //this is necessary, without this a zero will appear in the input box, which u cant remove
  //   // setNewExpense({value === "" ? "" : Number(value)});
  //   //the [name]: value stores different input fields one by one
  //   setNewExpense({ ...newExpense, [name]: value });
  // };

  // let handleAddBtn = () => {
  //   if (
  //     newExpense.name === "" ||
  //     newExpense.amount === "" ||
  //     isNaN(newExpense.amount)
  //   ) {
  //     return;
  //   }

  //   //this will store the complete object but with amount as a number instead of a string
  //   let signedAmount =
  //     newExpense.type === "expense"
  //       ? -Math.abs(Number(newExpense.amount))
  //       : Math.abs(Number(newExpense.amount));
  //   let expenseObj = {
  //     ...newExpense,
  //     amount: signedAmount,
  //     id: Date.now(),
  //     date: new Date().toLocaleString(),
  //   };

  //   setTransactions([...transactions, expenseObj]);
  //   setNewExpense({ name: "", description: "", amount: "", type: "expense" });
  // };

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
    //splice creates a new array, tho it can also be used
    //arr.filter(ele, index)--> ele= actual item, index= its position in the array

    setTransactions(
      transactions.filter((transaction) => transaction.id !== id)
    );
  };

  let handleEdit = () => {};

  //this will be triggered everytime transactions array is changed
  useEffect(() => {
    //this will store the data into the local storage under the key "transactions" after converting it to string(using stringify)
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
        }
      }
      onSubmit={(transaction) => setTransactions([...transactions,transaction])}
      />
      {/* <button className="Add" onClick={handleAddBtn}>
        Add
      </button> */}

      <h4>Transactions</h4>
      <ul>
        {transactions.map((transaction, i) => (
          <div key={i}>
            <h5>{transaction.name}</h5>
            <p>{transaction.description}</p>
            <p>{transaction.amount}</p>
            <p>{transaction.type}</p>
            <p>{transaction.date}</p>
            {/* <button onClick={handleDelete(i)}> --> this immediately calls the function without rendering(before any click)*/}
            <button onClick={() => handleDelete(transaction.id)}>Delete</button>
          </div>
        ))}
      </ul>
    </>
  );
}
