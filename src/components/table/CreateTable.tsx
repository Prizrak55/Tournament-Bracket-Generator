import { Box, Button, Divider, TextField, Typography } from "@mui/material"
import { useState, useEffect } from "react"

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
      for (var i = 0; i <= cumTeams - 1; i++) {
        matches.push({ player1: '', player2: '', score1: null, score2: null })
      }
    }

    setTable(dataTable)
  }
  console.log(table, 'данные таблицы')
  const geometriProgression = (start = 50, quant = 3,) => {
    var startNumber = start;
    var multiplier = 2;
    var quantity = quant;
    for (var i = 0; i < quantity; i++) {
      startNumber *= multiplier;
    }
    return startNumber
  }

  // useEffect(() => {
  //   geometriProgression()


  // }, [])
  // изменение значения счета
  const setScore = (e: any, ind: number, index: number, team: string) => {

    let newTable = table.map((item: any, arrNumber: number) => {
      return item.map((item2: any, arrNumber2: number) => {
        if (arrNumber === ind && arrNumber2 === index) {
          if (team === 'first') {
            return ({
              ...item2,
              score1: Number(e.target.value)
            })
          } else {
            return ({
              ...item2,
              score2: Number(e.target.value)
            })
          }
        }
        return item2
      })
    })

    const scoreCheck = newTable.map((item: any, arrNumber: number) => {

      return item.map((item2: any, arrNumber2: number) => {
        if (newTable[arrNumber - 1]) {
          const first1 = newTable[arrNumber - 1][arrNumber2 * 2].score1 > newTable[arrNumber - 1][arrNumber2* 2].score2 ? newTable[arrNumber - 1][arrNumber2* 2].player1 : ''
          const first2 = newTable[arrNumber - 1][arrNumber2 * 2].score1 < newTable[arrNumber - 1][arrNumber2* 2].score2 ? newTable[arrNumber - 1][arrNumber2* 2].player2 : ''

          const last1 = newTable[arrNumber - 1][arrNumber2 * 2 + 1].score1 > newTable[arrNumber - 1][arrNumber2 * 2 + 1].score2 ? newTable[arrNumber - 1][arrNumber2 * 2 + 1].player1 : ''
          const last2 = newTable[arrNumber - 1][arrNumber2 * 2 + 1].score1 < newTable[arrNumber - 1][arrNumber2 * 2 + 1].score2 ? newTable[arrNumber - 1][arrNumber2 * 2 + 1].player2 : ''

          return ({
            ...item2,
            player1: first1 ? first1 : first2,
            player2: last1 ? last1 : last2
          })
        }

        return item2
      })
    })





    setTable(scoreCheck)
  }
  return (
    <>
      {/* <p>введите количество команд:</p>
      <input value={teams} onChange={(e) => setTeams(Number(e.target.value))} />
      <p>Кол-во команд: {teams}</p> */}
      <button onClick={() => createTable()}>Создать таблицу</button>

      <Box sx={{ fontSize: 24, fontWeight: 600, mt: 4 }}>Турнирная сетка</Box>
      <Button onClick={() => console.log(table, 'таблица')}>123</Button>
      <Box sx={{ display: 'flex', }}>
        {table.map((team: any, ind: number) => {
          return (
            <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
              {team.map((item: any, index: number) => {
                let mt = 20;
                let hei = 100;

                if (ind !== 0) {
                  hei = geometriProgression(100, ind - 1) + geometriProgression(20, ind - 1)
                }

                return (
                  <Box sx={{ mt: `${mt}px`, border: '1px solid red', width: 150, height: hei, borderLeftWidth: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    {/* <Box sx={{mt: 1, border: '1px solid red', width: 200,mr:2 }}> */}
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box sx={{ width: 100, }}>
                        <Typography sx={{ fontSize: 12 }}>{item.player1 ? item.player1 : 'TDB'}</Typography>
                        <Divider sx={{ mt: '2px', mb: '2px' }} />
                        <Typography sx={{ fontSize: 12 }}>{item.player2 ? item.player2 : 'TDB'}</Typography>
                      </Box>
                      <Box>
                        {ind}
                        {index}
                        <TextField
                          sx={{ mr: 1, }}
                          required
                          size="small"
                          variant="outlined"
                          label=""
                          value={table[ind][index].score1}
                          onChange={(e: any) => setScore(e, ind, index, 'first')} />
                        <Divider sx={{ mt: '2px', mb: '2px' }} />
                        <TextField
                          sx={{ mr: 1, }}
                          required
                          size="small"
                          variant="outlined"
                          label=""
                          value={table[ind][index].score2}
                          onChange={(e: any) => setScore(e, ind, index, 'last')} />
                      </Box>
                    </Box>

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
const data = ['Cпартак', 'Зенит', "ЦСКА", "Текстильщик", "Ахмат", "Москва", "Крылья Советов"]

export default CreateTable