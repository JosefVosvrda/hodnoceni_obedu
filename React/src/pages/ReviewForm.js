import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";

const ReviewForm = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    soup_quality: "1",
    soup_comment: "",
    main_taste: "1",
    main_temperature: "1",
    main_look: "1",
    main_portion: "1",
    main_comment: "",
    hasDesert: false,
    desert_quality: "1",
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
      body: JSON.stringify({ ...filteredData, lunch_id: id })
    })
    
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-5xl font-bold mb-4 text-center">Hodnocení oběda</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Polévka */}
        <h2 className="text-2xl font-bold mb-4">Polévka</h2>
        <div className="block p-4 bg-white shadow-md rounded-s space-y-4">
          <div>
            <label className="block">Kvalita polévky:</label>
            <select name="soup_quality" onChange={handleChange} className="border p-2">
                <option value="1">1 - skvělý</option>
                <option value="2">2 - chvalitebný</option>
                <option value="3">3 - dobrý</option>
                <option value="4">4 - dostatečný</option>
                <option value="5">5 - nedostatečný</option>
            </select>
          </div>
          <div>
            <label className="block">Komentář k polévce:</label>
            <textarea name="soup_comment" onChange={handleChange} className="border p-2 w-full" />
          </div>
        </div>
        {/* Hlavní chod */}
        <h2 className="text-2xl font-bold mb-4">Hlavní chod</h2>
        <div className="block p-4 bg-white shadow-md rounded-s space-y-4">
        <div>
          <label className="block">Chuť hlavního jídla:</label>
          <select name="main_taste" onChange={handleChange} className="border p-2">
              <option value="1">1 - skvělý</option>
              <option value="2">2 - chvalitebný</option>
              <option value="3">3 - dobrý</option>
              <option value="4">4 - dostatečný</option>
              <option value="5">5 - nedostatečný</option>
          </select>
        </div>
        <div>
          <label className="block">Teplota hlavního jídla:</label>
          <select name="main_temperature" onChange={handleChange} className="border p-2">
              <option value="1">1 - ideální teplota</option>
              <option value="3">3 - spíše studené</option>
              <option value="5">5 - velmi studené</option>
              <option value="3">3 - spíše horké</option>
              <option value="5">5 - velmi horké</option>
          </select>
        </div>
        <div>
          <label className="block">Vzhled hlavního jídla:</label>
          <select name="main_look" onChange={handleChange} className="border p-2">
              <option value="1">1 - skvělý</option>
              <option value="2">2 - chvalitebný</option>
              <option value="3">3 - dobrý</option>
              <option value="4">4 - dostatečný</option>
              <option value="5">5 - nedostatečný</option>
          </select>
        </div>
        <div>
          <label className="block">Velikost porce:</label>
          <select name="main_portion" onChange={handleChange} className="border p-2">
              <option value="1">1 - skvělý</option>
              <option value="2">2 - chvalitebný</option>
              <option value="3">3 - dobrý</option>
              <option value="4">4 - dostatečný</option>
              <option value="5">5 - nedostatečný</option>
          </select>
        </div>
        <div>
          <label className="block">Komentář k hlavnímu jídlu:</label>
          <textarea name="main_comment" onChange={handleChange} className="border p-2 w-full" />
        </div>
        </div>
        {/* Dezert */}
        <div>
          <label className="block flex items-center">
            <input type="checkbox" name="hasDesert" onChange={handleChange} className="mr-2" /> Hodnotit dezert?
          </label>
        </div>
        {formData.hasDesert && (
          <>
          <h2 className="text-2xl font-bold mb-4">Dezert</h2>
          <div className="block p-4 bg-white shadow-md rounded-s space-y-4">
            <div>
              <label className="block">Kvalita dezertu:</label>
              <select name="desert_quality" onChange={handleChange} className="border p-2">
                  <option value="1">1 - skvělý</option>
                  <option value="2">2 - chvalitebný</option>
                  <option value="3">3 - dobrý</option>
                  <option value="4">4 - dostatečný</option>
                  <option value="5">5 - nedostatečný</option>
              </select>
            </div>
            <div>
              <label className="block">Komentář k dezertu:</label>
              <textarea name="desert_comment" onChange={handleChange} className="border p-2 w-full" />
            </div>
            </div>
          </>
        )}
        
        <button type="submit" className="bg-blue-500 text-white p-2 rounded ml-auto mr-auto">Odeslat</button>
      </form>
    </div>
  );
};

export default ReviewForm;