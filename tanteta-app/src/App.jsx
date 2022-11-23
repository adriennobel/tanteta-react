import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage';
import BlogPage from './pages/BlogPage';
import ContactPage from './pages/ContactPage';
import ServicesPage from './pages/ServicesPage';
import ServiceCategoryPage from './pages/ServiceCategoryPage';
import ServiceDetailsPage from './pages/ServiceDetailsPage';
import NotFoundPage from './pages/NotFoundPage';
import LinkRoutes from './assets/LinkRoutes';
import NavBar from './components/NavBar';

function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <header className="page-header">
          <NavBar />
        </header>
        <main className="page-content">
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path={`/${LinkRoutes.BlogPage}`} element={<BlogPage />} />
            <Route path={`/${LinkRoutes.ContactPage}`} element={<ContactPage />} />
            <Route path={`/${LinkRoutes.ServicesPage}`} element={<ServicesPage />} />
            <Route path='/:categoryId' element={<ServiceCategoryPage />} />
            <Route path='/:categoryId/:nameId' element={<ServiceDetailsPage />} />
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
        </main>
        <footer className="page-footer">
          <p>Footer here</p>
        </footer>
      </div>
    </BrowserRouter>
  )
}

export default App;

/* 
<div>
  <a href="https://vitejs.dev" target="_blank">
    <img src="/vite.svg" className="logo" alt="Vite logo" />
  </a>
</div>
<h1>Vite + React</h1>
<div className="card">
  <button onClick={() => setCount((count) => count + 1)}>
    count is {count}
  </button>
  <p>
    Edit <code>src/App.jsx</code> and save to test HMR
  </p>
</div>
<p className="read-the-docs">
  Click on the Vite and React logos to learn more
</p>
*/