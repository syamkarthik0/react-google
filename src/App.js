import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api",
  withCredentials: true,
});

const GOOGLE_CLIENT_ID =
  "746656202102-5p44klkpb5nqh5sa51e7hsviiah8352s.apps.googleusercontent.com";

function Home() {
  const [user, setUser] = useState(null);
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetchUser();
    const urlParams = new URLSearchParams(location.search);
    const code = urlParams.get("code");
    if (code) {
      handleOAuth2Redirect(code);
    }
  }, [location]);

  const fetchUser = async () => {
    try {
      const response = await axiosInstance.get("/auth/user");
      if (response.data.authenticated) {
        setUser(response.data);
        fetchPopularMovies();
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      setError("Failed to fetch user information.");
    }
  };

  const handleOAuth2Redirect = async (code) => {
    try {
      const response = await axiosInstance.get(
        `/login/oauth2/code/google?code=${code}`
      );
      if (response.data.authenticated) {
        setUser(response.data);
        fetchPopularMovies();
        navigate("/"); // Clear the URL parameters
      }
    } catch (error) {
      console.error("Error handling OAuth2 redirect:", error);
      setError("Failed to complete login. Please try again.");
    }
  };

  const handleLoginSuccess = (credentialResponse) => {
    console.log("Google OAuth success:", credentialResponse);
    window.location.href = `${axiosInstance.defaults.baseURL}/oauth2/authorization/google`;
  };

  const handleLoginError = () => {
    console.error("Login Failed");
    setError("Login failed. Please try again.");
  };

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/logout");
      setUser(null);
      setMovies([]);
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
      setError("Logout failed. Please try again.");
    }
  };

  const fetchPopularMovies = async () => {
    try {
      const response = await axiosInstance.get("/movies/popular");
      setMovies(response.data);
    } catch (error) {
      console.error("Error fetching movies:", error);
      setError("Failed to load movies. Please try again later.");
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Welcome, {user ? user.name : "Guest"}!</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!user ? (
        <GoogleLogin
          onSuccess={handleLoginSuccess}
          onError={handleLoginError}
          cookiePolicy={"single_host_origin"}
        />
      ) : (
        <button onClick={handleLogout}>Logout</button>
      )}

      {user && (
        <>
          <h2>Popular Movies</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
            {movies.length > 0 ? (
              movies.map((movie) => (
                <div
                  key={movie.id}
                  style={{
                    backgroundColor: "#fff",
                    border: "1px solid #ddd",
                    borderRadius: "10px",
                    width: "200px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    overflow: "hidden",
                    textAlign: "center",
                  }}
                >
                  <img
                    src={movie.posterUrl}
                    alt={movie.title}
                    style={{
                      width: "100%",
                      height: "300px",
                      objectFit: "cover",
                    }}
                  />
                  <div style={{ padding: "15px" }}>
                    <h3 style={{ fontSize: "18px", margin: "10px 0" }}>
                      {movie.title}
                    </h3>
                    <p>Genre: {movie.genre}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>No movies to display</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}

function LoginSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/");
  }, [navigate]);

  return <div>Login Successful. Redirecting...</div>;
}

function App() {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login-success" element={<LoginSuccess />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
