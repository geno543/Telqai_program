import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import About from './components/About'
import Curriculum from './components/Curriculum'
import Contact from './components/Contact'
import Footer from './components/Footer'
import JoinProgram from './components/JoinProgram'

// Home page component
const HomePage = () => {
  return (
    <>
      <Hero />
      <About />
      <Curriculum />
      <Contact />
    </>
  );
};

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark">
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/join-program" element={<JoinProgram />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App
