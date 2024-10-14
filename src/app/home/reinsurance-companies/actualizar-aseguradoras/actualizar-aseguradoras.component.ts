import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { SessionUser } from 'src/app/home/global/sessionUser';
import { Menssage } from 'src/app/models/router';
import { AlertService } from 'src/app/service/alert.service';
import { AuthService } from 'src/app/service/auth.service';
import { PercentageService } from 'src/app/service/percentage.service';

@Component({
  selector: 'app-actualizar-aseguradoras',
  templateUrl: './actualizar-aseguradoras.component.html',
  styleUrls: ['./actualizar-aseguradoras.component.css']
})
export class ActualizarAseguradorasComponent implements OnInit {
  form: FormGroup;
  entidades: any;
  idEdit: number = 0;
  url: any;
  paises: any
  selectedOptions: any

  public selectedOption: any;

  modulo: string = 'Editar Aseguradora';
  type = "";
  Rsltnpss: Observable<any>;
  Rsltnntdds: Observable<any>;
  autocomplete: JQuery;
  razonsocial: string;
  of: string;
  rl: string = "/aseguradoras";
  dataJson: any;
  lisRequest = false;
  reaseguroData = { na: "", nt: "", te: "", cc: "", r: "", rg: "", act: '', c: '', pc: '', s: '', ca: '', sa: '', cxa: '', nc: "", r2: "", ct: "", dr: "", nb: "" };
  itemData = { c: '', pc: '', s: '', ca: '', sa: '', cxa: '', ra: '', e: '', cc: '', r: '' };
  selectEntidad: any;
  status = true;
  selectPais: number;
  selectActivo: number;
  constructor(
    private authService: AuthService,
    private alert: AlertService,
    private myFormBuilder: FormBuilder,
    private porcentajes: PercentageService,
    private router: Router,
    private _service: AuthService,
    private cookieService: CookieService,
  ) { }

  ngOnInit(): void {
    this._service.getEntities().then((res: any) => {
      this.Rsltnntdds = res
    });

    let dataJson = sessionStorage.getItem('companiaA');
    if (dataJson != null) {
      dataJson = JSON.parse(dataJson);
      if (dataJson['e'] == 1) {
        this.itemData.e = '1';
        this.type = "Seguros generales"
      }
      if (dataJson['e'] == 2) {
        this.itemData.e = '2';
        this.type = "Seguros de vida"
      }
      if (dataJson['e'] == 3) {
        this.itemData.e = '3';
        this.type = "Cooperativas"
      }


      this.modulo = "Actualizar Aseguradoras";
      const data = dataJson;
      this.idEdit = data["a"];
      this.reaseguroData.c = data["a2"];
      this.reaseguroData.na = data["c"];
      this.reaseguroData.nt = data["r2"];
      this.reaseguroData.te = data["c2"];
      this.reaseguroData.dr = data["o"];
      this.reaseguroData.c = data["n"];
      this.reaseguroData.cc = data["pc"];
      this.reaseguroData.r = data['a2'];
      this.reaseguroData.rg = data["s2"];
      this.selectPais = data['r'];
      this.selectActivo = data['u'];
      this._service.getEntities().then(
        res => {
          res.forEach(i => {
            if (i.c == data['nc']) {
              this.selectEntidad = i.a;
            }
          });
        }
      );

      this.rl = `/aseguradoras/${this.idEdit}`;
    }
    else {
      this.router.navigate(['']) 
    }
    this._service.getCountries().then((res: any) => {
      this.Rsltnpss = res
    })
  }
  create(item) {

    console.log(item);
    this.validate(item);
    if (this.status) {
      this._service.putAse(this.idEdit, item).then(
        item => {
          this.alert.success('Ok',item.mensaje);
          this.reaseguroData = { na: "", nt: "", te: "", cc: "", r: "", rg: "", act: '', c: '', pc: '', s: '', ca: '', sa: '', cxa: '', nc: "", r2: "", ct: "", dr: "", nb: "" };
          this.router.navigate(["/admin/companias/aseguradoras/list"]);
        },
        error => {
          console.log(<any>error)
          this.alert.error('Error', this.modulo);
        }
      );
    } else {
      this.alert.error('Falta algo','Por favor rellene todo los campos ');
    }
  }

  
  validate(item: any) {
    item = Object.keys(item);
    let v = 0;
    item.forEach(element => {
      if (item[element] == '') {
        this.status = false;
        v = 1
      }
    });
    if (v == 0) {
      this.status = true;
    }
  }

  consulta(json: any) {

    const item = { module: "aseguradora", razon: json, type: this.itemData.e };

    this._service.postRazonsocial(item).then(
      res => {
        if (res.length > 0) {
          this.lisRequest = true;
          this.reaseguroData = res;
          console.log(res);
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
    this.reaseguroData.r = item.e;
    this.reaseguroData.nt = item.s;
    this.reaseguroData.te = item.s2;
    this.reaseguroData.dr = item.o;
    this.reaseguroData.c = item.a2 + " " + item.r2;
    this.reaseguroData.rg = item.n;
  }
  
}
