import React from "react";
import Field from "../components/Field";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";

const SignUp = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const role = searchParams.get("role");

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
   const [generatedUsername, setGeneratedUsername] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/api/auth/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: formData.full_name,
          email: formData.email,
          password: formData.password,
          role: role,
        }),
      });

      const data = await response.json();
      console.log("Response:", data);

      if (response.ok) {
        setGeneratedUsername(data.username); // Save username from backend
        setShowModal(true); // Show modal

          if (data.access) {
          localStorage.setItem("accessToken", data.access);
          localStorage.setItem("refreshToken", data.refresh);
        }

      } else {
        setError(data.detail || "Signup failed");
      }
    } catch (err) {
      console.error("Error signing up:", err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="relative min-w-screen h-screen ">
      <div
        className="absolute inset-0 bg-no-repeat bg-cover"
        style={{
          backgroundImage: "url('/SignUp BgPic2.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "1% 10%",
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to left, rgba(0, 0, 0, 0.8) 45%, transparent 100%)",
        }}
      />

      <div className="relative z-10 flex justify-end items-center h-full px-28">
        <div className="text-white max-w-md">
          <h2 className="text-5xl font-bold mb-4 text-center text-trashGreen">
            Sign Up
          </h2>
          <p className="mb-10 text-center">
            Sign up to create an account as a <strong>{role}</strong>
          </p>

          {error && <p className="text-red-500 text-center mb-2">{error}</p>}

          <form className="space-y-6" onSubmit={handleSignup}> 
            <Field
              type="text"
              name="full_name"
              placeholder="Full Name"
              value={formData.full_name}
              onChange={handleChange}
              required
            />
            <Field
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <Field
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <Field
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <div className="items-center justify-center flex">
              <button
                type="submit"
                className="w-[130px] bg-green-500 py-2 rounded-lg hover:bg-green-900 mt-4"
              >
                Sign Up
              </button>
            </div>
          </form>

          <p className="mt-4 text-sm text-center">
            Already have an account?{" "}
            <span className="underline cursor-pointer text-trashGreen"
            onClick={() => navigate("/login?role=customer")}>
              Login
            </span>
          </p>
        </div>
      </div>

      {/* Success Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-sm w-full">
            <h2 className="text-2xl font-bold text-trashGreen mb-4">
              🎉Signup Successful!
            </h2>
            <p className="mb-4 text-trashBlue">
              Welcome, <strong>{formData.full_name}</strong>!
            </p>
            <p className=" text-trashBlue">Your username is:</p>
            <p className="font-mono text-lg text-trashBlue mb-4">
              {generatedUsername}
            </p>
            <button
              className="bg-trashGreen text-white py-2 px-4 rounded hover:bg-green-800"
              onClick={() => {
                if (role === "customer") {
                  navigate("/dashboard/customer");
                } else if (role === "collector") {
                  navigate("/dashboard/collector");
                }
              }}
            >
              Continue to Dashboard
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
export default SignUp;
