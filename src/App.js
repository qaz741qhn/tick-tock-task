import "./App.css";
import Clock from "./Clock";
import Signup from "./Signup";
import Login from "./Login";
import Navbar from "./Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const apiURL = "https://multi-api.herokuapp.com";
// const apiURL = "http://localhost:3000";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar apiURL={apiURL}/>
        <Routes>
          <Route path="/" element={<Clock />} />
          <Route path="/signup" element={<Signup apiURL={apiURL}/>} />
          <Route path="/login" element={<Login apiURL={apiURL}/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
