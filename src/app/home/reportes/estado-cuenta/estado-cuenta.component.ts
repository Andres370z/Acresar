import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Menssage, RoutersLink } from 'src/app/models/router';
import { AlertService } from 'src/app/service/alert.service';
import { AuthService } from 'src/app/service/auth.service';
import { ExcelNewService } from 'src/app/service/excel-new.service';
import { ExcelService } from 'src/app/service/excel.service';
import { PercentageService } from 'src/app/service/percentage.service';

@Component({
  selector: 'app-estado-cuenta',
  templateUrl: './estado-cuenta.component.html',
  styleUrls: ['./estado-cuenta.component.css']
})
export class EstadoCuentaComponent implements OnInit {
  money: any;
  ramos: any;
  poliza: any;
  reasegradores: any;
  asegurado: any;
  form: FormGroup;
  idreas: any;
  ramo: any;
  idbroker: any;
  idmone: any;
  reseasegurador: any;
  corredor: any;
  resultado: any;
  contras: number;
  rsltncr: any;
  modulo = "Estado de cuenta";
  currency: any;
  rsltnrsgr: any;
  active: Boolean;
  enviardatos: FormGroup;
  formreasegurador: FormGroup;
  fromajustes: FormGroup;
  public selectedOption: any;
  constructor(
    private authService: AuthService,
    private alert: AlertService,
    private myFormBuilder: FormBuilder,
    private porcentajes: PercentageService,
    private router: Router,
    private excelService: ExcelNewService
  ) { }

  ngOnInit(): void {
    this.initial();
  }
  initial() {
    this.form = this.myFormBuilder.group({
      corredor: [Menssage.empty, Validators.compose([Validators.required])],
      reseasegurador: [Menssage.empty, Validators.compose([Validators.required])],
      fechainicial: [Menssage.empty, Validators.compose([Validators.required])],
      fechafinal: [Menssage.empty, Validators.compose([Validators.required])],
    });
    //Trae contratos Asociados
    this.authService.getQuery(RoutersLink.getPoliza).then(
      res => {
        this.rsltncr = res;
      }
    );
    this.active = false;
    this.form.controls.corredor.valueChanges.subscribe(
      (res) => {
        if (res !== '' || res !== undefined) {
          console.log(res)
          this.active = true;
          this.contras = res;
          console.log(res);
          const data = {id: this.contras};
          this.authService.postQuery(data, RoutersLink.postPolizaReasegurador).then(
            res => {
              this.rsltnrsgr = res;
              console.log(res)
            },
            err => {
              console.log(err);
            });
        } else {
          this.alert.error("Error",'Debes seleccionar un contrato');
        }
      });
  }

  generateExcel() {
    const form = this.form.value;
    console.log(form);
    if (form.reseasegurador === '') {
      this.alert.error("Error",'Debes seleccionar un reasegurador');
    } else if (form.fechainicial === '') {
      this.alert.error("Error",'Debes seleccionar una fecha incial');
    } else if (form.fechafinal === '') {
      this.alert.error("Error",'Debes seleccionar una fecha final');
    }else {
      this.alert.loading();
      const dateInit = form.fechainicial.getFullYear() + '-' + (form.fechainicial.getMonth()+1) + '-' + form.fechainicial.getDate()
      const dateEnd = form.fechafinal.getFullYear() + '-' + (form.fechafinal.getMonth()+1) + '-' + form.fechafinal.getDate()
      const data = {
        id: form.reseasegurador,
        idcontr: this.contras ,
        inicial: dateInit,
        final: dateEnd
      };
      this.authService.postQuery(data, RoutersLink.postExcel).then(
        res => {
          if (res !== undefined && res!== '' && res !== null ) {
            console.log("resultado: ",res);
            this.excelService.generateExcel(res);
          } else {
            this.alert.error("Error",'No se encontro dato alguno');
          }
          this.form.reset();
          this.active =false;
          this.alert.messagefin();
        },
        err => {
          console.log(err);
          this.alert.messagefin();
        });
    }
  }
}
