import { Flight, IFlight } from "./flights";


export abstract class AbstractFlightManager {

    constructor(protected cache: Array<IFlight> = []) {
    }

    public abstract search(from: string, to: string): Array<IFlight>;

    public abstract update(flight: Flight);

    public abstract where(condition: FlightCondition): Array<IFlight>;

}

export type FlightCondition = (IFlight) => boolean;


export class FlightManager extends AbstractFlightManager  {

    public update(flight: Flight) {
        let idx = this.cache.findIndex(f => f.id == flight.id);
        if (idx === -1) throw new Error('flight not found!');
        this.cache[idx] = flight;
    }

    where(condition: FlightCondition): Array<IFlight> {
        let result = new Array<IFlight>();
        for (let flight of this.cache) {
            if (condition(flight)) {
                result.push(flight);
            }
        }
        return result;
    }

    search(from: string, to: string): Array<IFlight> {
        let result = new Array<IFlight>();
        for (let flight of this.cache) {
            if (flight.from == from && flight.to == to) {
                result.push(flight);
            }
        }
        return result;
    }

}

export class DummyFlightManager extends AbstractFlightManager {
    public search(from: string, to: string): Flight[] {
        return [
            new Flight(1), new Flight(2)
        ]
    }
    public update(flight: Flight) {
        console.debug('flight was updated')
    }

    public where(condition: FlightCondition): Array<IFlight> {
        return [];
    }
}


export function createFlightManager(cache: Array<IFlight>): AbstractFlightManager {
    return new FlightManager(cache);
}