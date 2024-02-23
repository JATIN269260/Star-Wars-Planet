# Star Wars Planet 
Star Wars Planet is a web application that provides the information regarding each planet in star wars like the Residents, Terrain, Population, Climate. It includes features like pagination to show a specific number of planets data on insitial load and also store data for each planet and its residents on initial load to reduce the number of api calls when a user moves from one page to another.

## App Link
https://star-wars-planet-sigma.vercel.app/

## Features

-Dynamic card visual creation to show information for each planet and expand card to view list of all residents.
-Caching of planet and residents data to reduce number of api calls.
-Paginated display of planets.
-Responsive design for a seamless experience on different devices.

## Setup

Follow these steps to set up the project locally:

1. **Clone the repository:**

   ```bash
  https://github.com/JATIN269260/Star-Wars-Planet.git
  cd star-war-planet
   ``

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the development server:**

   ```bash
   npm start
   ```

## Usage

1.On default load of app information for first ten planets will be displayed and the the first resident data will be shown by default in card.
2.To see data for more residents click on "show all residents" button and click on "show less residents" to cut short card details.
3.Click on right side arrow to look information for other planets.

## Technologies Used
- React.js
- CSS
- Star wars API

## Contributing

If you'd like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them.
4. Push to your fork and submit a pull request.

