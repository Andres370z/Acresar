import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-negocio',
  templateUrl: './negocio.component.html',
  styleUrls: ['./negocio.component.css']
})
export class NegocioComponent implements OnInit {
  form: FormGroup
  constructor(
    private myFormBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.createForm()
  }
  createForm() {
    /*Este es el Formulario*/
    this.form = this.myFormBuilder.group({
      estado: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      corredor: ['', Validators.compose([Validators.required])],
      intermediario: ['', Validators.compose([Validators.required])],
      participacionIntermediario: ['', Validators.compose([Validators.required])],
      comisionIntermediario: ['', Validators.compose([Validators.required])],
      aseguradora: ['', Validators.compose([Validators.required])],
      participacionAseguradora: ['', Validators.compose([Validators.required])],
      comisionAseguradora: ['', Validators.compose([Validators.required])],
      asegurado: ['', Validators.compose([Validators.required])],
      nitAsegurado: ['', Validators.compose([Validators.required])],
      notacobertura: ['', Validators.compose([Validators.required])],
      notadebito: ['', Validators.compose([Validators.required])],
    });
  }

}
