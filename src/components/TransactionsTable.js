import React, { useState, useEffect } from "react";
import { fetchTransactions } from "../api";
import "../css/TransactionsTable.css"; // Importing the CSS file

const TransactionsTable = ({ month }) => {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        const { data } = await fetchTransactions(month, search, page);
        setTransactions(data.transactions);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };
    loadTransactions();
  }, [month, search, page]);

  return (
    <div className="table-container">
      <input
        type="text"
        placeholder="Search transactions..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Date of Sale</th>
            <th>Sold</th>
          </tr>
        </thead>
        <tbody>
          {transactions &&
            transactions?.map((txn) => (
              <tr key={txn._id}>
                <td>{txn.title}</td>
                <td>{txn.description}</td>
                <td>{txn.price}</td>
                <td>{new Date(txn.dateOfSale).toLocaleDateString()}</td>
                <td>{txn.sold ? "Yes" : "No"}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="pagination-container">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TransactionsTable;
