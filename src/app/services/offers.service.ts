import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { BehaviorSubject, Observable } from 'rxjs';
import { Offer } from '../interfaces/offer';

@Injectable({
  providedIn: 'root'
})
export class OffersService {

  private offers : Offer[] = [];

  offersSubject : BehaviorSubject<Offer[]> = new BehaviorSubject(<Offer[]>[]);

  constructor(
    private db : AngularFireDatabase,
    private storage : AngularFireStorage
  ) { }

  getOffers(): void {
    this.db.list('offers').query.limitToLast(10).once('value', snapshot => {
      const offerSnapshotValue = snapshot.val();
      const offers = Object.keys(offerSnapshotValue).map(id => ({id,...offerSnapshotValue[id]}));
      this.offers = offers;
      this.dispatchOffers();
    });
  }


  dispatchOffers() {
    this.offersSubject.next(this.offers);
  }

  async createOffer(offer : Offer, offerPhoto?: any): Promise<Offer> {
    try {
      const photoUrl = offerPhoto ? await this.uploadPhoto(offerPhoto) : '';
      const response = this.db.list('offers').push({...offer, photo: photoUrl});
      const createdOffer = {...offer,photo: photoUrl, id: <string>response.key}
      this.offers.push(createdOffer);
      this.dispatchOffers();
      return createdOffer;
    } catch (error) {
      throw error;
    }



  }

  editOffer(offer : Offer, offerId: string): Promise<Offer> {
    return new Promise((resolve, reject) => {
      this.db.list('offers').update(offerId, offer)
      .then((res) => {
        const updateOffer = {...offer, id: offerId};
        const offerToUpdateIndex = this.offers.findIndex(el => el.id === offerId);
        this.offers[offerToUpdateIndex] = updateOffer;
        this.dispatchOffers();
        resolve({...offer, id: offerId})
      }).catch(reject);
    });
  }

  deleteOffer(offerId : string): Promise<Offer> {
    return new Promise((resolve, reject) => {
      this.db.list('offers').remove(offerId)
      .then(() => {
        const offerToDeleteIndex = this.offers.findIndex(el => el.id === offerId);
        this.offers.splice(offerToDeleteIndex,1);
        this.dispatchOffers();

      }).catch(console.error)
    });
  }


  private uploadPhoto(photo: any): Promise<string> {
    return new Promise((resolve, reject) => {
      const upload = this.storage.upload('offers/'+ Date.now() +' - ' +photo.name, photo);
      upload.then((res) => {
        resolve(res.ref.getDownloadURL())
      }).catch(reject);
    });
  }


}
