import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/service/alert.service';
import { AuthService } from 'src/app/service/auth.service';
import { SessionUser } from '../../global/sessionUser';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PercentageService } from 'src/app/service/percentage.service';
import { LocalstoreService } from 'src/app/service/localstore.service';

@Component({
  selector: 'app-agencias',
  templateUrl: './agencias.component.html',
  styleUrls: ['./agencias.component.css']
})
export class AgenciasComponent implements OnInit {
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
  user:any;
  public selectedOption: any;
  public selectedOptions: any
  public state: any = [
    {
      a: true,
      c: "Activo"
    },
    {
      a: false,
      c: "Inactivo"
    }
  ]
  public entityList: any = [
    {
      a: 1,
      c: "Seguros generales"
    },
    {
      a: 2,
      c: "Seguros de vida"
    }
  ]
  razonSocial: any;
  constructor(
    private alert: AlertService,
    private router: Router,
    private _service: AuthService,
    public formBuilder: FormBuilder,
    private localStore: LocalstoreService,
  ) {
    this.user = this.localStore.getSuccessLogin();
    console.log("users",this.user)
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
    this.initial();
    this._service.getEntities().then((res: any) => {
      this.Rsltnntdds = res
    });

    this._service.getCountries().then((res: any) => {
      this.Rsltnpss = res
    });

  }

  initial(){
    /* if (localStorage.getItem('token') !== null) {
      this.router.navigate([RoutersLink.home]);
    } */
    this.form = this.formBuilder.group({
      country: ["", Validators.compose([Validators.required,])],
      status: ["", Validators.compose([Validators.required,])],
      nit: ["", Validators.compose([Validators.required,])],
      entity: ["", Validators.compose([Validators.required,])],
      companyName: ["", Validators.compose([Validators.required,])],
      abbreviatedName: ["", Validators.compose([Validators.required,])],
      telephone:["", Validators.compose([Validators.required,])],
      address:["", Validators.compose([Validators.required,])],
      contact:["", Validators.compose([Validators.required,])],
      region:["", Validators.compose([Validators.required,])],
      idusers:[this.user.user.id, Validators.compose([Validators.required,])],
    });
    
  }
  create(item) {
      this.alert.loading();
      this._service.postQuery(item, "agencias").then((item: any)=>{
        this.alert.success('Ok', "Agencia creada correctamente");
        this.form.reset();
        this.form.controls['idusers'].setValue(this.user.user.id)
        this.router.navigate(["home/companias/insurance-carrier"]);
      }).catch((err: any)=>{
        this.alert.error("Error","No se pudo crear la agencia");
      });
    
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
