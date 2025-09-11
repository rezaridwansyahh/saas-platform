// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { apiBase } from "../utils/api";
// import { useTheme } from "../context/ThemeContext"; // import theme

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const { theme, updateTheme } = useTheme(); // ✅ get updater too

//   // Get subdomain as tenant name
//   const hostname = window.location.hostname;
//   const tenant = hostname.split(".")[0];

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");

//     if (!email || !password) {
//       setError("Please enter both email and password.");
//       return;
//     }

//     setLoading(true);

//     try {
//       const response = await fetch(`${apiBase}/login`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email, password }),
//       });

//       let data = {};
//       const text = await response.text();

//       if (text) {
//         try {
//           data = JSON.parse(text);
//         } catch (jsonErr) {
//           throw new Error("Invalid server response");
//         }
//       }

//       if (!response.ok || !data.token) {
//         throw new Error(data.message || "Login failed");
//       }

//       // ✅ Save stuff to localStorage
//       localStorage.setItem("token", data.token);
//       localStorage.setItem("user", JSON.stringify(data.user || {}));
//       localStorage.setItem("company", data.company || "");

//       // ✅ Update theme immediately (if backend sends theme)
//       if (data.companyTheme) {
//         updateTheme(data.companyTheme); // e.g. "red", "blue", "green"
//       }

//       navigate("/dashboard");
//     } catch (err) {
//       console.error("Login error:", err);
//       setError(err.message || "Invalid credentials or server error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
//       <form
//         onSubmit={handleLogin}
//         className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm"
//       >
//         <h2
//           className="text-2xl font-bold mb-6 text-center"
//           style={{ color: theme }}
//         >
//           Login to {tenant.toUpperCase()}
//         </h2>

//         {error && (
//           <p className="text-sm mb-4" style={{ color: theme }}>
//             {error}
//           </p>
//         )}

//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="w-full mb-4 p-3 border rounded-md focus:outline-none"
//           style={{ borderColor: theme }}
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="w-full mb-6 p-3 border rounded-md focus:outline-none"
//           style={{ borderColor: theme }}
//         />

//         <button
//           type="submit"
//           className="w-full text-white font-semibold py-2 rounded-md transition disabled:opacity-50"
//           style={{ backgroundColor: theme }}
//           disabled={loading}
//         >
//           {loading ? "Logging in..." : "Login"}
//         </button>

//         <p className="text-center mt-4 text-sm text-gray-600">
//           Don't have an account?{" "}
//           <Link
//             to="/register"
//             className="hover:underline"
//             style={{ color: theme }}
//           >
//             Register here
//           </Link>
//         </p>
//       </form>
//     </div>
//   );
// };  

// export default Login;


import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { apiBase } from "../utils/api";
import { useTheme } from "../context/ThemeContext"; 
import { useAuth } from "../context/AuthContext"; // ✅ use AuthContext

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { login } = useAuth(); // ✅ get login function

  const hostname = window.location.hostname;
  const tenant = hostname.split(".")[0];

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${apiBase}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      
      let data = {};
      const text = await response.text();

      if (text) {
        try {
          data = JSON.parse(text);
        } catch {
          throw new Error("Invalid server response");
        }
      }

      if (!response.ok || !data.token) {
        throw new Error(data.message || "Login failed");
      }

      // ✅ Save token separately
      localStorage.setItem("token", data.token);
      console.log('token : ' , data.token)

      // ✅ Use AuthContext login to save user + company + theme
      login(data.user, data.company);

      console.log('user : ', data.user)
      console.log('email : ', data.company)

      navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message || "Invalid credentials or server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm"
      >
        <h2
          className="text-2xl font-bold mb-6 text-center"
          style={{ color: theme }}
        >
          Login to {tenant.toUpperCase()}
        </h2>

        {error && (
          <p className="text-sm mb-4" style={{ color: theme }}>
            {error}
          </p>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 p-3 border rounded-md focus:outline-none"
          style={{ borderColor: theme }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 p-3 border rounded-md focus:outline-none"
          style={{ borderColor: theme }}
        />

        <button
          type="submit"
          className="w-full text-white font-semibold py-2 rounded-md transition disabled:opacity-50"
          style={{ backgroundColor: theme }}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center mt-4 text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="hover:underline"
            style={{ color: theme }}
          >
            Register here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
