import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import BookingsPage from "./pages/BookingsPage"; // <-- Imported the new page!
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      {/* The Header stays at the top of EVERY page */}
      <Header />
      
      {/* The Routes control what shows up in the middle */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/bookings" element={<BookingsPage />} /> {/* <-- Added the new route! */}
      </Routes>

      {/* The Footer stays at the bottom of EVERY page */}
      <Footer />
    </BrowserRouter>
  );
}

export default App;