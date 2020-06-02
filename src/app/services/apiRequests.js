import axios from 'axios'
const newKey = "nlF72fFBAi0khIG8otxABkzi2BV7ULEe";
const apikey = "9Gwr1RTxfpKhiAJlT3gb72ASdCZ7p6fQ";

export function getForCity(city) {
    return city && axios.get(`http://dataservice.accuweather.com/currentconditions/v1/${city}?apikey=${apikey}&language=en-us`)
         .then(res => {
                console.log("getForCity",res.data);
                return res.data[0]})
          .catch(err => {
              console.log(err);
          });
  }
  export function getForFiveDays(city) {
    return city && axios.get(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${city}?apikey=${apikey}&language=en-us&metric=true`)
          .then(res => {
              console.log("getForFiveDays",res.data);
              return res.data})
          .catch(err => {
              console.log(err);
          });

  }
  export function getGeoposition(lat,lon) {
    return lat && lon && axios.get(`http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${apikey}&q=${lat},${lon}&language=en-us`)
          .then(res => {
              console.log("getGeoposition ",res.data);
              return res.data})
          .catch(err => {
              console.log(err);
          });
  }

  export function getAutocomplete(userInput) {
    return axios.get(`http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${apikey}&q=${userInput}&language=en-us`)
    .then(res => {
        console.log("data from responce", res.data);
        return res.data;
    }).catch(err => {
        console.log("err",err);
    })
  }
  
