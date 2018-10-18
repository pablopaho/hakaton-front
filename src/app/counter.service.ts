import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import * as Web3 from 'web3';

declare let window: any;

@Injectable()
export class CounterService {

  web3: any;
  CounterContract: any;
  contractInstance: any;
  count: number;
  lastTransactionID: any;
  patient: number;

  constructor(private http: Http) {

    this.lastTransactionID = '';
    this.http.get('assets/abiDefinition.json').subscribe(abi => {
      // const abi = JSON.parse('[{"constant":false,"inputs":[],"name":"decrement","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"counts","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getCounts","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"increment","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]');
      //this.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
      this.web3 = new Web3( window.web3.currentProvider );
      // this.CounterContract = this.web3.eth.contract(abi);
      this.CounterContract = this.web3.eth.contract(abi.json());
      this.contractInstance = this.CounterContract.at('0x833e2bCDC6bC56f71f99FCD46AFf4cd0155ad7ff');
      //this.count = this.contractInstance.getCounts.call().toString();
    });
  }

  public async increment() : Promise<number> {
    console.log('increment');
    //this.contractInstance.Patient({ from: this.web3.eth.accounts[0] });

    return new Promise((resolve, reject) => {
      this.contractInstance.registrerPatient.call("pablo", function (err, result) {
        if(err != null){
          console.log('error llamando');
        }
        console.log('result', result)
        resolve(result);
      });
    }) as Promise<number>;

  }

  public async decrement() : Promise<number> {
    console.log('decrement');
    return new Promise((resolve, reject) => {
      this.contractInstance.registrerDoctor.call("pablo", "sura", "neurologo", function (err, result) {
        if(err != null){
          console.log('error llamando');
        }
        console.log('result', result)
        resolve(result);
      });
    }) as Promise<number>;
  }

  public async crearHistoria() : Promise<number> {
    console.log('decrement');
    return new Promise((resolve, reject) => {
      this.contractInstance.registreAtention.call(0, "sura", "fiebre", "alergia", "loratadina", function (err, result) {
        if(err != null){
          console.log('error llamando');
        }
        console.log('result', result)
        resolve(result);
      });
    }) as Promise<number>;
  }

  /*decrement() {
    this.contractInstance.decrement({ from: this.web3.eth.accounts[0] }, this.handler.bind(this));
    this.count = this.contractInstance.getCounts.call().toString();
  }*/

  handler(error, result) {
    console.info(error);
    console.info(result);
    this.lastTransactionID = result;
  }

}
