import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Procentajes } from 'src/app/home/commos/porcentajes';
import { AlertService } from 'src/app/service/alert.service';
import { AuthService } from 'src/app/service/auth.service';
import { PercentageService } from 'src/app/service/percentage.service';

interface NgbDateStruct {
  year: number;

  month: number;

  day: number;
}
@Component({
  selector: 'app-edit-companies',
  templateUrl: './edit-companies.component.html',
  styleUrls: ['./edit-companies.component.css']
})
export class EditCompaniesComponent implements OnInit {
  displayedColumns: string[] = [
    "contrato",
    "sumaLimite",
    "cesion",
    "nomina",
    "reas",
  ];
  data: any[] = [];
  public dataSource: MatTableDataSource<any>;
  listareasu2: any;
  corredorList: any;
  cuota: "";
  form: FormGroup;
  fecha1: NgbDateStruct = { day: 0, month: 0, year: 0 };
  fecha2: NgbDateStruct = { day: 0, month: 0, year: 0 };
  fechaOne: string
  fechaTwo: string
  horainicio: any;
  horafin: any;
  statefinal: boolean;
  user: any;
  cod: any;
  dataEdicion: any
  public selectedOption: any;
  public money: any;
  private porcentajes = new Procentajes();
  constructor(
    private authService: AuthService,
    private router: Router,
    private myFormBuilder: FormBuilder,
    private alert: AlertService,
    private percentaje: PercentageService,
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.initial()
  }

  initial() {
    this.authService.getCorredor().then((res) => {
      this.corredorList = res;
      //this.dataSource = res
    });
    const id = JSON.parse(sessionStorage.getItem("companiaR"));
    this.authService.getDtaForm(id.a).then((res) => {
      console.log('res -> ', res)
      let cnt = res.cnt;
      this.dataEdicion = res.cnt;
      const fIni = cnt.r.split("-");
      const fFin = cnt.e.split("-"); 
      this.cuota = cnt.o;
      this.fecha1 = { year: fIni[0], month: fIni[1], day: fIni[2] };
      this.fecha2 = { year: fFin[0], month: fFin[1], day: fFin[2] };
      this.horainicio = cnt.hrn;
      this.horafin = cnt.hrf;
      this.cod = cnt.o;
      this.fechaOne = this.getFecha(this.fecha1)
      this.fechaTwo = this.getFecha(this.fecha2)
      //Trae datos formulario
      this.form.controls.hour.setValue(this.horainicio);
      this.form.controls.hourTwo.setValue(this.horafin);
      this.form.controls.descripcion.setValue(cnt.c);
      this.form.controls.observacion.setValue(cnt.r2);
      this.form.controls.codigoContrato.setValue(cnt.o);
      this.form.controls.starDate.setValue(this.fechaOne);
      this.form.controls.endDate.setValue(this.fechaTwo);
      this.form.controls.siniestros.setValue(this.desimal(this.removerSiniestro(cnt.sin_con)));

      if (cnt.pro_id) {
        this.authService.getDtaRamos(cnt.pro_id).then(
          (res) => {
            this.dataSource = res;
          },
          (err) => {
            console.log("en efecto se dañó", err);
          }
        );
      }
      this.form.controls.currency.setValue(cnt.mc)
    });
    this.getMoney();
  }
  createForm() {
    /*Este es el Formulario*/
    this.form = this.myFormBuilder.group({
      codigoContrato: ['', Validators.compose([Validators.required])],
      descripcion: ['', Validators.compose([Validators.required])],
      epiContrato: ['', Validators.compose([Validators.required])],
      starDate: ['', Validators.compose([Validators.required])],
      endDate: ['', Validators.compose([Validators.required])],
      hour: ['', Validators.compose([Validators.required])],
      currency: ['', Validators.compose([Validators.required])],
      hourTwo: ['', Validators.compose([Validators.required])],
      siniestros: ['', Validators.compose([Validators.required])],
      observacion: ['', Validators.compose([Validators.required])],
    });
  }
  create() {
    if (!this.statefinal) {
      const form = this.form.value;
      sessionStorage.setItem('formCuotaP', JSON.stringify(form));
      const form2 = JSON.parse(sessionStorage.getItem('formCuotaP'));

      if (this.form.invalid) {
        this.alert.error('Error', 'Formulario Invalido')
      } else if (form2) {
        const data = {
          idusers: this.user.authUser.id,
          id: this.dataEdicion.a,
          codigocontrato: this.cod,
          descripcion: form2['descripcion'],
          fechaInicio: form2['starDate'],
          fechaFin: form2['endDate'],
          moneda: form2['currency'],
          siniestroContrato: this.percentaje.removerDesimal(form2['siniestros']),
          observacion: form2['observacion'],
          horainicio: form2['hour'],
          horafin: form2['hourTwo']
        };
        this.alert.loading();
        this.authService.postEditContrato(data).then(
          res => {
            this.statefinal = true;
            console.log('res create -> ', res)
            this.alert.messagefin()
          },
          err => {
            console.log(err)
            this.alert.messagefin()
            this.alert.error('Error', 'No se pudo realizar la solicitud')
          }
        )
      }
    }else{
      console.log('No')
    }
  }
  getFecha(date: any): string {
    const year = date["year"];
    const month = date["month"];
    const day = date["day"];

    return `${year}-${month}-${day}`;
  }

  cortarDesimales(item: any) {
    return Math.trunc(item);
  }
  desimal(key: any) {
    return key.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  procentaje(item: any) {
    if (item != null && item != '') {
      const e = parseFloat(item);
      return e + "%";
    }
  }
  miles(form: string, key: any) {
    if (form === "form") {
      let value = this.form.controls[key].value;
      if (value.split(".").length > 2) {
        value = this.porcentajes.removerDesimal(this.form.controls[key].value);
      }
      const val = this.porcentajes.desimalDeMiles(value);
      this.form[key].setValue(val.toString());
    }
    if (form == "tabel") {
      const cortar = this.cortarDesimales(key)
      const quitar = this.desimal(cortar);
      return quitar;
    } else {
      const myPorcentaje = this.procentaje(key);
      return myPorcentaje;
    }
  }

  porcentaje2(form: string, key: any) {
    if (!!form) {
      const value = this.form.controls[key].value
      this.form.controls[key].setValue(
        this.procentaje(value)
      )
    }
  }

  get fecha1String(): NgbDateStruct {
    return this.fecha1;
  }
  getMoney() {
    this.authService
      .getCurrency()
      .then((resulta: any) => {
        this.money = resulta;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  removerSiniestro(e: any) {
    if (e != "") {
      if (typeof e == "string") {
        const a = e.split('.');

        return a[0];
      }
    } else {
      return '';
    }
  }
}
