import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import "dayjs/locale/cs";
import localizedFormat from "dayjs/plugin/localizedFormat";

dayjs.extend(localizedFormat);
dayjs.locale("cs");

const MyReview = () => {
  const { id } = useParams();
  const [review, setReview] = useState(null);

  useEffect(() => {
    fetch(`/api/review/${id}`, { credentials: "include" })
      .then(response => response.json())
      .then(data => setReview(data[0])) // Přizpůsobení array response
      .catch(error => console.error("Error fetching review", error));
  }, [id]);

  if (!review) {
    return <p>Načítání...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{review.description}</h1>
      <div className="bg-white shadow-md p-4 rounded-lg">
        <p><strong>Datum podávání:</strong> <span>{dayjs(review.serving_date).format("LL")}</span></p>
        <p><strong>Datum hodnocení:</strong> <span>{dayjs(review.review_date).format("LL")}</span></p>
        <p><strong>Kvalita polévky:</strong> {review.soup_quality}</p>
        <p><strong>Komentář k polévce:</strong> {review.soup_comment}</p>
        <p><strong>Chuť hlavního jídla:</strong> {review.main_taste}</p>
        <p><strong>Teplota hlavního jídla:</strong> {review.main_temperature}</p>
        <p><strong>Vzhled hlavního jídla:</strong> {review.main_look}</p>
        <p><strong>Velikost porce:</strong> {review.main_portion}</p>
        <p><strong>Komentář k hlavnímu jídlu:</strong> {review.main_comment}</p>
        {review.dessert_quality !== null && (
          <>
            <p><strong>Kvalita dezertu:</strong> {review.dessert_quality}</p>
            <p><strong>Komentář k dezertu:</strong> {review.dessert_comment}</p>
          </>
        )}
        <p><strong>Celkové hodnocení:</strong> {review.overall_score.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default MyReview;