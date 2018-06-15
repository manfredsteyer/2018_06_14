import { IFlight } from "./flights";



export class Invoice<T extends IFlight> {

    public price: number;

    constructor(public product: T) {
        this.price = product.price * 1.2; // add Austrian VAT
    }

    printInvoice(): void {
        console.debug('INVOICE');
        console.debug('  Date: ', new Date());
        console.debug('  Product', this.product);
        console.debug('  Price:', this.price);
    }

}