import { Link, useLocation } from "react-router-dom";

const scrollToId = (id) => {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

const Navbar = () => {
  const location = useLocation();

  const handleHomeNavigate = async (anchorId, afterNavigate) => {
    if (location.pathname !== "/") {
      // Navigate to home first, then scroll after paint
      window.location.href = `/${anchorId ? "#" + anchorId : ""}`;
      return;
    }
    if (afterNavigate) afterNavigate();
    if (anchorId) scrollToId(anchorId);
  };

  const handleHowItWorks = () => handleHomeNavigate("how-it-works");
  const handleCreateEvent = () => handleHomeNavigate("hero", () => {
    // Try to click the create event toggle if present to reveal the form
    const btn = document.getElementById("create-event");
    if (btn && btn.click) btn.click();
  });
  const handleGiftSuggestions = () => handleHomeNavigate("gift-suggestions");

  return (
    <nav className="bg-purple-700 text-white p-4 shadow-md">
      <div className="container mx-auto grid grid-cols-3 items-center">
        <div className="justify-self-start">
          <Link to="/" className="text-2xl font-bold text-white">🎁 GiftRSVP</Link>
        </div>
        <div className="space-x-6 justify-self-center">
          <button onClick={handleHowItWorks} className="text-white hover:underline bg-transparent border-0 p-0">How It Works</button>
          <button onClick={handleCreateEvent} className="text-white hover:underline bg-transparent border-0 p-0">Create Event</button>
          <button onClick={handleGiftSuggestions} className="text-white hover:underline bg-transparent border-0 p-0">Suggest Gifts</button>
        </div>
        <div className="justify-self-end" />
      </div>
    </nav>
  );
};

export default Navbar;
