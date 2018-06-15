import { Flight, IFlight } from "./flights";

import { Observable, Observer, of, interval } from 'rxjs';
import { switchMap, startWith } from 'rxjs/operators';

// type SuccessFunction = (flights: Flight[]) => void;
// type FailFunction = (err:any) => void;

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

    clearCache() {
        this.cache = [];
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


    public load(from: string, to: string): Promise<IFlight[]> {

        return new Promise((resolve: Function, reject: Function) => {

            let xmlhttp = new XMLHttpRequest();
    
            xmlhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    console.debug(this.responseText);
                    resolve(JSON.parse(this.responseText));
                    
                }
                else if (this.readyState == 4 && this.status >= 400) {
                    console.error('error loading flights')
                    reject(xmlhttp);
                }
                else if (this.readyState == 4) {
                    console.error('unexpected state!');
                    reject(xmlhttp);
                }
            };
        
            let url = `http://www.angular.at/api/flight?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`;
    
            xmlhttp.open("GET", url, true);
            xmlhttp.send();

        })
    }


    public observeFlights(from: string, to: string): Observable<IFlight[]> {
        return interval(2000).pipe(
            startWith(0),
            switchMap(i => this.createData(from, to)
        ))
    }

    private createData(from: string, to: string): Observable<IFlight[]> {
        if (this.cache.length == 0) {
            return this.createObservable(from, to);
        }
        else {
            return this.changeFlights();
        }
    }



    private changeFlights(): Observable<IFlight[]> {
        let idx = Math.floor(this.cache.length * Math.random());
        this.cache[idx].price += 100;
        return of(this.cache);
    }

    private createObservable(from: string, to: string): Observable<IFlight[]> {

        return Observable.create((sender: Observer<IFlight[]>) => {

            let xmlhttp = new XMLHttpRequest();
    
            xmlhttp.onreadystatechange = () => {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    this.cache = JSON.parse(xmlhttp.responseText); 
                    
                    this.cache.forEach(f => f.price = 300);

                    sender.next(this.cache);
                }
                else if (xmlhttp.readyState == 4 && xmlhttp.status >= 400) {
                    console.error('error loading flights')
                    sender.error(JSON.parse(xmlhttp.responseText));
                }
                else if (xmlhttp.readyState == 4) {
                    console.error('unexpected state!');
                    sender.error(xmlhttp);
                }
            };
        
            let url = `http://www.angular.at/api/flight?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`;
    
            xmlhttp.open("GET", url, true);
            xmlhttp.send();

        })

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