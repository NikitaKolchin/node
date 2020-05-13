const localBackendHost = "http://localhost:4000";
const cloudBackendHost = "http://node-euro-2021.appspot.com";
const teams = { 
                "Бельгия":"Бельгия", 
                "Италия":"Италия",
                "Россия": "Россия",
                "Финляндия": "Финляндия",
                "Франция":"Франция",
                "Польша": "Польша",
                "Украина":  "Украина",
                "Испания": "Испания",
                "Турция" : "Турция",
                "Англия": "Англия",
                "Чехия": "Чехия",
                "Швеция": "Швеция",
                "Нидерланды": "Нидерланды",
                "Германия":  "Германия",
                "Хорватия": "Хорватия",
                "Австрия": "Австрия",
                "Португалия": "Португалия",
                "Швейцария": "Швейцария",
                "Дания": "Дания",
                "Уэльс": "Уэльс"
            };

export const backendService = {
    login,
    logout,
    updateOne,
    addOne,
    deleteOne,
    getAll,
    getStakesByUserId,
    setStakesByUserId,
    teams
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

function getAll(type) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${backendHost}/${type}`, requestOptions).then(handleResponse);
}

function addOne(type, obj){
    let body;
    if (type==='users') {
        body = {
            "username": obj.username,
            "password": obj.password,
            "firstName": obj.firstName,
            "lastName": obj.lastName,
            "email": obj.email,
            "isAdmin": obj.isAdmin   
        }
    }    
    else if (type==='matches'){
        body = {
            "matchNo": obj.matchNo, 
            "home":obj.home, 
            "away": obj.away,
            "homeName":obj.homeName, 
            "awayName": obj.awayName, 
            "coefficient": obj.coefficient, 
            "enable": obj.enable,
            "visability": obj.visability
        }
    }   
    const requestOptions = {
        method: 'POST',
        headers:  authHeader(),
        body: JSON.stringify(body)
    };

    return fetch(`${backendHost}/${type}/`, requestOptions).then(handleResponse);
}


function updateOne(type, obj){
    let body;
    if (type==='users') {
        body = {
            "username": obj.username,
            "password": obj.password,
            "firstName": obj.firstName,
            "lastName": obj.lastName,
            "email": obj.email,
            "isAdmin": obj.isAdmin   
        }
    }    
    else if (type==='matches'){
        body = {
            "matchNo": obj.matchNo, 
            "home":obj.home, 
            "away": obj.away,
            "homeName":obj.homeName, 
            "awayName": obj.awayName, 
            "coefficient": obj.coefficient, 
            "enable": obj.enable,
            "visability": obj.visability
        }
    } 

    const requestOptions = {
        method: 'PUT',
        headers:  authHeader(),
        body: JSON.stringify(body)
    };

    return fetch(`${backendHost}/${type}/${obj._id}`, requestOptions).then(handleResponse);
}



function deleteOne(type, id){
    const requestOptions = {
        method: 'DELETE',
        headers:  authHeader()
    };

    return fetch(`${backendHost}/${type}/${id}`, requestOptions).then(handleResponse);
}

function getStakesByUserId(id){
    const requestOptions = {
        method: 'GET',
        headers:  authHeader()
    };

    return fetch(`${backendHost}/users/${id}/stakes`, requestOptions).then(handleResponse);
}


function setStakesByUserId(id, stake){
    let body = {
        "home": stake.home,
        "away": stake.away  
    }
    const requestOptions = {
        method: 'PUT',
        headers:  authHeader(),
        body: JSON.stringify(body)
    };

    return fetch(`${backendHost}/users/${id}/stakes/${stake.matchNo}`, requestOptions).then(handleResponse);
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