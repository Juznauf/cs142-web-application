"use strict";


class DatePicker {
    /**
     * @param {string} div_id_attr - div attribute id
     * @param {function} callback - a callback with params (id, dateObject) that is called 
     * when a date is selected, need to create an event tag for each cell such that onclick
     * we call this callback     
     *  */
    constructor(div_id_attr, callback){
        this.div_id_attr = div_id_attr;
        this.callback = callback;
        // we set a static method only at instance, to be used for the click event
        DatePicker.callbackFn = function() {
            // this binding is to the element which starts the click event
            callback(this.dataset.div_id_attr,{
                month:this.dataset.month,
                day:this.dataset.day,
                year:this.dataset.year
            });};
    }
    
    render(dateObject){
        /**
         * @param {Date} dateObject - a date object
         * 
         * 
         * design specs:
         * - the calendar must display the days of the selected month in a grid with one line
         * for each week and one column for each day of the week. --> use tbal element
         * - weeks run from sunday to saturday. Must contain a header row for abbreviations 
         * of the days of the week 
         * - Each day of the month is displayed as a number 
         * - Some weeks may contain days not in the selected month. These days should 
         * be displayed however should be dimmed 
         * - all weeks displayed should contain at least one day belonging to the current 
         * month. Most months will display 5, but some are 4 or 6, calendar rows should not
         * be fixed 
         * - must display the name of the month and year at the top of the calendar. It must 
         * also have controls such as "<" and ">" to cycle the different months in the calendar
         * - clicking on a valid day of the current month should invoke the callback, invalid
         * days should not invoke the callback
         * 
         * logic flow::
         * - when render method is called, we first call the method showCalendar,
         * thereafter, subsequent calls will be made to the static method showCalendar
         * instead as we are outside of the scope of the original instance
         */

        var currMonth = dateObject.getMonth(); // this is index from 0-11
        var currYear = dateObject.getYear() + 1900; // to get the year from this, we need to add 1900 to this
        var div_id_attr = this.div_id_attr;

        // show calendar
        DatePicker.showCalender(currMonth, currYear, div_id_attr);

    }

