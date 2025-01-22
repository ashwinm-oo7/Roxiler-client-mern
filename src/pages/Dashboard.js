import React, { useEffect, useState } from "react";
import TransactionsTable from "../components/TransactionsTable";
import Statistics from "../components/Statistics";
import TransactionsBarChart from "../components/BarChart";
import TransactionsPieChart from "../components/PieChart";
import SeedButton from "../components/SeedButton"; // Make sure SeedButton is imported

const Dashboard = () => {
  const [month, setMonth] = useState(3); // Default to March

  const [transactions, setTransactions] = useState([]);
  const [statistics, setStatistics] = useState({});
  const [barChartData, setBarChartData] = useState([]);
  const [pieChartData, setPieChartData] = useState({});
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [perPage] = useState(10);

  useEffect(() => {
    fetchData(); // Fetch data when month, search, or page change
  }, [month, search, page]);

  const fetchData = async () => {
    try {
      const transactionsResponse = await fetch(
        `/api/transactions?month=${month}&search=${search}&page=${page}&perPage=${perPage}`
      );
      if (!transactionsResponse.ok)
        throw new Error("Failed to fetch transactions");
      const transactionsData = await transactionsResponse.json();
      setTransactions(transactionsData);

      const statisticsResponse = await fetch(`/api/statistics?month=${month}`);
      if (!statisticsResponse.ok) throw new Error("Failed to fetch statistics");
      const statisticsData = await statisticsResponse.json();
      setStatistics(statisticsData);

      const barChartResponse = await fetch(`/api/bar-chart?month=${month}`);
      if (!barChartResponse.ok)
        throw new Error("Failed to fetch bar chart data");
      const barChartData = await barChartResponse.json();
      setBarChartData(barChartData);

      const pieChartResponse = await fetch(`/api/pie-chart?month=${month}`);
      if (!pieChartResponse.ok)
        throw new Error("Failed to fetch pie chart data");
      const pieChartData = await pieChartResponse.json();
      setPieChartData(pieChartData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="App">
      <h1>Transactions Dashboard</h1>

      {/* SeedButton to manually seed the database */}
      <SeedButton />

      <select value={month} onChange={(e) => setMonth(e.target.value)}>
        <option value="01">January</option>
        <option value="02">February</option>
        <option value="03">March</option>
        {/* Add other months as needed */}
      </select>

      <input
        type="text"
        placeholder="Search Transactions"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <TransactionsTable transactions={transactions} />
      <Statistics statistics={statistics} />
      <TransactionsBarChart data={barChartData} />
      <TransactionsPieChart data={pieChartData} />
    </div>
  );
};

export default Dashboard;
