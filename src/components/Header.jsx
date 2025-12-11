import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("name");
    const email = localStorage.getItem("email");

    if (token && name) {
      setUser({ name, email });
    } else {
      setUser(null);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    setUser(null);
    window.location.href = "/";
  };

  return (
    <header className="bg-blue-950 p-4 flex justify-between items-center">
      <Link to="/" className="text-white text-2xl font-semibold hover:opacity-80">
        My App
      </Link>

      {user ? (
        <button
          onClick={handleLogout}
          className="bg-white text-blue-950 px-4 py-2 rounded hover:bg-gray-200"
        >
          Logout
        </button>
      ) : (
        <div className="space-x-2">
          <Link
            to="/signup"
            className="bg-white text-blue-950 px-4 py-2 rounded hover:bg-gray-200 inline-block"
          >
            Sign Up
          </Link>

          <Link
            to="/signin"
            className="bg-white text-blue-950 px-4 py-2 rounded hover:bg-gray-200 inline-block"
          >
            Sign In
          </Link>
        </div>
      )}
    </header>
  );
}
