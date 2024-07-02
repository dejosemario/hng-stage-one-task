const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5500;
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const IPAPI_URL =  "https://ipapi.co";

app.get("/api/hello", async (req, res) => {
  const name = req.query.visitor_name;
  let ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

  const ipv4Match = ip.match(/(\d+\.\d+\.\d+\.\d+)/);
  if (ipv4Match) {
    ip = ipv4Match[0];
  }

  try {
    const ipAddressResponse = await axios.get(`${IPAPI_URL}/${ip}/json/`);
    const { city } = ipAddressResponse.data;

    const weatherResponse = await axios.get(
      `https://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${city}&aqi=no`
    );
    const temp_c = weatherResponse.data.current.temp_c;
    
    res.json({
      client_ip: ip,
      location: city,
      greeting: `Hello, ${name}! The temperature is ${temp_c} degrees Celsius in ${city}.`,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching location data" });
  }
});

app.all("*", (req, res) => {
  res.status(400).json({
    message: "You sure say na here you wan go? Make you try the correct o!",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



