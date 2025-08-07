/* eslint-disable @typescript-eslint/no-unused-vars */
import Home from "./pages/Home";
import CreateNote from "./pages/CreateNote";
import EditNote from "./pages/EditNote";
import ViewNote from "./pages/ViewNote";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white shadow-md p-6 rounded-lg">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreateNote />} />
            <Route path="/note/:id" element={<ViewNote />} />
            <Route path="/edit/:id" element={<EditNote />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
};

export default App;
