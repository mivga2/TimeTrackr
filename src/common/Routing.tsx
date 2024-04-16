import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Calendar from "../pages/Calendar.tsx";
import Events from "../pages/Events.tsx";
import Tasks from "../pages/Tasks.tsx";
import Shared from "../pages/Shared.tsx";
import Friends from "../pages/Friends.tsx";
import NotFound from "./NotFound.tsx";
import Overview from "../pages/Overview.tsx";
import Base from "./Base.tsx";
import Register from "../pages/Register.tsx";
import Account from "../pages/Account.tsx";
import LogIn from "../pages/LogIn.tsx";

const Routing = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="" element={<Base />}>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/overview" element={<Overview />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/events" element={<Events />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/friends" element={<Friends />} />
            <Route path="/shared" element={<Shared />} />
            <Route path="/register" element={<Register />} />
            <Route path="/account" element={<Account />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Routing;
