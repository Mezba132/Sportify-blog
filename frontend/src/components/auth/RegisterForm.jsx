import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../features/auth/auth_thunks";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function RegisterForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((s) => s.auth);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser({ name, email, password }))
      .unwrap()
      .then(() => {
        toast.success("Registration successful! Redirecting to login...");
        setTimeout(() => navigate("/login"), 1500);
      })
      .catch((err) => {
        toast.error(err || "Registration failed");
      });
  };

  return (
    <div className="auth-box">
      <h2>Register</h2>

      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label>Email</label>
        <input
          value={email}
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Password</label>
        <input
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="btn" type="submit" disabled={loading}>
          {loading ? "Creating..." : "Register"}
        </button>
      </form>

      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}
