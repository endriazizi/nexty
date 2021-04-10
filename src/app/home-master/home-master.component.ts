import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { AppService } from '../app.service';
// import { NotifierService } from '../notifier.service';

import { UserService } from '../_services/user.service';

import { ApiServiceContatori } from '../shared/api.service.contatori';



interface Place {
  imgSrc: string;
  name: string;
  description: string;
  charge: string;
  location: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home-master.component.html',
  styleUrls: ['./home-master.component.scss']
})

export class HomeMasterComponent {
  /** Based on the screen size, switch from standard to one column per row */
  mio="CIAOOOO"
  cards = [];
  cardsForHandset = [];
  cardsForWeb = [];

  isHandset: boolean = false;
  // isHandsetObserver: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(

  //   map(({ matches }) => {
  //     if (matches) {
  //       return true;
  //     }
  //     return false;
  //   })
  // );

  places: Array<Place> = [];
  countAllKits: any;
  countAllActiveKits: any;

  // constructor(private breakpointObserver: BreakpointObserver,
  //   public appService: AppService
  //   // private notifierService: NotifierService
  //   ) { }

  constructor(private contatoriApi: ApiServiceContatori) {
    // Count all kits
    this.contatoriApi.GetAllKits().subscribe(data => {
      this.countAllKits = data;

      console.log("Count all kits:" , this.countAllKits = data);
      
      
    }) 
    
    // Count active kits
    this.contatoriApi.GetActiveKits().subscribe(data => {
      this.countAllActiveKits = data;

      console.log("Count active kits:" , this.countAllActiveKits = data);
      
      
    })    
  }


  ngOnInit() {

    
    this.places = [
      {
        imgSrc: 'assets/images/card-1.jpg',
        name: 'Cozy 5 Stars Apartment',
        description: `The place is close to Barceloneta Beach and bus stop just 2 min by walk and near to "Naviglio"
              where you can enjoy the main night life in Barcelona.`,
        charge: '$899/night',
        location: 'Barcelona, Spain'
      },
      {
        imgSrc: 'assets/images/card-2.jpg',
        name: 'Office Studio',
        description: `The place is close to Metro Station and bus stop just 2 min by walk and near to "Naviglio"
              where you can enjoy the night life in London, UK.`,
        charge: '$1,119/night',
        location: 'London, UK'
      },
      {
        imgSrc: 'assets/images/card-3.jpg',
        name: 'Beautiful Castle',
        description: `The place is close to Metro Station and bus stop just 2 min by walk and near to "Naviglio"
              where you can enjoy the main night life in Milan.`,
        charge: '$459/night',
        location: 'Milan, Italy'
      }
    ];


    // this.isHandsetObserver.subscribe(currentObserverValue => {
    //   this.isHandset = currentObserverValue;
    //   console.log("isHandset: ", this.isHandset);
    //   this.loadCards();
    //   console.log("cards: ", this.cards);
    // });

    // this.appService.getDeals().subscribe(
    //   response => {
    //     this.cardsForHandset = response.handsetCards;
    //     console.log("cardsForHandset: ", this.cardsForHandset);
    //     this.cardsForWeb = response.webCards;
    //     console.log("cardsForWeb: ", this.cardsForWeb);
    //     this.loadCards();
    //     // this.notifierService.showNotification('Todays deals loaded successfully. Click on any deal!', 'OK', 'success');

    //   },
    //   error => {
    //     alert('There was an error in receiving data from server. Please come again later!');
    //     // this.notifierService.showNotification('There was an error in receiving data from server!', 'OK', 'error');
    //   }
    // );

    
  }

  loadCards() {
    this.cards = this.isHandset ? this.cardsForHandset : this.cardsForWeb;
    console.log("cards loadCards(): ", this.cards);
  }

  getImage(imageName: string): string {
    return 'url(' + 'http://localhost:3000/images/' + imageName + '.jpg' + ')';
  }
}
