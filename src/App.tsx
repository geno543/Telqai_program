import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import Footer from './components/Footer'

// Lazy load heavy components to improve initial load time
const About = lazy(() => import('./components/About'));
const Curriculum = lazy(() => import('./components/Curriculum'));
const Contact = lazy(() => import('./components/Contact'));
const JoinProgram = lazy(() => import('./components/JoinProgram'));

// Loading component for better UX during lazy loading
const LoadingSpinner = () => (
  <div className="flex items-center justify-center py-20">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
  </div>
);

// Home page component with lazy loading
const HomePage = () => {
  return (
    <>
      <Hero />
      <Suspense fallback={<LoadingSpinner />}>
        <About />
      </Suspense>
      <Suspense fallback={<LoadingSpinner />}>
        <Curriculum />
      </Suspense>
      <Suspense fallback={<LoadingSpinner />}>
        <Contact />
      </Suspense>
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
          <Route path="/join-program" element={
            <Suspense fallback={<LoadingSpinner />}>
              <JoinProgram />
            </Suspense>
          } />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App
