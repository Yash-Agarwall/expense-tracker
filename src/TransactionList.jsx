import { useState } from "react";

export default function TransactionList({ transactions, onDelete, onEdit }) {
  if (transactions.length == 0) {
    return <p>No Transaction yet</p>;
  }
  return (
    <>
      <h4>Transactions</h4>
      <ul>
        {transactions.map((transaction) => (
          <TransactionItem
            key={transaction.id}
            transaction={transaction}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </ul>
    </>
  );
}

function TransactionItem({ transaction, onDelete, onEdit }) {
  let [showDetails, setShowDetails] = useState(false);

  return (
    <li onClick={() => setShowDetails((prev) => !prev)}>
      <div>
        <span>{transaction.name}-{transaction.category}</span>
        <span>₹{transaction.amount}</span>
        <button
          onClick={(e) => {
            e.stopPropagation();//to avoid opening of the details upon clicking
            onDelete(transaction.id);
          }}
        >
          <span className="material-symbols-outlined">delete</span>
        </button>
        <button onClick={(e)=>{  
            e.stopPropagation();                     
            onEdit(transaction)
        }}><span className="material-symbols-outlined">edit</span></button>
      </div>
      {showDetails && (
        <div>
          <p>
            <b>Date:</b> {transaction.date}
          </p>
          <p>
            <b>Type: </b>
            {transaction.type}
          </p>
          <p>
            <b>Description: </b>
            {transaction.description}
          </p>
          <p>
            <b>Category:</b> {transaction.category}
          </p>
        </div>
      )}
    </li>
  );
}
