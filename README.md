# Personal Dashboard Application

This is a simple personal dashboard application built with React.js, featuring a weather widget and news headlines widget

## Features

### Weather Widget:

- Displays current weather information based on the user's location or a specified city
- Shows temperature, weather description, humidity, wind speed, sunrise, and sunset times
- Uses the OpenWeatherMap API for weather data.

### News Headlines Widget:

- Fetches top news headlines from a country or city specified by the user
- Each headline includes the title, description, source, and publish date
- Clicking on a headline opens the full article in a new tab
- Utilizes the NewsAPI for news data

## Project Setup

### Clone the repository:

-git clone https://github.com/your_username/your_repository.git
-cd your_repository

## Install dependencies:
-npm install
-Set up environment variables

## Create a .env file in the root directory.
-Add your API keys:
-Run the application:
-npm start
-The application will start running on http://localhost:3000

## Usage
 --- Weather Widget:

        -Automatically fetches weather data based on the user's geolocation
        -Users can search for weather by entering a city name in the search bar

## News Headlines Widget:
--Displays top news headlines from a default location (India) on page load
--Users can search for news from different cities or countries by entering the location in the search bar

## Technologies Used
--React.js
--Axios for API requests
--Bootstrap for responsive design
--Sass for custom styling

## Contributing
Contributions are welcome! Please fork the repository and create a pull request with your suggested changes