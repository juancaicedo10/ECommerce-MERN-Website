import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomeScreen from './pages/HomeScreen.jsx';
import ProductScreen from './pages/productScreen.jsx';


function App() {
  return (
    <Router>
    <div className="App">
      <header>
        <Link to="/">Amazona</Link>
      </header>
      <main>
        <Routes>
          <Route path='/product/:slug'  Component={ProductScreen}/>
          <Route path='/' Component={HomeScreen} />
        </Routes>
      </main>
    </div>
    </Router>
  );
}

export default App;
