import { JsonRpc } from '@emeraldplatform/rpc';
import { convert } from '@emeraldplatform/core';
import BigNumber from 'bignumber.js';
import format from '../format';
import { CallObject, SyncingResult } from '../types';

export default class EthApi {
  rpc: JsonRpc;
  compile: object;

  constructor(jsonRpc: JsonRpc) {
    this.rpc = jsonRpc;
    this.compile = {
      solidity: this.compileSolidity.bind(this),
    };
  }

  /**
   * Gets a list of available compilers
   */
  getCompilers(): Promise<string[]> {
    return this.rpc.call('eth_getCompilers', []);
  }

  /**
   * Returns compiled solidity code
   */
  compileSolidity(code: string): Promise<object> {
    return this.rpc.call('eth_compileSolidity', [code]);
  }

  /**
   * Returns the current Ethereum protocol version
   */
  protocolVersion(): Promise<string> {
    return this.rpc.call('eth_protocolVersion', []);
  }

  /**
   * Returns the balance of the account of given address.
   */
  getBalance(address: string, blockNumber: number | string = 'latest'): Promise<BigNumber> {
    return this.rpc.call('eth_getBalance', [address, blockNumber])
      .then(hexBalance => convert.toBigNumber(hexBalance));
  }

  /**
   * Returns the current price per gas in wei.
   */
  gasPrice(): Promise<BigNumber> {
    return this.rpc.call('eth_gasPrice', [])
      .then(hexPrice => convert.toBigNumber(hexPrice));
  }

  /**
   * Returns an object with data about the sync status or false.
   */
  getSyncing(): Promise<SyncingResult> {
    return this.rpc.call('eth_syncing', [])
      .then((result) => {
        if (!result) {
          return false;
        }
        return {
          startingBlock: convert.toNumber(result.startingBlock),
          currentBlock: convert.toNumber(result.currentBlock),
          highestBlock: convert.toNumber(result.highestBlock),
        };
      });
  }

  /**
   * Executes a new message call immediately without creating a transaction on the block chain
   */
  call(callData: CallObject, blockNumber: number | string = 'latest'): Promise<any> {
    return this.rpc.call('eth_call', [{ to: callData.to, data: callData.data }, blockNumber]);
  }

  /**
   * Executes a message call or transaction and returns the amount of the gas used
   */
  estimateGas(call: CallObject): Promise<number> {
    const txData = {
      ...call,
      gas: (call.gas !== undefined) ? format.toHex(call.gas) : call.gas,
      nonce: (call.nonce !== undefined) ? format.toHex(call.nonce) : call.nonce,
    };
    return this.rpc.call('eth_estimateGas', [txData]).then(gas => convert.toNumber(gas));
  }

  /**
   * Returns code at a given address.
   */
  getCode(address: string, blockNumber: number | string = 'latest'): Promise<string> {
    return this.rpc.call('eth_getCode', [address, blockNumber]);
  }

  /**
   * Returns the number of most recent block
   *
   * Note: It should be called blockNumber() but to be web3 compatible
   *       we call it getBlockNumber(), FEF
   */
  getBlockNumber(): Promise<number> {
    return this.rpc.call('eth_blockNumber', [])
      .then(result => convert.toNumber(result));
  }

  /**
   * Returns information about a block by block number.
   */
  getBlockByNumber(blockNumber: number | string = 'latest', full: boolean = false): Promise<any> {
    return this.rpc.call('eth_getBlockByNumber', [blockNumber, full]);
  }

  /**
   * Returns a block matching the block number or block hash.
   */
  getBlock(hashOrNumber: string | number | 'earliest' | 'latest' | 'pending', full: boolean = false) {
    const method = (typeof hashOrNumber === 'string' && hashOrNumber.indexOf('0x') === 0) ?
      'eth_getBlockByHash' : 'eth_getBlockByNumber';
    let block = hashOrNumber;
    if (method === 'eth_getBlockByNumber') {
      if (!format.isPredefinedBlockNumber(hashOrNumber)) {
        block = format.toHex(hashOrNumber);
      }
    }
    return this.rpc.call(method, [block, full]).then(b => format.block(b));
  }

  /**
   * Returns the number of transactions sent from an address
   * @param address
   * @param blockNumber - integer block number, or the string 'latest', 'earliest' or 'pending'
   */
  getTransactionCount(address: string, blockNumber: number | string = 'latest'): Promise<any> {
    return this.rpc.call('eth_getTransactionCount', [address, blockNumber])
      .then(convert.toNumber);
  }

  /**
   * Returns the receipt of a transaction by transaction hash.
   */
  getTransactionReceipt(hash: string): Promise<any> {
    return this.rpc.call('eth_getTransactionReceipt', [hash])
      .then(format.transactionReceipt);
  }

  /**
   * Creates new message call transaction or a contract creation for signed transactions.
   */
  sendRawTransaction(rawTxData: string): Promise<string> {
    return this.rpc.call('eth_sendRawTransaction', [rawTxData]);
  }

  /**
   * Returns the information about a transaction requested by transaction hash.
   */
  getTransaction(hash: string): Promise<any> {
    return this.rpc.call('eth_getTransactionByHash', [hash])
      .then(format.transaction);
  }

  getAddressTransactions(
    address: string,
    blockNumFloor: number,
    blockNumCeil: number,
    toOrFrom: string,
    standardOrContract: string,
    beginPageIndex: number,
    endPageIndex: number,
    orderByOldest: boolean
  ): Promise<Array<string>> {
    return this.rpc.call('geth_getAddressTransactions', [
      address,
      blockNumFloor,
      blockNumCeil,
      toOrFrom,
      standardOrContract,
      beginPageIndex,
      endPageIndex,
      orderByOldest
    ]);
  }

}