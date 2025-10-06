import { useState } from "react";
import CreateEventSection from "./CreateEventSection";

const HeroSection = () => {
  const [showCreateEvent, setShowCreateEvent] = useState(false);

  return (
    <section id="hero" className="w-full text-center py-20 bg-purple-100">
      <div className="max-w-4xl mx-auto px-8">
        <h1 className="text-5xl font-bold text-gray-800 leading-tight">
          Make Your Event Gifts <span className="text-purple-700">Unique</span>
        </h1>
        <p className="text-gray-600 mt-6 text-lg">
          Coordinate gifts effortlessly. Ensure every present is special and avoid duplicates with our smart RSVP system.
        </p>
        <button id="create-event"
          className="mt-8 bg-purple-700 text-white px-6 py-3 rounded-md text-lg hover:bg-purple-800 transition-all"
          onClick={() => setShowCreateEvent(!showCreateEvent)}
        >
          {showCreateEvent ? "Hide Event Form" : "Create Your Event"}
        </button>
      </div>

      {/* Render the CreateEventSection if showCreateEvent is true */}
      {showCreateEvent && <CreateEventSection />}
    </section>
  );
};

export default HeroSection;
