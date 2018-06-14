import { FlightManager } from './flight-manager';
import { Flight } from './flights';



export class ExtFlightManager extends FlightManager {
    // constructor(cache: Array<Flight>, sth: string) {
    //     super(cache);
    // }

    get count() {
        return this.cache.length;
    }
}