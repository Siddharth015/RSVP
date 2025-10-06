import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Dashboard = () => {
  const { eventId } = useParams();
  const [count, setCount] = useState(null);
  const [error, setError] = useState("");

  const API_BASE = import.meta.env.VITE_API_BASE;

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${API_BASE}/${eventId}/attendees/count`);
        if (!res.ok) throw new Error(await res.text());
        const data = await res.json();
        setCount(data);
      } catch (e) {
        setError("Failed to load attendee count.");
        console.error(e);
      }
    };
    load();
  }, [eventId]);

  return (
    <div className="max-w-xl mx-auto mt-16 p-8 bg-white shadow rounded">
      <h1 className="text-3xl font-bold mb-4">Event Dashboard</h1>
      <p className="text-gray-600 mb-6">Event ID: {eventId}</p>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      {count === null ? (
        <p>Loading attendee count...</p>
      ) : (
        <div className="text-2xl">Total Attendees (including host entries): <span className="font-semibold">{count}</span></div>
      )}
    </div>
  );
};

export default Dashboard;
