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
import NewEvent from "../pages/NewEvent.tsx";
import NewTask from "../pages/NewTask.tsx";
import EditEvent from "../pages/EditEvent.tsx";
import EditTask from "../pages/EditTask.tsx";
import DeleteEvent from "../pages/DeleteEvent.tsx";
import DeleteTask from "../pages/DeleteTask.tsx";

const Routing = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="" element={<Base />}>
            <Route path="/" element={<Navigate to="/overview" />} />
            <Route path="/overview" element={<Overview />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/events" element={<Events />} />
            <Route path="/events/new" element={<NewEvent />} />
            <Route path="/events/edit/:id" element={<EditEvent />} />
            <Route path="/events/delete/:id" element={<DeleteEvent />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/tasks/new" element={<NewTask />} />
            <Route path="/tasks/edit/:id" element={<EditTask />} />
            <Route path="/tasks/delete/:id" element={<DeleteTask />} />
            <Route path="/friends" element={<Friends />} />
            <Route path="/shared" element={<Shared />} />
            <Route path="/register" element={<Register />} />
            <Route path="/account" element={<Account />} />  
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="/login" element={<LogIn />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Routing;
