// // src/hooks/useAuth.js
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { apiBase } from '../utils/api';

// export const useAuth = () => {
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const login = async (email, password) => {
//     try {
//       const response = await fetch(`${apiBase}/users`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email, password }),
//       });

//       if (!response.ok) throw new Error('Login failed');

//       const userData = await response.json();
//       localStorage.setItem('token', userData.token);
//       navigate('/dashboard');
//     } catch (err) {
//       console.error(err);
//       setError('Invalid credentials or server error');
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem('user');
//     navigate('/login');
//   };

//   const getUser = () => {
//     const user = localStorage.getItem('user');
//     return user ? JSON.parse(user) : null;
//   };

//   return { login, logout, getUser, error };
// };


//15/09/2025
// src/hooks/useAuth.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiBase } from '../utils/api';

export const useAuth = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // src/hooks/useAuth.js
const login = async (email, password) => {
  try {
    const response = await fetch(`${apiBase}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    console.log("status: ", response.status); // ✅ debug

    if (!response.ok) throw new Error('Login failed');

    const userData = await response.json();
    console.log("response body: ", userData); // ✅ debug

  
    console.log("user : ", userData.user);
    console.log("token : ", userData.token);

    navigate('/dashboard');
  } catch (err) {
    console.error("login error: ", err);
    setError('Invalid credentials or server error');
  }
};


  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  }

  const getUser = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  };

  const setUser = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
  };

  return { login, logout, getUser,setUser, error };
};

  return { login, logout, getUser, getToken, error };
}