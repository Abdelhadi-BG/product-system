import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth/';

class AuthService {
    login(username, password) {
        return axios
            .post(API_URL + 'signin', {
                username,
                password
            })
            .then(response => {
                if (response.data.token) {
                    const userData = {
                        ...response.data,
                        // Ensure roles is always an array and properly formatted
                        roles: (response.data.roles || []).map(role => 
                            role.startsWith('ROLE_') ? role : `ROLE_${role.toUpperCase()}`
                        )
                    };
                    localStorage.setItem('user', JSON.stringify(userData));
                    return userData;
                }
                return response.data;
            });
    }

    logout() {
        localStorage.removeItem('user');
    }

    register(username, email, password, isAdmin = false) {
        return axios.post(API_URL + 'signup', {
            username,
            email,
            password,
            role: isAdmin ? ['admin'] : ['user']
        });
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));
    }
}

export default new AuthService();
