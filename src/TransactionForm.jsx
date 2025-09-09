import { useEffect, useState } from "react";


export default function TransactionForm({ initialValues, onSubmit }) {
  let [formData, setformData] = useState(initialValues);

  useEffect(() => {
    //this will store the data into the local storage under the key "transactions" after converting it to string(using stringify)
    // localStorage.setItem("transactions", JSON.stringify(transactions));
    setformData(initialValues);
  }, [initialValues]);

  let handleChange = (event) => {
    let { name, value } = event.target;
    setformData({ ...formData, [name]: value });
  };

  let handleSubmit = (event) => {
    event.preventDefault();

    if (
      formData.name === "" ||
      formData.amount === "" ||
      isNaN(formData.amount)
    ) {
      return;
    }

    let signedAmount =
      formData.type === "expense"
        ? -Math.abs(Number(formData.amount))
        : Math.abs(Number(formData.amount));
    onSubmit({
      ...formData,
      //these below entries will override their previous entries
      amount: signedAmount,
      id: formData.id || Date.now(),
      date: formData.date || new Date().toLocaleDateString(),
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Expense name: </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="type">Type: </label>
        <select
          name="type"
          id="type"
          onChange={handleChange}
          value={formData.type}
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
          value={formData.amount}
          onChange={handleChange}
        />
        <br />

        <label htmlFor="desc">Expense Description: </label>
        <input
          type="text"
          id="desc"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
        <br />
        <br />
        <button>{formData.id ? "Update" : "Add"}</button>
      </form>
    </>
  );
}
