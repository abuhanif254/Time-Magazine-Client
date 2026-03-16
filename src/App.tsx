



import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';
import Home from './pages/Home';
import Categories from './pages/Categories';
import Trending from './pages/Trending';
import Login from './pages/Login';
import Articles from './pages/Articles';
import NotFound from './pages/NotFound';
import { ThemeProvider, useTheme } from './theme/ThemeContext';

function AppShell() {
  const { theme } = useTheme();

  const themeClasses =
    theme === 'dark'
      ? 'bg-gray-950 text-gray-50'
      : 'bg-gray-50 text-gray-900';

  return (
    <Router>
      <div className={`min-h-screen flex flex-col transition-colors ${themeClasses}`}>
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/trending" element={<Trending />} />
            <Route path="/login" element={<Login />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        <ChatWidget />
      </div>
    </Router>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppShell />
    </ThemeProvider>
  );
}

export default App
