import {useState, useEffect} from 'react';
import './App.css';
import { FormControl, Select, MenuItem, Card, CardContent  } from '@material-ui/core';
import InfoBox from './Components/InfoBox'
import Map from './Components/Map'
import Table from './Components/Table'
import LineGraph from './Components/LineGraph'
import "leaflet/dist/leaflet.css";
import { Line } from 'react-chartjs-2';
function App() {


  const [countries, setCountries] = useState([  ]);
  const [selectedCountry,setSelectedCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([])
  const [mapCenter, setMapCenter] = useState([20,77]);
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState('cases');
  useEffect(()=> {
    fetch("https://disease.sh/v3/covid-19/all")
              .then((response) => response.json())
              .then((data) => {
                setCountryInfo(data);
              })
  },[])
  
  useEffect(()=> {
    // an async request
    const getCountriesData = async () => {
    await fetch("https://disease.sh/v3/covid-19/countries")
              .then((response) => response.json())
              .then((data) => {
                
                setTableData(data);
                const countries = data.map((country)=> (
                  {
                    name:country.country,
                    value: country.countryInfo.iso2
                  }
                ));
                setMapCountries(data);
                setCountries(countries);
      })

      
    }
      getCountriesData();
  }, [])

  useEffect(() => {

  },[mapCenter, mapZoom]);
  const onSelectChange = async (event) => {
      const countryCode = event.target.value;
      if(countryCode === 'worldwide') {

        fetch("https://disease.sh/v3/covid-19/all")
              .then((response) => response.json())
              .then((data) => {
                console.log(data);
                setCountryInfo(data);
              })
      }else {
      console.log("we have ---> " , countryCode);

      const url = countryCode === "worldwide" ? "https://disease.sh/v3/covid-19/all" 
                        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
      
      await fetch(url).then(response => response.json()).then(data => {
        setSelectedCountry(countryCode)
        setCountryInfo(data);

        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(3)
      });
  }


  };
  
  return (
    <div className="app">
        
      <div className="app__left">
      
      {/*Header*/}
      {/* Title + Select Input dropdown field */}
      <div className="app__header">
          <h1 className="app__title">COVID-19 TRACKER</h1>
          <FormControl className="app__dropdown" >
            <Select 
              variant = 'outlined'
              value = {selectedCountry}
              onChange = {onSelectChange}
            >
              {/* LOOP through all the countries and show a drop down list of 
              the options */}
                <MenuItem value="worldwide">Worldwide</MenuItem>
              {
                countries.map((country) => (
                  <MenuItem value={country.value}>{country.name}</MenuItem>
                ))
              }

              
            </Select>
          
          </FormControl>
      </div>

      

      
      <div className="app__stats">         
        {/* InfoBoxes */}
        <InfoBox title="CoronaVirus Cases" 
          active={casesType==='cases'}
          isGreen={false}
          total={countryInfo.cases} 
          change={countryInfo.todayCases}
          onClick={(e) => setCasesType('cases')}
        />
        {/* InfoBoxes */}
        <InfoBox title="Recovered" 
          active={casesType==='recovered'}
          isGreen={true}
          total={countryInfo.recovered} 
          change={countryInfo.todayRecovered}
          onClick={(e) => setCasesType('recovered')}
          />
          
        {/* InfoBoxes */}
        <InfoBox title="Deaths"
          isGreen={false}
          active={casesType==='deaths'}
          total={countryInfo.deaths} 
          change={countryInfo.todayDeaths}
          onClick={(e) => setCasesType('deaths')}
          />
      </div>        
      

      {/* Map */}
      <Map countries={mapCountries} center={mapCenter} zoom={mapZoom} casesType={casesType}/>
    </div>
    
      <div className="app__right">
              {/* Table */}
              <h3>Live Cases by country</h3>
              <Table countries={tableData} />
              {/* Graph */}
          
      </div>
    </div>
  );
}

export default App;
