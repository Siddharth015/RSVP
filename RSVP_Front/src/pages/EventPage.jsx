import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; //  Import useNavigate

const EventPage = () => {
  const { eventId } = useParams(); //  Ensure correct parameter name
  const navigate = useNavigate(); // Get navigation function
  const [name, setName] = useState("");
  const [numAttendees, setNumAttendees] = useState(1);
  const [gift, setGift] = useState("");
  const [isGiftUnique, setIsGiftUnique] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [uniquenessMsg, setUniquenessMsg] = useState("");

  // Dropdown-related state
  const [giftOptions, setGiftOptions] = useState([]);
  const [selectedGiftLabel, setSelectedGiftLabel] = useState("");
  const [otherGift, setOtherGift] = useState("");

  const API_BASE = import.meta.env.VITE_API_BASE;

  if (!API_BASE) {
    console.error("VITE_API_BASE is not configured. Please set it to your Render API base.");
  }

  // Load gift options for dropdown
  useEffect(() => {
    if (!eventId) return;
    const fetchOptions = async () => {
      try {
        const res = await fetch(`${API_BASE}/${eventId}/gift-options`);
        if (res.ok) {
          const data = await res.json();
          setGiftOptions(data || []);
        }
      } catch (e) {
        // noop: in local dev without backend this may 404; keep form usable
      }
    };
    fetchOptions();
  }, [eventId]);

  // Keep `gift` in sync with dropdown selection and Other input
  useEffect(() => {
    if (selectedGiftLabel === "Other") {
      setGift(otherGift);
    } else {
      setGift(selectedGiftLabel);
    }
    // reset uniqueness state on change
    setIsGiftUnique(null);
    setUniquenessMsg("");
    setErrorMessage("");
  }, [selectedGiftLabel, otherGift]);

  // ✅ Check gift uniqueness
  const checkGiftUniqueness = async () => {
    if (!eventId || !gift) {
      setErrorMessage("Event ID or gift is missing!");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch(`${API_BASE}/${eventId}/attendees/check-gift?gift=${encodeURIComponent(gift)}`);
      const data = await response.json();
      setIsGiftUnique(data.isUnique);
      setUniquenessMsg(data.isUnique ? "This gift is available." : "This gift has already been taken.");
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
      const finalGift = selectedGiftLabel === "Other" ? otherGift : selectedGiftLabel || gift;
      const response = await fetch(`${API_BASE}/${eventId}/attendees`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ attendeeName: name, numAttendees, gift: finalGift }),
      });

      if (response.ok) {
        console.log("RSVP successful! Redirecting..."); // ✅ Debugging Log
        navigate("/thank-you"); // Redirect
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
          {/* Dropdown */}
          <select
            value={selectedGiftLabel}
            onChange={(e) => setSelectedGiftLabel(e.target.value)}
            className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none"
          >
            <option value="">Select a gift</option>
            {giftOptions.map((opt) => (
              <option key={opt.id} value={opt.label}>{opt.label}</option>
            ))}
            <option value="Other">Other</option>
          </select>

          {/* Other input */}
          {selectedGiftLabel === "Other" && (
            <input
              type="text"
              value={otherGift}
              onChange={(e) => setOtherGift(e.target.value)}
              required
              className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none"
              placeholder="Enter your gift"
            />
          )}

          {/* Uniqueness check and inline message */}
          <div className="mt-2 flex items-center gap-3">
            <button
              type="button"
              onClick={checkGiftUniqueness}
              className="bg-purple-700 text-white px-4 py-2 rounded-md hover:bg-purple-800 transition-all"
              disabled={loading || !(selectedGiftLabel || otherGift)}
            >
              {loading ? "Checking..." : "Check Uniqueness"}
            </button>
            {isGiftUnique !== null && (
              <span className={isGiftUnique ? "text-green-600" : "text-red-600"}>
                {uniquenessMsg}
              </span>
            )}
          </div>
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
