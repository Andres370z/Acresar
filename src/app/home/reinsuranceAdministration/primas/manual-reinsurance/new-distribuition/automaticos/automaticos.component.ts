import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, debounceTime, map, startWith } from 'rxjs';
import { Menssage } from 'src/app/models/router';
import { AuthService } from 'src/app/service/auth.service';
import Swal from 'sweetalert2';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-automaticos',
  templateUrl: './automaticos.component.html',
  styleUrls: ['./automaticos.component.css'],

})



export class AutomaticosComponent implements OnInit {
  myControl = new FormControl('');
  public options: any[] = [];
  contratofinal: any[] = [];
  public lisRequest: any
  public form: FormGroup;
  public clickOne: boolean = false
  idRamo: any
  myMoney: any;
  public ramoscomision: any;
  reasegurador: any;
  listareasu: any;
  constructor(
    private myFormBuilder: FormBuilder,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.initial()
  }

  initial() {
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
  contratosfacultativos() {
    this.lisRequest = true;
    if (this.form.controls.idContract.value < 3) {
      const item = {
        contr: this.form.controls.idContract.value
      };
      console.log('este es el id que esperas', item);
      this.authService.postFcultativos(item).then(
        res => {
          console.log('esta es la respuesta post', res);
          this.options = res
        }, err => {
          console.log('pailas', err);
        }
      );
    } else {
      this.lisRequest = false;
    }
  }

  sendForm(item: any) {
    Swal.fire(
      'Good job!',
      'You clicked the button!',
      'success'
    )
    console.log(this.form)
    this.form.reset()
  }

  upload(item: any) {
    this.clickOne = true
    console.log(item);
    this.form.controls.descripcion.setValue(item.c)
    this.form.controls.inicio.setValue(item.fi)
    this.form.controls.fin.setValue(item.ff)
    this.form.controls.ramos.setValue(item.rm)
    this.form.controls.asociasionTipo.setValue(item.tpa)
    this.form.controls.producto.setValue(item.tp)
    this.myMoney = item;
    if (item.m === '3') {
      this.form.controls.moneda.setValue('COP')
    } else if (item.m === '2') {
      this.form.controls.moneda.setValue('EUR')
    } else {
      this.form.controls.moneda.setValue('USD')
    }
    this.authService.getDtaRamos(item.rct).then(
      res => {
        this.listareasu = res[0];
        console.log(res)

        console.log(this.listareasu, '<-');
        this.loadRamos(this.listareasu.a);
      },
      err => {
        console.log(err)
      }
    )
  }
  loadRamos(id: any) {
    if (id) {
      this.authService.getLoadRamos(id).then(
        res => {
          this.ramoscomision = res
          console.log('estos son los ramos', res);
          console.log('este es el id del ramo ', this.idRamo)
        },
        err => {
          console.log(err);
        }
      )
    }
  }
  idReasegurador(id: any) {
    console.log(id);
    const idfinal = parseInt(id)
    if (this.reasegurador !== undefined) {
      if (id > 0 && id !== null) {
        for (let i = 0; i <= this.reasegurador.length; i++) {
          const e = this.reasegurador[i];
          if (idfinal === e.a) {
            return e.e;
          }
        }
      }
    }
  }

}
