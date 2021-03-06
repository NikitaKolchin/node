//const localBackendHost = "http://localhost:4000";
const cloudBackendHost = "https://backend-serv.ew.r.appspot.com/";
let teams = {};
//"Бельгия,Италия,Россия,Финляндия,Франция,Польша,Украина,Испания,Турция,Англия,Чехия,Швеция,Нидерланды,Германия,Хорватия,Австрия,Португалия,Швейцария,Дания,Уэльс"
"Турция,Италия,Уэльс,Швейцария,Дания,Финляндия,Бельгия,Россия,Нидерланды,Украина,Австрия,Северная Македония,Англия,Хорватия,Шотландия,Чехия,Испания,Швеция,Польша,Словакия,Венгрия,Португалия,Франция,Германия"
  .split(",")
  .forEach((item) => (teams = { ...teams, [item]: item }));

const backendHost = cloudBackendHost;

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

const getSortedMatches = (matches) => {
  const sortedMatches = matches.sort((a, b) => {
    return a.matchNo - b.matchNo;
  });
  return sortedMatches;
};

const getAllData = async () => {
  const users = await backendService.getAll("users");
  const matches = await backendService.getAll("matches");
  const sortedMatches = getSortedMatches(matches);
  const allDataNotFiltred = sortedMatches.map((match, index) => {
    let allDataRows = {
      matchNo: match.matchNo,
      home: match.home,
      away: match.away,
      passed: false,
      coefficient: match.coefficient,
      usersStakes: [],
    };
    if (!match.enable) {
      allDataRows.passed = true;
      users.forEach((user) => {
        let allDataRow = {};
        allDataRow.userId = user._id;
        allDataRow.username = user.username; //убрать потом
        if (
          user.stakes[index].home == null ||
          user.stakes[index].away == null
        ) {
          //сделал ли пользователь ставку в закрытой области
          allDataRow.home = 10;
          allDataRow.away = 10;
        } else {
          allDataRow.home = user.stakes[index].home;
          allDataRow.away = user.stakes[index].away;
        }
        allDataRows.usersStakes.push(allDataRow);
      });
    }
    return allDataRows;
  });
  const allData = allDataNotFiltred.filter((data) => data.passed === true);
  console.log(allData);
  return allData;
};

const zeroingMoney = async () => {
  const users = await backendService.getAll("users");
  users.forEach((user) => {
    user.stakes.forEach((stake) => {
      backendService.setMoneyByUserId(user._id, {
        matchNo: stake.matchNo,
        money: 0,
      });
    });
  });
  return "done";
};

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const setTestMatches = async (numberOfMatches, zeroing) => {
  const matches = await backendService.getAll("matches");
  const sortedMatches = getSortedMatches(matches);
  for (let i = 0; i < numberOfMatches; i++) {
    let { home, away, enable, ...rest } = sortedMatches[i];
    backendService.updateOne("matches", {
      ...rest,
      home: zeroing?null:getRandomInt(0, 4),
      away: zeroing?null:getRandomInt(0, 4),
      enable: zeroing?true:false,
    });
  }
  return "done";
};

const setTestStakes= async (numberOfMatches, zeroing) => {
  const users = await backendService.getAll("users");
  users.forEach(user =>{
    for(let i=0; i < numberOfMatches; i++) {
      backendService.setStakesByUserId(user._id, {
        matchNo: user.stakes[i].matchNo,
        home: zeroing?null:getRandomInt(0, 4),
        away: zeroing?null:getRandomInt(0, 4),
      });
    }
  })
  return "done";
};

const getStandartMatchPrice = async () => {
  const users = await backendService.getAll("users");
  const matches = await backendService.getAll("matches");
  const contribution = 500;
  let coefSum = 0;
  matches.forEach((match) => {
    coefSum += match.coefficient;
  });
  return Math.round((contribution * users.length) / coefSum);
};

const calcMoney = async () => {
  const allData = await getAllData();
  const standartMatchPrice = await getStandartMatchPrice();
  let payments = [];
  let matchPrice = standartMatchPrice;
  let unrealezedPrize = 0;
  allData.forEach((match) => {
    //для каждого матча
    let vinners = [];
    match.usersStakes.forEach((stake) => {
     // console.log(stake.username);
      //для каждой ставки считаем победителей
      if (
        backendService.calcPets(
          stake.home,
          stake.away,
          match.home,
          match.away
        ) === 5
      ) {
        vinners.push({ userId: stake.userId });
      //  console.log(stake.username + " " + match.matchNo + "  " + vinners);
      }
    });
    if (vinners.length === 0) {
      unrealezedPrize = unrealezedPrize + standartMatchPrice*match.coefficient;
      matchPrice = 0;
    } else {
      matchPrice = standartMatchPrice*match.coefficient + unrealezedPrize;
      unrealezedPrize = 0;
    }
    let money =
      vinners.length > 0
        ? matchPrice / vinners.length
        : 0;
    console.log (match.matchNo + " ---------" + match.coefficient + " ---------" + matchPrice  + " ---------" + unrealezedPrize)
    payments.push({ matchNo: match.matchNo, vinners: vinners, money: money });
  });
  payments.forEach((match) => {
    //не обнуляет если не победитель
    match.vinners.forEach((vin) => {
      backendService.setMoneyByUserId(vin.userId, {
        matchNo: match.matchNo,
        money: match.money,
      });
    });
  });
  console.log(payments);
  return "done";
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
  post: async (url, requestOptions) =>
    await request(url, "POST", requestOptions),
  put: async (url, requestOptions) => await request(url, "PUT", requestOptions),
  delete: async (url, requestOptions) =>
    await request(url, "DELETE", requestOptions),
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
  setMoneyByUserId: async (id, stake) =>
    await requestObj.put(`users/${id}/money/${stake.matchNo}`, {
      body: JSON.stringify({ ...stake }),
    }),
  teams,
  calcPets,
  calcMoney,
  zeroingMoney,
  getSortedMatches,
  setTestMatches,
  setTestStakes,
};