'use strict';
function cs142MakeMultiFilter(originalArray){
    /* returns a function that can be used to filter
    the elements of the original array */

    var currentArray = originalArray; 
    
    function arrayFilterer(filterCriteria, callback){
        /* keeps track of a notion called currentArray.
        Initially currentArray is set to be identical 
        to originalArray.
        
        @filterCriteria - a func that takes an array element as a parameter 
        and returns a boolean. this func is called on every element of 
        currentArray and currentArray is updated to reflect the results of 
        the filterCriteria func. If the filterCriteria function returns 
        false for an element, that element should be removed from currentArray.
        Otherwise, it is left in currentArray. If filterCriteria is not a func, 
        the returned function (arrayFilterer) should immediately return the 
        value of currentArray with no filetering performed.
        
        @callback - a func that will be called when the filtering is done. callback 
        takes the value of currentArray as an argument. Accessing this inside the 
        callback func should reference the value of originalArray. If callback 
        is not a function, it should be ignored. callback does not have a return value
        
        The arrayFilterer function should return itself unless the filterCriteria
        parameter is not specified in which case it should return the currentArray.
        It must be possible to have multiple arrayFilterer functions operating at the 
        same time.
        */
       
        
        // check for filterCriteria
        if (typeof filterCriteria !== 'function'){
            return currentArray;
        }

        else{
            let returnArray = new Array();
            for (var i=0; i<currentArray.length; i++){
                if (filterCriteria(currentArray[i])){
                    returnArray.push(currentArray[i])
                }
            }
            currentArray = returnArray;
            
            if (typeof callback === 'function'){
                callback.call(originalArray,currentArray); 
            }
            
        }
        
        return arrayFilterer;
    }

    return arrayFilterer; 
}


// test cases

var arrayFilterer1 = cs142MakeMultiFilter([1,2,3]);

// call arrayFilterer1 (with callback function) to filter out all the numbers not equal to 2
arrayFilterer1(function (elem) {
    return elem !== 2; // check if element is not equal to 2
  }, function (currentArray) {
    console.log(this); // printing 'this' within the callback function should print originalArray which is [1,2,3]
    console.log(currentArray); // prints [1, 3]
  });


// call arrayFilterer1 (without callback function) to filter out all the elements not equal to 3
arrayFilterer1(function (elem) {
    return elem !== 3; // check if element is not equal to 3
  });
  
// calling arrayFilterer1 with no filterCriteria should return the currentArray
var currentArray = arrayFilterer1();
console.log('currentArray', currentArray);   // prints [1] since we filtered out 2 and 3

// Since arrayFilterer returns itself, calls can be chained
function filterTwos(elem) { return elem !== 2; }
function filterThrees(elem) { return elem !== 3; }
var arrayFilterer2 = cs142MakeMultiFilter([1,2,3]);
var currentArray2 = arrayFilterer2(filterTwos)(filterThrees)();
console.log('currentArray2', currentArray2);   // prints [1] since we filtered out 2 and 3

// Multiple active filters at the same time
var arrayFilterer3 = cs142MakeMultiFilter([1,2,3]);
var arrayFilterer4 = cs142MakeMultiFilter([4,5,6]);
console.log(arrayFilterer3(filterTwos)());	// prints [1,3]
console.log(arrayFilterer4(filterThrees)());	// prints [4,5,6]