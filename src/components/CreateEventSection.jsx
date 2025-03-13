import { useState } from "react";
import { v4 as uuidv4 } from "uuid"; // Import UUID for unique ID generation

const CreateEventSection = () => {
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventId, setEventId] = useState(null); // Stores the generated event ID

  const handleSubmit = (e) => {
    e.preventDefault();

    // Generate unique event ID
    const newEventId = uuidv4();
    setEventId(newEventId);

    // Here, you can also send event data to a backend for storage
    console.log({
      eventId: newEventId,
      eventName,
      eventDate,
      eventDescription,
    });
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-8 bg-white shadow-lg rounded-lg border border-gray-200">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Create Your Event</h2>

      {!eventId ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">Event Name</label>
            <input
              type="text"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              required
              className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none"
              placeholder="Enter event name"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Event Date</label>
            <input
              type="date"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              required
              className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Event Description</label>
            <textarea
              value={eventDescription}
              onChange={(e) => setEventDescription(e.target.value)}
              required
              className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none"
              placeholder="Describe your event"
              rows={4}
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-purple-700 text-white p-3 rounded-md text-lg hover:bg-purple-800 transition-all"
          >
            Submit Event
          </button>
        </form>
      ) : (
        <div className="text-center">
          <h3 className="text-2xl font-semibold text-gray-800">Your Event is Created!</h3>
          <p className="text-gray-600 mt-2">Share this link with your attendees:</p>
          <div className="bg-gray-100 p-3 rounded-md mt-4 text-purple-700 font-medium">
            {window.location.origin}/event/{eventId}
          </div>
          <button
            className="mt-4 bg-purple-700 text-white px-6 py-2 rounded-md text-lg hover:bg-purple-800 transition-all"
            onClick={() => navigator.clipboard.writeText(`${window.location.origin}/event/${eventId}`)}
          >
            Copy Link
          </button>
        </div>
      )}
    </div>
  );
};

export default CreateEventSection;
