import { Box, Divider, Typography } from "@mui/material"
import { useState } from "react"

const CreateTable = () => {
  // tour1: [ { player1, player2 }, { player1, player2 }, { player1, player2 }, { player1, player2 } ]
  // tour2: [ { player1, player2 }, { player1, player2 } ]
  // tour3: [ { player1, player2 } ]

  const [table, setTable]: any = useState([])


  //создание первого тура
  const createMatchs = (data: any) => {
    let matches = []
    for (var i = 0; i < data.length; i = i + 2) {
      matches.push({ player1: data[i], player2: data[i + 1], score1: null, score2: null })
    }
    console.log(matches, 'форматированные матчи')
    return matches
  }

  const createTable = () => {
    let matches = createMatchs(data)
    let dataTable = [];
    let cumTeams = matches.length;

    while (cumTeams > 0) {

      //добавление тура
      dataTable.push(matches)
      cumTeams = Math.trunc(cumTeams / 2)

      //каждый следующий тур не должен иметь команды
      matches = [];
      for (var i = 0; i <= cumTeams; i = i + 2) {
        matches.push({ player1: '', player2: '', score1: null, score2: null })
      }
    }
    
    setTable(dataTable)
  }
  console.log(table, 'данные таблицы')

  return (
    <>
      {/* <p>введите количество команд:</p>
      <input value={teams} onChange={(e) => setTeams(Number(e.target.value))} />
      <p>Кол-во команд: {teams}</p> */}
      <button onClick={() => createTable()}>Создать таблицу</button>

      <Box sx={{ fontSize: 24, fontWeight: 600, mt: 4 }}>Турнирная сетка</Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {table.map((team: any, ind: number) => {
          return (
            <Box sx={{ ml: 5, mt: 2, border: '1px solid black', display: 'flex', flexDirection: 'column', justifyContent: 'space-around', height: 540 }}>
              {team.map((item: any, index: number) => {
                
                return (
                  <Box sx={{ p: 1, mt: 1, border: '1px solid red', width: 100 }}>
                    <Typography sx={{ fontSize: 12 }}>{item.player1 ? item.player1 : '...'}</Typography>
                    <Divider sx={{ mt: '2px', mb: '2px' }} />
                    <Typography sx={{ fontSize: 12 }}>{item.player2 ? item.player2 : '...'}</Typography>
                  </Box>
                )
              })}
            </Box>
          )
        })}
      </Box>
    </>
  )
}
//данные
const data = ['Cпартак', 'Зенит', "ЦСКА", "Текстильщик", "Ахмат", "Москва", "Крылья Советов", "Луч-Энергия"]

export default CreateTable