    static showCalender(month, year, div_id_attr){
        /** 
         * @param {number} month - the current month
         * @param {number} year - the current year
         * @param {string} div_id_attr - the current div which we are scoped to
         * 
         * this helper is called whenever we need to show a calendar, can be used when
         * toggling the view using either '<' or '>'
         */

        const monthNames =  ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
        const dayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

        // first we get the starting day of the month 
        let firstDay = (new Date(year, month)).getDay(); // will return an int (note that 0 rep sunday)
        // get the number of days in the month 
        let daysInMonth = 32 - new Date(year,month, 32).getDate(); // this will return the 32nd
        // day after the month has started, which will give us the excess
        let daysInPrevMonth = 32 - new Date(year, month-1,32).getDate();
        let startDateInPrevMonth = daysInPrevMonth - (firstDay-1);  

        // create the table 
        var table1 = document.createElement("TABLE");

        // create the header row 
        var header = document.createElement('tr');

        // create the children
        let prev_td = document.createElement('td');
        let prev = document.createElement('button');
        prev_td.setAttribute('colspan','2');
        prev.dataset.month = month;
        prev.dataset.year = year; 
        prev.dataset.div_id_attr = div_id_attr; 
        prev.onclick = DatePicker.previous;
        prev.id = 'td-selectors';
        prev.innerHTML = '<';
        prev_td.appendChild(prev);

        let monthEl = document.createElement('td');
        monthEl.setAttribute('colspan','3');
        monthEl.innerHTML = monthNames[month] + ' ' + (year).toString();
        
        let next_td = document.createElement('td');
        next_td.setAttribute('colspan','2');
        let next = document.createElement('button');
        next.dataset.month = month;
        next.dataset.year = year; 
        next.dataset.div_id_attr = div_id_attr; 
        next.onclick = DatePicker.next; // call the static method, the method takes a single param
        next.id = 'td-selectors';
        // which is the element which calls the onclick event
        next.innerHTML = '>';
        next_td.appendChild(next);
        
        // append the children to the header
        header.appendChild(prev_td);
        header.appendChild(monthEl);
        header.appendChild(next_td);

        // add to the table
        table1.appendChild(header);

        // add to the identifier
        var divEl = document.getElementById(div_id_attr);

        // create the day labels
        var dayRow = document.createElement('tr');
        for (var i=0;i<7;i++){
            var dayCell = document.createElement('td');
            dayCell.innerHTML = dayNames[i];
            dayRow.appendChild(dayCell);
        }
        // add to table
        table1.appendChild(dayRow);

        // create the calendar
        var dateCounter = 0;
        for (i=0; i<6; i++){
            // for first row we need to hide the elements not from this month
            if (i===0 && firstDay!==0){ //week 1 and first day not 0
                // create the row element
                var row = document.createElement('tr');
                for(var j=0;j<7;j++){
                    // create the invicible elements
                        if(j<firstDay){
                            var cell = document.createElement('td');
                            cell.innerHTML = startDateInPrevMonth; // we need to get the last days of the prev month
                            cell.id = 'td-non-selectors';
                            row.appendChild(cell);
                            startDateInPrevMonth++;
                        } else{
                            // the rest 
                            var cell = document.createElement('td');
                            cell.dataset.div_id_attr = div_id_attr;
                            cell.dataset.day = dateCounter+1;
                            cell.dataset.month = month+1; //as index 0 for month
                            cell.dataset.year = year;
                            cell.innerHTML = dateCounter+1;
                            cell.onclick = DatePicker.callbackFn;
                            cell.id = 'td-selectors';
                            row.appendChild(cell);
                            dateCounter++;
                        }
                    }
                    table1.appendChild(row);
                }
                else{
                    // the rest of the table
                    var passFlag = false;
                    var row = document.createElement('tr');
                    var padDays = 1; // to keep track of padded days
                    for (var j=0;j<7;j++){
                        // create the invicible elements
                        if(dateCounter===daysInMonth){
                            if(j===0){//next month starts on day 0 (sunday) so we do a break
                                passFlag = true;
                                break;
                            }
                            else{//we need to pad the week
                                var cell = document.createElement('td');
                                cell.id = 'td-non-selectors';
                                cell.innerHTML = padDays;
                                padDays++;
                                row.appendChild(cell);
                            }
                        }else{//fill as per normal
                            cell = document.createElement('td');
                            cell.innerHTML = dateCounter+1;
                            cell.dataset.div_id_attr = div_id_attr;
                            cell.dataset.day = dateCounter+1;
                            cell.dataset.month = month+1; //as index from 0 for month
                            cell.dataset.year = year;
                            cell.id = 'td-selectors';
                            cell.onclick = DatePicker.callbackFn;
                            row.appendChild(cell);
                            dateCounter++;
                        }
                    }
                    if(!passFlag){
                        table1.appendChild(row);
                    }
                }
            } 
            divEl.appendChild(table1);
        }

    static next(){
        /**
         * this helper is used whenever we toggle the '>' controller
         * to be used as an event ("on click")
         * it is binded to the scope of the element which triggered this
         */
        var currMonth = parseInt(this.dataset.month);
        var currYear = parseInt(this.dataset.year);
        var div_id_attr = this.dataset.div_id_attr;
        
        // we need to clear the contents of the div element
        var div1 = document.getElementById(div_id_attr);
        div1.innerHTML = '';
        
        // set the logic for next 
        if(currMonth+1>11){
            // then we set the month to 0, and add 1 to the year
            currMonth=0;
            currYear++;
        } else{
            currMonth++;
        }
        // go to the next month
        DatePicker.showCalender(currMonth, currYear, div_id_attr);
    }
    
    static previous(){
        /**
         * this helper is used whenever we toggle the '<' controller
         * to be used as an event ("on click")
         * it is binded to the scope of the element which triggered this
         */

        var currMonth = parseInt(this.dataset.month);
        var currYear = parseInt(this.dataset.year);
        var div_id_attr = this.dataset.div_id_attr;
        
        // we need to clear the contents of the div element
        var div1 = document.getElementById(div_id_attr);
        div1.innerHTML = '';
        
        // set the logic for prev 
        if(currMonth-1<0){
            // then we set the month to 11, and minus 1 from the year
            currMonth=11;
            currYear--;
        } else{
            currMonth--;
        }
        // go to the next month
        DatePicker.showCalender(currMonth, currYear, div_id_attr);
    }


}
