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
  const [comparisons, setComparisons] = useState(['-']);

  const [isSorting, setIsSorting] = useState(false);
  const [buttonsDisabled, setButtonsDisabled] = useState(false);

  //update the state when the sliders change
  const handleSizeChange = (event) => {
    setSizeValue(event.target.value);
    setCurrentArray(newArray(event.target.value));
    setIsSorting(false);
  };
  const handleSpeedChange = (event) => {
    setSpeedValue(event.target.value);
  };

  //re-randomizes the array
  const randomizeArray = () => {
    setCurrentArray(newArray(sizeValue));
    setComparisons(['-']);
    setIsSorting(false);
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
    let comparisonsArr = [];
    let comparisons = 0;

    for (let i = 0; i < n - 1; i++) {
      let minIndex = i;

      //find the index of the minimum element in the unsorted part
      for (let j = i + 1; j < n; j++) {
        comparisons++; //incrament the number of comparisons made
        if (sortedArr[j] < sortedArr[minIndex]) {
          minIndex = j;
        }
        //capture the current state of the array for animation
        animation.push([...sortedArr]);
        comparisonsArr.push(comparisons);
      }

      //swap the found minimum element with the first unsorted element
      if (minIndex !== i) {
        let temp = sortedArr[i];
        sortedArr[i] = sortedArr[minIndex];
        sortedArr[minIndex] = temp;

        //capture the current state after swap for animation
        animation.push([...sortedArr]);
        comparisonsArr.push(comparisons);
      }
    }

    animation.push([...sortedArr]); //final state after sorting
    comparisonsArr.push(comparisons);
    return {
      animation: animation, //return the animation sequence
      comparisons: comparisonsArr // return the num of comparisons
    }
  }

  const bubbleSort = (arr) => {
    let sortedArr = [...arr];
    let n = sortedArr.length;
    let animation = [];
    let comparisonsArr = [];
    let comparisons = 0;

    for(let i = 0; i < n - 1; i++) {
      for(let j = 0; j < n - i - 1; j++) {
        comparisons++;
        if(sortedArr[j] > sortedArr[j + 1]) {
          let temp = sortedArr[j];
          sortedArr[j] = sortedArr[j + 1];
          sortedArr[j + 1] = temp;
          animation.push([...sortedArr]);
          comparisonsArr.push(comparisons);
        }
      }
    }

    animation.push([...sortedArr]);
    comparisonsArr.push(comparisons);
    return {
      animation: animation,
      comparisons: comparisonsArr
    }
  }

  const insertionSort = (arr) => {
    let sortedArr = [...arr];
    let n = sortedArr.length;
    let animation = [];
    let comparisonsArr = [];
    let comparisons = 0;

    for(let i = 1; i < n; i++) {
      let j = i;
      while(j > 0 && sortedArr[j - 1] > sortedArr[j]){
        comparisons++;
        let temp = sortedArr[j];
        sortedArr[j] = sortedArr[j - 1];
        sortedArr[j - 1] = temp;
        j--;
        animation.push([...sortedArr]);
        comparisonsArr.push(comparisons);
      }
    }

    animation.push([...sortedArr]);
    comparisonsArr.push(comparisons);
    return {
      animation: animation,
      comparisons: comparisonsArr
    }
  }

  const mergeSort = (arr, fullArray = [...arr], animation = [], comparisonsArr = [], comparisons = { count: 0 }, start = 0, end = arr.length) => {
    if (arr.length <= 1) {
      return { sortedArr: arr, fullArray, animation, comparisonsArr, comparisons };
    }
  
    const mid = Math.floor(arr.length / 2);
  
    // Recursively sort both halves
    const leftResult = mergeSort(arr.slice(0, mid), fullArray, animation, comparisonsArr, comparisons, start, start + mid);
    const rightResult = mergeSort(arr.slice(mid), leftResult.fullArray, leftResult.animation, leftResult.comparisonsArr, comparisons, start + mid, end);
  
    // Merge the two halves
    return merge(leftResult.sortedArr, rightResult.sortedArr, leftResult.fullArray, leftResult.animation, leftResult.comparisonsArr, comparisons, start, end);
  };
  
  const merge = (left, right, fullArray, animation, comparisonsArr, comparisons, start, end) => {
    let sortedArr = [];
    let i = start;
  
    while (left.length && right.length) {
      comparisons.count++; // Every comparison should be counted globally
      if (left[0] < right[0]) {
        sortedArr.push(left.shift());
      } else {
        sortedArr.push(right.shift());
      }
      fullArray[i++] = sortedArr[sortedArr.length - 1];
  
      // Capture the state of the full array for animation
      animation.push([...fullArray]);
      comparisonsArr.push(comparisons.count);
    }
  
    // Handle remaining elements in the left array
    while (left.length) {
      comparisons.count++; // Still count these comparisons
      sortedArr.push(left.shift());
      fullArray[i++] = sortedArr[sortedArr.length - 1];
  
      animation.push([...fullArray]);
      comparisonsArr.push(comparisons.count);
    }
  
    // Handle remaining elements in the right array
    while (right.length) {
      comparisons.count++; // Still count these comparisons
      sortedArr.push(right.shift());
      fullArray[i++] = sortedArr[sortedArr.length - 1];
  
      animation.push([...fullArray]);
      comparisonsArr.push(comparisons.count);
    }
  
    return { sortedArr, fullArray, animation, comparisonsArr, comparisons };
  };  

  const quickSort = (arr, start, end) => {

    if(end <= start) return;

    let pivot = partition(arr, start, end);
    quickSort(arr, start, pivot - 1);
    quickSort(arr, pivot + 1, end);
  }

  const partition = (arr, start, end) => {
    let pivot = arr[end];
    let i = start - 1;

    for(let j = start; j <= end - 1; j++) {
      if(arr[j] < pivot) {
        i++;
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
      }
    }

    i++;
    let temp = arr[i];
    arr[i] = arr[end];
    arr[end] = temp;

    return i;
  }

  //plays out the animation using the animation sequence array
  const playAnimation = (animationSequence, speedValue, comparisons) => {
    let i = 0;
    const delay = 1;

    const timeout = (i) => {
      setTimeout(() => {
        if(animationSequence[i]) {
          setCurrentArray([...animationSequence[i]]);
        }
        if(comparisons[i]) {
          setComparisons(comparisons[i]);
        }
        i++;

        if(i < animationSequence.length || i < comparisons.length) {
          timeout(i);
        } else {
          setButtonsDisabled(false);
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
            <button className="randomize-btn" disabled={buttonsDisabled} onClick={randomizeArray}>Randomize Array</button>
            <button className="sort-btn" disabled={isSorting} onClick={() => {
              let arrayToSort = [...currentArray];

              {/* runs an algorithm based on the selected sort */}
              if(sortType === 'Selection Sort'){
                setIsSorting(true);
                setButtonsDisabled(true);
                let animation = selectionSort(arrayToSort).animation;      //get the animation
                let comparisons = selectionSort(arrayToSort).comparisons;  //get the num of comparisons
                playAnimation(animation, speedValue, comparisons);         //play the animation
              } else if(sortType === 'Bubble Sort'){
                setIsSorting(true);
                setButtonsDisabled(true);
                let animation = bubbleSort(arrayToSort).animation;
                let comparisons = bubbleSort(arrayToSort).comparisons;
                playAnimation(animation, speedValue, comparisons);
              } else if(sortType === 'Insertion Sort'){
                setIsSorting(true);
                setButtonsDisabled(true);
                let animation = insertionSort(arrayToSort).animation;
                let comparisons = insertionSort(arrayToSort).comparisons;
                playAnimation(animation, speedValue, comparisons);
              } else if(sortType === 'Merge Sort'){
                setIsSorting(true);
                setButtonsDisabled(true);
                let mergeSortResult = mergeSort(arrayToSort);
                let animation = mergeSortResult.animation;
                let comparisons = mergeSortResult.comparisonsArr;
                playAnimation(animation, speedValue, comparisons);
              } else{
                quickSort(arrayToSort, 0, arrayToSort.length - 1);
              }

            }}>Sort</button>

            <div className="slider1">
              {'size: ' + sizeValue}
              <input 
                type="range" 
                className="slider"
                disabled={buttonsDisabled}
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
                disabled={buttonsDisabled} 
                min="1" 
                max="100" 
                value={speedValue} 
                onChange={handleSpeedChange} 
                id="sortSpeed"
              />
            </div>

            {/* Select type of sort */}
            <button className={`button ${sortType === 'Selection Sort' ? 'btn-pressed' : ''}`} 
            onClick={() => setSortType('Selection Sort')}
            disabled={buttonsDisabled}
            >Selection Sort</button>
            <button className={`button ${sortType === 'Bubble Sort' ? 'btn-pressed' : ''}`} 
            onClick={() => setSortType('Bubble Sort')}
            disabled={buttonsDisabled}
            >Bubble Sort</button>
            <button className={`button ${sortType === 'Insertion Sort' ? 'btn-pressed' : ''}`} 
            onClick={() => setSortType('Insertion Sort')}
            disabled={buttonsDisabled}
            >Insertion Sort</button>
            <button className={`button ${sortType === 'Merge Sort' ? 'btn-pressed' : ''}`} 
            onClick={() => setSortType('Merge Sort')}
            disabled={buttonsDisabled}
            >Merge Sort</button>
            <button className={`button ${sortType === 'Quick Sort' ? 'btn-pressed' : ''}`} 
            onClick={() => setSortType('Quick Sort')}
            disabled={buttonsDisabled}
            >Quick Sort</button>
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