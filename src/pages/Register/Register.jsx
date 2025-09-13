import Lottie from "lottie-react";
import React, { useContext } from "react";
import RegisterLottiData from "../../assets/Lotti/register.json";
import toast from "react-hot-toast";
import AuthContext from "../../context/AuthContext/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const { createUser, handleUpdateProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photo = form.photo.value;
    const password = form.password.value;
    console.log(name, email, password, photo);
    // if (
    //     password.length < 6 ||
    //     !/[A-Z]/.test(password) ||
    //     !/[!@#$%^&*()_+{}[\]:;<>,.?~\\-]/.test(password)
    //   ) {
    //     toast.error(
    //       "Password must be at least 6 character & one capital letter & one special character"
    //     );
    //     return;
    //   }
    createUser(email, password)
      .then((result) => {
        handleUpdateProfile(name, photo).then(() => {
          toast.success("User created successfully");
          navigate("/");
        });
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className="hero bg-base-200 min-h-screen lg:py-20">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left w-96">
          <Lottie animationData={RegisterLottiData}></Lottie>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <h1 className="ml-8 mt-4 text-5xl font-bold">Register now!</h1>
          <form onSubmit={handleRegister} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Photo URL</span>
              </label>
              <input
                type="text"
                name="photo"
                placeholder="Enter your photo"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn bg-gradient-to-r from-blue-500 to-purple-500 w-full">Register</button>
            </div>
          </form>
          <p className="text-center m-4">
            Already have an account!!{" "}
            <Link className="text-blue-600 font-bold" to="/signin">
              SignIn
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
