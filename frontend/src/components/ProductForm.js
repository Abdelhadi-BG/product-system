import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createProduct, getProductById, updateProduct } from '../services/api';

const ProductForm = () => {
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: '',
        sku: '',
        category: '',
        brand: '',
        stockQuantity: 0,
        imageUrl: '',
        weight: 0,
        dimensions: '',
        manufacturer: '',
        active: true
    });
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
        const { name, value, type, checked } = e.target;
        setProduct(prevState => ({ ...prevState, [name]: type === 'checkbox' ? checked : value }));
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
                <div className="row">
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-label">Name</label>
                            <input type="text" className="form-control" name="name" value={product.name} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-label">SKU</label>
                            <input type="text" className="form-control" name="sku" value={product.sku} onChange={handleChange} required />
                        </div>
                    </div>
                </div>

                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea className="form-control" name="description" value={product.description} onChange={handleChange}></textarea>
                </div>

                <div className="row">
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-label">Price</label>
                            <input type="number" step="0.01" className="form-control" name="price" value={product.price} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-label">Stock Quantity</label>
                            <input type="number" className="form-control" name="stockQuantity" value={product.stockQuantity} onChange={handleChange} required />
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-label">Category</label>
                            <input type="text" className="form-control" name="category" value={product.category} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-label">Brand</label>
                            <input type="text" className="form-control" name="brand" value={product.brand} onChange={handleChange} />
                        </div>
                    </div>
                </div>

                <div className="mb-3">
                    <label className="form-label">Image URL</label>
                    <input type="text" className="form-control" name="imageUrl" value={product.imageUrl} onChange={handleChange} />
                </div>

                <div className="row">
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-label">Weight (kg)</label>
                            <input type="number" step="0.01" className="form-control" name="weight" value={product.weight} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-label">Dimensions</label>
                            <input type="text" className="form-control" name="dimensions" value={product.dimensions} onChange={handleChange} />
                        </div>
                    </div>
                </div>

                <div className="mb-3">
                    <label className="form-label">Manufacturer</label>
                    <input type="text" className="form-control" name="manufacturer" value={product.manufacturer} onChange={handleChange} />
                </div>

                <div className="form-check mb-3">
                    <input className="form-check-input" type="checkbox" name="active" checked={product.active} onChange={handleChange} />
                    <label className="form-check-label">Active</label>
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};

export default ProductForm;
