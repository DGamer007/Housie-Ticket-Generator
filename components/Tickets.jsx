import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

const Tickets = ({ number }) => {

    const [finalData, setFinalData] = useState([])

    const limits = [
        { min: 0, max: 10 },
        { min: 10, max: 20 },
        { min: 20, max: 30 },
        { min: 30, max: 40 },
        { min: 40, max: 50 },
        { min: 50, max: 60 },
        { min: 60, max: 70 },
        { min: 70, max: 80 },
        { min: 80, max: 90 },
        { min: 90, max: 100 }
    ]

    const calculate = () => {
        const data = []
        const cols = []
        let number = 0
        let row = []
        let col = []

        for (let i = 0; i < 3; i++) {
            row = []
            for (let i = 0; i < 5; i++) {
                do {
                    number = Math.floor(Math.random() * 9)
                } while (row.includes(number))

                row.push(number)
            }

            row.sort()
            data.push(row)
        }
        console.log(data)

        for (let i = 0; i < 9; i++) {
            col = []
            for (let j = 0; j < 3; j++) {
                if (data[j].includes(i)) {
                    number = Math.floor(Math.random() * (limits[i].max - limits[i].min) + limits[i].min)
                    while (col.includes(number)) {
                        number = Math.floor(Math.random() * (limits[i].max - limits[i].min) + limits[i].min)
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

    const gatherDetails = () => {
        const data = calculate()
        const finalOutput = []
        let TDs = []

        for (let i = 0; i < 3; i++) {
            TDs = []
            for (let j = 0; j < 9; j++) {
                if (!isNaN(data[j][i])) {
                    TDs.push(<td key={uuidv4()}>{data[j][i]}</td>)
                } else {
                    TDs.push(<td key={uuidv4()}></td>)
                }
            }

            finalOutput.push(<tr key={uuidv4()}>{TDs}</tr>)

        }

        return finalOutput
    }

    const renderFinal = () => {
        const allTables = []
        let temp = []
        let counter = 0

        for (let i = 0; i < number; i++) {
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
                                gatherDetails()
                            }
                        </tbody>
                    </table>
                </div>
            )
            counter++
        }
        allTables.push(<div className="section" key={uuidv4()}>{temp}</div>)

        return allTables
    }

    const printToPDF = async () => {
        const sections = document.getElementsByClassName('section')
        const pdf = new jsPDF('p', 'mm', 'a4')
        let height = 0

        for (let i = 0; i < sections.length; i++) {
            height = parseInt(270 * (sections[i].childElementCount / 6))
            const canvas = await html2canvas(sections[i])
            const imageData = canvas.toDataURL('image/png')
            pdf.addImage(imageData, 'PNG', 23, 12, 160, height)
            if ((i + 1) < sections.length)
                pdf.addPage()
        }

        pdf.save('Tickets.pdf')
    }

    useEffect(() => {
        setFinalData(renderFinal())

        return () => {
            setFinalData([])
        }
    }, [])

    return (
        <div className="tickets_container">
            <button onClick={printToPDF}>Print to PDF</button>
            <div id="tickets">
                {finalData}
            </div>
        </div>
    )
}

export default Tickets