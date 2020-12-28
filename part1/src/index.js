import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
    const [value, setValue] = useState(10)

    return (
        <div>
            {value}
            <button>reset to zero</button>
        </div>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)
