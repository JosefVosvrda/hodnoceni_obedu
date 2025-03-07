import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Summaries = () => {
  const [summaries, setSummaries] = useState([]);

  useEffect(() => {
    fetch("/api/summary-lunches", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setSummaries(data))
      .catch((error) => console.error("Error fetching summaries", error));
  }, []);

  const getScoreColor = (score) => {
    if (score >= 4) return "text-red-500";
    if (score >= 3) return "text-orange-500";
    if (score >= 2) return "text-yellow-500";
    return "text-green-500";
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("cs-CZ");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4 text-center">Celkové hodnocení obědů</h1>
      {summaries.length > 0 ? (
        <div className="space-y-2">
          {summaries.map((summary) => (
            <Link
              key={summary.id}
              to={`/summary/${summary.id}`}
              className="flex justify-between items-center p-4 bg-white shadow-md rounded-s hover:bg-gray-100 transition"
            >
              <span>
                <div className="font-bold">{formatDate(summary.serving_date)}</div>{summary.description}
              </span>
              <span className={`font-bold text-2xl ${getScoreColor(summary.overall_score_avg)}`}>
                {summary.overall_score_avg}
              </span>
            </Link>
          ))}
        </div>
      ) : (
        <p>Žádná celková hodnocení nejsou k dispozici.</p>
      )}
    </div>
  );
};

export default Summaries;
