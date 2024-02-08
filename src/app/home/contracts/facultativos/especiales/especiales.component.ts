import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Menssage } from 'src/app/models/router';

@Component({
  selector: 'app-especiales',
  templateUrl: './especiales.component.html',
  styleUrls: ['./especiales.component.css']
})
export class EspecialesComponent implements OnInit {

  public form: FormGroup
  constructor(
    private myFormBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    
  }
  

}
