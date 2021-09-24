import React, { useState } from 'react'
import Tickets from './Tickets.jsx'

const Housie = () => {

    const [tickets, setTickets] = useState('')
    const [rows, setRows] = useState('')
    const [cols, setCols] = useState('')

    const [disabled, setDisabled] = useState(true)
    const [flag, setFlag] = useState(false)

    const generateTickets = async () => {
        if (rows < 3 || rows > 6) {
            alert('Number of Rows must be between 3 and 6')
            document.getElementById('rows').focus()
        } else if (cols < 6 || cols > 10) {
            alert('Number of Columns must be between 6 and 10')
            document.getElementById('cols').focus()
        } else {
            if (flag) {
                setFlag(false)
            }

            setTimeout(() => {
                setFlag(true)
            }, 100)
        }
    }

    const onTicketsChange = (e) => {
        setFlag(false)
        if (!e.target.value) {
            setDisabled(true)
            setTickets(e.target.value)
        }
        else if (e.target.value < 0) {
            setDisabled(true)
            setTickets(0)
        } else {
            setDisabled(false)
            setTickets(e.target.value)
        }
    }

    const onRowsChange = (e) => {
        setRows(e.target.value)
    }

    const onColsChange = (e) => {
        setCols(e.target.value)
    }

    return (
        <div>
            <div className="header_container">
                <input name="tickets" className="header_input" type="number" value={tickets} onChange={onTicketsChange} placeholder="How many Tickets?" />
                <input name="rows" id="rows" className="header_input" type="number" value={rows} onChange={onRowsChange} placeholder="How many Rows?" />
                <input name="cols" id="cols" className="header_input" type="number" value={cols} onChange={onColsChange} placeholder="How many Columns?" />
                <button onClick={generateTickets} disabled={disabled}> Generate Tickets </button>
            </div>
            <br />
            <br />
            {
                flag ? <Tickets number={tickets} rows={parseInt(rows)} columns={parseInt(cols)} /> : undefined
            }
        </div>
    )
}

export default Housie