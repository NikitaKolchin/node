const localBackendHost = "http://localhost:4000";
//const cloudBackendHost = "https://node-euro-2021.ew.r.appspot.com";
let teams = {};
//"Бельгия,Италия,Россия,Финляндия,Франция,Польша,Украина,Испания,Турция,Англия,Чехия,Швеция,Нидерланды,Германия,Хорватия,Австрия,Португалия,Швейцария,Дания,Уэльс"
"Турция,Италия,Уэльс,Швейцария,Дания,Финляндия,Бельгия,Россия,Нидерланды,Украина,Австрия,Северная Македония,Англия,Хорватия,Шотландия,Чехия,Испания,Швеция,Польша,Словакия,Венгрия,Португалия,Франция,Германия"
  .split(",")
  .forEach((item) => (teams = { ...teams, [item]: item }));

const backendHost = localBackendHost;

const calcPets = (home, away, realHome, realAway) => {
  if (
    home === null ||
    away === null ||
    realHome === null ||
    realAway === null
  ) {
    return 0;
  }
  const difference = home - away;
  const realDifference = realHome - realAway;
  switch (true) {
    case home === realHome && away === realAway:
      return 5;
    case difference === realDifference:
      return 3;
    case (difference > 0 && realDifference > 0) ||
      (difference < 0 && realDifference < 0) ||
      (difference === 0 && realDifference === 0):
      return 1;
    default:
      return 0;
  }
};

const calcMoney = async () => {
   const users = await backendService.getAll('users');
   const matches = await backendService.getAll('matches');
   const allData = users.map((user, index) => {
    user.stakes[1] = {...user, matchNo1: matches[index].matchNo}
    return user
   }) 
   console.log(allData);
};

const authHeader = () => {
  // return authorization header with basic auth credentials
  const user = JSON.parse(localStorage.getItem("user"));
  return user && user.authdata
    ? {
        Authorization: "Basic " + user.authdata,
        "Content-Type": "application/json",
      }
    : {};
};

const logout = () => localStorage.removeItem("user");

const handleResponse = async (response) => {
  const data = await response.json();
  //const data = text && JSON.parse(text)
  if (!response.ok) {
    if (response.status === 401) {
      // auto logout if 401 response returned from api
      logout();
      window.location.reload(true); //добавил window
    }
    return Promise.reject((data && data.message) || response.statusText);
  }
  return data;
};

const request = async (url, method, requestOptions) =>
  await handleResponse(
    await fetch(`${backendHost}/${url}`, {
      method: method,
      headers: authHeader(),
      ...(requestOptions ? requestOptions : {}),
    })
  );

const requestObj = {
  get: async (url, requestOptions) => await request(url, "GET", requestOptions),
  post: async (url, requestOptions) => await request(url, "POST", requestOptions),
  put: async (url, requestOptions) => await request(url, "PUT", requestOptions),
  delete: async (url, requestOptions) => await request(url, "DELETE", requestOptions),
};

// let requestObj = {};
// "GET,POST,PUT,DELETE".split(",").forEach(
//   (item) =>
//     (requestObj = {
//       ...requestObj,
//       [item.toLowerCase()]: async (url, requestOptions) =>
//         await request(url, item, requestOptions),
//     })
// );

