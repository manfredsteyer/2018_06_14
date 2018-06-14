import { Flight } from "./flights";

export class FlightManager {

    constructor(protected cache: Array<Flight> = []) {
    }

    search(from: string, to: string): Array<Flight> {
        let result = new Array<Flight>();
        for (let flight of this.cache) {
            if (flight.from == from && flight.to == to) {
                result.push(flight);
            }
        }
        return result;
    }

}