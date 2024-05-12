import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Calendar from "../pages/calendar/Calendar.tsx";
import Events from "../pages/events/Events.tsx";
import Tasks from "../pages/tasks/Tasks.tsx";
import Friends from "../pages/friends/Friends.tsx";
import NotFound from "./NotFound.tsx";
import Overview from "../pages/Overview.tsx";
import Base from "./Base.tsx";
import Register from "../pages/user/Register.tsx";
import Account from "../pages/user/Account.tsx";
import LogIn from "../pages/user/LogIn.tsx";
import NewEvent from "../pages/events/NewEvent.tsx";
import NewTask from "../pages/tasks/NewTask.tsx";
import EditEvent from "../pages/events/EditEvent.tsx";
import EditTask from "../pages/tasks/EditTask.tsx";
import DeleteEvent from "../pages/events/DeleteEvent.tsx";
import DeleteTask from "../pages/tasks/DeleteTask.tsx";
import AddFriend from "../pages/friends/AddFriend.tsx";
import AcceptRequest from "../pages/friends/AcceptRequest.tsx";
import UnfriendUser from "../pages/friends/UnfriendFriend.tsx";
import ShareCalendar from "../pages/calendar/ShareCalendar.tsx";
import NewCalendar from "../pages/calendar/NewCalendar.tsx";

const Routing = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="" element={<Base />}>
            <Route path="/overview" element={<Overview />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/calendar/new" element={<NewCalendar />} />
            <Route path="/calendar/share/:id" element={<ShareCalendar />} />
            <Route path="/events" element={<Events />} />
            <Route path="/events/new" element={<NewEvent />} />
            <Route path="/events/edit/:id" element={<EditEvent />} />
            <Route path="/events/delete/:id" element={<DeleteEvent />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/tasks/new" element={<NewTask />} />
            <Route path="/tasks/edit/:id" element={<EditTask />} />
            <Route path="/tasks/delete/:id" element={<DeleteTask />} />
            <Route path="/friends" element={<Friends />} />
            <Route path="/friends/add/:id" element={<AddFriend />} />
            <Route path="/friends/accept/:id" element={<AcceptRequest />} />
            <Route path="/friends/unfriend/:id" element={<UnfriendUser />} />
            <Route path="/account" element={<Account />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<LogIn />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Routing;
