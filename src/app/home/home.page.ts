import { Component, OnInit, Inject } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { WalletPickerComponent } from '../components/wallet-picker/wallet-picker.component';

import { SolanaWalletAdaptor } from 'solana-wallet-adaptor-capacitor';

import { DOCUMENT } from '@angular/common';

import { AppstateService } from '../services/appstate.service';

// Solana test implementation
import { clusterApiUrl } from '@solana/web3.js';
import { createDefaultAddressSelector,
        createDefaultAuthorizationResultCache,
        SolanaMobileWalletAdapter } from '@solana-mobile/wallet-adapter-mobile';

import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
    CoinbaseWalletAdapter,
    GlowWalletAdapter,
    PhantomWalletAdapter,
    SlopeWalletAdapter,
    SolflareWalletAdapter,
    SolletExtensionWalletAdapter,
    SolletWalletAdapter,
    TorusWalletAdapter,
    TokenaryWalletAdapter,
} from '@solana/wallet-adapter-wallets';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public helloWorld: string;
  public wallets: string[];
  public jswallets: any[] = [];
  public window: any;
  public phantomCheck: any;
  public authorized: any;
  public authToken: string;
  public publicKey: any;
  public reauthorized = false;
  public deauthorized = false;
  public installedApps: string[];

  public walletEndpointAvailable: boolean;
  public getCapabilitiesResult = false;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private modalCtrl: ModalController,
    private appstate: AppstateService
    ) {
    this.window = this.document.defaultView;
  }

  async ngOnInit() {
   this.getInstalled();
  }

  async connectToWallet(walletName: string): Promise<{ connected: boolean }> {
    if (walletName === 'phantom') {
      // connect to phantom
      const app = new SolanaMobileWalletAdapter({
        addressSelector: createDefaultAddressSelector(),
        appIdentity: {
            name: 'Phantom test',
            uri: 'app.phantom',
            icon: './assets/favicon.png',
       },
        authorizationResultCache: createDefaultAuthorizationResultCache(),
        cluster: 'testnet'
    });

      const phantom = new PhantomWalletAdapter();
      this.phantomCheck = phantom.readyState;
      await phantom.connect();

    }
    return {connected: true};
  }

  async isEndPointAvailable() {
    const walletEndpointAvailable = await SolanaWalletAdaptor.checkIsWalletEndpointAvailable();
    this.walletEndpointAvailable = walletEndpointAvailable.endpointAvailable;
  }

  async getCapabilities() {
    const result = await SolanaWalletAdaptor.getCapabilities();
    console.log(result);
  }

  async authorize(wallet: string) {
    const result = await SolanaWalletAdaptor.authorize(wallet);
    if (result.authorized) {
      this.appstate.authorizationObject$.next(result);
      console.log(result.connection);
      // [TO DO CONSOLIDATE THIS AROUND authorizationObject to allow for wallet adaptor connection obj]
      this.appstate.authToken$.next(result.authToken);
      this.appstate.publicKey$.next(result.publicKey);
      this.appstate.toastMessage$.next('dApp authorized!');
    } else {
      this.appstate.authorizationObject$.next(null);
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

  async getInstalled() {
    const result = await SolanaWalletAdaptor.installedApps();
    this.installedApps = result.installed;
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
    const modal = await this.modalCtrl.create({
      component: WalletPickerComponent,
      componentProps: {
        data: this.installedApps
      }
    });
    modal.present();
  }

}
