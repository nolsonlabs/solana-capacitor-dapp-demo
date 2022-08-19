import { Component, OnDestroy } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Subscription } from 'rxjs';

import { AppstateService } from './services/appstate.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnDestroy {
  public breakpoints = {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200
  };

  private toastMessageSub: Subscription;



constructor(
    private platform: Platform,
    private appStatus: AppstateService,
  ) {
  this.initializeApp();
  }

async initializeApp() {
// Handles fixed state
const breakpointValues = Object.values(this.breakpoints);
this.setFixed(breakpointValues);
this.setSmall(breakpointValues);

// Handles viewport change in size
this.platform.resize.subscribe(async () => {
  this.setFixed(breakpointValues);
  this.setSmall(breakpointValues);
});

this.appStatus.toastMessage$.subscribe((message: string) => {
  if (message) {
    this.appStatus.makeToast(message);
  }
});

}

/* VIEWPORT HELPER FUNCTIONS */

getBreakpoint(breakpointValues): string {
let result = null;
if ((breakpointValues.findIndex(size => size > this.platform.width() ) - 1) === -2 ) { result = 4; } else {
result = breakpointValues.findIndex(size => size > this.platform.width() ) - 1;
}

const breakpointKeys = Object.keys(this.breakpoints);
const breakpointString = breakpointKeys[result].toString();
return breakpointString;

}

setFixed(breakpointValues) {
if ((this.getBreakpoint(breakpointValues) === 'xs') ||
    (this.getBreakpoint(breakpointValues) === 'sm') ||
    (this.getBreakpoint(breakpointValues) ==='md')
    ) {
      return this.appStatus.fixed$.next(false);
    } else {
      return this.appStatus.fixed$.next(true);
    }
  }

setSmall(breakpointValues) {
  if ((this.getBreakpoint(breakpointValues) === 'xs') ||
      (this.getBreakpoint(breakpointValues) === 'sm')
      ) {
        return this.appStatus.small$.next(true);
      } else {
        return this.appStatus.small$.next(false);
      }
    }

  ngOnDestroy() {
    this.toastMessageSub.unsubscribe();
  }
}
