import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { Menssage } from 'src/app/models/router';
import { AlertService } from 'src/app/service/alert.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-register-reinsurer',
  templateUrl: './register-reinsurer.component.html',
  styleUrls: ['./register-reinsurer.component.css']
})
export class RegisterReinsurerComponent implements OnInit {
  public form: FormGroup;
  public entities: any = [];
  public selectedOptionEntities: any;
  public selectedOption: any;
  public createForm: any;
  paises: any
  idEdit: any

  itemData: any;


  id: number = 0;
  Rsltnpss: Observable<any>;
  Rsltngncsclfcdrs: Observable<any>;
  Rsltnntdds: Observable<any>;
  Rsltncrgrsgrdrsrcx: Observable<any>;
  slgrsgrdrsrcx;
  autocomplete: JQuery;
  razonsocial: string;
  of: any;
  rl: any;
  r: any ;
  codigoNit: any;
  modulo: string = "Registrar Reaseguradores";
  reaseguroData = { a2: "", rg: "", ag: "", e: "", act: '', c: '', pc: '', s: '', ca: '', sa: '', cxa: '', nc: "", r2: "", ct: "", dr: "", nb: "" };
  jsonSubmit = {
    "e": "",
    "c": "",
    "r": "",
    "na": "",
    "ni": "",
    "cn": "",
    "d": "",
    "es": "",
    "p": "",
    "cl": "",
    "rg": "",
    "ag": "",
    "of": "",
    "ofr": "",
    "ofn": "",
    "ofl": "",
    "ofcr": "",
    "ofci": "",
    "ofd": "",
    "oft": "",
    "act": ""
  }
  dataRes: any;
  lisRequest = false;
  formContatos: FormGroup;

  constructor(
    private myFormBuilder: FormBuilder,
    private authService: AuthService,
    private alert: AlertService,
    private router: Router,
    private auth: AuthService,
    private _rd: Renderer2,
    private _service: AuthService,
    private cookieService: CookieService,

  ) {
    this._service.getOne().then((res: any) => {
      this.Rsltncrgrsgrdrsrcx = res
    });

  }

  ngOnInit(): void {


    this._service.getCountries().then((res: any) => {
      this.Rsltnpss = res
    });
    this._service.getAgency().then((res: any) => {
      this.Rsltngncsclfcdrs = res
    });
    this._service.getEntities().then((res: any) => {
      this.Rsltnntdds = res
    });



    let jsonData = sessionStorage.getItem('companiaR');
    if (jsonData != null) {
      const item = JSON.parse(jsonData);

      this._service.getReaseguradoras(item['a'])
        .then(
          res => {
            res = res[0];
            jsonData = res;

            this.dataRes = res;
            this.reaseguroData.nc = res.r2;
            this.reaseguroData.r2 = res.o2;
            this.reaseguroData.s = res.n;
            this.reaseguroData.ct = res.nc;
            this.reaseguroData.dr = res.c2;
            this.reaseguroData.ca = res.e;
            this.reaseguroData.nb = res.s;
            this.reaseguroData.e = res.e;
            this.reaseguroData.a2 = res.a2;
            this.reaseguroData.ct = res.r2;
            this.reaseguroData.rg = res.s2;
            this.reaseguroData.c = item.ac;
            this.reaseguroData.e = res.c;
            this._service.getCountries().then(obj => {
              for (let i = 0; i < obj.length; i++) {
                const p = obj[i];
                if (res.o == p.a) {
                  this.reaseguroData.pc = p.c;
                }

              }
            })
          },
          err => {

          }
        )
    } else {

    }
    this.createFormContacto(jsonData);
    console.log(">>>", this.reaseguroData);
  }

  createFormContacto(item: any) {

    if (item == null) {
      this.formContatos = this.myFormBuilder.group({
        code_comp: [Menssage.empty, Validators.compose([Validators.required])],
        nm: [Menssage.empty, Validators.compose([Validators.required])],
        di: [Menssage.empty, Validators.compose([Validators.required])],
        te: [Menssage.empty, Validators.compose([Validators.required])],
        co: [Menssage.empty, Validators.compose([Validators.required])],
        pa: [Menssage.empty, Validators.compose([Validators.required])],
      });
    } else if (item != null) {
      item = JSON.parse(item);
      console.log(item);
      this.modulo = "Actualizar Reaseguradores";
      this.id = item.a;

      this.formContatos = this.myFormBuilder.group({
        code_comp: [Menssage.empty, Validators.compose([Validators.required])],
        nm: [Menssage.empty, Validators.compose([Validators.required])],
        di: [Menssage.empty, Validators.compose([Validators.required])],
        te: [Menssage.empty, Validators.compose([Validators.required])],
        co: [Menssage.empty, Validators.compose([Validators.required])],
        pa: [Menssage.empty, Validators.compose([Validators.required])],
      });
    }
  }

  create(item) {

    if (this.id < 1) {
      item.ag = this.reaseguroData.cxa;
      item.p = this.reaseguroData.sa;
      item.r = this.reaseguroData.ca;
      item.act = this.reaseguroData.act;
      this.rl = "/reaseguradoras";

      this._service.RegisterForm(item).then(
        item => {

          //   console.log(item[0].mensaje);
          this.alert.success('Ok', item.item.mensaje);
          this.router.navigate(["home/companias/reinsurer"]);
        },
        error => console.log(<any>error)
      );
    } else {

      let jsonData = sessionStorage.getItem('companiaR');
      jsonData = JSON.parse(jsonData);
      console.log(">>", item);
      const data = {
        "e": "1",
        "c": "",
        "r": item['r'],
        "na": item['na'],
        "ni": item['ni'],
        "cn": item['cn'],
        "d": item['d'],
        "es": item['es'],
        "p": this.dataRes['r'],
        "cl": item['cl'],
        "rg": item['rg'],
        "ag": this.dataRes['u'],
        "of": item["of"],
        "ofr": item["ofr"],
        "ofn": item["ofn"],
        "ofl": item["ofl"],
        "ofcr": item["ofcr"],
        "ofci": item["ofci"],
        "ofd": item["ofd"],
        "oft": item["oft"],
        "act": item['es']
      };
      this.rl = `/reaseguradoras/${this.id}`;
      this._service.putRea(this.id, data).then(
        item => {
          //   console.log(item[0].mensaje);
          this.alert.success('Ok', item.item.mensaje);
          this.router.navigate(["/admin/companias"]);
          sessionStorage.clear();
        },
        error => console.log(<any>error)
      );

    }

  }

  consulta(json: any) {

    const item = {
      'module': 'reaseguradores',
      'razon': json,
    };

    this._service.postRazonsocial(item).then(
      res => {
        this.lisRequest = true;
        this.reaseguroData = res;
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
