import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'walletInstalled'
})
export class WalletInstalledPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    const modifyObj = {...value};
    const result = modifyObj?.walletInfo?.filter(wallet => wallet?.walletInstalled);
    if (modifyObj.walletInfo) {
      modifyObj.walletInfo = result;
    }
    const output = {...modifyObj};
    return output;
  }

}
