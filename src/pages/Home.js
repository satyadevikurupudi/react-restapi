import React, { useEffect, useState } from "react";
import axios from "axios";
import TransactionList from "../components/TransactionList";
import TransactionForm from "../components/TransactionForm";

const Home = () => {
  const [transactions, setTransactions] = useState([]);
  const [editingTransaction, setEditingTransaction] = useState(null);

  // Fetch transactions from backend
  const fetchTransactions = async () => {
    try {
      const response = await axios.get("http://localhost:8085/api/transactions");
      setTransactions(response.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  // Save transaction (Add or Update)
  const handleSaveTransaction = async (transaction) => {
    try {
      if (transaction.id) {
        // Update an existing transaction
        const response = await axios.put(`http://localhost:8085/api/transactions/${transaction.id}`, transaction);

        // Update the state immediately
        setTransactions((prevTransactions) =>
          prevTransactions.map((t) => (t.id === transaction.id ? response.data : t))
        );
      } else {
        // Add a new transaction
        const response = await axios.post("http://localhost:8085/api/transactions", transaction);
        setTransactions([...transactions, response.data]);
      }

      setEditingTransaction(null); // Clear editing state
    } catch (error) {
      console.error("Error saving transaction:", error);
    }
  };

  // Edit transaction
  const handleEditTransaction = (transaction) => {
    setEditingTransaction(transaction);
  };

  // Delete transaction
  const handleDeleteTransaction = async (id) => {
    try {
      await axios.delete(`http://localhost:8085/api/transactions/${id}`);

      // Remove transaction from state immediately
      setTransactions(transactions.filter((t) => t.id !== id));
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };

  return (
    <div className="container">
      <h2 className="text-center my-4 text-primary">Finance Tracker</h2>

      <div className="row">
        <div className="col-md-6">
          <TransactionForm onSave={handleSaveTransaction} editingTransaction={editingTransaction} />
        </div>
        <div className="col-md-6">
          <TransactionList transactions={transactions} onEdit={handleEditTransaction} onDelete={handleDeleteTransaction} />
        </div>
      </div>
    </div>
  );
};

export default Home;