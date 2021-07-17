import React, { useState, useEffect } from "react";
import { CircularProgress } from "@material-ui/core";
import MaterialTable from "material-table";
import { backendService } from "./backend.service";
import { MyMenu } from "./MyMenu";

function ResultPage() {
  const [currentUser, setCurrentUser] = useState({});
  const [columns, setColumns] = useState({ loading: true });
  const [data, setData] = useState({ loading: true });
  const [pagesNumber, setPagesNumber] = useState({ loading: true});

  useEffect(() => {
    setCurrentUser(JSON.parse(localStorage.getItem("user")));

    (async () => {
      const users = await backendService.getAll("users");
      const matches = await backendService.getAll("matches");
      let allMoney = 0;
      let stats = new Array(matches.length);
      for (let i=0; i<stats.length; i++){
        stats[i] = {home:0, draw:0, away:0};
      }

      const data = users.map((user) => {
        let temp = Object.assign({}, user);
        temp.user = user.username;
        temp.pets = 0;
        temp.money = 0;
        let money = 0;
        for (let i = 1; i <= matches.length; i++) { //количество матчей явное
          let match = user.stakes.find((item) => item.matchNo === i);
          let realMatch = matches.find((item) => item.matchNo === i);
          if (
            match !== undefined &&
            realMatch !== undefined &&
            realMatch.visability === false
          )
              continue;
          
          const prevCopyStat =  Object.assign({}, stats[temp.stakes[i-1].matchNo-1]);
          if (temp.stakes[i-1].home > temp.stakes[i-1].away){
            stats[temp.stakes[i-1].matchNo-1] = {home:prevCopyStat.home+1, draw:prevCopyStat.draw, away:prevCopyStat.away};
          }    
          else if (temp.stakes[i-1].home < temp.stakes[i-1].away) {
            stats[temp.stakes[i-1].matchNo-1] = {home:prevCopyStat.home, draw:prevCopyStat.draw, away:prevCopyStat.away+1};
          }
          else {
            stats[temp.stakes[i-1].matchNo-1] = {home:prevCopyStat.home, draw:prevCopyStat.draw+1, away:prevCopyStat.away};
          };

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
        allMoney = allMoney + money;
        temp.money = money;
        return temp;
      });
      setData(data);
     


      const sortedMatches = backendService.getSortedMatches(matches);
      const onlyMatches = sortedMatches.map((match, index) => {
        let add1 =
          match.home !== null && match.home !== undefined
            ? `\n\n\n(${match.home}:${match.away})`
            : "";
        let add2 = `\n\n\n/${stats[match.matchNo-1].home}-${stats[match.matchNo-1].draw}-${stats[match.matchNo-1].away}/`
        return {
          title: `${match.homeName} - ${match.awayName} ${add1} ${add2}`,
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
                    width: 120
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
        { title: `Выйгрыш, ${allMoney} ₽ `, field: "money"}
      ].concat(onlyMatches);
      setColumns(columns);
      setPagesNumber(users.length);


    })();
  }, []);

  if (columns.loading || data.loading || pagesNumber.loading ) return <div><CircularProgress/></div>;

  return (
    <div>
      <MyMenu  currentUser = {currentUser} />
      <MaterialTable
        options={{
          pageSize: pagesNumber,
          pageSizeOptions: [pagesNumber, 40],
        }}
        title={`Это общая таблица результатов, ${currentUser.username}, тут ничего не нужно редактировать, просто посмотри как справляются другие игроки`}
        columns={columns}
        data={data}
      />
    </div>
  );
}
export { ResultPage };
