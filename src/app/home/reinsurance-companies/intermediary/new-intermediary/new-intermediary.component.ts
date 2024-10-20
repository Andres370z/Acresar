import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AlertService } from 'src/app/service/alert.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-new-intermediary',
  templateUrl: './new-intermediary.component.html',
  styleUrls: ['./new-intermediary.component.css']
})
export class NewIntermediaryComponent implements OnInit {
  modulo: string = "Registrar Intermediarios";
  Rsltnpss: Observable<any>;
  Rsltnntdds: Observable<any>;
  autocomplete: JQuery;
  razonsocial: string;
  of: string;
  rl: string = "/intermediarios";
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
    private  AlertService: AlertService
  ) {
  }

  ngOnInit() {
    this.service.getCountries().then((res: any)=> {this.Rsltnpss = res});
    this.service.getEntities().then((res: any)=> {this.Rsltnntdds =  res});

    let dataj = sessionStorage.getItem('companiaI');

    if (dataj != null) {
      const data = JSON.parse(dataj);
      this.idEdit = data.a;
      this.modulo = "Actualizar Intermediario";
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
      const url = `/intermediarios/${data.a}/edit`
      this.service.getIntermediariosEdit(data.a).then(
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

      this.rl = `/intermediarios/${this.idEdit}`;

    }
    else {
      this.rl = "/intermediarios";
    }
  }


  create(item) {

    item.es = 1;
    if (this.idEdit > 0) {
      console.log(item);
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

      this.service.putIntermediarios(this.dataEdit, idToSend).then(
        item => {
          const msj = item.mensaje != undefined ? item.mensaje : "Se ha registrado con éxito."
          this.AlertService.success('Ok',msj);
          this.router.navigate(["home/companias/intermediary"]);
        },
        error => console.log(<any>error)
      );
    } else {
      const idToSend = this.idEdit ? this.idEdit : null;

      this.service.postEditIntermediarios(item, idToSend).then(
        item => {
          const msj = item.mensaje != undefined ? item.mensaje : "Se ha registrado con éxito."

          this.AlertService.success('Ok',msj);
          this.router.navigate(["home/companias/intermediary"]);
        },
        error => console.log(<any>error)
      );
    }
  }

  consulta(json: any) {
    console.log(json);
    const item = {
      'module': 'intermediario',
      'razon': json,
    };

    this.service.postRazonsocial(item).then(
      res => {
        if (res != null || res != undefined) {
          this.AlertService.success('Ok',res.mensaje);
        } else {
          this.AlertService.success('Ok','Se ha registrado con éxito.')
        }
      },
      err => {
        console.log(err);
      }
    );

  }
}
