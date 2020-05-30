import axios from "axios"
import React, { useEffect, useState } from "react"

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
    <div className="gridScores">
      <h1>Leaderboard</h1>
      {data.map((score, index) => {
        return (
          <ul key={score._id}>
            {" "}
            {index + 1}. {score.name}-{score.time}
          </ul>
        )
      })}
    </div>
  )
}

export default Scores
