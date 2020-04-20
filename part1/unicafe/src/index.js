import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import './index.css'

const Button = (props) => (
    <button onClick={props.handleClick}>{props.text}</button>
)

const Statistic = (props) => {
    return (
        <tr>
            <td>
                {props.text}
            </td>
            <td>
                {props.value}{props.pct}
            </td>
        </tr>
    )
}

const Statistics = ({ good, neutral, bad }) => {
    const all = good + neutral + bad
    const avg = (-bad + good) / all
    const pos = good * 100 / all

    if (all === 0) {
        return (
            <div>
                No feedback given
            </div>
        )
    }

    return (
        <table>
            <tbody>
                <Statistic text="good" value={good} />
                <Statistic text="neutral" value={neutral} />
                <Statistic text="bad" value={bad} />
                <Statistic text="all" value={all} />
                <Statistic text="average" value={avg} />
                <Statistic text="positive" value={pos} pct="%"/>
            </tbody>
        </table>
        // <div>neutral {good}</div>
        // <div>        {bad} {good}</div>
    )
}


const App = () => {
    // save clicks of each button to own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    return (
        <div>
            <h1>give feedback</h1>
            <Button handleClick={() => setGood(good + 1)} text="good" />
            <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
            <Button handleClick={() => setBad(bad + 1)} text="bad" />
            <h1>statistics</h1>
            <Statistics good={good} neutral={neutral} bad={bad} />
        </div>
    )
}

ReactDOM.render(<App />,
    document.getElementById('root')
)