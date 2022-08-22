<h1>Solana Capacitor Demo dApp</h1>
<p>This is a demo app for the <a href="https://github.com/nolsonlabs/solana-capacitor-dapp">Solana Capacitor dApp plugin</a>.</p>
<h3>Installation</h3>
<h4>Pre-requisites</h4>
<p>To run and deploy this project, please first install the dependencies for Capacitor described <a href="https://capacitorjs.com/docs/getting-started/environment-setup#android-requirements">here </a> and for Ionic as described <a href="https://ionicframework.com/docs/intro/cli">here</a>.

<h4>Install steps</h4>
<ul>
    <li>Clone this repo</li>
    <li>Change to the directory you cloned the files to</li>
    <li>run the "npm i" command</li>
    <li>run "ionic build"</li>
    <li>run "npx cap sync"</li>
    <li>run "ionic cap open android to open the project in Android studio</li>
    <li>deploy to a device to emulator using the standard Android Studio workflow</li>
</ul>

<h4>Dependency issues</h4>
<p>After installing the dependencies and trying to run you get the compilation warning "Error: node_modules/@jnwng/walletconnect-solana/lib/types/adapter.d.ts:3:15 - error TS2305: Module '"@walletconnect/types"' has no exported member 'SignClientTypes'." you can fix this as follows;</p>

<p>In node_modules/@jnwng/wallet-connect-solana/lib/types/adapter.d.s;</p>
<p> Comment out "import type { SignClientTypes } from '@walletconnect/types';"</p>
<p>In lines 5-8 change the type of options to any so it looks like this: export interface WalletConnectWalletAdapterConfig { network: WalletConnectChainID; options: any;
}</p>
<p>Pretty hack and not ideal but will allow you to see the demo.</p>
