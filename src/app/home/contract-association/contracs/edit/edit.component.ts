import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Menssage } from 'src/app/models/router';
import { AlertService } from 'src/app/service/alert.service';
import { AuthService } from 'src/app/service/auth.service';
import { LocalstoreService } from 'src/app/service/localstore.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  form: FormGroup;
  formulario: any;
  calendarfi: JQuery;
  calendarff: JQuery;
  modulo: string = 'Asociación de Contratos';
  ramos: any;
  tiposAsoc: any;
  dataReq: any;
  lisRequest = false;
  showList = false;
  showAssoc = false;
  detail: any;
  selectedDetailItems = [];
  rl = 'asociaciondecontratos';
  list: any;
  listAsociacion = new Array();
  checkList = [];
  constructor(
    public myFormBuilder: FormBuilder,
    public localService: LocalstoreService,
    public _http: AuthService,
    private alertService: AlertService

  ) {
    this.formulario = this.localService.getItem('editAdministra')
  }

  ngOnInit(): void {
    this._http.getQuery('ramos').then(
      res => {
        this.ramos = res;
      }
    );

    this._http.getQuery('asociaciondecontratos/tipos').then(
      res => {
        this.tiposAsoc = res;
      }
    );
    this.createForm();
    this.formLoad()
  }
  createForm() {
    this.form = this.myFormBuilder.group({
      idContrato: [Menssage.empty, Validators.compose([Validators.required])],
      tipoContrato: [Menssage.empty, Validators.compose([Validators.required])],
      idContratopk: [Menssage.empty, Validators.compose([Validators.required])],
      descripcion: [Menssage.empty, Validators.compose([Validators.required])],
      fInicio: [Menssage.empty, Validators.compose([Validators.required])],
      fFin: [Menssage.empty, Validators.compose([Validators.required])],
      ramo: [Menssage.empty, Validators.compose([Validators.required])],
      tipoAsociacion: [Menssage.empty, Validators.compose([Validators.required])],
    })
  }
  formLoad() {
    if (this.formulario) {
      const item = this.formulario[0]
      console.log('este es item ---------> ', item);
      


      this.form.controls.idContratopk.setValue(item.a);
      this.form.controls.idContrato.setValue(item.o);
      this.form.controls.descripcion.setValue(item.c);
      this.form.controls.fInicio.setValue(item.r);
      this.form.controls.fFin.setValue(item.e);
      this.form.controls.tipoContrato.setValue(item.cat);
      this.form.controls.ramo.setValue(item.rm);
      this.lisRequest = false;
    }
  }

  ShowAssoc() {
    this.showAssoc = false;
    this.showAssoc = this.form.controls.ramo.value != '' ? true : false;
  }

  getDetail() {
    if (this.form.controls.tipoAsociacion.value != 0) {
      const item = { ramo: this.form.controls.ramo.value, tipo: this.form.controls.tipoAsociacion.value };
      this._http.postQuery(item, 'asociaciondecontratos/detail').then(
        res => {
          this.showList = true;
          this.detail = res;
        }
      );

    } else {
      this.showList = false;
      this.selectedDetailItems = [];
      this.detail = {};
    }
  }
  detalle(item: any) {
    if (item != undefined) {
      if (this.checkList.indexOf(item.name) == -1) {
        this.checkList.push(item.id);
      } else {
        const id = this.checkList.indexOf(item.name);
        this.checkList.splice(id, 1);
      }
    }
  }
  guardar() {
    let dataJson = []
    if (this.listAsociacion.length > 0) {
      const form = this.form.value;
      form['detalle'] = this.checkList;
      dataJson = this.listAsociacion;
      dataJson.push(form);
      this.checkList = [];
    } else {
      dataJson = this.form.value;
      dataJson["detalle"] = this.checkList;
      this.checkList = [];
    }
    this.alertService.messageInfo('Seguimos trabajando para mejorar tu experiencia','home/asociacion/contratos')
    // this._http.postQuery(dataJson, this.rl).then(
    //   item => {
    //     this.alertService.success('Ok', item.item.mensaje);
    //     this.ngOnInit();
    //   },
    //   error => console.log(<any>error)
    // );
  }
  agregar() {

    const ramo = this.buscarId(this.ramos, this.form.controls.ramo.value, 'a', 'a2');
    const tipoAs = this.buscarId(this.tiposAsoc, this.form.controls.tipoAsociacion.value, 'a', 'c');

    let data = this.form.value;
    data.ramoN = ramo;
    data.tipoAs = tipoAs;
    data['detalle'] = this.checkList;

    this.listAsociacion.push(data);
    this.form.reset();
    this.checkList = [];
    this.showAssoc = false;

  }
  buscarId(obj: any, id: number, key: string, value: string) {
    let res;
    for (let i = 0; i < obj.length; i++) {
      const element = obj[i];
      if (parseInt(element[key]) == id) {
        res = element[value]
      }
    }
    return res;
  }
}

