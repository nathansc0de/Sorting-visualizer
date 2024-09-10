import React, { useState } from 'react';

function App() {

  //creates new array based on size passed in
  function newArray(size) {
    let array = [];
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

  //state to hold an array of time stamps when the array is being sorted
  //the array of time stamps are then used to display an animation
  const [animationSequence, setAnimationSequence] = useState([]);

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

  //the algorithms:

  const selectionSort = (arr) => {
    let sortedArr = [...arr]; // shallow copy to avoid direct mutation
    let n = sortedArr.length;
    let animation = [];

    for (let i = 0; i < n - 1; i++) {
      let minIndex = i;

      //find the index of the minimum element in the unsorted part
      for (let j = i + 1; j < n; j++) {
        if (sortedArr[j] < sortedArr[minIndex]) {
          minIndex = j;
        }
        //capture the current state of the array for animation
        animation.push([...sortedArr]);
      }

      //swap the found minimum element with the first unsorted element
      if (minIndex !== i) {
        let temp = sortedArr[i];
        sortedArr[i] = sortedArr[minIndex];
        sortedArr[minIndex] = temp;

        //capture the current state after swap for animation
        animation.push([...sortedArr]);
      }
    }

    animation.push([...sortedArr]); //final state after sorting
    return animation; //return the animation sequence
  }

  const bubbleSort = (a) => {
    
  }

  const insertionSort = (a) => {
    
  }

  const mergeSort = (a) => {
    
  }

  const quickSort = (a) => {
    
  }

  //plays out the animation using the animation sequence array
  const playAnimation = (animationSequence, speedValue) => {
    let i = 0;
    const delay = 1;

    const timeout = (i) => {
      setTimeout(() => {
        setCurrentArray([...animationSequence[i]]);
        i++;

        if(i < animationSequence.length) {
          timeout(i);
        }
        console.log(speedValue);
      }, delay);
    }

    timeout(i);
  }

  return (
    <div className="App">
      <div className="content">
        <div className="menu">
          <h1>Sorting Visualizer</h1>
          <div className="options">
            <button className="randomize-btn" onClick={randomizeArray}>Randomize Array</button>
            <button className="sort-btn" onClick={() => {
              let arrayToSort = [...currentArray];

              {/* runs an algorithm based on the selected sort */}
              if(sortType === 'Selection Sort'){
                let animation = selectionSort(arrayToSort);  //get the animations
                playAnimation(animation, speedValue);                    //play the animations
              } else if(sortType === 'Bubble Sort'){
                bubbleSort(arrayToSort);
              } else if(sortType === 'Insertion Sort'){
                insertionSort(arrayToSort);
              } else if(sortType === 'Merge Sort'){
                mergeSort(arrayToSort);
              } else{
                quickSort(arrayToSort);
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