import React, {useState, useEffect} from 'react';
import axios from 'axios'

const Search = ({countries, setSearch}) => {
  const onSearch = (e) => {
    const search_text = e.target.value.toLowerCase()
    const res = countries.filter((country)=>country.name.toLowerCase().includes(search_text))
    setSearch(res)     
    console.log(res)
  }
  return(
    <input onChange={onSearch} placeholder="Country Name..." type="text"/>
  )  
}

const CountryData = ({country}) => (
  <div>
    <h2>
      {country.name}
    </h2>
    Capital: {country.capital}<br/>
    Population: {country.population}<br/>
    <p>Languages:</p>
    <ul>
      {country.languages.map((lang)=><li key={lang.iso639_1}>{lang.name}</li>)}
    </ul>
    <img src={country.flag} alt="COUNTRY FLAG"/>
  </div>
  
)

const CountryList = ({countries}) => {
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
          <li key={c.numericCode}>{c.name}</li>
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
      <CountryList countries={search}/>
    </div>
  );  
}


export default App;
