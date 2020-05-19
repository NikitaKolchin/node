import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MaterialTable from "material-table";
import { backendService } from "./backend.service";

function HomePage() {
  let [currentUser, setCurrentUser] = useState({});
  let [stakes, setStakes] = useState({ loading: true });
  let [matches, setMatches] = useState({ loading: true });

  const columns = [
    { title: "_id", field: "_id", hidden: true },
    { title: "№", field: "matchNo", editable: "never",
 //      customSort: (a, b) =>( a.matchNo - b.matchNo ),
       defaultSort: 'asc' },
    {
      title: "Home",
      field: "homeName",
      lookup: backendService.teams,
      editable: "never",
    },
    { title: "Score", field: "home", type: "numeric" },
    {
      title: "Away",
      field: "awayName",
      lookup: backendService.teams,
      editable: "never",
    },
    { title: "Score", field: "away", type: "numeric" },
    {
      title: "Coefficient",
      field: "coefficient",
      type: "numeric",
      editable: "never",
    },
    { title: "Enable", field: "enable", type: "boolean", editable: "never" },
    {
      title: "Pets",
      field: "pets"
    },
    //  { title: "MySk", render: rowData => <div>Матч {rowData.homeName} - {rowData.awayName} сыгран, счёт {rowData.realHome} : {rowData.realAway}</div>},
    // { title: "Pets", field: "pets", type: "numeric",  editable: "never" }
    // {
    //   title: "Pets",
    //   render: (rowData) => (
    //     <div
    //       style={{ backgroundColor: rowData["pets"] === 5 ? "red" : rowData["pets"] === 3 ? "yellow" : rowData["pets"] === 1? "green" : "white"  }}
    //     >
    //       {rowData.pets}{" "}
    //     </div>
    //   ),
    // },
  ];

  useEffect(() => {
    setCurrentUser(JSON.parse(localStorage.getItem("user")));
    (async () => {
      setStakes(
        await backendService.getStakesByUserId(
          JSON.parse(localStorage.getItem("user"))._id
        )
      );
    })();
    (async () => {
      setMatches(await backendService.getAll("matches"));
    })();
  }, []);

  const getMergedArray = (stakesArr, matchesArr) => {
    return matchesArr.map((match) => {
      let stake = stakesArr.find((item) => item.matchNo === match.matchNo);
      if (stake !== undefined && match.matchNo === stake.matchNo) {
        let temp = Object.assign({}, match); //может можно без копирования объекта
        temp.home = stake.home;
        temp.away = stake.away;
        temp.realHome = match.home;
        temp.realAway = match.away;
        temp.pets = backendService.calcPets(temp.home, temp.away, temp.realHome, temp.realAway);
        return (match = temp);
      } else {
        return match;
      }
    });
  };



  if (matches.loading || stakes.loading)
    return <div>Loading information...</div>;

  return (
    <div>
      <MaterialTable
        options={{
          pageSize: 10,
          pageSizeOptions: [10, 60],
          sorting: true,
          rowStyle: (rowData) => {
            if (rowData.pets === 5) {
              return { backgroundColor: "#C9B037" };  //gold
            } else if (rowData.pets === 3) {
              return { backgroundColor: "#B4B4B4" };  //silver
            } else if (rowData.pets === 1) {
              return { backgroundColor: "#AD8A56" };  //bronze
            }
          },
        }}
        title={`Это домашняя страница, тут нужно делать ставки, ${currentUser.username}`}
        columns={columns}
        data={getMergedArray(stakes, matches)}
        detailPanel={(rowData) => {
          if (rowData.enable === false) {
            return (
              <div>
                Матч {rowData.homeName} - {rowData.awayName} сыгран, счёт{" "}
                {rowData.realHome} : {rowData.realAway}
              </div>
            );
          }
        }}
        editable={{
          isEditable: (rowData) => rowData.enable === true,
          onRowUpdate: (newData, oldData) =>
            backendService
              .setStakesByUserId(currentUser._id, {
                matchNo: newData.matchNo,
                home: newData.home,
                away: newData.away,
              })
              .then((data) => {
                setStakes((stakes) =>
                  stakes.map((item) => {
                    let updatedStake = data.stakes.find(
                      (st) => st.matchNo === newData.matchNo
                    );
                    if (item.matchNo === updatedStake.matchNo) {
                      let temp = Object.assign({}, item);
                      temp.home = updatedStake.home;
                      temp.away = updatedStake.away;
                      return (item = temp);
                    } else {
                      return item;
                    }
                  })
                );
              }),
        }}
      />
      <p>
        <Link to="/result">Result</Link>{" "}
        <Link to="/info">Info</Link>{" "}
        {currentUser.isAdmin && <Link to="/admin">Admin</Link>}{" "}
        <Link to="/login">Logout</Link>
      </p>
    </div>
  );
}
export { HomePage };
