import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Summary = () => {
  const { id } = useParams();
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    fetch(`/api/summary/${id}`, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setSummary(data))
      .catch((error) => console.error("Error fetching summary", error));
  }, [id]);

  const getScoreColor = (score) => {
    if (score >= 4) return "text-red-500";
    if (score >= 3) return "text-orange-500";
    if (score >= 2) return "text-yellow-500";
    return "text-green-500";
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("cs-CZ");
  };

  if (!summary) {
    return <p>Načítání...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">{summary.description}</h1>
      <h2 className="text-xl font-semibold mb-2 text-center">{formatDate(summary.serving_date)}</h2>
      <h1 className={`text-5xl font-bold mb-4 text-center ${getScoreColor(summary.overall_score)}`}>{summary.overall_score}</h1>
      <div className="bg-white shadow-md p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-2 font-bold">Polévka</h2>
        <p><strong>Průměrná kvalita:</strong> {summary.soup_quality_avg}</p>
        <h2 className="text-xl font-semibold mb-2 font-bold">Hlavní chod</h2>
        <p><strong>Průměrná chuť hlavního jídla:</strong> {summary.main_taste_avg}</p>
        <p><strong>Průměrná teplota hlavního jídla:</strong> {summary.main_temperature_avg}</p>
        <p><strong>Průměrný vzhled hlavního jídla:</strong> {summary.main_look_avg}</p>
        <p><strong>Průměrná velikost porce:</strong> {summary.main_portion_avg}</p>
        <h2 className="text-xl font-semibold mb-2 font-bold">Dezert</h2>
        <p><strong>Průměrná kvalita dezertu:</strong> {summary.desert_quality_avg}</p>
      </div>
      <h2 className="text-xl font-semibold mb-2 text-center">Komentáře:</h2>
      <div className="space-y-2">
        <h3 className="text-xl font-semibold mb-2">Polévka</h3>
        {summary.soup_comments.map((comment, index) => (
          <div key={index} className="bg-white shadow-md p-4 rounded-lg">
            <p>{comment}</p>
          </div>
        ))}
        <h3 className="text-xl font-semibold mb-2">Hlavní chod</h3>
        {summary.main_comments.map((comment, index) => (
          <div key={index} className="bg-white shadow-md p-4 rounded-lg">
            <p>{comment}</p>
          </div>
        ))}
        <h3 className="text-xl font-semibold mb-2">Dezert</h3>
        {summary.dessert_comments.map((comment, index) => (
          <div key={index} className="bg-white shadow-md p-4 rounded-lg">
            <p>{comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Summary;