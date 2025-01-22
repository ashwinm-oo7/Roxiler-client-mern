import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

export const fetchTransactions = (month, search = "", page = 1, perPage = 10) =>
  axios.get(`${BASE_URL}/transactions`, {
    params: { month, search, page, perPage },
  });

export const fetchStatistics = (month) =>
  axios.get(`${BASE_URL}/statistics`, { params: { month } });

export const fetchBarChartData = (month) =>
  axios.get(`${BASE_URL}/bar-chart`, { params: { month } });

export const fetchPieChartData = (month) =>
  axios.get(`${BASE_URL}/pie-chart`, { params: { month } });

export const fetchCombinedData = (month) =>
  axios.get(`${BASE_URL}/combined`, { params: { month } });
