import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { AlertService } from 'src/app/service/alert.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  modulo: string = "Registrar Corredor";
  Rsltnpss: Observable<any>;
  Rsltnntdds: Observable<any>;
  autocomplete: JQuery;
  razonsocial: string;
  of: string;
  rl: string;
  dataJson: any;
  lisRequest = false;
  reaseguroData = { na: "", nt: "", te: "", cc: "", r: "", rg: "", act: '', c: '', pc: '', s: '', ca: '', sa: '', cxa: '', nc: "", r2: "", ct: "", dr: "", nb: "" };
  selectEntidad: any;
  idEdit: number = 0;
  itemData: any;
  codigoNit: any;

  constructor(
    private _rd: Renderer2,
    private router: Router,
    private _service: AuthService,
    private cookieService: CookieService,
    private alert: AlertService,
    private myFormBuilder: FormBuilder,

  ) {

  }

  ngOnInit(): void {

    this._service.getCountries().then((res: any) => {
      this.Rsltnpss = res
    });

    this._service.getEntities().then((res: any) => {
      this.Rsltnntdds = res
    });
    const dataJson = sessionStorage.getItem('companiaC');
    if (dataJson != null) {

      this.modulo = "Actualizar Corredores";
      const data = JSON.parse(dataJson);
      this.idEdit = data.a;

      this.reaseguroData.c = data.a2;
      this.reaseguroData.na = data.c;
      this.reaseguroData.nt = data.r2;
      this.reaseguroData.te = data.c2;
      this.reaseguroData.dr = data.o;
      this.reaseguroData.c = data.n;
      this.reaseguroData.cc = data.pc;
      this.reaseguroData.r = data.l;
      this.reaseguroData.rg = data.s2;
      this.itemData = data;
      this._service.getEntities().then(
        res => {
          res.forEach(i => {
            if (i.c == data.nc) {
              this.selectEntidad = i.a;
            }
          });
        }
      );

      this.rl = `/corredores/${this.idEdit}`;

    }
    else {
      this.rl = "/corredores";
    }

  }
  create(item) {

    /* item.r = this.reaseguroData.sa;
     item.com  =  this.reaseguroData.ca;
     item.p = this.reaseguroData.ra;
     item.u = this.reaseguroData.e;*/

    item.r = this.reaseguroData.c;
    item.com = this.reaseguroData.ca;
    item.p = this.reaseguroData.sa;
    item.u = this.reaseguroData.r;

    this.reaseguroData = { na: "", nt: "", te: "", cc: "", r: "", rg: "", act: '', c: '', pc: '', s: '', ca: '', sa: '', cxa: '', nc: "", r2: "", ct: "", dr: "", nb: "" };
    if (this.idEdit < 1) {
      this._service.postEditCorredores(item, this.idEdit).then(
        item => {
          //   console.log(item[0].mensaje);
          this.alert.success('Ok', item.mensaje);
          this.router.navigate(["home/companias/corredor"]);
        },
        error => console.log(<any>error)
      );
    } else {
      const dataEdit = {
        "e": this.idEdit,
        "r": this.itemData['a2'],
        "na": item.na,
        "ni": item.ni,
        "te": item.te,
        "d": item.d,
        "con": item.r,
        "p": this.itemData['r'],
        "es": 1,
        "rg": item.rg,
        "u": item.u
      }
      this._service.putCorredor(this.idEdit, dataEdit).then(
        item => {
          //   console.log(item[0].mensaje);
          this.alert.success('Ok', item.mensaje);
          this.router.navigate(["/admin/companias/corredor/list"]);
        },
        error => console.log(<any>error)
      );
    }
  }

  consulta(json: any) {

    const item = {
      'module': 'corredor',
      'razon': json,
    };

    this._service.postRazonsocial(item).then(
      res => {
        if (res.length > 0) {
          this.lisRequest = true;
          this.reaseguroData = res;
        }

      },
      err => {
        console.log(err);
      }
    );

  }
  cargar(item: any) {
    this.lisRequest = false;
    this.reaseguroData = item;
  }
}
