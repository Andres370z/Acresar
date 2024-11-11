import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Menssage } from 'src/app/models/router';
import { AlertService } from 'src/app/service/alert.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-new-client',
  templateUrl: './new-client.component.html',
  styleUrls: ['./new-client.component.css']
})
export class NewClientComponent implements OnInit {
  modulo: string = "Registrar Clientes";
  Rsltnpss: Observable<any>;
  Rsltnntdds: Observable<any>;
  autocomplete: JQuery;
  razonsocial: string;
  of: string;
  rl: string = "/clientes";
  dataJson: any;
  itemData = { c: '', pc: '', s: '', ca: '', sa: '', cxa: '', ra: '', e: '', cc: '', r: '' };
  reaseguroData = { na: "", nt: "", te: "", cc: "", r: "", rg: "", act: '', c: '', pc: '', s: '', ca: '', sa: '', cxa: '', nc: "", r2: "", ct: "", dr: "", nb: "" };
  selectEntidad: any;
  idEdit: number;
  dataEdit = {
    e: "",
    r: "",
    na: "",
    ni: "",
    te: "",
    d: "",
    con: "",
    p: "",
    es: "",
    rg: ""
  };
  selectPais: number;
  codigoNit: any;

  constructor(
    private router: Router,
    private service: AuthService,
    private alertService: AlertService
  ) {
  }

  ngOnInit() {
    this.service.getCountries().then((res: any)=> this.Rsltnpss = res);
    this.service.getEntities().then((res: any)=> this.Rsltnntdds = res);

    let dataj = sessionStorage.getItem('cliente');

    if (dataj != null) {
      const data = JSON.parse(dataj);
      this.idEdit = data.a;
      this.modulo = "Actualizar Cliente";
      // { a2:"",c:"",c2:"",cc:"",r:"",rg:"",act: '', c: '', pc: '', s: '', ca: '', sa: '', cxa: '', nc: "", r2: "", ct: "", dr: "", nb: "" }
      this.reaseguroData.c = data.a2;
      this.reaseguroData.na = data.c;
      this.reaseguroData.nt = data.c2;
      this.reaseguroData.te = data.r2;
      this.reaseguroData.dr = data.o;
      this.reaseguroData.c = data.n;
      this.reaseguroData.cc = data.pc;
      this.reaseguroData.rg = data.s2;
      this.reaseguroData.r = data.a2;
      const url = `/clientes/${data.a}/edit`
      this.service.getClientes(data.a).then(
        res => {
          this.selectPais = res.r;
        },
        err => { }
      )
      this.service.getEntities().then(
        res => {
          res.forEach(i => {
            if (i.c == data.nc) {
              this.selectEntidad = i.a;
            }
          });
        }
      );

      this.rl = `/clientes/${this.idEdit}`;

    }
    else {
      this.rl = "/clientes";
    }
  }


  create(item) {

    item.es = 1;
    if (this.idEdit > 0) {

      this.dataEdit.e = item.e;
      this.dataEdit.r = item.r;
      this.dataEdit.na = item.na;
      this.dataEdit.ni = item.ni;
      this.dataEdit.te = item.te;
      this.dataEdit.d = item.d;
      this.dataEdit.con = item.con;
      this.dataEdit.p = item.p;
      this.dataEdit.es = item.es;
      this.dataEdit.rg = item.rg;

      const idToSend = this.idEdit ? this.idEdit : null;

      this.service.putClientes(this.dataEdit, idToSend).then(
        item => {
          const msj = item.mensaje != undefined ? item.mensaje : "Se ha registrado con éxito."
          this.alertService.success('Ok',msj);
          this.router.navigate(["/admin/companias/cliente/list"]);
        },
        error => console.log(<any>error)
      );
    } else {
      const idToSend = this.idEdit ? this.idEdit : null;

      this.service.postClientes(item, idToSend).then(
        item => {
          const msj = item.mensaje != undefined ? item.mensaje : "Se ha registrado con éxito."

          this.alertService.success('Ok',msj);
          this.router.navigate(["/admin/companias/cliente/list"]);
        },
        error => console.log(<any>error)
      );
    }
  }

  consulta(json: any) {
    console.log(json);
    const item = {
      'module': 'clientes',
      'razon': json,
    };

    this.service.postRazonsocial(item).then(
      res => {
        if (res != null || res != undefined) {
          this.alertService.success('Ok',res.mensaje);
        } else {
          this.alertService.success('Ok','Se ha registrado con éxito.')
        }
      },
      err => {
        console.log(err);
      }
    );

  }

}
