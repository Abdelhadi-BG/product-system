import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import './App.css';

function App() {
    return (
        <Router>
            <>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="/">ProductApp</a>
                    </div>
                </nav>
                <div className="container mt-4">
                    <Routes>
                        <Route path="/" element={<ProductList />} />
                        <Route path="/add" element={<ProductForm />} />
                        <Route path="/edit/:id" element={<ProductForm />} />
                    </Routes>
                </div>
            </>
        </Router>
    );
}

export default App;


