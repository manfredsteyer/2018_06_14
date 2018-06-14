var flights = flights || {};

(function(root) {

    var secret = 42;

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
    }

    FlightManager.prototype.add = function(flight) {

        if (!flight) {
            throw new Error('flight must not be empty')
        }

        if (typeof flight !== 'object') {
            throw new Error('flight has to be an object')
        }

        this.cache.push(flight);
        this.flightAdded(flight);
    }

    FlightManager.prototype.find = function(id) {
        for (var i=0; i<this.cache.length; i++) {
            var f = this.cache[i];
            if (f.getId() == id) {
                return f;
            }
        }
        return null;
    }


    function ExtFlightManager() {
    }

    ExtFlightManager.prototype = new FlightManager();

    ExtFlightManager.prototype.find = function(id) {
        console.debug('looking for flight', id);
        return FlightManager.prototype.find.call(this, id);
    }

    ExtFlightManager.prototype.count = function() {
        return this.cache.length;
    }

    root.ExtFlightManager = ExtFlightManager;
    root.Flight = Flight;


})(flights);

