import React, { useState } from 'react'
import Tickets from './Tickets.jsx'

const Housie = () => {

    const [number, setNumber] = useState(0)
    const [disabled, setDisabled] = useState(true)
    const [flag, setFlag] = useState(false)

    const generateTickets = async () => {
        if (flag) {
            setFlag(false)
        }

        setTimeout(() => {
            setFlag(true)
        }, 100)
    }

    const onChange = (e) => {
        setFlag(false)
        if (!e.target.value) {
            setDisabled(true)
            setNumber(e.target.value)
        }
        else if (e.target.value < 0) {
            setDisabled(true)
            setNumber(0)
        } else {
            setDisabled(false)
            setNumber(e.target.value)
        }
    }

    return (
        <div>
            <div className="header_container">
                <input className="header_input" type="Number" value={number} onChange={onChange} placeholder="How Many ?" />
                <button onClick={generateTickets} disabled={disabled}> Generate Tickets </button>
            </div>
            <br />
            <br />
            {
                flag ? <Tickets number={number} /> : undefined
            }
        </div>
    )
}

export default Housie