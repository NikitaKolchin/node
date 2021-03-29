import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { backendService } from "./backend.service";
import { MyMenu } from "./MyMenu";
import { CircularProgress } from "@material-ui/core";

function InfoPage() {
  const [currentUser, setCurrentUser] = useState({});
  const [matches, setMatches] = useState({ loading: true });

  const columns = [
    { title: "_id", field: "_id", hidden: true },
    { title: "№", field: "matchNo", defaultSort: "asc" },
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
    backendService.getAll("matches").then((matches) => setMatches(matches));
  }, []);

  if (matches.loading) return <div><CircularProgress/> </div>;

  if (currentUser.isAdmin) {
    return (
      <div>
        <MyMenu currentUser = {currentUser} />
        <MaterialTable
          options={{
            pageSize: 10,
            pageSizeOptions: [10, 51],
          }}
          title={`Информация о матчах, ${currentUser.username}`}
          columns={columns}
          data={matches}
          editable={{
            onRowAdd: (newData) =>
              backendService
                .addOne("matches", {
                  ...newData,
                })
                .then(setMatches((matches) => matches.concat(newData))),
            onRowUpdate: (newData, oldData) =>
              backendService
                .updateOne("matches", {
                  ...newData,
                })
                .then((data) =>
                  setMatches((matches) => matches.map((item) => (item._id === data._id ? data : item)))),
            onRowDelete: (oldData) =>
                  backendService
                    .deleteOne("matches", oldData._id)
                    .then(setMatches((matches) => matches.filter((item) => item._id !== oldData._id)))
          }}
        />
      </div>
    );
  } else
    return (
      <div>
        <MyMenu currentUser = {currentUser} />
        <MaterialTable
          options={{
            pageSize: 10,
            pageSizeOptions: [10, 51],
          }}
          title={`${currentUser.username}, это наш эталон, реальный счёт, коэффициенты на матчи, их доступность для ставок и видимость собраны тут`}
          columns={columns.slice(0, -2)}
          data={matches}
        />
      </div>
    );
}
export { InfoPage };
