import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import Home from "./pages/Home/Home";
import Members from "./pages/Members/Members";
import Managers from "./pages/Managers/Managers";
import Events from "./pages/Events/Events";
import NotFound from "./pages/NotFound/NotFound";
import Profile from "./pages/Profile/Profile";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import Login from "./pages/Login/Login";

export const users = [
  {
    name: "Adam",
    role: "admin",
    email: "fgfdgdfg@gmail.com",
    number: "1234567890",
    password: "111111",
    organization: "eLogic",
  },
  {
    name: "Yeva",
    role: "manager",
    email: "sdfsdg@gmail.com",
    number: "1234567890",
    password: "111111",
    organization: "SoftServe",
  },
  {
    name: "Tanya",
    role: "manager",
    email: "fsdfae@gmail.com",
    number: "1234567890",
    password: "111111",
    organization: "InventorSoft",
  },
  {
    name: "Matroskin",
    role: "manager",
    email: "retdsf@gmail.com",
    number: "1234567890",
    password: "111111",
    organization: "ASD",
  },
  {
    name: "Leopold",
    role: "user",
    email: "sdfgag@gmail.com",
    number: "1234567890",
    password: "111111",
    organization: "SharpMinds",
  },
  {
    name: "Tiger",
    role: "user",
    email: "sdfsx@gmail.com",
    number: "1234567890",
    password: "111111",
    organization: "EPAM",
  },
  {
    name: "Tom",
    role: "user",
    email: "sdffx@gmail.com",
    number: "1234567890",
    password: "111111",
    organization: "Pub24",
  },
];

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="profile" element={<Profile />} />
          <Route path="forgot" element={<ForgotPassword />} />
          <Route path="members" element={<Members />} />
          <Route path="managers" element={<Managers />} />
          <Route path="events" element={<Events />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
