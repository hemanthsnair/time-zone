import React, { useEffect, useState,useRef } from 'react'
import CityTime from './CityTime'
import './ClockDashboard.css'

export default function ClockDashboard() {
    const [cities,setCities] = useState([])
    const [showDropdown, setShowDropdown] = useState(false)
    const [timeZones, setTimeZones] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const dropdownRef = useRef(null);
    
    useEffect(()=>{
        const defaultCities = [
            { name: "Delhi", timeZone: "Asia/Kolkata" },
        ];
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

      const handleZoneSelect = (zone) => {
        const selected = zone;
        if (!selected) return;
        const cityObj = { name: selected.split('/').pop().replaceAll('_', ' '), timeZone: selected };
        setCities([...cities, cityObj]);
        setShowDropdown(false);
        setSearchQuery('');
      };

      useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const filteredZones = timeZones.filter(zone => zone.toLowerCase().includes(searchQuery.toLowerCase()));

    const deleteCity=(timeZone)=>{
        const updatedCities= cities.filter((city)=>city.timeZone!==timeZone)
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
        <div className='dropdown' ref={dropdownRef}>
        <input 
                    type="text" 
                    placeholder="Search Time Zone..." 
                    value={searchQuery} 
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setShowDropdown(true)}
                    style={{ padding: "5px", marginBottom: "5px", width: "100%" }}
                />
           { showDropdown && (     
          <ul className="dropdown-list">
                            {filteredZones.map((zone, idx) => (
                                <li key={idx} onClick={() => handleZoneSelect(zone)} className="dropdown-item">
                                    {zone}
                                </li>
                            ))}
                        </ul>
                        )}
      </div>
    </div>
  );
}
