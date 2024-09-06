import './App.css';
import React, { useState } from 'react';

function App() {
  let size = 500;
  let speed = 50; 

  //state to hold value of the size of the array when moving the slider
  const [sizeValue, setSizeValue] = useState(500);

  //state to hold value of the speed of the sort when moving the slider
  const [speedValue, setSpeedValue] = useState(50);

  //update the state when the sliders change
  const handleSizeChange = (event) => {
    setSizeValue(event.target.value);
  }
  const handleSpeedChange = (event) => {
    setSpeedValue(event.target.value);
  }

  return (
    <div className="App">
      <div className="content">
        <div className="menu">
          <h1>Sorting Visualizer</h1>
          <div className="options">
          <button>Shuffle Array</button>
          <button>Sort</button>

            <div className="slider1">
              {'size: ' + sizeValue}
              <input type="range" className="slider" min="1" 
              max="1000" value={sizeValue} onChange={handleSizeChange} id="arraySize"/>
            </div>
            <div className="slider2">
            {'speed: ' + speedValue}
              <input type="range" className="slider" min="1" 
              max="100" value={speedValue} onChange={handleSpeedChange} id="sortSpeed"/>
            </div>

            <button>Selection Sort</button>
            <button>Bubble Sort</button>
            <button>Insertion Sort</button>
            <button>Merge Sort</button>
            <button>Quick Sort</button>
          </div>
          <div className="visual">

          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
