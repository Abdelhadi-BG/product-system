import React from 'react';
import AuthService from '../services/auth.service';

const Profile = () => {
    const currentUser = AuthService.getCurrentUser();

    return (
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <div className="card">
                        <div className="card-header text-center">
                            <img
                                src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                                alt="profile"
                                className="rounded-circle mb-3"
                                style={{ width: '100px', height: '100px' }}
                            />
                            <h4 className="mb-0">{currentUser.username}'s Profile</h4>
                        </div>
                        <div className="card-body">
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">
                                    <strong>Email:</strong> {currentUser.email}
                                </li>
                                <li className="list-group-item">
                                    <strong>Account Type:</strong>{" "}
                                    {currentUser.roles && 
                                     currentUser.roles.some(role => 
                                         role === 'ROLE_ADMIN' || role === 'admin' || role === 'ADMIN'
                                     )
                                        ? 'Administrator'
                                        : 'Standard User'}
                                </li>
                                <li className="list-group-item">
                                    <strong>Member Since:</strong> {new Date().toLocaleDateString()}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
