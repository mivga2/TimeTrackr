import { BrowserRouter, Routes, Route } from "react-router-dom";

import Calendar from "../pages/Calendar.tsx";
import Events from "../pages/Events.tsx";
import Tasks from "../pages/Tasks.tsx";
import Shared from "../pages/Shared.tsx";
import Friends from "../pages/Friends.tsx";
import NotFound from "../pages/NotFound.tsx";
import Overview from "../pages/Overview.tsx";
import Base from "./Base.tsx";

const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Base />}>
          <Route path="" element={<Overview />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="events" element={<Events />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="friends" element={<Friends />} />
          <Route path="shared" element={<Shared />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
