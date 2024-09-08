import React, { useState } from 'react';

function App() {
  
  //state to hold value of the size of the array when moving the slider
  const [sizeValue, setSizeValue] = useState(100);

  //state to hold value of the speed of the sort when moving the slider
  const [speedValue, setSpeedValue] = useState(50);

  //state to hold the current array
  const [currentArray, setCurrentArray] = useState(newArray(sizeValue));

  //update the state when the sliders change
  const handleSizeChange = (event) => {
    setSizeValue(event.target.value);
    setCurrentArray(newArray(event.target.value));
  }
  const handleSpeedChange = (event) => {
    setSpeedValue(event.target.value);
  }

  //creates new array based on size passed in
  function newArray(size) {
    const array = [];
    for(let i = 0; i < size; i++) {
      array.push(randomInt(1, 700)) //random height between 1 and 700 pixels
    }
    
    return array;
  }

  //re-randomizes the array
  const randomizeArray = () => {
    setCurrentArray(newArray(sizeValue));
  }

  //returns random int between min and max
  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  return (
    <div className="App">
      <div className="content">
        <div className="menu">
          <h1>Sorting Visualizer</h1>
          <div className="options">
            <button onClick={randomizeArray}>Randomize Array</button>
            <button>Sort</button>

            <div className="slider1">
              {'size: ' + sizeValue}
              <input type="range" className="slider" min="10" 
              max="200" value={sizeValue} onChange={handleSizeChange} id="arraySize"/>
            </div>
            <div className="slider2">
            {'speed: ' + speedValue}
              <input type="range" className="slider" min="1" 
              max="100" value={speedValue} onChange={handleSpeedChange} id="sortSpeed"/>
            </div>

            {/* select type of sort */}
            <button>Selection Sort</button>
            <button>Bubble Sort</button>
            <button>Insertion Sort</button>
            <button>Merge Sort</button>
            <button>Quick Sort</button>
          </div>
        </div>

        {/* Visualization area */}
        <div className="visual">
          <div className="array-bars">
            {currentArray.map((value, idx) => (
              <div 
              className="array-bar"
              key={idx}
              style={{
                height: `${value}px`,
                width: `${1800/sizeValue}px`,
                marginLeft: `${100/sizeValue}px`,
                marginRight: `${100/sizeValue}px`
              }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
