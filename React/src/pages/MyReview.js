import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const MyReview = () => {
  const { id } = useParams();
  const [review, setReview] = useState(null);

  useEffect(() => {
    axios.get(`http://s-scrum-c4a-1.dev.spsejecna.net/review/${id}`, { withCredentials: true })
      .then(response => setReview(response.data))
      .catch(error => console.error("Error fetching review", error));
  }, [id]);

  if (!review) {
    return <p>Načítání...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Moje hodnocení</h1>
      <div className="bg-white shadow-md p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">{review.lunch}</h2>
        <p><strong>Datum:</strong> {review.date}</p>
        <p><strong>Kvalita polévky:</strong> {review.soup_quality}</p>
        <p><strong>Komentář k polévce:</strong> {review.soup_comment}</p>
        <p><strong>Chuť hlavního jídla:</strong> {review.main_taste}</p>
        <p><strong>Teplota hlavního jídla:</strong> {review.main_temperature}</p>
        <p><strong>Vzhled hlavního jídla:</strong> {review.main_look}</p>
        <p><strong>Velikost porce:</strong> {review.main_portion}</p>
        <p><strong>Komentář k hlavnímu jídlu:</strong> {review.main_comment}</p>
        {review.desert_quality && (
          <>
            <p><strong>Kvalita dezertu:</strong> {review.desert_quality}</p>
            <p><strong>Komentář k dezertu:</strong> {review.desert_comment}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default MyReview;