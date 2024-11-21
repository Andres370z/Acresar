import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Menssage } from 'src/app/models/router';
import { AlertService } from 'src/app/service/alert.service';
import { AuthService } from 'src/app/service/auth.service';
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
  j: JQuery;
  cuotaParteForm: FormGroup;
  enviardatos: FormGroup;
  cuotaParteFormreasegurador: FormGroup;
  fromajustes: FormGroup;
  public selectedOption: any;
  constructor(
    private authService: AuthService,
    private alert: AlertService,
    private myFormBuilder: FormBuilder,
    private porcentajes: PercentageService,
    private router: Router,
    private excelService: ExcelService,
    private _service: AuthService
  ) { }

  ngOnInit(): void {
    this.createFormreas();
    this.active = false;
    this.cuotaParteForm.controls.corredor.valueChanges.subscribe(
      (res) => {
        if (res !== '' || res !== undefined) {
          console.log(res)
          this.active = true;
          this.contras = res;
          console.log(res); 
          const data = {id: this.contras};
          this._service.postQuery(data, 'contratos/automaticos/poliza/get/reasegurador').then(
            res => {
              this.rsltnrsgr = res;
              console.log(res)
            },
            err => {
              console.log(err);
            });
        } else {
          this.alert.info('Hey','Debes seleccionar un contrato');
        }
      });
      this._service.getQuery('contratos/automaticos/poliza/get/contratos').then(
        res => {
          this.rsltncr = res;
        }
      );
  }
  initial() {
    this.form = this.myFormBuilder.group({
      poliza: [Menssage.empty, Validators.compose([Validators.required])],
      
      startDate: [Menssage.empty, Validators.compose([Validators.required])],
      endDate: [Menssage.empty, Validators.compose([Validators.required])],
    });
    //Trae contratos Asociados
    this.authService.getPoliza().then((resulta: any) => {
      this.poliza = resulta;
    }).catch((err) => {
      console.log(err);
    });
    this.form.controls.poliza.valueChanges.subscribe((res: any)=>{
      if (res !== '' || res !== undefined) {
        this.contras = res;
        console.log(res);
        const data = {id: this.contras};
        this.authService.postPolizaReasegurador(data).then(
          res => {
            console.log(res)
          },
          err => {
            console.log(err);
          });
      } else {
        this.alert.error('Te falta algo','Debes seleccionar un contrato');
      }
    })
   
  }

  downloadData() {
    if (this.form.valid) {
      const form = this.form.value
      const data = {
        id: form.poliza,
        idcontr: this.contras ,
        inicial: form.startDate,
        final: form.endDate
      };
      console.log('UNO', data);
      this.authService.postExcel(data).then((res: any) => {
        console.log(res[0]);
          if (res !== undefined && res!== '' && res !== null ) {
            this.excelService.exportAsExcelFile(res,'')
            this.form.reset();
            this.alert.loading();
          } else {
            this.form.reset();
            this.alert.messagefin();
            this.alert.error('Error','No se encontro dato alguno');
          }
      })
    }else{
      this.alert.error('Falta algo', 'Todavia no llenas el formulario')
    }

  }
  convertir(item: any) {
    var toReturn = {}
    const datatmp = [];
    for (let index = 0; index < item.length; index++) {
      const element = item[index];
      datatmp.push(
        {
          Serie: element.Serie,
          Asegurado: element.Asegurado,
          Poliza: element.Poliza,
          Certificado: element.Certificado,
          Id_contrato: element.Id_contrato,
          Codigo: element.Codigo,
          Ramo: element.Ramo,
          Inicio: element.Inicio,
          Fin: element.Fin,
          Reasegurador: element.Reasegurador,
          Participacion: element.Participacion,
          Prima: this.cortarDesimales(element.Prima),
          Cesion: element.Cesion,
          Prima_cedida: this.cortarDesimales(element.Prima_cedida),
          Prima_rea: this.cortarDesimales(element.Prima_rea),
          Comision: element.Comision,
          Valor_comision: this.cortarDesimales(element.Valor_comision),
          Desposito: element.Desposito,
          Valor_deposito: this.cortarDesimales(element.Valor_deposito),
          Impuesto: element.Impuesto,
          Valor_impuesto: this.cortarDesimales(element.Valor_impuesto),
          Broke: element.Broke,
          Valor_Broke: this.cortarDesimales(element.Valor_Broke),
        }
      );
    }
    console.log(datatmp);
    this.exportAsXLSX(datatmp)
  }
  cortarDesimales(item: any) {
    return Math.trunc(item);
  }
  exportAsXLSX(item: any) {
    this.excelService.exportAsExcelFile(item, 'REPORTE-BORDERAUX')
  }


  createFormreas() {
    this.cuotaParteForm = new FormGroup({
      corredor: new FormControl('', Validators.required),
      reseasegurador: new FormControl('', Validators.required),
      fechainicial: new FormControl('', Validators.required),
      fechafinal: new FormControl('', Validators.required),
    });
  }
  generateExcel() {
    const form = this.cuotaParteForm.value;
    console.log(form);
    if (form.reseasegurador === '') {
      this.alert.error('Ups','Debes seleccionar un reasegurador');
    } else if (form.fechainicial === '') {
      this.alert.error('Ups','Debes seleccionar una fecha incial');
    } else if (form.fechafinal === '') {
      this.alert.error('Ups','Debes seleccionar una fecha final');
    }else {
      this.alert.loading();
      const data = {
        id: form.reseasegurador,
        idcontr: this.contras ,
        inicial: form.fechainicial,
        final: form.fechafinal
      };
      this._service.postQuery(data, 'contratos/automaticos/poliza/get/excel').then(
        res => {
          console.log(res);
          if (res !== undefined && res!== '' && res !== null ) {
            this.excelService.exportAsExcelFile(res, 'REPORTE-BORDERAUX');
            this.cuotaParteForm.reset();
            this.alert.messagefin();
          } else {
            this.cuotaParteForm.reset(); 
            this.alert.messagefin();

            this.alert.error('Ups','No se encontro dato alguno');
          }
        },
        err => {
          console.log(err);
          this.alert.messagefin();
        });
    }
  }

}
