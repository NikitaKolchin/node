const localBackendHost = "http://localhost:4000";
const cloudBackendHost = "http://node-euro-2021.appspot.com";
const teams = {
  Бельгия: "Бельгия",
  Италия: "Италия",
  Россия: "Россия",
  Финляндия: "Финляндия",
  Франция: "Франция",
  Польша: "Польша",
  Украина: "Украина",
  Испания: "Испания",
  Турция: "Турция",
  Англия: "Англия",
  Чехия: "Чехия",
  Швеция: "Швеция",
  Нидерланды: "Нидерланды",
  Германия: "Германия",
  Хорватия: "Хорватия",
  Австрия: "Австрия",
  Португалия: "Португалия",
  Швейцария: "Швейцария",
  Дания: "Дания",
  Уэльс: "Уэльс",
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
  teams,
  calcPets
};

const backendHost = localBackendHost;

function calcPets ( home, away, realHome, realAway) {
  if(home===null || away === null || realHome ===null || realAway === null) return 0;
  let difference = home - away;
  let realDifference = realHome - realAway;
  if (home === realHome && away === realAway) {
    return 5;
  } else if (difference === realDifference) {
    return 3;
  } else if (
    (difference > 0 && realDifference > 0) ||
    (difference < 0 && realDifference < 0) ||
    (difference === 0 && realDifference === 0)
  ) {
    return 1;
  } else return 0;
}

function authHeader() {
  // return authorization header with basic auth credentials
  let user = JSON.parse(localStorage.getItem("user"));

  if (user && user.authdata) {
    return {
      Authorization: "Basic " + user.authdata,
      "Content-Type": "application/json",
    };
  } else {
    return {};
  }
}

async function login(username, password) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  };

  const response = await fetch(`${backendHost}/users/authenticate`, requestOptions);
  const user = await handleResponse(response);
  // login successful if there's a user in the response
  if (user) {
    // store user details and basic auth credentials in local storage
    // to keep user logged in between page refreshes
    user.authdata = window.btoa(username + ":" + password);
    localStorage.setItem("user", JSON.stringify(user));
  }
  return user;
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem("user");
}

async function getAll(type) {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  const response = await fetch(`${backendHost}/${type}`, requestOptions);
  return handleResponse(response);
}

async function addOne(type, obj) {
  let body;
  if (type === "users") {
    body = {
      username: obj.username,
      password: obj.password,
      firstName: obj.firstName,
      lastName: obj.lastName,
      email: obj.email,
      isAdmin: obj.isAdmin,
    };
  } else if (type === "matches") {
    body = {
      matchNo: obj.matchNo,
      home: obj.home,
      away: obj.away,
      homeName: obj.homeName,
      awayName: obj.awayName,
      coefficient: obj.coefficient,
      enable: obj.enable,
      visability: obj.visability,
    };
  }
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify(body),
  };

  const response = await fetch(`${backendHost}/${type}/`, requestOptions);
  return handleResponse(response);
}

async function updateOne(type, obj) {
  let body;
  if (type === "users") {
    body = {
      username: obj.username,
      password: obj.password,
      firstName: obj.firstName,
      lastName: obj.lastName,
      email: obj.email,
      isAdmin: obj.isAdmin,
    };
  } else if (type === "matches") {
    body = {
      matchNo: obj.matchNo,
      home: obj.home,
      away: obj.away,
      homeName: obj.homeName,
      awayName: obj.awayName,
      coefficient: obj.coefficient,
      enable: obj.enable,
      visability: obj.visability,
    };
  }

  const requestOptions = {
    method: "PUT",
    headers: authHeader(),
    body: JSON.stringify(body),
  };

  const response = await fetch(`${backendHost}/${type}/${obj._id}`, requestOptions);
  return handleResponse(response);
}

async function deleteOne(type, id) {
  const requestOptions = {
    method: "DELETE",
    headers: authHeader(),
  };

  const response = await fetch(`${backendHost}/${type}/${id}`, requestOptions);
  return handleResponse(response);
}

async function getStakesByUserId(id) {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  const response = await fetch(`${backendHost}/users/${id}/stakes`, requestOptions);
  return handleResponse(response);
}

async function setStakesByUserId(id, stake) {
  let body = {
    home: stake.home,
    away: stake.away,
  };
  const requestOptions = {
    method: "PUT",
    headers: authHeader(),
    body: JSON.stringify(body),
  };

  const response = await fetch(`${backendHost}/users/${id}/stakes/${stake.matchNo}`, requestOptions);
  return handleResponse(response);
}

function handleResponse(response) {
  return response.text().then((text) => {
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
