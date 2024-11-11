import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AlertService } from 'src/app/service/alert.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-create-cooperativa',
  templateUrl: './create-cooperativa.component.html',
  styleUrls: ['./create-cooperativa.component.css']
})
export class CreateCooperativaComponent implements OnInit {
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
  idEdit: number;
  status = true;

  constructor(private route: ActivatedRoute,
    
    private router: Router,
    private service: AuthService, private alertService: AlertService) {
    this.type = 'Cooperativas';
    this.itemData.e = '3';
  }
  ngOnInit() {
 
    this.service.getEntities().then((res: any) => { this.Rsltnntdds = res });

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

      this.service.getEntities().then(
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


     this.service.getCountries().then((res: any)=> {this.Rsltnpss = res});
  }

  create(item) {
    //this.status = true;
    console.log(item);
    this.validate(item);
    if (this.status) {
      const idToSend = this.idEdit ? this.idEdit : null;

      this.service.postEditAseguradores(item, idToSend).then(
        item => {
          this.alertService.success('Ok',item.item.mensaje);
          this.reaseguroData = { na: "", nt: "", te: "", cc: "", r: "", rg: "", act: '', c: '', pc: '', s: '', ca: '', sa: '', cxa: '', nc: "", r2: "", ct: "", dr: "", nb: "" };

          this.router.navigate(["/admin/companias/aseguradoras/list"]);
        },
        error => {
          console.log(<any>error)
          this.alertService.error('Error al',this.modulo);
        }
      );
    } else {
      this.alertService.error('Error','Por favor rellene todo los campos ');
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

    this.service.postRazonsocial(item).then(
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


