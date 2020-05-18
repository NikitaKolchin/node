import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MaterialTable from "material-table";
import { backendService } from "./backend.service";

function ResultPage() {
  let [currentUser, setCurrentUser] = useState({});
  let [columns, setColumns] = useState({ loading: true });
  let [data, setData] = useState({ loading: true });

  useEffect(() => {
    setCurrentUser(JSON.parse(localStorage.getItem("user")));

    (async () => {
      const users = await backendService.getAll("users");
      const matches = await backendService.getAll("matches");

      const onlyMatches = matches.map((match) => {
        let add =
          match.home !== null && match.home !== undefined
            ? `(${match.home}:${match.away})`
            : "";
        return {
          title: `${match.homeName} - ${match.awayName} ${add}`,
          field: `${match.matchNo}`,
        };
      });
      const columns = [
        { title: "Пользователи", field: "user" },
        { title: "Очки", field: "pets" },
      ].concat(onlyMatches);
      setColumns(columns);

      const data = users.map((user) => {
        let temp = Object.assign({}, user);
        temp.user = user.username;
        temp.pets = 0;
        for (let i = 1; i < 52; i++) {
          let match = user.stakes.find((item) => item.matchNo === i);
          let realMatch = matches.find((item) => item.matchNo === i);
          let pets =
            match !== undefined && realMatch !== undefined
              ? calcPets(match.home, match.away, realMatch.home, realMatch.away)
              : 0;
          temp[i] =
            match.home !== null && match.home !== undefined
              ? `${match.home}:${match.away} (${pets})`
              : "";
          temp.pets = temp.pets + pets;
        }
        return temp;
      });
      setData(data);
    })();

  }, []);

  const calcPets = (home, away, realHome, realAway) => {
    // повтор из HomePage
    if(home===null || away === null) return 0;
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
  };

  if (columns.loading || data.loading) return <div>Loading information...</div>;

  return (
    <div>
      <MaterialTable
        options={{
          pageSize: 10,
          pageSizeOptions: [10, 60],
        }}
        title={`Результаты (${currentUser.username})`}
        columns={columns}
        data={data}
      />
      <p>
        <Link to="/">Home</Link>{" "}
        <Link to="/info">Info</Link>{" "}
        {currentUser.isAdmin && <Link to="/admin">Admin</Link>}{" "}
        <Link to="/login">Logout</Link>
      </p>
    </div>
  );
}
export { ResultPage };
