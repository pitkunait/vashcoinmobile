import { pki, md, util } from 'node-forge';
import Transaction from './Transaction';

class Wallet {
    id: string;
    pk: pki.rsa.PublicKey;
    sk: pki.rsa.PrivateKey;

    constructor(id?: string) {
        this.id = id || 'sd';
        const keypair = pki.rsa.generateKeyPair({ bits: 512, e: 65537 });
        this.pk = keypair.publicKey;
        this.sk = keypair.privateKey;
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
}

export default Wallet;
