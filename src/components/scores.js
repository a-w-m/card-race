import axios from "axios"
import React, { useEffect, useState } from "react"
import styles from "./scores.module.css"

const Scores = props => {
  const [data, setData] = useState([])

  useEffect(() => {
    async function fetchData() {
      const result = await axios("/api/scores")
      setData(
        result.data
          .sort((a, b) => {
            return a.time - b.time
          })
          .slice(0, 10)
      )
    }

    fetchData()
  }, [])

  return (
    <div className={styles.gridScores}>
      <h1>Scoreboard</h1>
      {data.map((score, index) => {
        return (
          <ul key={score._id}>
            <p>{index + 1}. {score.name}</p>
            <p>{score.time}</p>
          </ul>
        )
      })}
    </div>
  )
}

export default Scores
