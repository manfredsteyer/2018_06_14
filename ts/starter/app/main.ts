import { Flight } from './flights';
import { ExtFlightManager } from './ext-flight-manager';

let f1 = new Flight(1);
f1.from = 'Graz';
f1.to = 'Mallorca';
f1.date = 'now';

let f2 = new Flight(2);
f2.from = 'Mallorca';
f2.to = 'Graz';
f2.date = 'now';

let cache = [f1, f2];

let fm = new ExtFlightManager(cache);

let result = fm.search('Graz', 'Mallorca');

console.debug('result', result);
console.debug('count of flights', fm.count);


