import React from "react";
import { Link } from "react-router-dom";

const Homepage = ({ lunches }) => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Seznam obědů</h1>
      {Object.entries(lunches).map(([date, meals]) => (
        <div key={date} className="mb-6">
          <h2 className="text-xl font-semibold mb-2">{date}</h2>
          <div className="space-y-2">
            {meals.map((meal) => (
              <Link
                key={meal.id}
                to={`/review/${meal.id}`}
                className="block p-4 bg-white shadow-md rounded-lg hover:bg-gray-100 transition"
              >
                {meal.lunch}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Homepage;