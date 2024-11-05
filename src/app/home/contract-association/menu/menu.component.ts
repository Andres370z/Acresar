import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/service/alert.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {


  calendarfi: JQuery;
  calendarff: JQuery;
  modulo: string = 'Asociación de Contratos';
  formulario: FormGroup;
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
    private router: Router,
    public _http: AuthService,
    public alertService: AlertService
  ) {
  }

  ngOnInit() {

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


  }


  navigate(item: string) {
    this.router.navigate([item])
  }
  createForm() {
    this.formulario = new FormGroup({
      tipoContrato: new FormControl('', Validators.required),
      idContrato: new FormControl('', Validators.required),
      idContratopk: new FormControl('', Validators.required),
      descripcion: new FormControl('', Validators.required),
      fInicio: new FormControl('', Validators.required),
      fFin: new FormControl('', Validators.required),
      ramo: new FormControl('', Validators.required),
      tipoAsociacion: new FormControl('', Validators.required)
    });
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

  agregar() {

    const ramo = this.buscarId(this.ramos, this.formulario.controls.ramo.value, 'a', 'a2');
    const tipoAs = this.buscarId(this.tiposAsoc, this.formulario.controls.tipoAsociacion.value, 'a', 'c');

    let data = this.formulario.value;
    data.ramoN = ramo;
    data.tipoAs = tipoAs;
    data['detalle'] = this.checkList;

    this.listAsociacion.push(data);
    this.formulario.reset();
    this.checkList = [];
    this.showAssoc = false;

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
      const form = this.formulario.value;
      form['detalle'] = this.checkList;
      dataJson = this.listAsociacion;
      dataJson.push(form);
      this.checkList = [];
    } else {
      dataJson = this.formulario.value;
      dataJson["detalle"] = this.checkList;
      this.checkList = [];
    }

    this._http.postQuery(dataJson, this.rl).then(
      item => {
        this.alertService.success('Ok', item.item.mensaje);
        this.ngOnInit();
      },
      error => console.log(<any>error)
    );
  }

  cargar(item) {
    this.formulario.controls.idContratopk.setValue(item.a);
    this.formulario.controls.idContrato.setValue(item.o);
    this.formulario.controls.descripcion.setValue(item.c);
    this.formulario.controls.fInicio.setValue(item.r);
    this.formulario.controls.fFin.setValue(item.e);
    this.formulario.controls.tipoContrato.setValue(item.cat);
    this.lisRequest = false;
  }

  consultar() {
    this.lisRequest = true;
    if (this.formulario.controls.idContrato.value) {
      const item = { word: this.formulario.controls.idContrato.value };

      this._http.postQuery(item, 'contratos/search')
        .then(
          res => {
            this.dataReq = res;
          }
        );
    }
  }

  ShowAssoc() {
    this.showAssoc = false;
    this.showAssoc = this.formulario.controls.ramo.value != '' ? true : false;
  }

  getDetail() {
    if (this.formulario.controls.tipoAsociacion.value != 0) {
      const item = { ramo: this.formulario.controls.ramo.value, tipo: this.formulario.controls.tipoAsociacion.value };
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

  // edit(item: any) {
  //   // campo a2 tipo de contratos
  //   // facultativo = 10
  //   // cuotaparte = 3
  //   sessionStorage.setItem('cp', JSON.stringify(item));
  //   console.log(item);
  //   if (item.a2 == 3) {
  //     this.router.navigate(['/admin/contratos/automaticos/proporcionales/cuota-aparte-edit']);
  //   }
  //   if (item.a2 == 10) {
  //     this.router.navigate(['/admin/contratos/automaticos/proporcionales/facob/edit']);
  //   }
  // }

  delete(id: any) {

    this._http.delete('contratos/automaticos/proporcionales/cuotaparte/' + id)
      .then(
        res => {
          this._http.getQuery('rsltncntrts').then(
            res => {
              this.list = res;
            });
        },
        error => { }
      );
  }

}
