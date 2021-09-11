import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

const Housie = () => {

    const history = useHistory()
    const [number, setNumber] = useState(0)

    const generatePDF = () => {
        if (number !== 0) {
            history.push({
                pathname: '/print',
                state: number
            })
        }
    }

    const onChange = (e) => {
        if (e.target.value < 0) {
            setNumber(0)
        } else {
            setNumber(e.target.value)
        }
    }

    return (
        <div>
            <input type="Number" value={number} onChange={onChange} placeholder="How Many ?" />
            <button onClick={generatePDF}> Generate PDF </button>
        </div>
    )
}

export default Housie