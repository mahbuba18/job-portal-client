import axios from "axios";
import React, { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

const JobCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  // console.log("Categories:", categories);

  useEffect(() => {
    axios
      .get("http://localhost:5000/categories")
      .then((res) => {
        // console.log("API Response:", res.data);
        setCategories(res.data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
    setLoading(false);
  }, []);

//for loading
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="#36d7b7" size={50} />
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-600">
      <h2 className="text-3xl font-bold mb-6 text-center text-white">
        Explore Job Categories
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="bg-purple-600 rounded-xl shadow hover:shadow-lg overflow-hidden transition"
          >
            <img
              src={cat.image_url}
              alt={cat.name}
              className="h-40 w-full object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-center">{cat.name}</h3>
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobCategories;
