import React, { useState, useEffect } from "react";
import { fetchStatistics } from "../api";
import "../css/PieChart.css";
const Statistics = ({ month }) => {
  const [stats, setStats] = useState({});

  useEffect(() => {
    const loadStatistics = async () => {
      try {
        const { data } = await fetchStatistics(month);
        setStats(data);
      } catch (error) {
        console.error("Error fetching statistics:", error);
      }
    };
    loadStatistics();
  }, [month]);

  return (
    <div>
      <h2>Statistics</h2>
      <p>Total Sale Amount: {stats.totalSaleAmount || 0}</p>
      <p>Total Sold Items: {stats.totalSoldItems || 0}</p>
      <p>Total Unsold Items: {stats.totalUnsoldItems || 0}</p>
    </div>
  );
};

export default Statistics;
