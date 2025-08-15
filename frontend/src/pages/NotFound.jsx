import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-white text-center px-4">
      <h1 className="text-6xl font-extrabold text-red-700 mb-4">404</h1>
      <p className="text-lg text-gray-700 mb-6">Oops! The page you're looking for doesn't exist.</p>
      <Link
        to="/"
        className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold px-5 py-2 rounded-md transition"
      >
        ← Go back to Dashboard
      </Link>
    </div>
  );
};

export default NotFound;
