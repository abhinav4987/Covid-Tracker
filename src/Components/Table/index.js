import React from 'react'
import './style.css'
import numeral from 'numeral'
function Table({countries}) {
    
    
    const ourTable = countries.map((country) => (
        <tr className="table__row">
            <td>{country.country}</td>
            <td>{numeral(country.cases).format('0,0')}</td>
        </tr>
    ))

    return (
        <div className="table__main">
            {ourTable}          
        </div>
    )
}

export default Table
