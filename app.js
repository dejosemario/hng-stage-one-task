const express = require("express");
const app = express();

const axios = require("axios");
const PORT = 5500;
require("dotenv").config();

app.get("/api/hello", async (req, res) => {
  const name = req.query.visitor_name;
  let ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

  const weatherKey = process.env.WEATHER_API_KEY;

  const ipv4Match = ip.match(/(\d+\.\d+\.\d+\.\d+)/);
  if (ipv4Match) {
    ip = ipv4Match[0];
  }

  try {
    const ipAddress = await axios.get(`https://ipapi.co/${ip}/json/`);
    const { city } = ipAddress.data;

    const weather = await axios.get(
      `https://api.weatherapi.com/v1/current.json?key=${weatherKey}&q=${city}&aqi=no`
    );
    const temp_c = weather.data.current;
    res.json({
      client_ip: ip,
      location: city,
      greeting: `Hello, ${name}!, the temperature is ${temp_c} degrees Celsius in ${city}`,
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
  console.log(`Server dey run for ${PORT}`);
});
