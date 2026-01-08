import './App.css';
import Home from './pages/Home.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import File from './pages/File';
import { UserContext } from './context/userContext';
import { useState } from 'react';

function App() {
    const [user, setUser] = useState(0);
    const userVal = { user, setUser };

    return (
        <UserContext.Provider value={userVal}>
            <div className="parent">
                <Router>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/files" element={<File />} />
                    </Routes>
                </Router>
            </div>
        </UserContext.Provider>
    );
}

export default App;
