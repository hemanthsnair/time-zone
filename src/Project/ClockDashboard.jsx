import React, { useEffect, useState } from 'react'
import CityTime from './CityTime'

export default function ClockDashboard() {
    const [cities,setCities] = useState([])
    const defaultCities = [
        { name: "Delhi", timeZone: "Asia/Kolkata" },
    ];
    useEffect(()=>{
        const storedCities=JSON.parse(localStorage.getItem('cities'))||defaultCities;
        console.log("Loaded Cities from Storage:", storedCities);
        setCities(storedCities)
    },[]);
    useEffect(()=>{
        localStorage.setItem('cities',JSON.stringify(cities))
    },[cities]);

    const addCity=()=>{
        const timeZone = prompt("Enter Time Zone");
        if(timeZone) {
            setCities([...cities, {name: timeZone,timeZone}])
        }
    }

    const deleteCity=(timeZone)=>{
        const updatedCities= cities.filter((city)=>city.timeZone!=timeZone)
        setCities(updatedCities)
    }
  return (
    <div className='world-clock'>
        <h1>ClockDashboard</h1>
        <ul className='cities'>
        <CityTime city={{name:"Local Time", timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone}}/>
        <button onClick={addCity}>Add Time Zone</button>
        {cities.map((city,index)=>(
           < div key={index}>
            <CityTime city={city}/>
            <button onClick={()=>deleteCity(city.timeZone)}>Delete</button>
           </div>
        ))}
        </ul>
    </div>
  );
}
