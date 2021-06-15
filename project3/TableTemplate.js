"use strict";


class TableTemplate {
    constructor(){}
    
    static fillIn(id, dict, columnName){
        /**
         * takes three args
         * @param id the id attribute for a <table>
         * @param dict: a dictionary object
         * @param columnName: a string  
         * The method must first examine the header row of the table and replace 
         * any text of the form {{property}} with the corresponding property 
         * of the dictionary object. It then fills in all {{property}} elements 
         * in the column specified by columnName. If there exists such a column
         * the method assumes that the first row of the table holds the column names.
         * You are guaranteed that the column names of the input table are unique.
         * If no columnName is specified, the method should process the entire table.
         * If the specified columnName is not matched, the method shoule return without
         * replacing any text in the columns. Note that you should still replace template
         * strings in the header row regardless of whether the specified columnName is
         * matched   
         */
        // get the table element by id 
        let element = document.getElementById(id);

        // replace the headers with their desired properties
        // the headers are represented by the first table rows
        var rows = element.rows;
        var header = rows[0]; // the first index is the headers;
        // replace the headers with their properties in dict using the helper function 
        for (var i=0;i<header.cells.length;i++){
            var templaceProcessor = new Cs142TemplateProcessor(header.cells[i].innerHTML);
            // process the text
            header.cells[i].innerHTML = templaceProcessor.fillIn(dict);
        }
        // if no colname specified, process the entire table
        if (typeof columnName === 'undefined'){
            // rows 1 onwards
            for (i=1; i<rows.length; i++){
                // console.log(rows[i].cells)
                for (var j=0; j<rows[i].cells.length;j++){
                    var templaceProcessor1 = new Cs142TemplateProcessor(rows[i].cells[j].innerHTML);
                    // process the text
                    rows[i].cells[j].innerHTML = templaceProcessor1.fillIn(dict);
                }
            }
        }
        else {
            // only replace the text in the columns
            // return the index of the matching column
            var columnIndex;
            for (i=0; i<header.cells.length; i++){
                if (header.cells[i].innerHTML === columnName){
                    columnIndex = i;
                }
            }
            
            for (i=0; i<rows.length; i++){
                var templaceProcessor2 = new Cs142TemplateProcessor(rows[i].cells[columnIndex].innerHTML);
                rows[i].cells[columnIndex].innerHTML = templaceProcessor2.fillIn(dict);
            }

        }

        // change visibility of table to visible 
        element.setAttribute('style','visibility:visible');


    }
}