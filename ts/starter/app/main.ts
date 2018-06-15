import { Flight, IFlight, CharterFlight, IBus, FlightCategory } from './flights';
import { ExtFlightManager } from './ext-flight-manager';
import { createFlightManager } from './flight-manager';
import { Invoice } from './invoice';
import { sayHello } from './hello';

let f1: IFlight = new Flight(1);
f1.from = 'Graz';
f1.to = 'Mallorca';
f1.date = 'now';
f1.category = FlightCategory.Discount;

let f2: IFlight = new Flight(2);
f2.from = 'Mallorca';
f2.to = 'Graz';
f2.date = 'now';
f2.category = FlightCategory.Premium;

let f3 = new CharterFlight();
f3.chartedBy = 'TUI';
f3.from = 'Graz';
f3.to = 'Mallorca';
f3.category = FlightCategory.Cargo;


let cache = [f1, f2, f3];

//let fm = new ExtFlightManager(cache);
let fm = createFlightManager(cache);

// let result = fm.search('Graz', 'Mallorca');
let result = fm.where(f => f.from == 'Graz' || f.to == 'Graz');

console.debug('result', result);
// console.debug('count of flights', fm.count);


 let invoice = new Invoice<IFlight>(f1);
 invoice.printInvoice();

 let invoice2 = new Invoice<CharterFlight>(f3);
 invoice2.printInvoice();

 sayHello(undefined, 'Meier');