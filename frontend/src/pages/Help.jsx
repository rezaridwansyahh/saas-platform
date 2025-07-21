// pages/Help.jsx
import { MdEmail, MdHelpOutline, MdLibraryBooks } from "react-icons/md";
import { Link } from "react-router-dom";

const Help = () => {
  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div className="flex items-center gap-3 text-red-700">
        <MdHelpOutline className="text-3xl" />
        <h1 className="text-3xl font-bold">Help & Support</h1>
      </div>

      <p className="text-gray-600">
        Need assistance? We're here to support you.
      </p>

      {/* Contact Support */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex items-center gap-3 text-gray-800 mb-2">
          <MdEmail className="text-2xl text-red-600" />
          <h2 className="text-xl font-semibold">Contact Support</h2>
        </div>
        <p className="text-gray-600">
          Email us at{" "}
          <a
            href="mailto:support@yourcompany.com"
            className="text-red-600 hover:underline font-medium"
          >
            support@yourcompany.com
          </a>{" "}
          and we’ll get back to you within 24 hours.
        </p>
      </div>

      {/* FAQ + Docs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition">
          <div className="flex items-center gap-2 mb-2 text-gray-800">
            <MdLibraryBooks className="text-xl text-red-600" />
            <h3 className="text-lg font-semibold">Documentation</h3>
          </div>
          <p className="text-gray-600 mb-2">Explore guides and setup documentation.</p>
          <a
            href="#"
            className="text-red-600 hover:underline font-medium"
          >
            View Docs →
          </a>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition">
          <div className="flex items-center gap-2 mb-2 text-gray-800">
            <MdHelpOutline className="text-xl text-red-600" />
            <h3 className="text-lg font-semibold">FAQ</h3>
          </div>
          <p className="text-gray-600 mb-2">Find answers to common questions.</p>
          <Link
            to="/faq"
            className="text-red-600 hover:underline font-medium"
          >
            Go to FAQ →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Help;
