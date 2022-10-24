import { Provider } from '@/types/wallet';
import detectEthereumProvider from '@metamask/detect-provider';
import Caver from 'caver-js';

abstract class Wallet {
	private provider: Provider;
	private wallet: any;
	private _init: boolean;

	constructor(provider: Provider) {
		if (provider) {
			this.provider = provider;
			this.wallet = setProvider(provider);
			this._init = false;
		} else {
			throw new Error(`Wallet Error`);
		}
	}

	abstract init(): Promise<void>;

	abstract getAddress(): Promise<string>;

	get getProvider(): Provider {
		return this.provider;
	}

	get getWallet(): any {
		return this.wallet;
	}

	get getInit(): boolean {
		return this._init;
	}
}

function setProvider(provider: Provider) {
	switch (provider) {
		case Provider.metamask:
			return new Metamask(provider);
		case Provider.kaikas:
			return new Kaikas(provider);
		// case Provider.klip:
		// 	return new Klip(provider);
	}
}

export class Metamask extends Wallet {
	ethereum: any;

	async init(): Promise<void> {
		const ethereum: any = await detectEthereumProvider();
		this.ethereum = ethereum;
	}

	async getAddress(): Promise<string> {
		const addresses = await this.ethereum.request({
			method: 'eth_requestAccounts',
		});
		return addresses[0];
	}
}

export class Kaikas extends Wallet {
	klaytn: any;
	caver: any;

	async init(): Promise<void> {
		const { klaytn } = window;
		const caver = new Caver(klaytn);
		this.klaytn = klaytn;
		this.caver = caver;
	}

	async getAddress(): Promise<string> {
		const unlocked = await this.klaytn._kaikas.isUnlocked();
		if (!unlocked) {
			await this.klaytn.enable();
			window.location.reload();
		}
		return this.klaytn.selectedAddress;
	}
}

// export class Klip extends Wallet {}
