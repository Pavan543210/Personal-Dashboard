import React from 'react';
import './scss/styles.scss';
import WeatherWidget from './components/WeatherWidget';
import NewsWidget from './components/NewsWidget';


function App() {
  return (
    <div className="App">
      <header className="App-header text-white p-4">
        <h1>Personal Dashboard</h1>
      </header>
      <main className="container mt-4">
        <div className="row">
          <div className="col-xl-5">
            <WeatherWidget />
          </div>
          <div className="col-xl-7">
            <NewsWidget />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;


