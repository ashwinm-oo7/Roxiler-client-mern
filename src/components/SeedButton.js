import React, { useState } from "react";
import axios from "axios";

const SeedButton = () => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const seedDatabase = async () => {
    setLoading(true);
    setStatus("");

    try {
      const response = await axios.get("http://localhost:5000/api/seed");
      setStatus("Database seeded successfully!");
    } catch (error) {
      setStatus(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={seedDatabase} disabled={loading}>
        {loading ? "Seeding..." : "Seed Database"}
      </button>
      {status && <p>{status}</p>}
    </div>
  );
};

export default SeedButton;
