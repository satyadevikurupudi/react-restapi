import React, { useEffect, useState } from "react";

const TransactionForm = ({ onSave, editingTransaction }) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("income");
  const [id, setId] = useState(null);

  // Populate form with existing data when editing
  useEffect(() => {
    if (editingTransaction) {
      setTitle(editingTransaction.title);
      setAmount(editingTransaction.amount.toString());
      setType(editingTransaction.type);
      setId(editingTransaction.id);
    } else {
      setTitle("");
      setAmount("");
      setType("income");
      setId(null);
    }
  }, [editingTransaction]);

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    onSave({ id, title, amount: parseFloat(amount), type });

    // Reset form after submission
    setTitle("");
    setAmount("");
    setType("income");
    setId(null);
  };

  return (
    <div className="container mt-3">
      <h4 className="text-center">{id ? "Edit Transaction" : "Add Transaction"}</h4>
      <form className="p-3 border rounded shadow bg-light" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Amount</label>
          <input type="number" className="form-control" value={amount} onChange={(e) => setAmount(e.target.value)} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Type</label>
          <select className="form-select" value={type} onChange={(e) => setType(e.target.value)}>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary w-100">
          {id ? "Update Transaction" : "Add Transaction"}
        </button>
      </form>
    </div>
  );
};

export default TransactionForm;