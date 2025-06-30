import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createProduct, getProductById, updateProduct } from '../services/api';

const ProductForm = () => {
    const [product, setProduct] = useState({ name: '', description: '', price: '', sku: '' });
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            getProductById(id)
                .then(response => {
                    setProduct(response.data);
                })
                .catch(error => {
                    console.error('There was an error fetching the product!', error);
                });
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (id) {
            updateProduct(id, product)
                .then(() => navigate('/'))
                .catch(error => console.error('Error updating product:', error));
        } else {
            createProduct(product)
                .then(() => navigate('/'))
                .catch(error => console.error('Error creating product:', error));
        }
    };

    return (
        <div>
            <h1>{id ? 'Edit Product' : 'Add Product'}</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input type="text" className="form-control" name="name" value={product.name} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea className="form-control" name="description" value={product.description} onChange={handleChange}></textarea>
                </div>
                <div className="mb-3">
                    <label className="form-label">Price</label>
                    <input type="number" step="0.01" className="form-control" name="price" value={product.price} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">SKU</label>
                    <input type="text" className="form-control" name="sku" value={product.sku} onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};

export default ProductForm;
