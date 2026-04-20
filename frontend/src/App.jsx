import React, { useContext, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import LeadDetails from './pages/LeadDetails';
import './index.css';

const ProtectedRoute = ({ children }) => {
  const { admin, loading } = useContext(AuthContext);
  if (loading) return <div>Loading...</div>;
  return admin ? children : <Navigate to="/login" />;
};

const Layout = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/': return 'Dashboard Overview';
      case '/leads': return 'All Leads Management';
      default: return 'CRM System';
    }
  };

  return (
    <div className={`app-container ${darkMode ? 'dark' : ''}`}>
      <Sidebar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <main className="main-content">
        <Topbar 
          title={getPageTitle()} 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm} 
        />
        <div className="content-area">
          {/* Pass search term to Dashboard to filter leads */}
          {React.cloneElement(children, { searchTerm })}
        </div>
      </main>
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/leads" 
            element={
              <ProtectedRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/lead/:id" 
            element={
              <ProtectedRoute>
                <Layout>
                  <LeadDetails />
                </Layout>
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
