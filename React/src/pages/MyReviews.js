import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const MyReviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("/api/review/user/", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setReviews(data))
      .catch((error) => console.error("Error fetching reviews", error));
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("cs-CZ");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4 text-center">Moje hodnocení</h1>
      {reviews.length > 0 ? (
        <div className="space-y-2">
          {reviews.map((review) => (
            <Link
              key={review.id}
              to={`/my-review/${review.id}`}
              className="block p-4 bg-white shadow-md rounded-s hover:bg-gray-100 transition"
            >
              <span className="font-bold">{formatDate(review.serving_date)}</span> - {review.description}
            </Link>
          ))}
        </div>
      ) : (
        <p>Nemáte žádná hodnocení.</p>
      )}
    </div>
  );
};

export default MyReviews;