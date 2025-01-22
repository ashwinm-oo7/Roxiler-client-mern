import React, { useState, useEffect } from "react";
import { PieChart, Pie, Tooltip, Cell } from "recharts";
import { fetchPieChartData } from "../api";
import "../css/PieChart.css";
const TransactionsPieChart = ({ month }) => {
  const [chartData, setChartData] = useState([]);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  useEffect(() => {
    const loadPieChartData = async () => {
      try {
        const { data } = await fetchPieChartData(month);
        setChartData(data);
      } catch (error) {
        console.error("Error fetching pie chart data:", error);
      }
    };
    loadPieChartData();
  }, [month]);

  return (
    <PieChart width={400} height={400}>
      <Pie
        data={chartData}
        dataKey="count"
        nameKey="category"
        cx="50%"
        cy="50%"
        outerRadius={150}
        label
      >
        {chartData.map((_, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  );
};

export default TransactionsPieChart;
