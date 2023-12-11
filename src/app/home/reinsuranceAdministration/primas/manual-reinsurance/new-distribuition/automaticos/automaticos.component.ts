import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Menssage } from 'src/app/models/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-automaticos',
  templateUrl: './automaticos.component.html',
  styleUrls: ['./automaticos.component.css']
})
export class AutomaticosComponent implements OnInit {

  public form: FormGroup;
  public formTwo: FormGroup;
  public entities: any = [];
  public selectedOption: any;
  public createForm: any;
  constructor(
    private myFormBuilder: FormBuilder,
    private myFormBuilderTwo: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initial()
  }

  initial(){
    this.form = this.myFormBuilder.group({
      idContract: [Menssage.empty, Validators.compose([Validators.required])],
      descripcion: [Menssage.empty, Validators.compose([Validators.required])],
      moneda: [Menssage.empty, Validators.compose([Validators.required])],
      inicio: [Menssage.empty, Validators.compose([Validators.required])],
      fin: [Menssage.empty, Validators.compose([Validators.required])],
      ramos: [Menssage.empty, Validators.compose([Validators.required])],
      asociasionTipo: [Menssage.empty, Validators.compose([Validators.required])],
      producto: [Menssage.empty, Validators.compose([Validators.required])],
      compania: [Menssage.empty, Validators.compose([Validators.required])],
      reasegurador: [Menssage.empty, Validators.compose([Validators.required])],
      participacion: [Menssage.empty, Validators.compose([Validators.required])],
      cuentas: [Menssage.empty, Validators.compose([Validators.required])],
      inicio2: [Menssage.empty, Validators.compose([Validators.required])],
      fin2: [Menssage.empty, Validators.compose([Validators.required])],

    })
  }

  sendForm(item:any){
    Swal.fire(
      'Good job!',
      'You clicked the button!',
      'success'
    )
    console.log(this.form)
    this.form.reset()
  }

}
