import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Summary = () => {
  const { id } = useParams();
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    axios.get(`http://s-scrum-c4a-1.dev.spsejecna.net/summary/${id}`, { withCredentials: true })
      .then(response => setSummary(response.data))
      .catch(error => console.error("Error fetching summary", error));
  }, [id]);

  if (!summary) {
    return <p>Načítání...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Celkové hodnocení oběda</h1>
      <div className="bg-white shadow-md p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">{summary.lunch}</h2>
        <p><strong>Datum:</strong> {summary.date}</p>
        <p><strong>Průměrná kvalita polévky:</strong> {summary.soup_quality}</p>
        <p><strong>Průměrná chuť hlavního jídla:</strong> {summary.main_taste}</p>
        <p><strong>Průměrná teplota hlavního jídla:</strong> {summary.main_temperature}</p>
        <p><strong>Průměrný vzhled hlavního jídla:</strong> {summary.main_look}</p>
        <p><strong>Průměrná velikost porce:</strong> {summary.main_portion}</p>
        <p><strong>Průměrná kvalita dezertu:</strong> {summary.desert_quality}</p>
        <h3 className="text-lg font-semibold mt-4">Komentáře:</h3>
        <div className="space-y-2">
          {summary.soup_comments.map((comment, index) => (
            <p key={index}><strong>Polévka:</strong> {comment}</p>
          ))}
          {summary.main_comments.map((comment, index) => (
            <p key={index}><strong>Hlavní jídlo:</strong> {comment}</p>
          ))}
          {summary.desert_comments.map((comment, index) => (
            <p key={index}><strong>Dezert:</strong> {comment}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Summary;
