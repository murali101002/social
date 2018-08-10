import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-singn-up',
  templateUrl: './singn-up.component.html',
  styleUrls: ['./singn-up.component.css']
})
export class SingnUpComponent implements OnInit {

  isLoading = false;

  constructor() { }

  ngOnInit() {
  }

  onLogin(form: NgForm) {

  }

}
