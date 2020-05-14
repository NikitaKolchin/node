import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MaterialTable from "material-table";
import { backendService } from "./backend.service";

function InfoPage() {
  let [currentUser, setCurrentUser] = useState({});
  let [matches, setMatches] = useState({ loading: true });

  const columns = [
    { title: "_id", field: "_id", hidden: true },
    { title: "№", field: "matchNo" },
    { title: "Home", field: "homeName", lookup: backendService.teams },
    { title: "Score", field: "home", type: "numeric" },
    { title: "Away", field: "awayName", lookup: backendService.teams },
    { title: "Score", field: "away", type: "numeric" },
    { title: "Coefficient", field: "coefficient", type: "numeric" },
    { title: "Enable", field: "enable", type: "boolean" },
    { title: "Visability", field: "visability", type: "boolean" },
  ];

  useEffect(() => {
    setCurrentUser(JSON.parse(localStorage.getItem("user")));
    (async () => {
      setMatches(await backendService.getAll("matches"));
    })();
  }, []);

  if (matches.loading) return <div>Loading information...</div>;

  if (currentUser.isAdmin) {
    return (
      <div>
        <MaterialTable
          options={{
            pageSize: 10,
            pageSizeOptions: [10, 60],
          }}
          title={`Matches Information for ${currentUser.username}`}
          columns={columns}
          data={matches}
          editable={{
            onRowAdd: (newData) =>
              new Promise((resolve) => {
                setTimeout(() => {
                  resolve();
                  backendService
                    .addOne("matches", {
                      matchNo: newData.matchNo,
                      home: newData.home,
                      away: newData.away,
                      homeName: newData.homeName,
                      awayName: newData.awayName,
                      coefficient: newData.coefficient,
                      enable: newData.enable,
                      visability: newData.visability,
                    })
                    .then(setMatches((matches) => matches.concat(newData)));
                }, 600);
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve) => {
                setTimeout(() => {
                  resolve();
                  backendService
                    .updateOne("matches", {
                      _id: newData._id,
                      matchNo: newData.matchNo,
                      home: newData.home,
                      away: newData.away,
                      homeName: newData.homeName,
                      awayName: newData.awayName,
                      coefficient: newData.coefficient,
                      enable: newData.enable,
                      visability: newData.visability,
                    })
                    .then((data) => {
                      setMatches((matches) =>
                        matches.map((item) => {
                          if (item._id === data._id) {
                            return (item = data);
                          } else {
                            return item;
                          }
                        })
                      );
                    });
                  //   if (oldData) {
                  //     setState((prevState) => {
                  //       const data = [...prevState.data];
                  //       data[data.indexOf(oldData)] = newData;
                  //       return { ...prevState, data };
                  //     });
                  //   }
                }, 600);
              }),
            onRowDelete: (oldData) =>
              new Promise((resolve) => {
                setTimeout(() => {
                  resolve();
                  backendService
                    .deleteOne("matches", oldData._id)
                    .then(
                      setMatches((matches) =>
                        matches.filter((item) => item._id !== oldData._id)
                      )
                    );
                  //   setState((prevState) => {
                  //     const data = [...prevState.data];
                  //     data.splice(data.indexOf(oldData), 1);
                  //     return { ...prevState, data };
                  //   });
                }, 600);
              }),
          }}
        />
        <Link to="/">Home</Link>{" "}
        {currentUser.isAdmin && <Link to="/admin">Admin</Link>}{" "}
        <Link to="/login">Logout</Link>
      </div>
    );
  } else
    return (
      <div>
        <MaterialTable
          options={{
            pageSize: 10,
            pageSizeOptions: [10, 60],
          }}
          title={`Matches Information for ${currentUser.username}`}
          columns={columns.slice(0, -2)}
          data={matches}
        />
        <Link to="/">Home</Link>{" "}
        {currentUser.isAdmin && <Link to="/admin">Admin</Link>}{" "}
        <Link to="/login">Logout</Link>
      </div>
    );
}
export { InfoPage };
