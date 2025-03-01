import React from "react";

const TransactionList = ({ transactions, onEdit, onDelete }) => {
  return (
    <div className="p-3">
      <h4 className="text-center">Transactions</h4>
      <ul className="list-group">
        {transactions.map((t) => (
          <li key={t.id} className={`list-group-item d-flex justify-content-between align-items-center ${t.type === "expense" ? "text-danger" : "text-success"}`}>
            <span>{t.title} - ${t.amount} ({t.type})</span>
            <div>
              <button className="btn btn-sm btn-warning me-2" onClick={() => onEdit(t)}>Edit</button>
              <button className="btn btn-sm btn-danger" onClick={() => onDelete(t.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;