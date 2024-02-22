import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalComponent } from '../../modal/modal.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalService } from 'src/app/service/modal.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Menssage } from 'src/app/models/router';
import { AuthService } from 'src/app/service/auth.service';
import { SessionUser } from 'src/app/home/global/sessionUser';
import { Route, Router } from '@angular/router';
import { PercentageService } from 'src/app/service/percentage.service';
import { AlertService } from 'src/app/service/alert.service';
import { ModalsOneComponent } from 'src/app/home/modals/modals-one/modals-one.component';

const ELEMENT_DATA = [{ data: '' }];
@Component({
  selector: 'app-facultativo-especiales',
  templateUrl: './facultativo-especiales.component.html',
  styleUrls: ['./facultativo-especiales.component.css']
})
export class FacultativoEspecialesComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['codRamos', 'ramos', 'sumaLimite', 'cesion', 'nomina', 'reas', 'primaTotal'];
  dataSource = ELEMENT_DATA;
  private item = { c: '', e: '', r: '' };
  public form: FormGroup;
  public currency: any;
  public ramos: any;
  public user: any;
  public formReaseguros: FormGroup
  statefinal: boolean;
  fechaAlmacenda: any
  fechaAlmacendaFin: any
  cod = '';
  contrato: any;
  listareasu: any;
  temporal: any;
  reasegurador: string;
  constructor(
    private dialog: MatDialog,
    private myDialog: ModalService,
    private myFormBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private percentageService: PercentageService,
    private alertService: AlertService
  ) {
    if (localStorage.getItem('rsltntmpcntrt') === null) {
      this.item.e = '';
      this.item.r = '';
      this.item.c = '';
      // const a = setInterval(() => {
      //   $("#modalShow").click();
      //   clearInterval(a);
      // }, 300);
    } else {
      this.item = JSON.parse(localStorage.getItem('rsltntmpcntrt'));
      this.item.e = this.item.r;
      this.cod = this.item.c + ' - ' + this.item.r;
    }
  }

  ngOnInit(): void {
    this.user = new SessionUser(this.router)
    this.user.getAuthUser()
    this.onCreate()
    this.initial()
    this.createFormReasegurador()
  }
  onCreate() {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.width = '30%',
      dialogConfig.disableClose = true
    this.dialog.open(ModalsOneComponent, dialogConfig)
  }
  initial() {
    this.form = this.myFormBuilder.group({
      codigoContrato: [Menssage.empty, Validators.compose([Validators.required])],
      descripcion: [Menssage.empty, Validators.compose([Validators.required])],

      starDate: [Menssage.empty, Validators.compose([Validators.required])],
      starHours: [Menssage.empty, Validators.compose([Validators.required])],
      endDate: [Menssage.empty, Validators.compose([Validators.required])],
      endHours: [Menssage.empty, Validators.compose([Validators.required])],
      money: [Menssage.empty, Validators.compose([Validators.required])],
      sinistros: [Menssage.empty, Validators.compose([Validators.required])],
      observations: [Menssage.empty, Validators.compose([Validators.required])],
    })
    this.authService.getCurrency().then((resulta: any) => {
      this.currency = resulta
      console.log('esta es las monedas', resulta)
    })
    this.authService.getRamos().then((resulta: any) => {
      this.ramos = resulta
      console.log('ramos: ', resulta)

    })
  }
  storageClear() {
    localStorage.removeItem('idcontrato');
    localStorage.removeItem('formCuotaP');
    sessionStorage.removeItem('formCuotaP');
    // localStorage.clear();
    this.form.reset();
    sessionStorage.clear();
  }
  saveDta(inform: any) {
    const data = this.form.controls.starDate.value;
    if (data) {
      const day = data.getDate();
      const month = data.getMonth() + 1; 
      const year = data.getFullYear();
      this.fechaAlmacenda = { day, month, year };
      console.log(this.fechaAlmacenda);
    }
    const dataOne = this.form.controls.endDate.value;
    if (dataOne) {
      const day = dataOne.getDate();
      const month = dataOne.getMonth() + 1;
      const year = dataOne.getFullYear();
      this.fechaAlmacendaFin = { day, month, year };
      console.log(this.fechaAlmacendaFin);
    }

    if (!sessionStorage.getItem('formCuotaP')) {
      console.log('a')
      const form = this.form.value;
      sessionStorage.setItem('formCuotaP', JSON.stringify(form))
      const form2 = JSON.parse(sessionStorage.getItem('formCuotaP'));
      if (this.form.invalid) {
        this.alertService.error('Faltan campos por llenar', 'Error')
      } else if (form2) {
        const data1 = {
          codigocontrato: 'ATL-FAC-' + this.cod,
        };
        this.authService.postBuscarContratos(data1).then(
          res => {
            console.log('llega');
            const buscar = res;
            console.log(buscar)
            if(buscar == "N.N"){
              this.temporal = JSON.parse(localStorage.getItem('rsltntmpcntrt'));
              this.cod = this.temporal.c + ' - ' + this.temporal.r;
              console.log('entro N.N')
              const data = {
                idusers: this.user.authUser.id,
                tipocontrato: 10,
                codigocontrato: this.cod,
                descripcion: form2['descripcion'],
                fechaInicio : this.fechaAlmacenda,
                fechaFin: this.fechaAlmacendaFin,
                moneda: form2['money'],
                siniestroContrato: this.percentageService.removerDesimal(form2['sinistros']),
                observacion: form2['observations'],
                horainicio: form2['starHours'],
                horafin:  form2['endHours']
              };
              console.log('este es el objeti data: ', data)
              this.authService.postFacultativoContra(data).then(
                res => {
                  console.log('esta es la respuesta del post ', res);
                  localStorage.setItem('idcontrato', JSON.stringify(res))
                  this.contrato = JSON.parse(localStorage.getItem('idcontrato'))
                  this.alertService.success('Ok', 'En hora buena el formulario ha sido enviado')
                }, err => {
                  console.log(err)
                }
              )
            } else {
              this.alertService.error('Error', 'El contrato ya existe')
            }
            
          }
        )
      } else {
        this.contrato = JSON.parse(localStorage.getItem('idcontrato'));
        this.statefinal = true;
      }
    }
  }
  formLoad() {
    const form = JSON.parse(sessionStorage.getItem('formCuotaP'));
    this.form.controls.codigoContrato.setValue(form['codigocontrato']);
    this.form.controls.descripcion.setValue(form['descripcion']);
    this.form.controls.starDate.setValue(form['fechaInicio']);
    this.form.controls.endDate.setValue(form['fechaFin']);
    this.form.controls.money.setValue(form['moneda']);
    this.form.controls.sinistros.setValue(form['siniestroContrato']);
    this.form.controls.observations.setValue(form['observacion']);
    this.form.controls.horafin.setValue(form['horafin']);
    this.form.controls.horainicio.setValue(form['horainicio']);
  }
  createFormReasegurador() {
    this.formReaseguros = this.myFormBuilder.group({
      codigo: [Menssage.empty, Validators.compose([Validators.required])],
      ramos: [Menssage.empty, Validators.compose([Validators.required])],
      sumaLimite: [Menssage.empty, Validators.compose([Validators.required])],
      seccion: [Menssage.empty, Validators.compose([Validators.required])],
      reas: [Menssage.empty, Validators.compose([Validators.required])],
    })
  }
  goDetail() {
    this.alertService.loading();
    const form1 = JSON.parse(sessionStorage.getItem('formCuotaP1'))
    let cont = + 0;
    const data = {
      idusers: this.user.authUser.id,
      codigo: form1['codigo'],
      secion: this.percentageService.removerDesimal(this.percentageService.removerPor(form1['seccion'])),
      sumaLimite: this.percentageService.removerDesimal(form1['sumaLimite']),
      contrato: cont,
      reas: this.percentageService.removerDesimal(this.percentageService.removerPor(form1['reas'])),
      id: this.contrato.a,
    };
    console.log('goDetail trabajando', data);
    this.authService.postFacultativoContratb(data).then(
      res => {
        this.alertService.messagefin();
        sessionStorage.setItem('idcontratoreasegurador', JSON.stringify(res));
        // this.router.navigate(['admin/contratos/facultativos/proporcionales/facultativo/detalle']);
        this.reasegurador = JSON.parse(sessionStorage.getItem('idcontratoreasegurador'));
      }, err => {
        this.alertService.error('No se logró el envio del formulario', 'Error')
      }
    )
  }
  percentageTwo(item: any) {
    if (item != null && item !== '') {
      const e = parseFloat(item);
      return e + '%';
    }
  }
  percentage(key: string, form: any) {
    if (!!form) {
      const value = this.formReaseguros.controls[key].value;
      this.formReaseguros.controls[key].setValue(
        this.percentageTwo(value)
      )
    } else {
      this.percentageTwo(key)
    }
  }
  miles(form: string, key: string) {
    if (form == 'form') {
      let value = this.formReaseguros.controls[key].value
      if (value.split('.').length > 2) {
        value = this.percentageService.removerDesimal((this.form.controls[key].value))
      }
      const val = this.percentageService.desimalDeMiles(value)
      this.formReaseguros.controls[key].setValue(val.toString())
    }
    if (form == 'formReaseguros') {
      let value = this.formReaseguros.controls[key].value
      if (value.split('.').length > 2) {
        value = this.percentageService.removerDesimal(this.formReaseguros.controls[key].value)
      }
      const val = this.percentageService.desimalDeMiles(value)
      this.formReaseguros.controls[key].setValue(val.toString())
    }
  }
  eventRamo(key: string) {
    if (!!key) {
      if (key === 'ramos') {
        const value = this.formReaseguros.controls[key].value
        this.formReaseguros.controls.codigo.setValue(value)
      }
      if (key === 'codigo') {
        const value = this.formReaseguros.controls[key].value
        console.log(value, 'de codigo')
        this.formReaseguros.controls.ramos.setValue(value)
      }
    } else {
      console.log('error')
    }
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
  }
  ngOnDestroy() {
    // Llamada al método storageClear al destruir el componente
    this.storageClear();
  }
  onSubmit() {
    console.log(this.contrato);
    if (this.contrato) {
      const form1 = this.formReaseguros.value;

      sessionStorage.setItem('formCuotaP1', JSON.stringify(form1));
      console.log(form1);
      if (form1) {
        this.goDetail();
      }
    } else {
      this.alertService.error('Error', 'Error en la conexión con el servidor')
    }
  }
  fecha(data: any) {
    console.log('esta es la fecha ', data)
    if (data) {
      const day = data.getDate();
      const month = data.getMonth() + 1;
      const year = data.getFullYear();

      const fechaAlmacenada = { day, month, year };

      console.log(fechaAlmacenada);
    }
  }
}
