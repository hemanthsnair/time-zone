import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    cities: JSON.parse(localStorage.getItem("cities"))||[],
    timeZones: Intl.supportedValuesOf("timeZone"),
  };

  const citiesSlice = createSlice({
    name: "cities",
    initialState,
    reducers: {
      addCity: (state, action) => {
        state.cities.push(action.payload);
        localStorage.setItem("cities", JSON.stringify(state.cities));
      },
      removeCity: (state, action) => {
        state.cities = state.cities.filter((city) => city.timeZone !== action.payload);
        localStorage.setItem("cities", JSON.stringify(state.cities));
      },
    },
  });
  
  export const { addCity, removeCity } = citiesSlice.actions;
  export default citiesSlice.reducer;
