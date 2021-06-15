'use strict';

function Cs142TemplateProcessor(template){
    this.template = template;
}
Cs142TemplateProcessor.prototype.fillIn = function(dictionary){
    // go through the dict, replace all matches with the found words
    let resultTemplate = this.template;
    for (const [key, value] of Object.entries(dictionary)){
        let reg = new RegExp("\\{\{" + key + "\\}\}",'gi');
        resultTemplate = resultTemplate.replace(reg, value);
    }
    
    // for any remaining templates which are not found in our dictionary
    let reg = new RegExp("\\{\{.*\\}\}",'gi');
    resultTemplate = resultTemplate.replace(reg, '');
    return resultTemplate;
};