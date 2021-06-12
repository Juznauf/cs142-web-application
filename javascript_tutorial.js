function hello() {
    console.log('val is:', val);

    for(var i=0; i < 10; i++){
        var val = "different string";
    }

    // console.log(val)

}



// hello()


// let x;
// x = undefined;
// console.log(typeof x === 'undefined');

// console.log(foobar(2))
// console.log(typeof foobar)
// var foobar = function foobar(x) {
function foobar(x) {
    if (x <= 1) {
        return 1; 
    }
    
    return x*foobar(x-1);
}


// console.log(typeof foobar == 'function')
// console.log(foobar.name == 'foobar')


let aFunVar = function(x) {
    console.log('Func called with', x);
    return x+1;

}

// myFunc(aFunVar);

// console.log(myFunc.name);
function myFunc(routine){
    console.log('called with', routine.toString());
    let retVal = routine(10);
    console.log('retVal', retVal);
    return retVal;
}



var arr1 = Object.keys({
    name: "Alice",
    age:23
})

// console.log(arr1.length)



// try {
//     nonExist();
// } catch (err) {
//     console.log("Error call func", err.name, err.message)
// }



// raise exceptions with throw statement

// try {
//     throw "Help!";
// } catch (errstr){
//     console.log('Got exception', errstr);
//     console.log("Got Error:", errstr.stack || errstr.message || errstr);
// } finally {
// }


// the this object

var o = {oldProp: 'this is an old prop'};
o.aMethod = function() {
    this.newProp = "this is a new prop";
    return Object.keys(this);
}

// console.log(o.aMethod())

// functions as objects 

function func(arg){
    console.log(this, arg);
}
// func.call({t:1}, 2)

// bind() method, creates a new function with this and arguments bound, static function

let newFunc = func.bind({z:2}, 3)

// newFunc() // will print '{z:2} 3'



// OOP classes
// functions are classes in JS, name the function after the class

function Rectangle(width, height){
    this.width = width;
    this.height = height;
    this.area = function(){ //this is not the right way of adding methods
        return this.width*this.height;
    }
}

var r = new Rectangle(26, 14);
r.constructor.name == 'Rectangle';
// console.log(r); // will print out the object properties
// console.log(r.area())


// using prototypes for inheretience 

function Rectangle(width, height){
    this.width = width;
    this.height = height;
}

Rectangle.prototype.area = function(){
    return this.width*this.height;
}

var r = new Rectangle(26, 14);
var v = r.area();
// console.log(Object.keys(r)) // will come out its own properties, not that of the class

// Prototype vs object instances

// dynamic changing prototype will cause all instances to change, the class method is now dynamic
// using prototype causes all object instance to change, as compared to creating a new method via r.newMethod = function(){}


// Inheritance

// Rectangle.prototype = new Shape(...);
// if desired prop not in rectangle.proto then javascript will look in shape.proto and so on, this is a chain 

// only supports single inheritance

// ECMASript version 6 extensions

// class Rectange extends Shape { // Definition and Inheritance
//     constructor(height, width){
//         super(height, width);
//         this.height = height;
//         this.width = width;
//     }

//     area(){ // Method definition 
//         return this.width * this.height;
//     }
//     static countRects(){ // Static method
//         // ...
//     }

// }

// var r = new Rectangle(10, 20);



// closures 

var globalVar = 1;
function localFunc(argVar){
    var localVar = 0;
    function embedFunc(){return ++localVar + argVar + globalVar;} // we modify the localVar in the inner scope
    return embedFunc; // as we return the inner function, the localVar becomes a globalVar
}

// var myFunc = localFunc(10);  // my func now exists in the scope of localFunc, so var in localFunc are also global
// console.log(myFunc()) // will output 12
// console.log(myFunc()) // will output 13 , as the localVar has been mutated in the inner function call


// using closures for private object properties

var myObj = (function() {
    var privateProp1 = 1; var privateProp2 = "test";
    var setPrivate1 = function(val1) {privateProp1 = val1;}
    var compute = function () {return privateProp1 + privateProp2;}
    return {compute: compute, setPrivate1: setPrivate1};

})();

// console.log(typeof myObj); // 'object
// console.log(Object.keys(myObj)); //['compute', 'setPrivate1']
// what does myObj.compute() return?
// console.log(myObj.compute()) // prints '1test'



// closures with imperative API

const fs = require('fs');
const { hostname } = require('os');

// for (var fileNo=0; fileNo<2; fileNo++){
//     let localFileNo = fileNo;
//     fs.readFile('./file'+localFileNo, function (err, data) {
//         if (!err){
//             console.log('file', localFileNo, 'has length', data.length);
//         }
//         else {
//             console.log(localFileNo)
//         }
//     });
//     console.log(fileNo)
// }


// javascript idioms

// assign a default value
// hostname = hostname || "localhost";
// access a possibly undefined object property 
// var prop = obj && obj.propname;

// handling multiple this;
// fs.readFile(this.filename + fileNo, function (err, data){
//     console.log(this.filename, fileNo);  // this is wrong method, use the arrow function
// }) 

// instead do this
// fs.readFile(this.filename + fileNo, (err, data) => {
//     console.log(this.filename, fileNo);  
// }) 

// var anArr = [1,2,3];
// myFunc.apply(null, anArr);
// var o = [5].concat(anArr).concat([6]);


