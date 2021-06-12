'use strict';

function Cs142TemplateProcessor(template){
    this.template = template
}
Cs142TemplateProcessor.prototype.fillIn = function(dictionary){
    // go through the dict, replace all matches with the found words
    let resultTemplate = this.template
    for (const [key, value] of Object.entries(dictionary)){
        let reg = new RegExp("\\{\{" + key + "\\}\}",'gi');
        resultTemplate = resultTemplate.replace(reg, value);
    }
    
    // for any remaining templates which are not found in our dictionary
    let reg = new RegExp("\\{\{.*\\}\}",'gi');
    resultTemplate = resultTemplate.replace(reg, '')
    return resultTemplate;
}
// class Cs142TemplateProcessor{
//     constructor(template){
//         this.template = template;
//     }

//     fillIn(dictionary){
//         // go through the dict, replace all matches with the found words
//         let resultTemplate = this.template
//         for (const [key, value] of Object.entries(dictionary)){
//             let reg = new RegExp("\\{\{" + key + "\\}\}",'gi');
//             resultTemplate = resultTemplate.replace(reg, value);
//         }
        
//         // for any remaining templates which are not found in our dictionary
//         let reg = new RegExp("\\{\{.*\\}\}",'gi');
//         resultTemplate = resultTemplate.replace(reg, '')
//         return resultTemplate;
//     }
// }

// var template = 'My favorite month is {{month}} but not the day {{day}} or the year {{year}}';
// var dateTemplate = new Cs142TemplateProcessor(template);

// var dictionary = {month: 'July', day: '1', year: '2016'};
// var str = dateTemplate.fillIn(dictionary);
// // console.log(str)
// var assert = require('assert');
// assert(str === 'My favorite month is July but not the day 1 or the year 2016');

// //Case: property doesn't exist in dictionary
// var dictionary2 = {day: '1', year: '2016'};
// var str = dateTemplate.fillIn(dictionary2);
// console.log(str)
// assert(str === 'My favorite month is  but not the day 1 or the year 2016');



