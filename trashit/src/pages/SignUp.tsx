import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";

const SignUp = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const role = searchParams.get("role");

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

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
      const response = await fetch("http://localhost:8000/api/auth/signup/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          role: role,
        }),
      });

      console.log("Response:", response);
      if (response.ok) {
        // Redirect based on role
        if (role === "customer") {
          navigate("/dashboard/customer");
        } else if (role === "collector") {
          navigate("/dashboard/collector");
        }
      } else {
        const data = await response.json();
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

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          <form className="space-y-8" onSubmit={handleSignup}>
            <input
              type="text"
              name="username"
              placeholder="Full Name"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded bg-white/20 backdrop-blur text-white placeholder-gray-350 h-[50px]"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded bg-white/20 backdrop-blur text-white placeholder-gray-350 h-[50px]"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded bg-white/20 backdrop-blur text-white placeholder-gray-350 h-[50px]"
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded bg-white/20 backdrop-blur text-white placeholder-gray-350 h-[50px]"
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
            <span className="underline cursor-pointer text-trashGreen">
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};
export default SignUp;
