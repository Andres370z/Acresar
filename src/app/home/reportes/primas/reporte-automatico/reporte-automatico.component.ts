import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/service/alert.service';
import { AuthService } from 'src/app/service/auth.service';
import { ExcelService } from 'src/app/service/excel.service';

@Component({
  selector: 'app-reporte-automatico',
  templateUrl: './reporte-automatico.component.html',
  styleUrls: ['./reporte-automatico.component.css']
})
export class ReporteAutomaticoComponent implements OnInit {
  form: FormGroup;
  ramos: any;
  public options: any
  constructor(
    private myFormBuilder: FormBuilder,
    private authService: AuthService,
    private alert: AlertService,
    private excelService: ExcelService,
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.authService.getRamos().then((res: any) => {
      this.ramos = res
    })
  }
  createForm() {
    /*Este es el Formulario*/
    this.form = this.myFormBuilder.group({
      tipoContrato: ['', Validators.compose([Validators.required])],
    });
  }
  searchContracs() {
    if (this.form.controls.tipoContrato.valid) {
      const data = {
        type: true,
        word: this.form.controls.tipoContrato.value

      }
      this.authService.postSearchIdcontracs(data).then(
        res => {
          this.options = res
        }, err => {
          this.alert.error('Error', 'Solicitud no enviada');
          console.log(err)
        }
      )
    }
  }
  upload(item: any) {
    console.log(item);
    this.form.controls.tipoContrato.setValue(item.o);
    this.contrato(item.a);
  }
  contrato(item) {
    this.authService.getContratoExcel(item).then((res: any) => {
      res => {
        this.ramos = res;
        console.log(res);
      }
    })
  }
  descargarfinal() {
    if (this.form.controls.tipoContrato.invalid) {
      this.alert.error('Error', 'Por favor escribe el id de contrato')
    } else {
      if (this.ramos.length === 0) {
        this.alert.error('Vacio', 'Por aqui no hay nada');
      } else {
        this.exportAsXLSX(this.ramos);
        this.alert.success('Ok', 'Tu descarga fue realizada')
      }
    }

  }
  exportAsXLSX(datatmp: any): void {
    this.excelService.exportAsExcelFile(datatmp, 'BORDERAUX-SINIESTRO');
  }

}
