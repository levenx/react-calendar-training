import { HashRouter, Routes, Route, Navigate, NavLink } from "react-router-dom";
import SimpleCalendar from "./pages/simple-calendar";
import ScrollCalendar from "./pages/scroll-calendar";

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/simple-calendar" Component={SimpleCalendar} />
        <Route path="/scroll-calendar" Component={ScrollCalendar} />
        <Route path="*" element={<Navigate to="/simple-calendar" replace />} />
      </Routes>
      <div style={{ position: "fixed", top: 64, right: 64 }}>
        <NavLink to="/simple-calendar">简单日历</NavLink>
        <NavLink to="/scroll-calendar">滚动日历</NavLink>
      </div>
    </HashRouter>
  );
}
