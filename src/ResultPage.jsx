import React, { useState, useEffect } from "react";
import { CircularProgress } from "@material-ui/core";
import MaterialTable from "material-table";
import { backendService } from "./backend.service";
import { MyMenu } from "./MyMenu";

function ResultPage() {
  const [currentUser, setCurrentUser] = useState({});
  const [columns, setColumns] = useState({ loading: true });
  const [data, setData] = useState({ loading: true });

  useEffect(() => {
    setCurrentUser(JSON.parse(localStorage.getItem("user")));

    (async () => {
      const users = await backendService.getAll("users");
      const matches = await backendService.getAll("matches");
      // const sortedMatches = matches.sort((a, b) => {
      //   return a.matchNo - b.matchNo;
      // });
      const sortedMatches = backendService.getSortedMatches(matches);
      const onlyMatches = sortedMatches.map((match, index) => {
        let add =
          match.home !== null && match.home !== undefined
            ? `(${match.home}:${match.away})`
            : "";
        return {
          title: `${match.homeName} - ${match.awayName} ${add}`,
          field: `${match.matchNo}`,
          render: (rowData) => (
            <div
              style={{
                backgroundColor:
                  rowData[`pets_${index + 1}`] === 5
                    ? "#C9B037"
                    : rowData[`pets_${index + 1}`] === 3
                    ? "#B4B4B4"
                    : rowData[`pets_${index + 1}`] === 1
                    ? "#AD8A56"
                    : "white",
              }}
            >
              {rowData[index + 1]}
            </div>
          ),
        };
      });
      const columns = [
        { title: "Пользователи", field: "user" },
        { title: "Очки", field: "pets" },
        { title: "Выйгрыш, ₽", field: "money"}
      ].concat(onlyMatches);
      setColumns(columns);

      const data = users.map((user) => {
        let temp = Object.assign({}, user);
        temp.user = user.username;
        temp.pets = 0;
        temp.money = 0;
        let money = 0;
        for (let i = 1; i < 52; i++) {
          let match = user.stakes.find((item) => item.matchNo === i);
          let realMatch = matches.find((item) => item.matchNo === i);
          if (
            match !== undefined &&
            realMatch !== undefined &&
            realMatch.visability === false
          )
            continue;
          money = Math.round(temp.stakes[i-1].money)+money; 
          let moneyView = temp.stakes[i-1].money!==0?`; ${Math.round(temp.stakes[i-1].money)}₽`:'';
          let pets =
            match !== undefined && realMatch !== undefined
              ? backendService.calcPets(
                  match.home,
                  match.away,
                  realMatch.home,
                  realMatch.away
                )
              : 0;
          temp[i] =
            match.home !== null && match.home !== undefined
              ? `${match.home}:${match.away} (${pets}${moneyView})`
              : "";
          temp[`pets_${i}`] = pets;
          temp.pets = temp.pets + pets;
        }
        temp.money = money;
        return temp;
      });
      setData(data);
    })();
  }, []);

  if (columns.loading || data.loading) return <div><CircularProgress/></div>;

  return (
    <div>
      <MyMenu  currentUser = {currentUser} />
      <MaterialTable
        options={{
          pageSize: 15,
          pageSizeOptions: [15, 30],
        }}
        title={`Это общая таблица результатов, ${currentUser.username}, тут ничего не нужно редактировать, просто посмотри как справляются другие игроки`}
        columns={columns}
        data={data}
      />
    </div>
  );
}
export { ResultPage };
