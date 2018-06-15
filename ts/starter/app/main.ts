import { Flight, IFlight, CharterFlight, IBus, FlightCategory } from './flights';
import { ExtFlightManager } from './ext-flight-manager';
import { createFlightManager, FlightManager } from './flight-manager';
import { Invoice } from './invoice';
import { sayHello } from './hello';
import { Subscription } from 'rxjs';

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

let fm = new FlightManager(cache);
//let fm = createFllightManager(cache);

// let result = fm.search('Graz', 'Mallorca');
let result = fm.where(f => f.from == 'Graz' || f.to == 'Graz');

fm.load('Graz', 'Hamburg')
  .then(flights => { 
      console.debug('got flights', flights); 

      return fm.load('Hamburg', 'Graz');
    })
    .then(flights => { 
        console.debug('got return flights', flights); 
  
   })
  .catch(err => {
    console.error('got error', err);
  })

console.debug('result', result);
// console.debug('count of flights', fm.count);


 let invoice = new Invoice<IFlight>(f1);
 invoice.printInvoice();

 let invoice2 = new Invoice<CharterFlight>(f3);
 invoice2.printInvoice();


 let subscription: Subscription = null;

 function search(): void {

    if (subscription) {
        subscription.unsubscribe();
    }

    let from = $('input[name=from]');
    let to = $('input[name=to]');

    let fromValue = from.val() as string;
    let toValue = to.val() as string;

    // let result = fm.search(fromValue, toValue);
    // render(result);

    /*
    fm.load(fromValue, toValue)
        .then(flights => render(flights))
        .catch(err => console.error('got error', err));
    */

    fm.clearCache();

    subscription = fm.observeFlights(fromValue, toValue).subscribe(
        flights => render(flights),
        err => console.error('got error', err)
    );

 }

 function render(result: IFlight[]): void {
    let html = '<table class="table table-striped">';

    for(let f of result) {
        html += `
            <tr>
                <td>${f.id}</td>
                <td>${f.from}</td>
                <td>${f.to}</td>
                <td>${f.date}</td>
                <td>${f.price}</td>
            </tr>
        `;
    }

    html += '</table>';

    $("#placeholder").html(html)
 }

 $('#btnSearch').click(search);