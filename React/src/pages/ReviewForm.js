import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";

const ReviewForm = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    soup_quality: "",
    soup_comment: "",
    main_taste: "",
    main_temperature: "",
    main_look: "",
    main_portion: "",
    main_comment: "",
    hasDesert: false,
    desert_quality: "",
    desert_comment: ""
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { hasDesert, ...filteredData } = formData;

    if (!hasDesert) {
      filteredData.desert_quality = "0";
    }

    fetch("/api/review", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ ...filteredData, lunch_id: id }),
    })
      .then(() => alert("Hodnocení odesláno!"))
      .catch(() => alert("Chyba při odesílání."));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Hodnocení oběda</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Polévka */}
        <div>
          <label className="block">Kvalita polévky:</label>
          <select name="soup_quality" onChange={handleChange} className="border p-2 w-full">
            {[1, 2, 3, 4, 5].map(num => <option key={num} value={num}>{num}</option>)}
          </select>
        </div>
        <div>
          <label className="block">Komentář k polévce:</label>
          <textarea name="soup_comment" onChange={handleChange} className="border p-2 w-full" />
        </div>
        
        {/* Hlavní chod */}
        <div>
          <label className="block">Chuť hlavního jídla:</label>
          <select name="main_taste" onChange={handleChange} className="border p-2 w-full">
            {[1, 2, 3, 4, 5].map(num => <option key={num} value={num}>{num}</option>)}
          </select>
        </div>
        <div>
          <label className="block">Teplota hlavního jídla:</label>
          <select name="main_temperature" onChange={handleChange} className="border p-2 w-full">
            {[1, 2, 3, 4, 5].map(num => <option key={num} value={num}>{num}</option>)}
          </select>
        </div>
        <div>
          <label className="block">Vzhled hlavního jídla:</label>
          <select name="main_look" onChange={handleChange} className="border p-2 w-full">
            {[1, 2, 3, 4, 5].map(num => <option key={num} value={num}>{num}</option>)}
          </select>
        </div>
        <div>
          <label className="block">Velikost porce:</label>
          <select name="main_portion" onChange={handleChange} className="border p-2 w-full">
            {[1, 2, 3, 4, 5].map(num => <option key={num} value={num}>{num}</option>)}
          </select>
        </div>
        <div>
          <label className="block">Komentář k hlavnímu jídlu:</label>
          <textarea name="main_comment" onChange={handleChange} className="border p-2 w-full" />
        </div>

        {/* Dezert */}
        <div>
          <label className="block flex items-center">
            <input type="checkbox" name="hasDesert" onChange={handleChange} className="mr-2" /> Hodnotit dezert?
          </label>
        </div>
        {formData.hasDesert && (
          <>
            <div>
              <label className="block">Kvalita dezertu:</label>
              <select name="desert_quality" onChange={handleChange} className="border p-2 w-full">
                {[1, 2, 3, 4, 5].map(num => <option key={num} value={num}>{num}</option>)}
              </select>
            </div>
            <div>
              <label className="block">Komentář k dezertu:</label>
              <textarea name="desert_comment" onChange={handleChange} className="border p-2 w-full" />
            </div>
          </>
        )}
        
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Odeslat</button>
      </form>
    </div>
  );
};

export default ReviewForm;