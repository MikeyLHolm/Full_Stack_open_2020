import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import './index.css'

const Anecdote = ({ header, anecdote, index, votes }) => (
    <div>
        <h1>{header}</h1>
        {anecdote[index]}<br />
        has {votes[index]} votes
    </div>
    )

const Button = (props) => (
    <button onClick={props.handleClick}>{props.text}</button>
)

const App = (props) => {
    const [selected, setSelected] = useState(0)
    const [votes, setVotes] = useState(new Array(6).fill(0))

    const handleNext = () => {
        let nxt = Math.floor( Math.random() * 6)
        while (nxt === selected) {
            nxt = Math.floor( Math.random() * 6)
        }
        return (
            setSelected(nxt)
        )
    }

    const handleVote = () => {
        const copy = [ ...votes]
        copy[selected] += 1
        setVotes(copy)
    }

    const mostVoted = () => {
        let i
        let mostVoted = 0
        for (i = 1; i < votes.length; i++) {
            if (votes[i] > votes[mostVoted]) {
                mostVoted = i
            }
        }
        return (
            mostVoted
        )
    }

    return (
        <div>
            <Anecdote header="Anecdote of the day" anecdote={props.anecdotes} index={selected} votes={votes} />
            <Button handleClick={handleVote} text="vote" />
            <Button handleClick={handleNext} text="next anecdote" />
            <Anecdote header="Anecdote with most votes" anecdote={props.anecdotes} index={mostVoted()} votes={votes} />
        </div>
    )
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)