import React from 'react';
import numeral from "numeral"
import {Circle, Popup} from 'react-leaflet';

const casesTypeColors = {
    cases: {
      hex: "#CC1034",
      rgb: "rgb(204, 16, 52)",
      multiplier: 100,
    },
    recovered: {
      hex: "#7dd71d",
      rgb: "rgb(125, 215, 29)",
      multiplier: 120,
    },
    deaths: {
      hex: "#111",
      rgb: "rgb(251, 68, 67)",
      multiplier: 700,
    },
  };

export const showDataOnMap = (data, caseType) => (

    data.map(country => (
        <Circle 
            center = {[country.countryInfo.lat, country.countryInfo.long]}
            fillOpacity={0.4}
            pathOptions={{color: casesTypeColors[caseType].hex,
                fillColor: casesTypeColors[caseType].hex }}
            radius={
                Math.sqrt(country[caseType]) * casesTypeColors[caseType].multiplier
            }
        >
        
        <Popup>
            <div className="info-container">
                <div
                    className="info-flag"
                    style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
                ></div>
                <div className="info-name">{country.country}</div>
                <div className="info-confirmed">
                    Cases: {numeral(country.cases).format("0,0")}
                </div>
                <div className="info-recovered">
                    Recovered: {numeral(country.recovered).format("0,0")}
                </div>
                <div className="info-deaths">
                    Deaths: {numeral(country.deaths).format("0,0")}
                </div>
            </div>
      </Popup>
        </Circle>
    ))
);