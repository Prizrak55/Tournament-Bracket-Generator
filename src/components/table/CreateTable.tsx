import StyleInput from "components/style-components/inputs/Input"
import { Box, CenterContainer, Text } from "components/style-components/matches/components"

import { useState } from "react"
import styled from "styled-components"
import StyleButton from "../style-components/buttons/Button"


const CreateTable = () => {
  // tour1: [ { player1, player2 }, { player1, player2 }, { player1, player2 }, { player1, player2 } ]
  // tour2: [ { player1, player2 }, { player1, player2 } ]
  // tour3: [ { player1, player2 } ]

  const [table, setTable]: any = useState([])

  console.log(data.length)
  //создание первого тура
  const createMatchs = (data: any) => {
    let teamsTDB = 0;
    let dataLength = data.length;

    if (dataLength <= 4) {
      const remainder = dataLength % 4
      const addСommands = remainder === 0 ? 0 : 4 - remainder
      dataLength = dataLength + addСommands
      teamsTDB = addСommands
    } else if (dataLength > 4 && dataLength <= 16) {
      const remainder = dataLength % 8
      console.log(remainder)
      const addСommands = remainder === 0 ? 0 : 8 - remainder
      dataLength = dataLength + addСommands
      teamsTDB = addСommands
    } else if (dataLength > 16) {
      const remainder = dataLength % 32
      console.log(remainder)
      const addСommands = remainder === 0 ? 0 : 32 - remainder
      dataLength = dataLength + addСommands
      teamsTDB = addСommands
    }



    let matches: any = []

    for (var j = 0; j < data.length - teamsTDB; j = j + 2) {
      matches.push({ player1: data[j + teamsTDB], player2: data[j + 1 + teamsTDB], score1: null, score2: null })
    }
    for (var i = 0; i < teamsTDB; i++) {
      matches.splice(Math.round(matches.length / 2), 0, { player1: data[i], player2: 'TDB', score1: 3, score2: 0 })
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

    scoreCheck(dataTable)

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

  const scoreCheck = (newTable: any) => {
    const dataForTable = newTable.map((item: any, arrNumber: number) => {

      return item.map((item2: any, arrNumber2: number) => {
        if (newTable[arrNumber - 1]) {
          const first1 = newTable[arrNumber - 1][arrNumber2 * 2].score1 > newTable[arrNumber - 1][arrNumber2 * 2].score2 ? newTable[arrNumber - 1][arrNumber2 * 2].player1 : ''
          const first2 = newTable[arrNumber - 1][arrNumber2 * 2].score1 < newTable[arrNumber - 1][arrNumber2 * 2].score2 ? newTable[arrNumber - 1][arrNumber2 * 2].player2 : ''

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
    setTable(dataForTable)
  }
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
    scoreCheck(newTable)
  }

  return (
    <>
      {/* <p>введите количество команд:</p>
      <input value={teams} onChange={(e) => setTeams(Number(e.target.value))} />
      <p>Кол-во команд: {teams}</p> */}
      <StyleButton primary={'red'} onClick={() => createTable()}>Создать таблицу</StyleButton>

      <Box>Турнирная сетка</Box>

      <Box display="flex" mt='12px'>
        {table.map((team: any, ind: number) => {
          return (
            <Box ml='8px' display="flex" flexDirection='column' justifyContent='space-around'>
              {team.map((item: any, index: number) => {
                let mt = 20;
                let hei = geometriProgression(90, ind - 1) 

                // if (ind !== 0) {
                //   hei = geometriProgression(100, ind - 1) + geometriProgression(20, ind - 1)
                // }

                // if (item.player1 === 'TDB' || item.player2 === 'TDB') {
                //   return (
                //     <Box sx={{ mt: `${mt}px`, width: 180, height: hei, borderLeftWidth: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                //     </Box>
                //   )
                // }

                return (
                  <Box borderRadius='5px' position='relative' bgcolor='white' mt='16px' boxShadow='0px 5px 10px 2px rgba(34, 60, 80, 0.2)' display='flex' alignItems='center' width='180px'>
                    {ind  !== 0 &&
                      <Box position='absolute' zIndex={-1} borderLeft='none' border='3px solid #c7d1e7' height={`${hei +'px'}`} width='90px' left='-8px'  />
                    }
                    <Box display='flex' alignItems='center'>
                      <Box width='142px'>
                        <Text p='8px 0 8px 8px'>{item.player1 ? item.player1 : 'TDB'}</Text>
                        <Box mt='1px' mb='1px' borderBottom='2px solid #c7d1e7' />
                        <Text p='8px 0 8px 8px'>{item.player2 ? item.player2 : 'TDB'}</Text>
                      </Box>

                      <Box borderLeft='2px solid #c7d1e7'>
                        <StyleInput value={table[ind][index].score1} width='20px' padding='8px' onChange={(e: any) => setScore(e, ind, index, 'first')} />
                        <Box mt='1px' mb='1px' />
                        <StyleInput value={table[ind][index].score2} width='20px' padding='8px' onChange={(e: any) => setScore(e, ind, index, 'last')} />
                      </Box>

                    </Box>

                    {ind === table.length - 1 && index === team.length - 1 ?
                      <Box>
                        {item.score1 && item.score2 &&
                          <Text >{item.score1 > item.score2 ? item.player1 : item.player2}</Text>}
                        <Box sx={{ border: '1px solid red', width: 150 }} />
                      </Box>
                      : ''}
                  </Box>
                  // <CenterContainer>
                  //   <Box sx={{ mt: `${mt}px`, border: '1px solid red', width: 180, height: hei, borderLeftWidth: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                  //     {/* <Box sx={{mt: 1, border: '1px solid red', width: 200,mr:2 }}> */}
                  //     <Box sx={{ display: 'flex', alignItems: 'center', boxShadow: '0px 5px 10px 2px rgba(34, 60, 80, 0.2)', p: '8px 0 8px 8px', }}>
                  //       <Box sx={{ width: 100 }}>
                  //         <Typography sx={{ fontSize: 13, p: 1 }}>{item.player1 ? item.player1 : 'TDB'}</Typography>
                  //         <Box sx={{ borderBottom: '2px solid #c7d1e7' }} />
                  //         <Typography sx={{ fontSize: 13, p: 1 }}>{item.player2 ? item.player2 : 'TDB'}</Typography>
                  //       </Box>

                  //       <Box sx={{ borderLeft: '2px solid #c7d1e7', }}>
                  //         <StyleInput value={table[ind][index].score1} width={20} padding={8} onChange={(e: any) => setScore(e, ind, index, 'first')} />
                  //         <Box sx={{ height: '2px' }} />
                  //         <StyleInput value={table[ind][index].score2} width={20} padding={8} onChange={(e: any) => setScore(e, ind, index, 'last')} />
                  //       </Box>
                  //     </Box>
                  //   </Box>
                  //   {ind === table.length - 1 && index === team.length - 1 ?
                  //     <Box>
                  //       {item.score1 && item.score2 &&
                  //         <Typography sx={{ fontSize: 12, ml: 2 }}>{item.score1 > item.score2 ? item.player1 : item.player2}</Typography>}
                  //       <Box sx={{ border: '1px solid red', width: 150 }} />
                  //     </Box>
                  //     : ''}
                  // </CenterContainer>
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
const data = ['Cпартак', 'Зенит', "ЦСКА", "Текстильщик", "Барса"]

export default CreateTable