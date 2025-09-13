import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const EditJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:5000/categories");
        setCategories(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCategories();
  }, []);

  // Fetch job details
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/jobs/${id}`);
        setJob(res.data);
      } catch (err) {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to fetch job details.",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJob((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/jobs/${id}`, job);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Job updated successfully!",
        timer: 1500,
        showConfirmButton: false,
      });
      navigate("/findJobs"); 
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Failed to update job.",
      });
    }
  };

  if (loading || !job)
    return (
      <p className="text-center mt-10 text-gray-500 text-lg">Loading...</p>
    );

  return (
    <div className="max-w-lg mx-auto mt-10 mb-5 p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4 text-black text-center">
        Edit Job
      </h2>

      <form onSubmit={handleUpdate} className="space-y-4">
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

        <button type="submit" className="btn btn-primary border-0 w-full bg-gradient-to-r from-blue-500 to-purple-500">
          Update Job
        </button>
      </form>
    </div>
  );
};

export default EditJob;
