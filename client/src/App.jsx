import './App.css';
import Home from './pages/home';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import File from './pages/File';


function App() {
    return (
        <div className="parent">
        <Router>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/file' element={<File />} />
            </Routes>
        </Router>
        </div>
    );
}

export default App;
