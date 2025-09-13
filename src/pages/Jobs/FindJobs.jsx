import React, { useEffect, useState } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { useLocation, useNavigate } from "react-router-dom";

const FindJobs = () => {
  const location = useLocation();
  const categoryId = location.state?.categoryId || null;
  // console.log(categoryId);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [seletedCategory, setSeletedCategory] = useState("");
  const [editingJob, setEditingJob] = useState(null);
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Fetch jobs from backend
  const fetchJobs = async () => {
    setLoading(true);
    console.log(seletedCategory);
    try {
      const url = `http://localhost:5000/jobs?search=${search}&category=${seletedCategory}`;
      const res = await axios.get(url);
      setJobs(res.data);
    } catch (err) {
      console.error("Error fetching jobs:", err);
    }
    setLoading(false);
  };

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:5000/categories");
      const _categories = res.data.map((cat) => {
        return { id: cat.id, name: cat.name };
      });

      if (categoryId) {
        const _selectedCategory = _categories.find(
          (cat) => cat.name === categoryId
        );

        setSeletedCategory(_selectedCategory.id);
      }

      setCategories(_categories);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  // Load jobs and categories on mount
  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchJobs();
  }, [search, seletedCategory]);

  // // Handle search
  // const handleSearch = (e) => {
  //   e.preventDefault();
  //   fetchJobs(search);
  // };

  // Delete job
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;
    try {
      await axios.delete(`http://localhost:5000/jobs/${id}`);
      setJobs((prev) => prev.filter((job) => job.id !== id));
      setMessage("Job deleted successfully!");
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.error("Error deleting job:", err);
      setMessage("Failed to delete job.");
    }
  };

  // Handle edit form submit
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:5000/jobs/${editingJob.id}`,
        editingJob
      );
      setJobs((prev) =>
        prev.map((job) => (job.id === res.data.id ? res.data : job))
      );
      setEditingJob(null);
      setMessage("Job updated successfully!");
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.error("Error updating job:", err);
      setMessage("Failed to update job.");
    }
  };

  // if (loading) {
  //   return (
  //     <div className="flex justify-center items-center h-screen">
  //       <ClipLoader color="#36d7b7" size={50} />
  //     </div>
  //   );
  // }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-center mb-6">Find Jobs</h1>

      {message && (
        <p
          className={`mb-4 ${
            message.includes("success") ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}

      {/* Search Form */}
      <form className="flex justify-center mb-6 gap-2">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by title, company, or location..."
          className="input input-bordered border-0 w-full max-w-md"
        />
        <select
          name="category_id"
          value={seletedCategory}
          onChange={(e) => setSeletedCategory(e.target.value)}
          className="input input-bordered border-0 w-full max-w-xs"
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </form>

      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <ClipLoader color="#36d7b7" size={50} />
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <div
                key={job.id}
                className="p-4 border rounded-xl shadow-lg hover:shadow-xl transition bg-gray-600"
              >
                <h2 className="text-xl font-semibold">{job.title}</h2>
                <p className="text-gray-600">{job.company}</p>
                <p className="text-sm text-gray-500">{job.location}</p>
                <p className="text-sm font-bold">{job.salary_range}</p>
                <span className="badge mt-2">{job.category}</span>

                <div className="flex gap-2 mt-3">
                  <button
                    className="btn btn-sm bg-green-500 border-0"
                    onClick={() => navigate(`/edit-job/${job.id}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm bg-red-600 border-0"
                    onClick={() => handleDelete(job.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No jobs found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default FindJobs;
