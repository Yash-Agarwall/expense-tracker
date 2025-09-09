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
        <span>{transaction.name}</span>
        <span>₹{transaction.amount}</span>
        <button
          onClick={(e) => {
            e.stopPropagation();//to avoid opening of the details upon clicking
            onDelete(transaction.id);
          }}
        >
          ✕
        </button>
        <button onClick={(e)=>{  
            e.stopPropagation();                     
            onEdit(transaction)
        }}>Edit</button>
      </div>
      {showDetails && (
        <div>
          <p>
            <b>Date:</b> {transaction.date}
          </p>
          <p>
            <b>Category: </b>
            {transaction.type}
          </p>
          <p>
            <b>Description: </b>
            {transaction.description}
          </p>
        </div>
      )}
    </li>
  );
}
