// import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'

const App = () => {
  return (
      <Router>
        <div>
          <Link to="/"><button>Authors</button></Link>
          <Link to="/books"><button>Books</button></Link>
          <Link to="/add"><button>Add Book</button></Link>
        </div>

        <Routes>
          <Route path="/" element={<Authors />} />
          <Route path="/books" element={<Books />} />
          <Route path="/add" element={<NewBook />} />
        </Routes>
      </Router>
  );
};

export default App;
