import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SimpleCalendar from "./pages/simple-calendar";
import ScrollCalendar from "./pages/scroll-calendar";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/simple-calendar" Component={SimpleCalendar} />
        <Route path="/scroll-calendar" Component={ScrollCalendar} />
        <Route path="*" element={<Navigate to="/simple-calendar" replace />} />
      </Routes>
      <div>
        <a href="/simple-calendar">简单日历</a>
        <a href="/scroll-calendar">滚动日历</a>
      </div>
    </BrowserRouter>
  );
}
