import React from 'react'
import numeral from 'numeral'
import { Card, CardContent,Typography } from '@material-ui/core';
import './style.css'


function InfoBox({active, onClick ,title, change, total, isGreen}) {
    return (
        <Card onClick={onClick} className={`infoBox ${active && 'infoBox--selected'}  `} >
            <CardContent>
            <Typography className="infoBox__title" color="textSecondary">
                {title}
            </Typography>

            <h2 className={`infoBox__cases ${isGreen && 'infoBox__cases--green'}`}>{change === 0 ? <span>{change}</span> : <span>+{numeral(change).format("0.0a")}</span>}</h2>

            <Typography className="infoBox__total"color="textSecondary">
                {numeral(total).format("0.0a")} Total
            </Typography>

            </CardContent>
        </Card>
    )
}
export default InfoBox
