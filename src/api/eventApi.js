const BASE_URL = "http://localhost:8080/api/events"; // Adjust if needed

export const checkGiftUniqueness = async (eventId, gift) => {
  try {
    const response = await fetch(`${BASE_URL}/${eventId}/attendees/check-gift?gift=${encodeURIComponent(gift)}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error("Failed to check gift uniqueness");
    }

    const data = await response.json();
    return data.isUnique; // Expecting backend to return { "isUnique": true/false }
  } catch (error) {
    console.error("Error checking gift uniqueness:", error);
    return false;
  }
};


export const submitAttendee = async (eventId, name, numOfAttendees, gift) => {
  try {
    const response = await fetch(`${BASE_URL}/${eventId}/attendees`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ attendeeName: name, numOfAttendees, gift }),
    });

    return response.ok ? "RSVP submitted successfully!" : "Error submitting RSVP.";
  } catch (error) {
    console.error("Error submitting attendee:", error);
    return "Error submitting RSVP.";
  }
};
