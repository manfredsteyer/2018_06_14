
function Flight(id, from, to, price) {
    this.from = from;
    this.to = to;

    this.getPrice = function() {
        return price;
    }

    this.getId = function() {
        return id;
    }
}

function FlightManager() {

    this.cache = [];

    this.flightAdded = function() { }

    this.add = function(flight) {
        this.cache.push(flight);
        this.flightAdded(flight);
    }

    this.find = function(id) {
        for (var i=0; i<this.cache.length; i++) {
            var f = this.cache[i];
            if (f.getId() == id) {
                return f;
            }
        }
        return null;
    }

}





