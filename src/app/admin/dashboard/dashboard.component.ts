import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { observable, Subscription } from 'rxjs';
import { Offer } from 'src/app/interfaces/offer';
import { OffersService } from 'src/app/services/offers.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  offerForm!: FormGroup;

  offers: Offer[] = [];

  subscription! : Subscription;
  currentOfferPhotoFile! : any;
  currentPhotoUrl! : string;

  constructor(
    private formBuilder : FormBuilder,
    private offersServices : OffersService
  ) { }

  ngOnInit(): void {
    this.initOfferForm();
    this.subscription = this.offersServices.offersSubject.subscribe({
      next: (offers : Offer[]) => {
        console.log('NEXT');
        this.offers = offers;
      },
      error: console.error
    });
    this.offersServices.getOffers();
  }

  initOfferForm(): void {
    this.offerForm = this.formBuilder.group({
      id: [null],
      title:['',[Validators.required, Validators.maxLength(50)]],
      photo: [],
      brand:'',
      model:'',
      description:'',
      price:0
    });
  }

  onSubmitOfferForm(): void {
    const offerId = this.offerForm.value.id;
    let offer = this.offerForm.value;
    if (!offerId || offerId && offerId === '' ) { //Création
      delete offer.index;
      this.offersServices.createOffer(offer, this.currentOfferPhotoFile)
     .catch(console.error)
    } else { // Modification
      delete offer.id;
      this.offersServices.editOffer(offer, offerId)
      .catch(console.error);
    }
    this.offerForm.reset();
    this.currentOfferPhotoFile = null;
    this.currentPhotoUrl = '';
  }

  onChangeOfferPhoto($event: any ): void {
    this.currentOfferPhotoFile = $event.target.files[0];
    const filereader = new FileReader();
    filereader.readAsDataURL(this.currentOfferPhotoFile);
    filereader.onloadend = (e) => {
      this.currentPhotoUrl = <string>e.target?.result
    }

  }

  onEditOffer(offer: Offer): void{
    this.offerForm.setValue({
      id: offer.id ? offer.id: '',
      title: offer.title ? offer.title: '',
      brand: offer.brand ? offer.brand: '',
      model: offer.model ? offer.model: '',
      description: offer.description ? offer.description : '',
      price: offer.price ? offer.price: ''
    });
  }

  onDeleteOffer(offerId? : string): void {
    if(offerId) {
      this.offersServices.deleteOffer(offerId).catch(console.error);
    }else {
      console.error('An ID must be provided to delete an offer');
    }
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }



}
