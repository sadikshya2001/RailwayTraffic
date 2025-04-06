# RailwayTraffic

A real-time web application that displays the locations of trains across Finland using data from the Digitraffic API.

![raiwayTraffic](https://github.com/user-attachments/assets/408e5c4c-d4a6-49c3-b6dc-edc831838069)



## Features

- Real-time tracking of trains across Finland
- Automatic updates every 5 seconds
- Detailed information panel showing train specifics when selected
- Responsive design that works on desktop and mobile devices
- Connection status indicator

## Technologies Used

- HTML5, CSS3, and JavaScript
- [Leaflet.js](https://leafletjs.com/) for interactive maps
- [OpenStreetMap](https://www.openstreetmap.org/) for map tiles
- [Digitraffic API](https://www.digitraffic.fi/en/) for real-time train data

## Getting Started

### Prerequisites

- A modern web browser

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/sadikshya2001/RailwayTraffic.git
   ```

2. Open `index.html` in your web browser or serve the project using a local web server.

## Usage

- The map displays all active trains in Finland
- Click on a train marker to see detailed information
- Information is automatically updated every 5 seconds
- The connection status indicator in the header shows if data is being received correctly

## API Documentation

This application uses the Digitraffic API, which provides open data about Finnish transport infrastructure and traffic. The specific endpoint used is:

```
https://rata.digitraffic.fi/api/v1/train-locations/latest
```

Learn more about the Digitraffic APIs at their [official documentation](https://www.digitraffic.fi/en/railway-traffic/).

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- Data provided by [Fintraffic](https://www.fintraffic.fi/en) through their Digitraffic service
- Map data © [OpenStreetMap contributors](https://www.openstreetmap.org/copyright)
