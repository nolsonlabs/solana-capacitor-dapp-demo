import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { AppstateService } from '../../services/appstate.service';

@Component({
  selector: 'app-wallet-picker',
  templateUrl: './wallet-picker.component.html',
  styleUrls: ['./wallet-picker.component.scss'],
})
export class WalletPickerComponent implements OnInit {

  @Input() data: string[];

  public installed = [];
  public notFound = [];

  public walletData = [
    { id: 'app.phantom',
      name: 'Phantom'
     },
     {
       id: 'com.solflare.mobile',
       name: 'Solflare'
     },
     {
       id: 'com.y8.slope',
       name: 'Slope'
     },
     {
       id: 'com.solana.mobilewalletadapter.fakewallet',
       name: 'FakeWallet'
     }

  ];

  constructor(private modalCtrl: ModalController, private appstate: AppstateService) { }

  ngOnInit() {
      console.log(this.data);
      this.installed = this.walletData.filter(wallet => this.data.includes(wallet.id));
      this.notFound = this.walletData.filter(wallet => !this.data.includes(wallet.id));
  }

  selectWallet(wallet: any) {
    console.log(wallet);
    this.appstate.selectedWallet$.next(wallet.name);
    this.dismiss();
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

}
