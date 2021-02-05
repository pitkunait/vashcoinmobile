import { pki, md, util } from 'node-forge';
import Transaction from './Transaction';
import { nanoid } from 'nanoid';
import store from '../store';
import { setWallet } from '../store/reducers/AppReducer';

export interface WalletProps {
    id: string;
    key: {
        pk: string;
        sk: string;
    };
}

export let wallet: Wallet;

class Wallet {
    id: string;
    pk: pki.rsa.PublicKey;
    sk: pki.rsa.PrivateKey;

    constructor(props?: Partial<WalletProps>) {
        this.id = props?.id || nanoid(64);
        if (props?.key && props.id) {
            this.sk = pki.privateKeyFromPem(props.key.sk);
            this.pk = pki.publicKeyFromPem(props.key.pk);
        } else {
            const keypair = pki.rsa.generateKeyPair({ bits: 512 });
            this.pk = keypair.publicKey;
            this.sk = keypair.privateKey;
        }
    }

    public signTransaction(transaction: Transaction) {
        const unsigned = md.sha1.create();
        unsigned.update(transaction.plain());
        const signature = this.sk.sign(unsigned);
        transaction.signature = util.bytesToHex(signature);
        let pkString = pki.publicKeyToPem(this.pk).replace(/\r\n/g, '\n');
        transaction.public_key = util.bytesToHex(pkString);
        return transaction;
    }

    public serialize(): WalletProps {
        return {
            id: this.id,
            key: {
                pk: pki.publicKeyToPem(this.pk),
                sk: pki.privateKeyToPem(this.sk),
            },
        };
    }

    public static initWallet(details: WalletProps) {
        wallet = new Wallet(details);
        store.dispatch(setWallet(wallet.serialize()));
    }
}

export default Wallet;
