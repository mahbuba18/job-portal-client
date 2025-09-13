import React, { useContext } from "react";
import AuthContext from "../../context/AuthContext/AuthContext";
import { FcGoogle } from "react-icons/fc";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const SocialLogin = ({from}) => {

  const { signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();

   console.log(from)

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        Swal.fire({
          icon: "success",
          title: "Successfully logged in",
          showConfirmButton: false,
          timer: 1500,
        });
       
        navigate(from ? from : "/");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  return (
    <div className="m-2">
      <div className="divider">OR</div>
      <button onClick={handleGoogleSignIn} className="btn btn-success w-full">
        <FcGoogle className="text-xl" /> Login with Google
      </button>
    </div>
  );
};

export default SocialLogin;
