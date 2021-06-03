import { Component, OnInit } from '@angular/core';
import {ProfileService} from "../../services/profile.service";
import {IProfile} from "../../interfaces/IProfile";
import {IUsernameTransaction} from "../../interfaces/IUsernameTransaction";
import {TransactionsService} from "../../services/transactions.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public userProfile?: IProfile;
  public prettyTimestamp?: string;
  public transactions?: IUsernameTransaction;

  public options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

  constructor(private profileService: ProfileService,
              private transactionsService: TransactionsService) { }

  ngOnInit(): void {
    this.profileService.getProfile()
      .subscribe(profile => {
        this.userProfile = profile;
      });

    this.transactionsService.getTransactions()
      .subscribe(transactions => {
        this.transactions = transactions;
      })

    this.prettyTimestamp = new Date().toLocaleDateString("en-US", this.options);
  }

}
