import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // ✅ Import useNavigate

const EventPage = () => {
  const { eventId } = useParams(); // ✅ Ensure correct parameter name
  const navigate = useNavigate(); // ✅ Get navigation function
  const [name, setName] = useState("");
  const [numAttendees, setNumAttendees] = useState(1);
  const [gift, setGift] = useState("");
  const [isGiftUnique, setIsGiftUnique] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // ✅ Check gift uniqueness
  const checkGiftUniqueness = async () => {
    if (!eventId || !gift) {
      setErrorMessage("Event ID or gift is missing!");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch(`http://localhost:8080/api/events/${eventId}/attendees/check-gift?gift=${encodeURIComponent(gift)}`);
      const data = await response.json();
      setIsGiftUnique(data.isUnique);
      if (!data.isUnique) {
        setErrorMessage("This gift has already been taken! Please choose a different one.");
      }
    } catch (error) {
      setErrorMessage("Error checking gift uniqueness. Try again.");
    }

    setLoading(false);
  };

  // ✅ Submit form and redirect
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isGiftUnique) return;

    try {
      const response = await fetch(`http://localhost:8080/api/events/${eventId}/attendees`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ attendeeName: name, numAttendees, gift }),
      });

      if (response.ok) {
        console.log("RSVP successful! Redirecting..."); // ✅ Debugging Log
        navigate("/thank-you"); // ✅ Redirect
      } else {
        setErrorMessage("Error submitting RSVP. Please try again.");
      }
    } catch (error) {
      setErrorMessage("Error submitting form. Please try again.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-8 bg-white shadow-lg rounded-lg border border-gray-200">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium">Your Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none"
            placeholder="Enter your name"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Number of Attendees (Including You)</label>
          <input
            type="number"
            value={numAttendees}
            onChange={(e) => setNumAttendees(e.target.value)}
            min="1"
            required
            className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Gift You Plan to Bring</label>
          <input
            type="text"
            value={gift}
            onChange={(e) => setGift(e.target.value)}
            required
            className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none"
            placeholder="Enter gift name"
          />
          <button
            type="button"
            onClick={checkGiftUniqueness}
            className="mt-2 bg-purple-700 text-white px-4 py-2 rounded-md hover:bg-purple-800 transition-all"
            disabled={loading}
          >
            {loading ? "Checking..." : "Check Uniqueness"}
          </button>
        </div>

        {errorMessage && <p className="text-red-500">{errorMessage}</p>}

        <button
          type="submit"
          className="w-full bg-purple-700 text-white p-3 rounded-md text-lg hover:bg-purple-800 transition-all"
          disabled={!isGiftUnique}
        >
          Submit RSVP
        </button>
      </form>
    </div>
  );
};

export default EventPage;
