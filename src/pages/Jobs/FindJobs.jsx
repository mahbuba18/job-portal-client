import React, { useEffect, useState } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";

const FindJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // fetch jobs from backend
  const fetchJobs = async (searchTerm = "") => {
    setLoading(true);
    try {
      const url = searchTerm
        ? `http://localhost:5000/jobs?search=${searchTerm}`
        : "http://localhost:5000/jobs";

      const res = await axios.get(url);
      setJobs(res.data);
    } catch (err) {
      console.error("Error fetching jobs:", err);
    }
    setLoading(false);
  };

  // load all jobs on mount
  useEffect(() => {
    fetchJobs();
  }, []);

  // handle search
  const handleSearch = (e) => {
    e.preventDefault();
    fetchJobs(search);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="#36d7b7" size={50} />
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-center mb-6">Find Jobs</h1>

      {/* Search Form */}
      <form
        onSubmit={handleSearch}
        className="flex justify-center mb-6 gap-2"
      >
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by title, company, or location..."
          className="input input-bordered w-full max-w-md"
        />
        <button type="submit" className="btn btn-primary">
          Search
        </button>
      </form>

      {/* Job Results */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <div
              key={job.id}
              className="p-4 border rounded-xl shadow-lg hover:shadow-lg transition bg-blue-400"
            >
              <h2 className="text-xl font-semibold">{job.title}</h2>
              <p className="text-gray-600">{job.company}</p>
              <p className="text-sm text-gray-500">{job.location}</p>
              <p className="text-sm font-bold">{job.salary_range}</p>
              <span className="badge mt-2">{job.category}</span>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No jobs found.</p>
        )}
      </div>
    </div>
  );
};

export default FindJobs;
