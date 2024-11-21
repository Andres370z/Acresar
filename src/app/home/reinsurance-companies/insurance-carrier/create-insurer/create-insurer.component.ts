import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  id: number = 0;
  createForm: any;
  Rsltnpss: Observable<any>;
  Rsltngncsclfcdrs: Observable<any>;
  Rsltnntdds: Observable<any>;
  Rsltncrgrsgrdrsrcx: Observable<any>;
  slgrsgrdrsrcx;
  autocomplete: JQuery;
  razonsocial: string;
  of: string;
  rl: string = "";
  r: string = "";
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
    private router: Router,
    private service: AuthService,
    private alertService: AlertService
  ) {
    this.service.getQuery("rsltncrgrsgrdrsrcx").then((res: any) => { this.Rsltncrgrsgrdrsrcx = res });
  }

  ngOnInit() {

    this.service.getQuery('pais').then((res: any) => { this.Rsltnpss = res });
    this.service.getQuery('agenciacalificadora').then((res: any) => { this.Rsltngncsclfcdrs = res });
    this.service.getQuery('entidades').then((res: any) => { this.Rsltnntdds = res });

    let jsonData = sessionStorage.getItem('companiaR');
    if (jsonData != null) {
      const item = JSON.parse(jsonData);

      this.service.getQuery(`reaseguradoras/${item['a']}/edit`)
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
            this.service.getQuery('pais').then(obj => {
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
      this.formContatos = new FormGroup({
        code_comp: new FormControl('', Validators.required),
        nm: new FormControl('', Validators.required),
        di: new FormControl('', Validators.required),
        te: new FormControl('', Validators.required),
        co: new FormControl('', Validators.required),
        pa: new FormControl('', Validators.required),
      });
    } else if (item != null) {
      item = JSON.parse(item);
      console.log(item);
      this.modulo = "Actualizar Reaseguradores";
      this.id = item.a;

      this.formContatos = new FormGroup({
        code_comp: new FormControl('', Validators.required),
        nm: new FormControl('', Validators.required),
        di: new FormControl('', Validators.required),
        te: new FormControl('', Validators.required),
        co: new FormControl('', Validators.required),
        pa: new FormControl('', Validators.required),
      });
    }
  }

  create(item) {

    if (this.id < 1) {
      item.ag = this.reaseguroData.cxa;
      item.p = this.reaseguroData.sa;
      item.r = this.reaseguroData.ca;
      //item.act = this.reaseguroData.act; para validar


      const evalua = item.es
      console.log('evalua ----->', evalua);
      let numeros = evalua.match(/\d/g);
      numeros = numeros.join((""));
      if (numeros) {
        const valida: any = Number(numeros);
        if (valida < 2020) {
          this.alertService.info('Hey', 'Estado debe ser mayor al año 2020')
        } else {
          this.reaseguroData.act = this.reaseguroData.act.replace(/\d+/, valida);
          item.act = this.reaseguroData.act;
          this.rl = "reaseguradoras";
          console.log('item ----> ', item);

          this.service.postQuery(item, this.rl).then(
            item => {

              //   console.log(item[0].mensaje);
              this.alertService.success('Ok', item.item.mensaje);
              this.router.navigate(["home/companias"]);
            },
            error => console.log(<any>error)
          );
        }
      }
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
      this.rl = `reaseguradoras/${this.id}`;
      this.service.put(this.rl, data).then(
        item => {
          //   console.log(item[0].mensaje);
          this.alertService.success('Ok', item.item.mensaje);
          this.router.navigate(["home/companias"]);
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

    this.service.postQuery(item, 'razonSocial').then(
      res => {
        console.log('Esta es res: -----> ', res);

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
    console.log('envia ----->', this.reaseguroData.act);

  }
}
