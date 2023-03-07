import axios from "axios";

export default async function weather() {
  console.log("at least the weather file is being called");

  const weatherKey = process.env.WEATHER_API;

  let config = {
    method: "get",
    url: `https://api.weatherapi.com/v1/current.json?key=${weatherKey}&q=London&aqi=no`,
    headers: {
      "Content-Type": "application/json",
    },
  };

  axios(config)
    .then(function (response) {
      // handle success
      console.log(response);
      console.log("Temperature in F: ", response.data.current.temp_f);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .finally(function () {
      // always executed
    });
}
