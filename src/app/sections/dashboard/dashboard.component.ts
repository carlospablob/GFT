import { Component, OnInit } from '@angular/core';
import { JwtService } from 'src/services/shared/jwt/jwt.service';
import { UserInfo } from 'src/models/userInfo';
import { AccountService } from 'src/services/account/account.service';
import { SnackBarService } from 'src/services/shared/snackbar/snackbar.service';
import { CardsService } from 'src/services/cards/cards.services';
import { TypeCard, CardsInterface, RequestCard, Card } from 'src/models/card';
import { MatSelectChange } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [AccountService, CardsService]
})
export class DashboardComponent implements OnInit {

  public dataUser: UserInfo;

  public myCards: Array<Card> = [];

  public arrayCards: Array<TypeCard> = [];

  public cardSelected: TypeCard;

  constructor(
    private _jwtService: JwtService,
    private _accountsService: AccountService,
    private _snackbarService: SnackBarService,
    private _cardService: CardsService,
    private _router: Router
  ) { }

  ngOnInit() {
    if (localStorage.getItem('token')) {
      this.dataUser = this._jwtService.getDecodedAccessToken(localStorage.getItem('token'));      
      this.consultAccounts();
      this.loadCatalogOfCards();
    }
  }

  consultAccounts() {
    this._accountsService.consultAccounts().subscribe(
      response => {
        this.myCards = response.response;
        console.log(this.myCards.length);

      },
      error => {
        console.error(error);
      }
    )
  }

  loadCatalogOfCards() {
    this._cardService.getCatalog().subscribe(
      (response: CardsInterface) => {
        this.arrayCards = response.response.type_cards;
      },
      error => {
        console.log(error);
      }
    )
  }

  setCard(card: MatSelectChange) {
    console.log(card.value);
    this.cardSelected = card.value;
  }

  requestCard() {
    let requestCard: RequestCard = new RequestCard();
    requestCard.userId = this.dataUser.id;
    requestCard.type = this.cardSelected.type;
    requestCard.name = this.cardSelected.name;

    this._cardService.requestCard(requestCard).subscribe(
      response => {
        this._snackbarService.messageBar(response.success, 4000);
      },
      error => {
        console.error(error);
        this._snackbarService.messageBar(error.message, 4000);
        
      }
    )
  }

  closeSession() {    
    localStorage.clear();
    this._router.navigate(['/login']);
  }
}
