import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { fetchBarChartData } from "../api";
import "../css/BarChart.css";
const TransactionsBarChart = ({ month }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const loadBarChartData = async () => {
      try {
        const { data } = await fetchBarChartData(month);
        setChartData(data);
      } catch (error) {
        console.error("Error fetching bar chart data:", error);
      }
    };
    loadBarChartData();
  }, [month]);

  return (
    <BarChart width={600} height={300} data={chartData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="range" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="count" fill="#8884d8" />
    </BarChart>
  );
};

export default TransactionsBarChart;
