import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Summaries = () => {
  const [summaries, setSummaries] = useState([]);

  useEffect(() => {
    axios.get("http://s-scrum-c4a-1.dev.spsejecna.net/summary", { withCredentials: true })
      .then(response => setSummaries(response.data))
      .catch(error => console.error("Error fetching summaries", error));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Celkové hodnocení obědů</h1>
      {summaries.length > 0 ? (
        <div className="space-y-2">
          {summaries.map(summary => (
            <Link
              key={summary.id}
              to={`/summary/${summary.id}`}
              className="block p-4 bg-white shadow-md rounded-lg hover:bg-gray-100 transition"
            >
              {summary.date} - {summary.lunch} (Skóre: {summary.score})
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