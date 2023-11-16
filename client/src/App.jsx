import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import SignOut from "./pages/SignOut";
import Profile from "./pages/Profile";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/login" element={<SignIn/>}/>
        <Route path="/logout" element={<SignOut/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/profile" element={<Profile />}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
