import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({handleClick, text}) => {
    return (
        <button onClick={handleClick}>{text}</button>
    );
}

const Statistic = ({name, value}) => {
  if(["good", "bad", "neutral", "all"].includes(name)){
    return <tr>
      <td>{name}</td>
      <td>{value}</td>
      </tr>
  }
  if(name === "average"){
    return <tr>
      <td>{name}</td>
      <td>{(1*value.good + 0*value.neutral - 1*value.bad)/value.all}</td>
      </tr>
  }
  if(name === "percentage"){
    return <tr>
      <td>{name}</td>
      <td>{value.good/value.all * 100}%</td>
      </tr>
  }
}


const Statistics = ({good, neutral, bad, all}) => {
  if(all===0){
    return <div>
      <h1>Statistics</h1>
      no feedback given
      </div>
  }
  return (
    <div>
      <h1>Statistics</h1>
      <table>
        <tbody>
          <Statistic name="good" value={good}/>
          <Statistic name="neutral" value={neutral}/>
          <Statistic name="bad" value={bad}/>
          <Statistic name="all" value={all}/>
          <Statistic name="average" value={{good:good, neutral:neutral, bad:bad, all:all}}/>
          <Statistic name="percentage" value={{good:good, all:all}}/>
        </tbody>
      </table>
    </div>
  );
}


const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const all = good + neutral + bad
  return (
  <div>
    <h1>give feedback</h1>
    <Button handleClick={() => setGood(good + 1)} text="good"/>
    <Button handleClick={() => setNeutral(neutral + 1)} text="neutral"/>
    <Button handleClick={() => setBad(bad + 1)} text="bad"/>  
    <Statistics good={good} neutral={neutral} bad={bad} all={all}/>      
  </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)