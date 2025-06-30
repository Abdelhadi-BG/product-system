import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductService from '../services/product.service';
import AuthService from '../services/auth.service';

const AdminPanel = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [formData, setFormData] = useState({
        sku: '',
        name: '',
        description: '',
        price: '',
        stockQuantity: 0,
        category: '',
        imageUrl: ''
    });

    const navigate = useNavigate();
    const currentUser = AuthService.getCurrentUser();

    useEffect(() => {
        if (!currentUser || !currentUser.roles.includes('ROLE_ADMIN')) {
            navigate('/');
            return;
        }
        fetchProducts();
    }, [navigate]);

    const fetchProducts = async () => {
        try {
            const response = await ProductService.getAll();
            setProducts(response.data || []);
            setMessage('');
        } catch (error) {
            console.error('Error fetching products:', error);
            setMessage(error.response?.data?.message || 'Failed to fetch products');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        
        // Basic form validation
        if (!formData.name || !formData.price) {
            setMessage('Name and price are required');
            return;
        }

        try {
            if (editingProduct) {
                await ProductService.updateProduct(editingProduct.id, formData);
                setMessage('Product updated successfully');
            } else {
                await ProductService.createProduct({
                    ...formData,
                    price: Number(formData.price) // Ensure price is a number
                });
                setMessage('Product created successfully');
            }
            
            // Reset form and refresh product list
            setShowForm(false);
            setEditingProduct(null);
            setFormData({
                sku: '',
                name: '',
                description: '',
                price: '',
                stockQuantity: 0,
                category: '',
                imageUrl: ''
            });
            
            // Small delay to show success message before refreshing
            setTimeout(fetchProducts, 500);
            
        } catch (error) {
            console.error('Error saving product:', error);
            setMessage(error.response?.data?.message || 'Operation failed');
        }
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        setFormData({
            sku: product.sku || '',
            name: product.name,
            description: product.description,
            price: product.price,
            stockQuantity: product.stockQuantity || 0,
            category: product.category,
            imageUrl: product.imageUrl || ''
        });
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await ProductService.deleteProduct(id);
                setMessage('Product deleted successfully');
                fetchProducts();
            } catch (error) {
                setMessage('Failed to delete product');
            }
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="container mt-4">
            <h2>Admin Dashboard</h2>
            {message && (
                <div className={`alert ${message.includes('success') ? 'alert-success' : 'alert-danger'}`}>
                    {message}
                </div>
            )}

            <button 
                className="btn btn-primary mb-3" 
                onClick={() => {
                    setShowForm(!showForm);
                    if (editingProduct) setEditingProduct(null);
                }}
            >
                {showForm ? 'Cancel' : 'Add New Product'}
            </button>

            {showForm && (
                <div className="card mb-4">
                    <div className="card-body">
                        <h4>{editingProduct ? 'Edit Product' : 'Add New Product'}</h4>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label">SKU</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    name="sku" 
                                    value={formData.sku}
                                    onChange={handleInputChange}
                                    placeholder="e.g., PROD-001"
                                    pattern="[A-Za-z0-9-]+"
                                    title="Only letters, numbers, and hyphens are allowed"
                                    required 
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Name</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    name="name" 
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required 
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Description</label>
                                <textarea 
                                    className="form-control" 
                                    name="description" 
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    required 
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Price</label>
                                <input 
                                    type="number" 
                                    className="form-control" 
                                    name="price" 
                                    value={formData.price}
                                    onChange={handleInputChange}
                                    step="0.01"
                                    min="0"
                                    required 
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Stock Quantity</label>
                                <input 
                                    type="number" 
                                    className="form-control" 
                                    name="stockQuantity" 
                                    value={formData.stockQuantity}
                                    onChange={handleInputChange}
                                    min="0"
                                    required 
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Category</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    name="category" 
                                    value={formData.category}
                                    onChange={handleInputChange}
                                    required 
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Image URL</label>
                                <input 
                                    type="url" 
                                    className="form-control" 
                                    name="imageUrl" 
                                    value={formData.imageUrl}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">
                                {editingProduct ? 'Update Product' : 'Add Product'}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            <div className="table-responsive">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id}>
                                <td>{product.name}</td>
                                <td>{product.description}</td>
                                <td>${product.price}</td>
                                <td>{product.category}</td>
                                <td>
                                    <button 
                                        className="btn btn-sm btn-warning me-2"
                                        onClick={() => handleEdit(product)}
                                    >
                                        Edit
                                    </button>
                                    <button 
                                        className="btn btn-sm btn-danger"
                                        onClick={() => handleDelete(product.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminPanel;
