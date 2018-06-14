
var flight1 = new Flight(1, 'Graz', 'Mallorca', 90);
var flight2 = new Flight(2, 'Mallorca', 'Graz', 690);

var flightManager = new FlightManager();

flightManager.flightAdded = function(f) {
    console.debug('added flight', f);
}

flightManager.add(flight1);
flightManager.add(flight2);

var f = flightManager.find(2);

console.debug('flight', 
                f.from, 
                f.to, 
                f.getId(), 
                f.getPrice());
                

/*
var ary = [1,7,20,19,81,20,18];

function find(ary, action) {
    var result = [];
    for(var i=0; i < ary.length; i++) {
        if (action(ary[i])) {
            result.push(ary[i]);
        }
    }
    return result;
}


function finder(item) {
    return item % 2 == 0;
}

function oddFinder(item) {
    return item % 2 == 1;
}


var result = find(ary, function(item) {
    return item > 10;
});

var result = find(ary, item => item > 10);

console.debug('result', result);
*/