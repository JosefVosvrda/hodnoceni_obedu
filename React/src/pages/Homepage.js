import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Homepage = () => {
  const [lunches, setLunches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/lunches", {
      method: "GET",
      credentials: "include",
    })
      .then(response => response.json())
      .then(data => {
        // Seřazení podle datumu od nejnovějšího k nejstaršímu
        const sortedLunches = data.sort((a, b) => new Date(b.serving_date) - new Date(a.serving_date));
        setLunches(sortedLunches);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching lunches", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Načítání obědů...</p>;
  }

  // Skupinování obědů podle data a seřazení dat od nejnovějšího po nejstarší
  const groupedLunches = Object.keys(
    lunches.reduce((acc, lunch) => {
      const date = new Date(lunch.serving_date).toLocaleDateString("cs-CZ");
      if (!acc[date]) acc[date] = [];
      acc[date].push(lunch);
      return acc;
    }, {})
  ).sort((a, b) => new Date(b.split(".").reverse().join("-")) - new Date(a.split(".").reverse().join("-")))
  .reduce((acc, date) => {
    acc[date] = lunches.filter(lunch => new Date(lunch.serving_date).toLocaleDateString("cs-CZ") === date);
    return acc;
  }, {});

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Seznam obědů</h1>
      {Object.keys(groupedLunches).map(date => (
        <div key={date} className="mb-6">
          <h2 className="text-xl font-semibold mb-2">{date}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {groupedLunches[date].map((meal) => (
              <Link
                key={meal.id}
                to={`/review/${meal.id}`}
                className="block p-4 bg-white shadow-md rounded-lg hover:bg-gray-100 transition"
              >
                <p className="font-medium">{meal.description}</p>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Homepage;