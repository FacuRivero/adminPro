import { Component, OnInit } from '@angular/core';

declare function init_plugins();

@Component({
  selector: 'app-nopagefound',
  styleUrls: ['./nopagefound.component.css'],
  templateUrl: './nopagefound.component.html',
  styles: [
  ]
})
export class NopagefoundComponent implements OnInit {


  anio: number = new Date().getFullYear();

  constructor() { }

  ngOnInit(): void {
    init_plugins();
  }

}
