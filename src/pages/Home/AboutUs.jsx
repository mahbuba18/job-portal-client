import React from "react";
import { FaUsers, FaBullseye, FaEye } from "react-icons/fa";

const AboutUs = () => {
  return (
    <div id="about" className="relative max-w-7xl mx-auto px-6 lg:pt-20 py-16 bg-base-200">
      {/* Decorative Pattern */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-50 via-pink-50 to-yellow-50 opacity-70 animate-pulse-slow"></div>

      <h1 className="text-4xl font-extrabold text-center mb-12 bg-gradient-to-r text-white bg-clip-text text-transparent">
        About Us
      </h1>

      <div className="grid gap-12 md:grid-cols-3">
        {/* Who We Are */}
        <div className="p-8 rounded-2xl shadow-xl bg-white border-l-4 border-purple-500 transform hover:-translate-y-2 transition duration-500">
          <div className="flex items-center mb-4 text-purple-500 text-3xl">
            <FaUsers className="mr-3" />
            <h2 className="text-2xl font-semibold">Who We Are</h2>
          </div>
          <p className="text-gray-700">
            JobPortal is a modern platform designed to connect talented professionals 
            with the best career opportunities. We simplify the job search for both job seekers and employers.
          </p>
        </div>

        {/* Our Mission */}
        <div className="p-8 rounded-2xl shadow-xl bg-white border-l-4 border-yellow-500 transform hover:-translate-y-2 transition duration-500">
          <div className="flex items-center mb-4 text-yellow-500 text-3xl">
            <FaBullseye className="mr-3" />
            <h2 className="text-2xl font-semibold">Our Mission</h2>
          </div>
          <p className="text-gray-700">
            Our mission is to empower individuals to achieve their career goals 
            by providing a seamless job search experience and insights to make informed decisions.
          </p>
        </div>

        {/* Our Vision */}
        <div className="p-8 rounded-2xl shadow-xl bg-white border-l-4 border-green-500 transform hover:-translate-y-2 transition duration-500">
          <div className="flex items-center mb-4 text-green-500 text-3xl">
            <FaEye className="mr-3" />
            <h2 className="text-2xl font-semibold">Our Vision</h2>
          </div>
          <p className="text-gray-700">
            Our vision is to become the leading job portal in the region, 
            connecting talent with opportunity and helping businesses grow through the right hires.
          </p>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center mt-16">
        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-green-600 bg-clip-text text-transparent">
          Join Us Today!
        </h2>
        <p className="text-white mb-6">
          Whether you’re looking for your dream job or seeking the perfect candidate, JobPortal is here to help.
        </p>
        <a
          href="/addJob"
          className="inline-block px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-xl shadow-lg hover:scale-105 transform transition duration-300"
        >
          Post a Job
        </a>
      </div>
    </div>
  );
};

export default AboutUs;
