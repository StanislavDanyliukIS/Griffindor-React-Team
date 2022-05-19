import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import Home from "./pages/Home/Home";
import Members from "./pages/Members/Members";
import Managers from "./pages/Managers/Managers";
import Events from "./pages/Events/Events";
import NotFound from "./pages/NotFound/NotFound";
import Profile from "./pages/Profile/Profile";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />}></Route>
          <Route path="members" element={<Members />}></Route>
          <Route path="managers" element={<Managers />}></Route>
          <Route path="events" element={<Events />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
