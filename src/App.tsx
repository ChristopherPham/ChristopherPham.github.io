import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ProjectFish from "./pages/ProjectFish";
import Projects from "./pages/Projects";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project-fish" element={<ProjectFish />} />
        <Route path="/projects" element={<Projects />} />
      </Routes>
    </BrowserRouter>
  );
}
