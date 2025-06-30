import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            {/* Hero Section */}
            <div className="jumbotron text-center bg-light">
                <h1 className="display-4">Welcome to ProductApp</h1>
                <p className="lead">Your one-stop shop for the best products online.</p>
                <hr className="my-4" />
                <p>Browse our collection and find what you need.</p>
                <Link className="btn btn-primary btn-lg" to="/products" role="button">Shop Now</Link>
            </div>

            {/* Features Section */}
            <div className="container mt-5">
                <div className="row text-center">
                    <div className="col-lg-4">
                        <div className="card h-100">
                            <div className="card-body">
                                <h4 className="card-title">Quality Products</h4>
                                <p className="card-text">We offer products from the best brands, ensuring top-notch quality and reliability.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="card h-100">
                             <div className="card-body">
                                <h4 className="card-title">Fast Shipping</h4>
                                <p className="card-text">Get your orders delivered to your doorstep in no time with our express shipping options.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="card h-100">
                             <div className="card-body">
                                <h4 className="card-title">24/7 Support</h4>
                                <p className="card-text">Our support team is available around the clock to assist you with any queries or issues.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
