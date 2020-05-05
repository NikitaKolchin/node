const localBackendHost = "http://localhost:4000";
const cloudBackendHost = "http://node-euro-2021.appspot.com";

export const userService = {
    login,
    logout,
    updateOneUser,
    addOneUser,
    deleteOneUser,
    getAll
};

const backendHost = localBackendHost;

function authHeader() {
    // return authorization header with basic auth credentials
    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.authdata) {
        return { 'Authorization': 'Basic ' + user.authdata ,  'Content-Type': 'application/json' };
    } else {
        return {};
    }
}

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch(`${backendHost}/users/authenticate`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // login successful if there's a user in the response
            if (user) {
                // store user details and basic auth credentials in local storage 
                // to keep user logged in between page refreshes
                user.authdata = window.btoa(username + ':' + password);
                localStorage.setItem('user', JSON.stringify(user));
            }

            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${backendHost}/users`, requestOptions).then(handleResponse);
}

function updateOneUser(user){
    const requestOptions = {
        method: 'PUT',
        headers:  authHeader(),
        body: JSON.stringify({
            "username": user.username,
            "password": user.password,
            "firstName": user.firstName,
            "lastName": user.lastName,
            "email": user.email,
            "isAdmin": user.isAdmin      
        })
    };

    return fetch(`${backendHost}/users/${user.id}`, requestOptions).then(handleResponse);
}

function addOneUser(user){
    const requestOptions = {
        method: 'POST',
        headers:  authHeader(),
        body: JSON.stringify({
            "username": user.username,
            "password": user.password,
            "firstName": user.firstName,
            "lastName": user.lastName,
            "email": user.email,
            "isAdmin": user.isAdmin      
        })
    };

    return fetch(`${backendHost}/users/`, requestOptions).then(handleResponse);
}



function deleteOneUser(id){
    const requestOptions = {
        method: 'DELETE',
        headers:  authHeader()
    };

    return fetch(`${backendHost}/users/${id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                window.location.reload(true); //добавил window
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}