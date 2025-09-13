import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Field from "../components/Field";


const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login form submitted");

    console.log("Sending:", formData);

    try {
      const response = await fetch("http://localhost:8000/api/auth/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
 
      
     console.log("Response received:", response.status); 

      if (response.ok) {
        const data = await response.json();
         console.log("Login successful:", data);

        localStorage.setItem("accesstoken", data.access); // Store JWT token
        localStorage.setItem("refreshToken", data.refresh)

        // Store role if your backend returns it
        if (data.role === "customer") {
          navigate("/dashboard/customer");
        } else if (data.role === "collector") {
          navigate("/dashboard/collector");
        } else {
          navigate("/dashboard");
        }
      } else {
        const data = await response.json();
        console.log("Login error data:", data)
        setError(data.detail || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="relative min-w-screen h-screen">
      <div
        className="absolute inset-0 bg-no-repeat bg-cover"
        style={{
          backgroundImage: "url('/Login Bgpic .jpg')",
          backgroundSize: "cover",
          backgroundPosition: "right 10%",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, rgba(0, 0, 0, 0.8) 45%, transparent 100%)",
        }}
      />
      <div className="relative z-10 flex justify-start items-center h-full px-20">
        <div className="text-white max-w-md">
          <h2 className="text-5xl font-bold mb-4 text-trashGreen text-center">
            Login
          </h2>
          <p className="mb-20 text-center">Welcome back! Log in to continue.</p>

          {error && <p className="text-red-500 text-center mb-2">{error}</p>}

          <form className="space-y-8" onSubmit={handleLogin}>
            <Field
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
              className="h-[52px]"
            />
            <Field
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="h-[52px]"
            />
            <div className="items-center justify-center flex">
              <button
                type="submit"
                className="w-[130px] bg-green-500 py-2 rounded-lg hover:bg-green-900 mt-12"
              >
                Login
              </button>
            </div>
          </form>
          <p className="mt-4 text-sm text-center">
            Don’t have an account?{" "}
            <span
              className="underline cursor-pointer text-trashGreen"
              onClick={() => navigate("/signup?role=customer")}
            >
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
