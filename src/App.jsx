import { Route, Routes } from "react-router-dom";
import "./App.css";
import View from "./pages/View";
import Landing from "./pages/Landing";
import './style.css'
function App() {
  return <>
  <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/View" element={<View />} />
    </Routes>
  
  
  </>;
}

export default App;
