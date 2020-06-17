import React, {useState, useEffect} from 'react';
import axios from 'axios'

const Search = ({countries, setSearch}) => {
  const onSearch = (e) => {
    const search_text = e.target.value.toLowerCase()
    const res = countries.filter((country)=>country.name.toLowerCase().includes(search_text))
    setSearch(res)     
  }
  return(
    <input onChange={onSearch} placeholder="Country Name..." type="text"/>
  )  
}

const CountryData = ({country}) => {
  const [weather, setWeather] = useState({current: {temperature:0, weather_icons:'', wind_speed:0, wind_dir:''}})
  useEffect(()=>{
    axios
    .get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${country.capital}`)
    .then((response)=>{
      setWeather(response.data)
    })
  },[country.capital])

  return (
  <div>
    <h2>
      {country.name}
    </h2>
    Capital: {country.capital}<br/>
    Population: {country.population}<br/>
    <p>
      Languages:
    </p>
    <ul>
      {country.languages.map((lang)=><li key={lang.iso639_1}>{lang.name}</li>)}
    </ul>
    <h3>Weather in {country.capital}</h3>
    <ul>
      <li><b>Temperature:</b> {weather.current.temperature} </li>
      <li><img src={weather.current.weather_icons[0]} alt="weather icon"/> </li>
      <li><b>Wind:</b>{weather.current.wind_speed} mph direction {weather.current.wind_dir}</li>
    </ul>
    <img src={country.flag} alt="COUNTRY FLAG"/>
  </div>
)}

const CountryList = ({countries, setSearch}) => {
  if (countries.length === 0){
    return <p>No Country Found ...</p>
  }else if(countries.length === 1){
    return <CountryData country={countries[0]}/>
  }else if(countries.length > 10){
    return <p>Too many results, Be specific</p>
  }else {
    return(
    <ul>
      {countries.map((c)=>{
        return (
          <li key={c.numericCode}>{c.name} <button onClick={()=>setSearch([c])}>Show</button> </li>
        )
      })}      
    </ul>)
  }
}


const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState([])
  useEffect(()=>{
    axios
    .get("https://restcountries.eu/rest/v2/all")
    .then((response)=>{
      setCountries(response.data)
    })
  },[]);
  
  return(
    <div>
      <Search countries={countries} setSearch={setSearch}/>
      <CountryList countries={search} setSearch={setSearch}/>
    </div>
  );  
}


export default App;
