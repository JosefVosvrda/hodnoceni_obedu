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

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Moje hodnocení</h1>
      {reviews.length > 0 ? (
        <div className="space-y-2">
          {reviews.map((review) => (
            <Link
              key={review.review_id}
              to={`/my-review/${review.review_id}`}
              className="block p-4 bg-white shadow-md rounded-lg hover:bg-gray-100 transition"
            >
              {review.date} - {review.lunch}
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