import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import Swal from "sweetalert2";
import { Link } from "react-router";
import { auth } from "../../firebase/firebase.init"; // only auth

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [photoURL, setPhotoURL] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Password validation
    if (!/[A-Z]/.test(password)) {
      return Swal.fire(
        "Error",
        "Password must contain at least one uppercase letter",
        "error"
      );
    }
    if (!/[a-z]/.test(password)) {
      return Swal.fire(
        "Error",
        "Password must contain at least one lowercase letter",
        "error"
      );
    }
    if (password.length < 6) {
      return Swal.fire("Error", "Password must be at least 6 characters", "error");
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update profile info
      await updateProfile(user, { displayName: name, photoURL: photoURL });

      // Save info to localStorage
      localStorage.setItem("displayName", name);
      localStorage.setItem("email", email);
      localStorage.setItem("photoURL", photoURL);

      Swal.fire("Success", "Registration successful!", "success");
      window.location.href = "/";
    } catch (error) {
      console.error(error.message);
      Swal.fire("Error", error.message, "error");
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      localStorage.setItem("displayName", user.displayName);
      localStorage.setItem("email", user.email);
      localStorage.setItem("photoURL", user.photoURL);

      Swal.fire("Success", "Logged in with Google!", "success");
      window.location.href = "/";
    } catch (err) {
      console.error(err.message);
      Swal.fire("Error", err.message, "error");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Photo URL (optional)"
          value={photoURL}
          onChange={(e) => setPhotoURL(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
        >
          Sign Up
        </button>
      </form>

      <p className="mt-4 text-sm text-center">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-500 hover:underline">
          Login
        </Link>
      </p>

      <div className="mt-4 text-center">
        <button
          onClick={handleGoogleLogin}
          className="w-full bg-red-500 text-white p-2 rounded hover:bg-red-600 transition"
        >
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default Signup;

