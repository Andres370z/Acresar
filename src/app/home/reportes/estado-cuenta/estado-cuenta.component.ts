import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  contratos: any;
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
  public selectedOption: any;
  constructor(
    private authService: AuthService,
    private alert: AlertService,
    private myFormBuilder: FormBuilder,
    private porcentajes: PercentageService,
    private router: Router,
    private excelService: ExcelService
  ) { }

  ngOnInit(): void {
    this.initial()
  }
  initial() {
    this.form = this.myFormBuilder.group({
      contratos: [Menssage.empty, Validators.compose([Validators.required])],
      
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

}
