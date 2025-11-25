import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../features/auth/auth_thunks";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, token } = useSelector((s) => s.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user && token) navigate("/");
  }, [user, token, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }))
      .unwrap()
      .then(() => {
        toast.success("Login successful");
      })
      .catch((err) => {
        console.log("Login error:", err);
        toast.error(err || "Login failed");
      });
  };

  return (
    <div className="auth-box">
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
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
          {loading ? "Logging..." : "Login"}
        </button>
      </form>

      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}
