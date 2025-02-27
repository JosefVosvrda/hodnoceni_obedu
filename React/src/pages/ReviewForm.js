import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ReviewForm = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    soup_quality: "",
    main_taste: "",
    main_temperature: "",
    main_look: "",
    main_portion: "",
    desert_quality: "",
    soup_comment: "",
    main_comment: "",
    desert_comment: "",
    hasDesert: false,
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
    axios.post("http://s-scrum-c4a-1.dev.spsejecna.net/review", { ...formData, lunch_id: id }, { withCredentials: true })
      .then(() => alert("Hodnocení odesláno!"))
      .catch(() => alert("Chyba při odesílání."));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Hodnocení oběda</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block">Kvalita polévky:</label>
          <select name="soup_quality" onChange={handleChange} className="border p-2 w-full">
            <option value="">Vyberte...</option>
            {[1, 2, 3, 4, 5].map(num => <option key={num} value={num}>{num}</option>)}
          </select>
        </div>
        <div>
          <label className="block">Komentář k polévce:</label>
          <textarea name="soup_comment" onChange={handleChange} className="border p-2 w-full" />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Odeslat</button>
      </form>
    </div>
  );
};

export default ReviewForm;