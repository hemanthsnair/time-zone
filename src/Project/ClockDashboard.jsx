import React from 'react'
import CityTime from './CityTime'

export default function ClockDashboard() {
    const cities = [
        {name: 'Delhi', timeZone: 'Asia/Kolkata'},
        {name: 'London', timeZone: 'Europe/London'} , 
        {name: 'Frankfurt', timeZone: 'Europe/Berlin'} , 
        {name: 'Tokyo', timeZone: 'Asia/Tokyo'}            
    ]
  return (
    <div className='world-clock'>
        <h1>ClockDashboard</h1>
        <ul className='cities'>
            {cities.map((city,index)=>(
        <CityTime city={city} key={index}/>
    )) }
        </ul>
    </div>
  );
}
