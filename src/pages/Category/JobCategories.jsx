import axios from "axios";
import React, { useEffect, useState } from "react";

const JobCategories = () => {
  const [categories, setCategories] = useState([]);
  console.log("Categories:", categories);

  useEffect(() => {
    axios.get("/categories")
      .then((res) => {
         console.log("API Response:", res.data);
        setCategories(res.data)})
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-8 bg-gray-600">
      <h2 className="text-3xl font-bold mb-6 text-center text-white">
        Explore Job Categories
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <div key={cat.id}className="bg-white rounded-2xl shadow hover:shadow-lg overflow-hidden transition">
            
            <div className="p-4">
              <h3 className="text-lg font-semibold">{cat.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobCategories;
