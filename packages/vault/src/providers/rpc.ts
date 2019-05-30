/*
Copyright 2019 ETCDEV GmbH

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
import * as assert from 'assert';
import { JsonRpc } from '@emeraldplatform/rpc';
import { IVaultProvider, Account, TxSignRequest, Contact } from '../types';

export default class JsonRpcProvider implements IVaultProvider {
    rpc: JsonRpc;

    constructor(jsonRpc: JsonRpc) {
      this.rpc = jsonRpc;
    }

    currentVersion(): Promise<string> {
      return this.rpc.call('emerald_currentVersion', []);
    }

    /**
     * Returns the list of all not hidden (by default) accounts from the keystore.
     * @param chain - chain name
     * @param showHidden - also show hidden accounts
     * @returns {*}
     */
    listAccounts(chain: string, showHidden: boolean = false): Promise<Array<Account>> {
      this.notNull(chain, 'chain');
      return this.rpc.call('personal_listAccounts', [])
        .then(accounts => accounts.map(a => ({
          address: a.address,
          name: a.name,
          description: a.description,
          hardware: a.hardware,
          hidden: a.is_hidden,
        })));
    }

    signTransaction(tx: TxSignRequest, passphrase: string, chain: string) {
      this.notNull(chain, 'chain');
      const withPass = { ...tx, passphrase };
      return this.rpc.call('eth_signTransaction', [withPass, { chain }]);
    }

    importAccount(data, chain: string) {
      this.notNull(chain, 'chain');
      return this.rpc.call('emerald_importAccount', [data, { chain }]);
    }

    unhideAccount(address: string, chain: string) {
      this.notNull(chain, 'chain');
      return this.rpc.call('emerald_unhideAccount', [{ address }, { chain }]);
    }

    hideAccount(address: string, chain: string) {
      this.notNull(chain, 'chain');
      return this.rpc.call('emerald_hideAccount', [{ address }, { chain }]);
    }

    exportAccount(address: string, chain: string) {
      this.notNull(chain, 'chain');
      return this.rpc.call('emerald_exportAccount', [{ address }, { chain }]);
    }

    updateAccount(address: string, name: string, description: string = '', chain: string) {
      this.notNull(chain, 'chain');
      return this.rpc.call('emerald_updateAccount', [{ name, description, address }, { chain }]);
    }

    newAccount(passphrase: string, name: string, description: string, chain: string): Promise<string> {
      this.notNull(chain, 'chain');
      // const params = [{ passphrase, name, description }, { chain }];
      return this.rpc.call('personal_newAccount', passphrase);
    }

    importContract(address: string, name: string, abi: any, chain: string): Promise<boolean> {
      this.notNull(chain, 'chain');
      return this.rpc.call('emerald_importContract', [{ address, name }, { chain }]);
    }

    listContracts(chain: string): Promise<any> {
      this.notNull(chain, 'chain');
      return this.rpc.call('emerald_listContracts', [{ chain }]);
    }

    importAddress(item: Contact, chain: string): Promise<any> {
      this.notNull(chain, 'chain');
      return this.rpc.call('emerald_importAddress', [item, { chain }]);
    }

    listAddresses(chain: string): Promise<Contact[]> {
      this.notNull(chain, 'chain');
      return this.rpc.call('emerald_listAddresses', [{ chain }]);
    }

    deleteAddress(address: string, chain: string): Promise<any> {
      this.notNull(chain, 'chain');
      return this.rpc.call('emerald_deleteAddress', [address, { chain }]);
    }

    generateMnemonic(): Promise<string> {
      return this.rpc.call('emerald_generateMnemonic', []);
    }

    importMnemonic(
      passphrase: string, name: string, description: string,
      mnemonic: string, path: string, chain: string,
    ): Promise<string> {
      this.notNull(chain, 'chain');
      const params = {
        name,
        description,
        mnemonic,
        password: passphrase,
        hd_path: path,
      };
      return this.rpc.call('emerald_importMnemonic', [params, { chain }]);
    }

    notNull(value: any, param: string) {
      return assert(value, `${param} must not be null`);
    }
}
