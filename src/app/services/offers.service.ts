import { Injectable } from '@angular/core';
import { Offer } from '../interfaces/offer';

@Injectable({
  providedIn: 'root'
})
export class OffersService {

  private offers : Offer[] = [{
    title: 'Battle of Italia',
    brand:'Ferrari',
    model:'412 Berlenitta',
    description:'Expensive cars',
    price:3000
  }];

  constructor() { }

  getOffers(): Offer[] {
    return this.offers;
  }

  createOffer(offer : Offer): Offer[] {
    this.offers.push(offer);
    return this.offers;
  }

  editOffer(offer : Offer, index:number): Offer[] {
    this.offers[index] = offer;
    return this.offers;
  }

  deleteOffer(offerIndex : number): Offer[] {
    this.offers.splice(offerIndex, 1);
    return this.offers;
  }


}
