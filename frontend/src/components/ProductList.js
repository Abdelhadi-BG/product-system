import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllProducts, deleteProduct } from '../services/api';
import AuthService from '../services/auth.service';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [showModeratorBoard, setShowModeratorBoard] = useState(false);
    const [showAdminBoard, setShowAdminBoard] = useState(false);

    useEffect(() => {
        const user = AuthService.getCurrentUser();

        if (user) {
            setShowModeratorBoard(user.roles.includes('ROLE_MODERATOR'));
            setShowAdminBoard(user.roles.includes('ROLE_ADMIN'));
        }

        fetchProducts();
    }, []);

    const fetchProducts = () => {
        getAllProducts()
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the products!', error);
            });
    };

    const handleDelete = (id) => {
        deleteProduct(id)
            .then(() => {
                fetchProducts(); // Refresh the list after deleting
            })
            .catch(error => {
                console.error('There was an error deleting the product!', error);
            });
    };

    return (
        <div>
            <h1>Products</h1>
            {(showModeratorBoard || showAdminBoard) && (
                <Link to="/add" className="btn btn-primary mb-3">Add Product</Link>
            )}
            <div className="row">
                {products.map(product => (
                    <div key={product.id} className="col-md-4 mb-4">
                        <div className="card h-100">
                            <img src={product.imageUrl || 'https://via.placeholder.com/150'} className="card-img-top" alt={product.name} style={{ height: '200px', objectFit: 'cover' }} />
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">{product.name}</h5>
                                <p className="card-text">${product.price}</p>
                                <div className="mt-auto">
                                    {(showModeratorBoard || showAdminBoard) && (
                                        <>
                                            <Link to={`/edit/${product.id}`} className="btn btn-info me-2">Edit</Link>
                                            <button onClick={() => handleDelete(product.id)} className="btn btn-danger">Delete</button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;
