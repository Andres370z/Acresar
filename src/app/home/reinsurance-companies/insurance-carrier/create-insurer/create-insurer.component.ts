import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { Menssage } from 'src/app/models/router';
import { AlertService } from 'src/app/service/alert.service';
import { AuthService } from 'src/app/service/auth.service';
import { PercentageService } from 'src/app/service/percentage.service';

@Component({
  selector: 'app-create-insurer',
  templateUrl: './create-insurer.component.html',
  styleUrls: ['./create-insurer.component.css']
})
export class CreateInsurerComponent implements OnInit {
  modulo: string = 'Registrar Aseguradora';
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
  exist: boolean = false
  form: FormGroup;
  entidades: any;
  oficinas: any;
  idEdit: number = 0;
  url: any;
  dataRes: any;
  paises: any
  cx: any
  public selectedOption: any;
  public selectedOptions: any
  razonSocial: any;
  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private alert: AlertService,
    private myFormBuilder: FormBuilder,
    private router: Router,
    private porcentajes: PercentageService,
    private _service: AuthService,
    private cookieService: CookieService,

  ) {
    this.type = 'Seguros generales';
    switch (this.type) {
      case 'Cooperativas':
        this.itemData.e = '3';
        // alert(3);
        break;
      case 'Seguros de vida':
        this.itemData.e = '2';
        //  alert(2);
        break;
      case 'Seguros generales':
        this.itemData.e = '1';
        //alert(1);
        break;

    }
  }

  ngOnInit(): void {
    this._service.getEntities().then((res: any) => {
      this.Rsltnntdds = res
    });
    const dataJson = sessionStorage.getItem('companiaAseguradora');
    if (dataJson != null) {

      this.modulo = "Actualizar Aseguradoras";
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

      this._service.getEntities().then(
        res => {
          res.forEach(i => {
            if (i.c == data.nc) {
              this.selectEntidad = i.a;
            }
          });
        }
      );

      this.rl = `/aseguradoras/${this.idEdit}`;

    }
    else {
      this.rl = "/aseguradoras";
    }


    this._service.getCountries().then((res: any) => {
      this.Rsltnpss = res
    });

  }


  create(item) {
    //this.status = true;
    console.log(item);
    this.validate(item);
    if (this.status) {
      // Si hay un idEdit (dataJson no es null), se hace una edición.
      // Caso contrario, es una creación.
      const idToSend = this.idEdit ? this.idEdit : null;
      this._service.postEditAseguradores(item, idToSend).then(
        item => {
          this.alert.success('Ok', item.item.mensaje);
          this.reaseguroData = { na: "", nt: "", te: "", cc: "", r: "", rg: "", act: '', c: '', pc: '', s: '', ca: '', sa: '', cxa: '', nc: "", r2: "", ct: "", dr: "", nb: "" };

          this.router.navigate(["home/companias/insurance-carrier"]);
        },
        error => {
          console.log(<any>error)
          this.alert.error('Error', this.modulo);
        }
      );
    } else {
      this.alert.error('Falta algo', 'Por favor rellene todo los campos ');
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
