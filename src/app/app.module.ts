import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
//import { WalletInstalledPipe } from './pipes/wallet-installed.pipe';
//import { WalletNotInstalledDeeplinkPipe } from './pipes/wallet-not-installed-deeplink.pipe';
//import { WalletNotInstalledNoDeeplinkPipe } from './pipes/wallet-not-installed-no-deeplink.pipe';

@NgModule({
  declarations: [AppComponent, //WalletInstalledPipe, WalletNotInstalledDeeplinkPipe, WalletNotInstalledNoDeeplinkPipe
  ],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
