import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

const AddJob = () => {
  const [job, setJob] = useState({
    title: "",
    company: "",
    location: "",
    salary_range: "",
    description: "",
    category_id: "",
    image_url: "",
  });

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch job categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("http://localhost:5000/categories");
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJob((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!job.category_id) {
      Swal.fire({
        icon: "warning",
        title: "Please select a category.",
      });
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(job),
      });

      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "Job added successfully!",
          showConfirmButton: false,
          timer: 1500,
        });

        setJob({
          title: "",
          company: "",
          location: "",
          salary_range: "",
          description: "",
          category_id: "",
          image_url: "",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed to upload job.",
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error uploading job.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 mb-5 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4 text-black text-center">
        Add a New Job
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Job Title"
          value={job.title}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />
        <input
          type="text"
          name="company"
          placeholder="Company Name"
          value={job.company}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={job.location}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />
        <input
          type="text"
          name="salary_range"
          placeholder="Salary Range"
          value={job.salary_range}
          onChange={handleChange}
          className="input input-bordered w-full"
        />
        <input
          type="text"
          name="image_url"
          placeholder="Image URL (optional)"
          value={job.image_url}
          onChange={handleChange}
          className="input input-bordered w-full"
        />
        <textarea
          name="description"
          placeholder="Job Description"
          value={job.description}
          onChange={handleChange}
          className="textarea textarea-bordered w-full"
          rows={4}
          required
        />
        <select
          name="category_id"
          value={job.category_id}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className={`btn border-0 bg-gradient-to-r from-blue-500 to-purple-500 w-full ${loading ? "loading" : ""}`}
          disabled={loading}
        >
          {loading ? "Uploading..." : "Add Job"}
        </button>
      </form>
    </div>
  );
};

export default AddJob;
