import React, { useEffect, useState } from 'react'
import CityTime from './CityTime'
import axios from 'axios'


export default function ClockDashboard() {
    const [cities,setCities] = useState([])
    const [showDropdown, setShowDropdown] = useState(false)
    const [timeZones, setTimeZones] = useState([]);
    const [selectedZone, setSelectedZone] = useState('')
    const defaultCities = [
        { name: "Delhi", timeZone: "Asia/Kolkata" },
    ];

    useEffect(()=>{
        const storedCities=JSON.parse(localStorage.getItem('cities'))||defaultCities;
        setCities(storedCities)
    },[]);
    useEffect(()=>{
        localStorage.setItem('cities',JSON.stringify(cities))
    },[cities]);
    useEffect(() => {
        const zones = Intl.supportedValuesOf('timeZone');
        setTimeZones(zones);
      }, []);
      const handleAddCity = () => {
        setShowDropdown(true);
      };
      const handleZoneSelect = (e) => {
        const selected = e.target.value;
        if (!selected) return;
        const cityObj = { name: selected.split('/').pop().replaceAll('_', ' '), timeZone: selected };
        setCities([...cities, cityObj]);
        setSelectedZone('');
        setShowDropdown(false);
      };
    
    const deleteCity=(timeZone)=>{
        const updatedCities= cities.filter((city)=>city.timeZone!=timeZone)
        setCities(updatedCities)
    }
  return (
    <div className='world-clock'>
        <h1>ClockDashboard</h1>
        <ul className='cities'>
        <CityTime city={{name:"Local Time", timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone}}/>
        {cities.map((city,index)=>(
           < div key={index}>
            <CityTime city={city}/>
            <button onClick={()=>deleteCity(city.timeZone)}>Delete</button>
           </div>
        ))}
        </ul>
        <div>
        <button onClick={handleAddCity}>Add Time Zone</button>
        {showDropdown && (
          <select value={selectedZone} onChange={handleZoneSelect}>
            <option value="">-- Select Time Zone --</option>
            {timeZones.map((zone, idx) => (
              <option key={idx} value={zone}>
                {zone}
              </option>
            ))}
          </select>
        )}
      </div>
    </div>
  );
}
