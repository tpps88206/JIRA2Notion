export interface Market {
  name: string;
  baseCurrency: string;
  quoteCurrency: string;
  type: string;
  underlying: string;
  enabled: boolean;
  ask: number;
  bid: number;
  last: number;
  price: number;
  priceIncrement: number;
  sizeIncrement: number;
  restricted: boolean;
}
