import React from 'react';
import Navbar from './components/Navigation/Navbar';
import Home from './pages/Home';
import DoctorsList from './pages/DoctorsList';
import DoctorProfile from './pages/DoctorProfile';
import BookingPage from './pages/BookingPage';
import AppointmentsPage from './pages/AppointmentsPage';
import ProfilePage from './pages/ProfilePage';

function App() {
  // Simple routing based on path
  const [currentPath, setCurrentPath] = useState('/');

  // Add a listener for custom navigation events
  useEffect(() => {
    const handleNavigation = (event: CustomEvent) => {
      const path = event.detail?.path;
      if (path) {
        setCurrentPath(path);
        window.history.pushState(null, '', path);
      }
    };

    // Use a custom event name for navigation
    window.addEventListener('navigate' as any, handleNavigation);

    // Handle browser back/forward buttons
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('navigate' as any, handleNavigation);
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // Update the Link component to dispatch the custom navigation event
  useEffect(() => {
    const originalLinkOnClick = window.Link_OnClick;

    window.Link_OnClick = (href: string) => {
      // Dispatch a custom event to handle navigation
      window.dispatchEvent(new CustomEvent('navigate', { detail: { path: href } }));

      // Call the original onClick if it exists
      if (originalLinkOnClick) {
        originalLinkOnClick(href);
      }
    };

    return () => {
      window.Link_OnClick = originalLinkOnClick;
    };
  }, []);

  // Render the appropriate page based on the current path
  const renderPage = () => {
    if (currentPath.startsWith('/doctors/') && currentPath.length > '/doctors/'.length) {
      return <DoctorProfile />;
    }

    if (currentPath.startsWith('/booking/') && currentPath.length > '/booking/'.length) {
      return <BookingPage />;
    }

    switch (currentPath) {
      case '/':
        return <Home />;
      case '/doctors':
        return <DoctorsList />;
      case '/appointments':
        return <AppointmentsPage />;
      case '/profile':
        return <ProfilePage />;
      default:
        return <Home />;
    }
  };

  return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="pt-4 pb-12">
          {renderPage()}
        </main>
        <footer className="bg-gray-800 text-white py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">MediBook</h3>
                <p className="text-gray-300 text-sm">
                  Making healthcare accessible and appointments easy to book since 2025.
                </p>
              </div>
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">For Patients</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="text-gray-300 hover:text-white">Find a Doctor</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white">Book an Appointment</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white">Medical Records</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white">Patient Portal</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">For Doctors</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="text-gray-300 hover:text-white">Join Our Network</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white">Provider Login</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white">Resources</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white">Billing</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Company</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="text-gray-300 hover:text-white">About Us</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white">Careers</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white">Contact</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white">Privacy Policy</a></li>
                </ul>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-700 text-sm text-gray-400 text-center">
              <p>© 2025 MediBook. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
  );
}

// Define window interface for our custom navigation
declare global {
  interface Window {
    Link_OnClick?: (href: string) => void;
  }
}

// Custom hook for useState
function useState<T>(initialState: T): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [state, setState] = React.useState<T>(initialState);
  return [state, setState];
}

// Custom hook for useEffect
function useEffect(effect: React.EffectCallback, deps?: React.DependencyList) {
  React.useEffect(effect, deps);
}

export default App;