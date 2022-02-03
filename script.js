var date, weeks, years, months, diff;
var currentDate = new Date();

var color = "#EF6F6C";


// takes the input in date section
document.querySelector("#date").addEventListener('input', function() {
    date = document.querySelector("#date").valueAsDate;
});



// calls the function "difference" to when pressed enter
document.querySelector("#date").addEventListener("keyup", function(e) {
    if (e.key === 'Enter') {
        difference(date);
    }
});



// function to call difference between dates 
function difference(date) {

    diff = currentDate.getTime() - date.getTime();

    weeks = Math.round(diff / (1000 * 60 * 60 * 24 * 7));
    months = Math.round(diff / (1000 * 60 * 60 * 24 * 30.4375));
    years = Math.round(diff / (1000 * 60 * 60 * 24 * 365.25));

    setDateValue(weeks, months, years, date);

    colorboxes(0, 0, 0); //colour 0 boxes
    colorboxes(weeks, months, years); //colour boxes according to difference calculated
}



// stores value of date entered on homepage
// this is to be able use that value across all pages
function setDateValue(weeks, months, years, date) {
    localStorage.setItem("DOB", JSON.stringify({
        month: months,
        year: years,
        week: weeks,
        monthValue: (date.getMonth() + 1),
        yearValue: date.getFullYear(),
        dayValue: date.getDate()
    }));
}



// loads value(date) to use them
function loadDateValue() {
    var DOB = JSON.parse(localStorage.getItem('DOB'));
    colorboxes(0, 0, 0);
    colorboxes(DOB.week, DOB.month, DOB.year);
}
loadDateValue();



// function to colour the boxes
function colorboxes(weeks, months, years) {

    var weekLi = document.querySelectorAll("#weeks li");
    var monthLi = document.querySelectorAll("#months li");
    var yearLi = document.querySelectorAll("#years li");


    for (var j = 0; j < weeks && j < weekLi.length; j++) {
        weekLi[j].style.backgroundColor = color;
    }

    var monthcolor = async() => {
        for (var j = 0; j < months && j < monthLi.length; j++) {
            await new Promise(r => setTimeout(r, 10));
            monthLi[j].style.backgroundColor = color;
        }
    }

    var yearcolor = async() => {
        for (var j = 0; j < years && j < yearLi.length; j++) {
            await new Promise(r => setTimeout(r, 20));
            yearLi[j].style.backgroundColor = color;
        }
    }

    yearcolor();
    monthcolor();

}