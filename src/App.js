import React, { useState } from 'react';

function App() {

  //creates new array based on size passed in
  function newArray(size) {
    const array = [];
    for (let i = 0; i < size; i++) {
      array.push(randomInt(1, 700)); //random height between 1 and 700 pixels
    }
    
    return array;
  }
  
  //state to hold value of the size of the array when moving the slider
  const [sizeValue, setSizeValue] = useState(100);

  //state to hold value of the speed of the sort when moving the slider
  const [speedValue, setSpeedValue] = useState(50);

  //state to hold the current array
  const [currentArray, setCurrentArray] = useState(newArray(sizeValue));

  //state to hold the selected sorting algorithm
  const [sortType, setSortType] = useState('');

  //state to hold the num of comparisons made
  const [comparisons, setComparisons] = useState('-');

  //update the state when the sliders change
  const handleSizeChange = (event) => {
    setSizeValue(event.target.value);
    setCurrentArray(newArray(event.target.value));
  };
  const handleSpeedChange = (event) => {
    setSpeedValue(event.target.value);
  };

  //re-randomizes the array
  const randomizeArray = () => {
    setCurrentArray(newArray(sizeValue));
  };

  //returns random int between min and max
  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  //the algorithms
  const selectionSort = () => {
    
  }

  const bubbleSort = () => {
    
  }

  const insertionSort = () => {
    
  }

  const mergeSort = () => {
    
  }

  const quickSort = () => {
    
  }

  return (
    <div className="App">
      <div className="content">
        <div className="menu">
          <h1>Sorting Visualizer</h1>
          <div className="options">
            <button className="randomize-btn" onClick={randomizeArray}>Randomize Array</button>
            <button className="sort-btn" onClick={() => {

              {/* runs an algorithm based on the selected sort */}
              if(sortType === 'Selection Sort'){
                selectionSort();
              } else if(sortType === 'Bubble Sort'){
                bubbleSort();
              } else if(sortType === 'Insertion Sort'){
                insertionSort();
              } else if(sortType === 'Merge Sort'){
                mergeSort();
              } else{
                quickSort();
              }

            }}>Sort</button>

            <div className="slider1">
              {'size: ' + sizeValue}
              <input 
                type="range" 
                className="slider" 
                min="10" 
                max="200" 
                value={sizeValue} 
                onChange={handleSizeChange} 
                id="arraySize"
              />
            </div>
            <div className="slider2">
              {'speed: ' + speedValue}
              <input 
                type="range" 
                className="slider" 
                min="1" 
                max="100" 
                value={speedValue} 
                onChange={handleSpeedChange} 
                id="sortSpeed"
              />
            </div>

            {/* Select type of sort */}
            <button className={`button ${sortType === 'Selection Sort' ? 'btn-pressed' : ''}`} onClick={() => setSortType('Selection Sort')}>Selection Sort</button>
            <button className={`button ${sortType === 'Bubble Sort' ? 'btn-pressed' : ''}`} onClick={() => setSortType('Bubble Sort')}>Bubble Sort</button>
            <button className={`button ${sortType === 'Insertion Sort' ? 'btn-pressed' : ''}`} onClick={() => setSortType('Insertion Sort')}>Insertion Sort</button>
            <button className={`button ${sortType === 'Merge Sort' ? 'btn-pressed' : ''}`} onClick={() => setSortType('Merge Sort')}>Merge Sort</button>
            <button className={`button ${sortType === 'Quick Sort' ? 'btn-pressed' : ''}`} onClick={() => setSortType('Quick Sort')}>Quick Sort</button>
          </div>
        </div>

        <div className="info">
          <p>{comparisons} comparisons</p>
          <h1>{sortType}</h1>
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
                  width: `${1800 / sizeValue}px`,
                  marginLeft: `${100 / sizeValue}px`,
                  marginRight: `${100 / sizeValue}px`
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