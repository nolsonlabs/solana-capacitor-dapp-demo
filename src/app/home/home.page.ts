import { Component, OnInit, Inject } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { WalletPickerComponent } from '../components/wallet-picker/wallet-picker.component';

import { SolanaWalletAdaptor } from 'solana-wallet-adaptor-capacitor';

import { AppstateService } from '../services/appstate.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
      private modalCtrl: ModalController,
      public appstate: AppstateService
    ) {

  }

  async getCapabilities() {
    const result = await SolanaWalletAdaptor.getCapabilities();
  }

  async authorize(wallet: string) {

    const result = await SolanaWalletAdaptor.authorize(wallet);
    if (result.authorized) {
      this.appstate.authorizationObject$.next(result);


      // [TO DO CONSOLIDATE THIS AROUND authorizationObject to allow for wallet adaptor connection obj]
      this.appstate.authToken$.next(result.authToken);
      this.appstate.publicKey$.next(result.publicKey);
      this.appstate.toastMessage$.next('dApp authorized!');
    } else {
      this.appstate.authorizationObject$.next({ authorized: false, authToken: '', publicKey: '', connection: null});
      this.appstate.authToken$.next('');
      this.appstate.publicKey$.next('');
      this.appstate.toastMessage$.next('dApp not authorized!');
    }
  }

  async reauthorize() {
    const result = await SolanaWalletAdaptor.reauthorize({authToken: this.appstate.authToken$.value});
    if (result.reauthorized) {
      this.appstate.authToken$.next(result.authToken);
      this.appstate.publicKey$.next(result.publicKey);
      this.appstate.toastMessage$.next('dApp reauthorized!');
    } else {
      this.appstate.authToken$.next('');
      this.appstate.publicKey$.next('');
      this.appstate.toastMessage$.next('dApp not reauthorized!');
    }
  }

  async deauthorize() {
    const result = await SolanaWalletAdaptor.deauthorize({authToken: this.appstate.authToken$.value,
                                                          connection: this.appstate.authorizationObject$.value.connection});
    if (result.deauthorized) {
      this.appstate.toastMessage$.next('dApp deauthorized!');
      this.appstate.authToken$.next('');
      this.appstate.authorizationObject$.next({ authorized: false, authToken: '', publicKey: '', connection: null});
    } else {
      this.appstate.toastMessage$.next('dApp not deauthorized!');
    }
  }

  async requestAirdrop() {
    const result = await SolanaWalletAdaptor.requestAirdrop({authToken: this.appstate.authToken$.value});
    if (result.success) {
      this.appstate.toastMessage$.next('Airdrop successfully requested!');
    } else {
      this.appstate.toastMessage$.next('Airdrop request failed');
    }

  }

  async signTransactions(count: number) {
    const result = await SolanaWalletAdaptor.signTransactions({
      count,
      authToken: this.appstate.authToken$.value,
      publicKey: this.appstate.publicKey$.value
      });
      if (result.success) {
        this.appstate.toastMessage$.next(count.toString() + ' transactions signed!');
      } else {
        this.appstate.toastMessage$.next('Signing failed. Please try again.');
      }
  }

  async authorizeAndSignTransactions(count: number) {
    const result = await SolanaWalletAdaptor.authorizeAndSignTransactions({
        count,
        });
    if (result.success) {
      this.appstate.toastMessage$.next(count.toString() + ' transaction signed!');
    } else {
      this.appstate.toastMessage$.next('Signing failed. Please try again.');
    }
  }

  async signMessages(count: number) {
    const result = await SolanaWalletAdaptor.signMessages({
      count,
      authToken: this.appstate.authToken$.value
    });
    if (result.success) {
      if (count === 1) {
        this.appstate.toastMessage$.next(count.toString() + ' message signed!');
      } else {
        this.appstate.toastMessage$.next(count.toString() + ' messages signed!');
      }
    } else {
      this.appstate.toastMessage$.next('Signing failed. Please try again.');
    }
  }

  async signAndSendTransactions(count: number) {
    const result = await SolanaWalletAdaptor.signAndSendTransactions({
      count,
      authToken: this.appstate.authToken$.value
    });
    if (result.success) {
      if (count === 1) {
        this.appstate.toastMessage$.next(count.toString() + ' transaction signed & sent!');
      } else {
        this.appstate.toastMessage$.next(count.toString() + ' transactions signed & sent!');
      }
    } else {
      this.appstate.toastMessage$.next('Sign & send failed. Please try again.');
    }
  }

  async connectWallet() {
    this.appstate.getWalletAndEnvironmentInfo();
    const modal = await this.modalCtrl.create({
      component: WalletPickerComponent,
    });
    modal.present();
  }

}
