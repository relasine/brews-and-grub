import apiKey from "../keys/apiKey";

export default async query => {
  const url = `https://api.opencagedata.com/geocode/v1/json?key=${apiKey}&q=${query}&countrycode=us`;

  const response = await fetch(url);
  const data = await response.json();

  if (data && data.results && data.results.length > 0) {
    console.log(data.results[0].geometry);
  }
};
