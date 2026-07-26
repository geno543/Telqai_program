import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import Footer from './components/Footer'

const About = lazy(() => import('./components/About'));
const Curriculum = lazy(() => import('./components/Curriculum'));
const Sponsors = lazy(() => import('./components/Sponsors'));
const Contact = lazy(() => import('./components/Contact'));
const JoinProgram = lazy(() => import('./components/JoinProgram'));

const LoadingSpinner = () => (
    <div className="flex items-center justify-center py-20">
      <div className="animate-spin rounded-full h-10 w-10 border-2 border-white/10 border-t-cyan-500"></div>
    </div>
);

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
        <Sponsors />
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
      <div className="min-h-screen bg-[#0a0718] text-white transition-colors duration-300">
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/join" element={
            <Suspense fallback={<LoadingSpinner />}>
              <JoinProgram />
            </Suspense>
          } />
          <Route path="*" element={<HomePage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App
