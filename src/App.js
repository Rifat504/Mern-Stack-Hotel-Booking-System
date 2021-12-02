import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import Bookingscreen from "./screens/Bookingscreen";
import Registerscreen from "./screens/Registerscreen";
import Loginscreen from "./screens/Loginscreen";

function App() {
  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/home" exact element={<HomeScreen></HomeScreen>} />
          <Route path="/book/:roomid/:fromdate/:todate" exact element={<Bookingscreen/>} />
          <Route path="/register" exact element={<Registerscreen/>}/>
          <Route path="/login" exact element={<Loginscreen/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
