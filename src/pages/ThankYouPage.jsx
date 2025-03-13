import { Link } from "react-router-dom";

const ThankYouPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold text-green-600">Thank You!</h1>
        <p className="mt-2 text-gray-700">Your RSVP has been successfully submitted.</p>
        <Link
          to="/"
          className="mt-4 inline-block bg-purple-700 text-white px-6 py-2 rounded-md hover:bg-purple-800 transition-all"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default ThankYouPage;
