import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Oval } from 'react-loader-spinner';
import Home from './pages/Home';
import Login from './components/LOG/login';
import Notes from './components/note/Notes';
import Register from './components/LOG/register';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  
    const timer = setTimeout(() => {
      setLoading(false);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-800">
        <Oval color="#00BFFF" height={80} width={80} />
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/notes" element={<Notes />} />
      </Routes>
    </Router>
  );
}

export default App;
