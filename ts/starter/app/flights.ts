
export enum FlightCategory {
    Cargo, Discount, Premium
}

export interface IBus {
    id: number;
    from: string;
    to: string;
    date: string;
    price: number;
    
}

export interface IFlight  {

    id: number;
    from: string;
    to: string;
    date: string;
    price: number;
    category: FlightCategory;
}

export class CharterFlight implements IFlight {
    id: number;
    from: string;
    to: string;
    date: string;
    price: number;
    chartedBy: string;
    category: FlightCategory;
}

export class Flight implements IFlight {
    
    constructor(public id: number) {
        // this.id = id
    }

    // public id: number

    public from: string;
    public to: string;
    public date: string;
    public price: number;
    public category: FlightCategory;

    public getInfo(): string {
        return 'delayed';
    }

}