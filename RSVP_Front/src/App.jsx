import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import EventPage from "./pages/EventPage";
import ThankYouPage from "./pages/ThankYouPage";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/event/:eventId" element={<EventPage />} />
  <Route path="/thank-you" element={<ThankYouPage />} />
  <Route path="/dashboard/:eventId" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
