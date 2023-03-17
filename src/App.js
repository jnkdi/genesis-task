import './App.css';
import Courses from './components/Courses';
import Course from './components/Course';
import NoPage from './components/NoPage';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Layout />}> */}
          <Route index element={<Courses />} />
          <Route path="/:id" element={<Course />} />
          <Route path="*" element={<NoPage />} />
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
