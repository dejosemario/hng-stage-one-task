# Basic Web Server with API Endpoint

This project sets up a basic web server using Express.js in Node.js. The server exposes an API endpoint that returns the client's IP address, location, and a greeting message with the current temperature in their city.

## Project Description

The server exposes a single API endpoint:

- Endpoint: `[GET] <example.com>/api/hello?visitor_name="Mark"`

### Response:

```json
{
  "client_ip": "127.0.0.1",
  "location": "New York",
  "greeting": "Hello, Mark!, the temperature is 11 degrees Celsius in New York"
}
