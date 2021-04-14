var dataTemp = [];
const dataHour = {
  hour: 24,
  text: '',
};
//moment is a JavaScript date library
//format designs how the date will be shown
const currDate = moment().format('dddd, MMMM Do YYYY');
//jQuery selectors allow you to find or select and manipulate HTML elements by starting with a dollar sign and parentheses
//#currentDay is the class in HTML
//html method sets or returns the content of the selected elements
$('#currentDay').html(currDate);



function getCurrentHour() {
    // date objects with the current date and time are created with the new Date() constructor
    const dt = new Date();
    //getHours method returns the hour (from 0 to 23) of the specified date and time
    const hour = dt.getHours();
    //return statement stops the execution of a function and returns a value from that function
    return hour;
}

const currHour = getCurrentHour();

//set the colors for past, present, and future hours
// each method specifies a function to run for each matched element
$('.hour').each(function () {
    //$(this) selects the current HTML element
    //text method sets or returns the text content of the selected elements
    const lblHour = $(this).text();
    // split method is used to split a string into an array of substrings, and returns the new array
    var hour = lblHour.split(':')[0];
    // if the time on the scheduler matches the current time
    if (+hour === currHour) {
        //then mark it with the class of present
        //siblings method returns all sibling elements of the selected element
        //first method returns the first element of the selected elements
        //addClass method adds one or more class names to the selected elements
        $(this).siblings('textarea').first().addClass('present');
    }
    // if the time of the schduler is smaller than the current time 
    else if (+hour < currHour) {
        //then mark it with the class of past
        $(this).siblings('textarea').first().addClass('past');
    }
    // if neither of the condition above are met 
    else {
        //then mark it with the class of future
        $(this).siblings('textarea').first().addClass('future');
    }
});

function saveText(hour, text) {
    const dt = new Date();
    //getFullYear method returns the year (4 digits for dates) of the specified date
    //toString method returns the value of a string object
    //getMonth method returs the month returns the month (0-11) for the specified date, according to local time thats why we have to add +
    //getDate method returns the day of the month (1-31) for the specified date
    const name = `cal${dt.getFullYear().toString()}${(dt.getMonth() + 1).toString()}${dt.getDate().toString()}`;
    //JSON = JavaScript Object Notation is a syntax for storing and exchanging data and is text written with JavaScript object notation.
    //When exchanging data between a browser and a server, the data can only be text JSON is text adn we can convert an JAVAScript object inot JSon and sent JSON to the server
    // if you have data stored in a JavaScript object, you can convert the object inot JSON, and send it to a server
    //use the JavaScript function JSON.parse() to convert text into a JavaScript object
    //the localStorage property is read-only and stores data with no expiration date. The data will not be deleted when the brownswer is closed, and will be available the nextday, week or year
    //getItem is syntax for reading data from localStorage
    var data = JSON.parse(localStorage.getItem(name));
    //if there is no data in the localStorage
    if (data === null || data === undefined) {
        //then create the date, time, hour into text and store the data in localStorage
        data = dataTemp;
        const Hour = dataHour;
        Hour.hour = hour;
        Hour.text = text;
        data[0] = Hour;
        //setItem is syntax for saving data to localStorage
        //stringify converts a JavaScript object in a string
        localStorage.setItem(name, JSON.stringify(data));
    }
    else {
        //else look for the Hour in the data array
        var found = false;
        for (let i = 0; i < data.length; i++) {
            if (data[i].hour === hour) {
              found = true;
              data[i].text = text;
              localStorage.setItem(name, JSON.stringify(data));
              break;
            }
        }
        //if the Hour is not found then add it
        if (!found) {
            const Hour = dataHour;
            Hour.hour = hour;
            Hour.text = text;
            data.push(Hour);
            localStorage.setItem(name, JSON.stringify(data));
        }
    }
};

function loadText() {
    const dt = new Date();
    const name = `cal${dt.getFullYear().toString()}${(dt.getMonth() + 1).toString()}${dt.getDate().toString()}`;
    var data = JSON.parse(localStorage.getItem(name));
    //if data does not equal null and if data does not equal undefined
    if (data !== null && data !== undefined) {
        for (let i = 0; i < data.length; i++) {
            $('.hour').each(function () {
                const lblHour = $(this).text();
                var hour = lblHour.split(':')[0];
                if (data[i].hour === +hour) {
                    $(this).siblings('textarea').first().val(data[i].text);
                }
            });
        }
    }
}

$('.saveBtn').click(function () {
    const lblHour = $(this).siblings('label').first().text();
    var hour = lblHour.split(':')[0];
    const text = $(this).siblings('textarea').first().val();
    saveText(+hour, text);
});
  
loadText();
  