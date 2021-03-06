import { Component } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { CounterService } from './counter.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Angular Frontend with Backend Ethereum Blockchian';

  constructor(private counterService: CounterService) {
  }

  ngOnInit() {
  }

  increment() {
    this.counterService.increment().then(data => {
      console.log('data', data);
    });
  }

  decrement() {
    this.counterService.decrement().then(data => {
      console.log('data', data);
    });
  }

  crearHistoria() {
    this.counterService.crearHistoria().then(data => {
      console.log('data', data);
    });
  }
}
