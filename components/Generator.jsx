import React from 'react'
import { useLocation } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

const Generator = () => {

    const limits = [
        { min: 0, max: 9 },
        { min: 10, max: 19 },
        { min: 20, max: 29 },
        { min: 30, max: 39 },
        { min: 40, max: 49 },
        { min: 50, max: 59 },
        { min: 60, max: 69 },
        { min: 70, max: 79 },
        { min: 80, max: 89 },
        { min: 90, max: 99 }
    ]

    const history = useLocation()

    const calculate = () => {
        const data = []
        const cols = []
        let number = 0
        let row = []
        let col = []

        for (let i = 0; i < 3; i++) {
            row = []
            for (let i = 0; i < 5; i++) {
                number = parseInt(Math.random() * (9))
                while (row.includes(number))
                    number = parseInt(Math.random() * (9))

                row.push(number)
            }

            row.sort()
            data.push(row)
        }

        for (let i = 0; i < 9; i++) {
            col = []
            for (let j = 0; j < 3; j++) {
                if (data[j].includes(i)) {
                    number = parseInt(Math.random() * (limits[i].max - limits[i].min) + limits[i].min)
                    while (col.includes(number)) {
                        number = parseInt(Math.random() * (limits[i].max - limits[i].min) + limits[i].min)
                    }

                    col.push(number)
                } else {
                    col.push(undefined)
                }
            }

            cols.push(col)
        }

        return cols
    }

    const renderFunction = () => {
        const data = calculate()
        const finalOutput = []
        let TDs = []

        for (let i = 0; i < 3; i++) {
            TDs = []
            for (let j = 0; j < 9; j++) {
                if (data[j][i]) {
                    TDs.push(<td key={uuidv4()}>{data[j][i]}</td>)
                } else {
                    TDs.push(<td key={uuidv4()}></td>)
                }
            }

            finalOutput.push(<tr key={uuidv4()}>{TDs}</tr>)

        }

        return finalOutput
    }

    const printToPDF = async () => {
        const sections = document.getElementsByClassName('section')
        const pdf = new jsPDF('p', 'mm', 'a4')

        for (let i = 0; i < sections.length; i++) {
            const canvas = await html2canvas(sections[i])
            const imageData = canvas.toDataURL('image/png')
            pdf.addImage(imageData, 'PNG', 37, 7)
            if ((i + 1) < sections.length)
                pdf.addPage()
        }

        pdf.save('Tickets.pdf')
    }

    return (
        <div className="generator_container">
            <button onClick={printToPDF}>Print to PDF</button>
            <div id="tickets">
                {
                    (() => {
                        const allTables = []
                        let temp = []
                        let counter = 0

                        for (let i = 0; i < history.state; i++) {
                            if (counter === 6) {
                                counter = 0
                                allTables.push(<div className="section" key={uuidv4()}>{temp}</div>)
                                temp = []
                            }
                            temp.push(
                                <div key={uuidv4()} className="ticket">
                                    <table key={uuidv4()}>
                                        <tbody key={uuidv4()}>
                                            {
                                                renderFunction()
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            )
                            counter++
                        }
                        allTables.push(<div className="section" key={uuidv4()}>{temp}</div>)

                        return allTables
                    })()
                }
            </div>
        </div>
    )
}

export default Generator