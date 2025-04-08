import React, { useState,useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {addCity,removeCity} from '../redux/citiesSlice'
import CityTime from './CityTime'
import './ClockDashboard.css'

export default function ClockDashboard() {
    const cities = useSelector((state) => state.cities.cities);
    const timeZones = useSelector((state) => state.cities.timeZones);
    const dispatch = useDispatch();
    const [searchQuery, setSearchQuery] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null)
    
      const handleZoneSelect = (zone) => {
        if (!zone) return;
        const cityObj = { name: zone.split("/").pop().replace(/_/g, " "), timeZone: zone };
        dispatch(addCity(cityObj));
        setShowDropdown(false);
        setSearchQuery("");
      };

      useEffect(()=>{  
      const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }}
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    },[]);

    const filteredZones = timeZones.filter(zone => zone.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className='world-clock'>
        <h1>ClockDashboard</h1>
        <ul className='cities'>
        <CityTime city={{name:"Calcutta", timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone}}/>
        {cities.map((city,index)=>(
           < div key={index}>
            <CityTime city={city}/>
            <button onClick={()=>dispatch(removeCity(city.timeZone))}>Delete</button>
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