export const backendService = {
  login: async (username, password) => {
    const user = await requestObj.post(`users/authenticate`, {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    if (user) {
      user.authdata = window.btoa(username + ":" + password);
      localStorage.setItem("user", JSON.stringify(user));
    }
    return user;
  },
  logout: logout,
  updateOne: async (type, obj) =>
    await requestObj.put(`${type}/${obj._id}`, {
      body: JSON.stringify({ ...obj }),
    }),
  addOne: async (type, obj) =>
    await requestObj.post(type, { body: JSON.stringify({ ...obj }) }),
  deleteOne: async (type, id) => requestObj.delete(`${type}/${id}`),
  getAll: async (type) => await requestObj.get(type),
  getStakesByUserId: async (id) => await requestObj.get(`users/${id}/stakes`),
  setStakesByUserId: async (id, stake) =>
    await requestObj.put(`users/${id}/stakes/${stake.matchNo}`, {
      body: JSON.stringify({ ...stake }),
    }),
  teams,
  calcPets,
  calcMoney,
};

// const localBackendHost = "http://localhost:4000";
// const cloudBackendHost = "http://node-euro-2021.appspot.com";
// const teams = {
//   Бельгия: "Бельгия",
//   Италия: "Италия",
//   Россия: "Россия",
//   Финляндия: "Финляндия",
//   Франция: "Франция",
//   Польша: "Польша",
//   Украина: "Украина",
//   Испания: "Испания",
//   Турция: "Турция",
//   Англия: "Англия",
//   Чехия: "Чехия",
//   Швеция: "Швеция",
//   Нидерланды: "Нидерланды",
//   Германия: "Германия",
//   Хорватия: "Хорватия",
//   Австрия: "Австрия",
//   Португалия: "Португалия",
//   Швейцария: "Швейцария",
//   Дания: "Дания",
//   Уэльс: "Уэльс",
// };

// const backendHost = localBackendHost;

// const calcPets = ( home, away, realHome, realAway) => {
//   if(home===null || away === null || realHome ===null || realAway === null) return 0;
//   let difference = home - away;
//   let realDifference = realHome - realAway;
//   if (home === realHome && away === realAway) {
//     return 5;
//   } else if (difference === realDifference) {
//     return 3;
//   } else if (
//     (difference > 0 && realDifference > 0) ||
//     (difference < 0 && realDifference < 0) ||
//     (difference === 0 && realDifference === 0)
//   ) {
//     return 1;
//   } else return 0;
// }

// const authHeader = () => {
//   // return authorization header with basic auth credentials
//   let user = JSON.parse(localStorage.getItem("user"));

//   if (user && user.authdata) {
//     return {
//       Authorization: "Basic " + user.authdata,
//       "Content-Type": "application/json",
//     };
//   } else {
//     return {};
//   }
// }

//  const login = async (username, password) => {
//   const requestOptions = {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ username, password }),
//   };

//   const response = await fetch(`${backendHost}/users/authenticate`, requestOptions);
//   const user = await handleResponse(response);
//   // login successful if there's a user in the response
//   if (user) {
//     // store user details and basic auth credentials in local storage
//     // to keep user logged in between page refreshes
//     user.authdata = window.btoa(username + ":" + password);
//     localStorage.setItem("user", JSON.stringify(user));
//   }
//   return user;
// }

// const logout= ()=>{
//   // remove user from local storage to log user out
//   localStorage.removeItem("user");
// }

//  const getAll = async (type) => {
//   const requestOptions = {
//     method: "GET",
//     headers: authHeader(),
//   };

//   const response = await fetch(`${backendHost}/${type}`, requestOptions);
//   return handleResponse(response);
// }

//  const addOne = async (type, obj) => {
//   const requestOptions = {
//     method: "POST",
//     headers: authHeader(),
//     body: JSON.stringify({...obj}),
//   };

//   const response = await fetch(`${backendHost}/${type}/`, requestOptions);
//   return handleResponse(response);
// }

// const updateOne = async (type, obj) => {
//   const requestOptions = {
//     method: "PUT",
//     headers: authHeader(),
//     body: JSON.stringify({...obj}),
//   };

//   const response = await fetch(`${backendHost}/${type}/${obj._id}`, requestOptions);
//   return handleResponse(response);
// }

//  const deleteOne = async (type, id) => {
//   const requestOptions = {
//     method: "DELETE",
//     headers: authHeader(),
//   };

//   const response = await fetch(`${backendHost}/${type}/${id}`, requestOptions);
//   return handleResponse(response);
// }

// const getStakesByUserId = async (id) => {
//   const requestOptions = {
//     method: "GET",
//     headers: authHeader(),
//   };

//   const response = await fetch(`${backendHost}/users/${id}/stakes`, requestOptions);
//   return handleResponse(response);
// }

//  const setStakesByUserId = async (id, stake) => {
//   const requestOptions = {
//     method: "PUT",
//     headers: authHeader(),
//     body: JSON.stringify({...stake}),
//   };

//   const response = await fetch(`${backendHost}/users/${id}/stakes/${stake.matchNo}`, requestOptions);
//   return handleResponse(response);
// }

// const handleResponse = (response) => {
//   return response.text().then((text) => {
//     const data = text && JSON.parse(text);
//     if (!response.ok) {
//       if (response.status === 401) {
//         // auto logout if 401 response returned from api
//         logout();
//         window.location.reload(true); //добавил window
//       }

//       const error = (data && data.message) || response.statusText;
//       return Promise.reject(error);
//     }
//     return data;
//   });
// }

// export const backendService = {
//   login,
//   logout,
//   updateOne,
//   addOne,
//   deleteOne,
//   getAll,
//   getStakesByUserId,
//   setStakesByUserId,
//   teams,
//   calcPets
// };
