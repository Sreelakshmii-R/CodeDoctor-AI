import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import RepositoryDetails from "./pages/RepositoryDetails";
import Dashboard from "./pages/Dashboard";
import Repositories from "./pages/Repositories";


function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#F8FAFC]">

        <Navbar />

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/repositories" element={<Repositories />} />
          
          <Route 
            path="/repositories/:id"
            element={<RepositoryDetails />}
            />
        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;