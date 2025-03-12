import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-purple-700 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-white">🎁 GiftRSVP</Link>
        <div className="space-x-6">
          <Link to="/" className="text-white hover:underline">How It Works</Link>
          <Link to="/" className="text-white hover:underline">Create Event</Link>
          <Link to="/" className="text-white hover:underline">Gift Ideas</Link>
        </div>
        <div>
          <button className="bg-white text-purple-700 px-4 py-2 rounded-md hover:bg-purple-100">
            Sign In
          </button>
          <button className="bg-purple-900 text-white px-4 py-2 ml-2 rounded-md hover:bg-purple-800">
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
