import Lottie from "lottie-react";
import React, { useContext } from "react";
import loginLottieJSON from "../../assets/Lotti/login.json";
import AuthContext from "../../context/AuthContext/AuthContext";
import SocialLogin from "../shared/SocialLogin";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { LuLogIn } from "react-icons/lu";
import Swal from "sweetalert2";

const SignIn = () => {
  const { signInUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
 
  const from = location.state?.from || null;
  console.log(from);

  const handleSignIn = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signInUser(email, password)
      .then((result) => {
        const loggedUser = result.user;

        loggedUser.getIdToken().then((token) => {
          localStorage.setItem("token", token);

          Swal.fire({
            icon: "success",
            title: "Successfully logged in",
            showConfirmButton: false,
            timer: 1500,
          });

          navigate(from ? from:'/'); 
        });
      })
      .catch((error) => {
        const errorMessage =
          error.message || "An error occurred. Please try again.";
        toast.error(errorMessage);
      });
  };

  return (
    <div className="hero bg-base-200 min-h-screen lg:py-20">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left w-96">
          <Lottie animationData={loginLottieJSON}></Lottie>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <h1 className="ml-8 mt-4 text-5xl font-bold">Login now!</h1>
          <form onSubmit={handleSignIn} className="card-body">
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
              <button className="btn bg-gradient-to-r from-blue-500 to-purple-500 w-full">
                <LuLogIn />
                SignIn
              </button>
            </div>
          </form>
          <SocialLogin from={from} />
          <div>
            <p className="text-center m-4">
              Do not have an account?{" "}
              <Link className="text-blue-600 font-bold" to="/register">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
