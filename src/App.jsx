import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Convert from "./pages/Convert";
import ObjViewer from "./pages/ObjViewer"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/convert" element={<Convert />} />
        <Route path="/viewer" element={<ObjViewer />} />
      </Routes>
    </Router>
  );
}

export default App;
