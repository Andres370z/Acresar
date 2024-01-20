import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Procentajes } from 'src/app/home/commos/porcentajes';
import { SessionUser } from 'src/app/home/global/sessionUser';
import { Menssage } from 'src/app/models/router';
import { AlertService } from 'src/app/service/alert.service';
import { AuthService } from 'src/app/service/auth.service';
import { LocalstoreService } from 'src/app/service/localstore.service';
import { ModalComponent } from './modal/modal.component';
import { MatTableDataSource } from '@angular/material/table';

const ELEMENT_DATA = [{data: ''}];
@Component({
  selector: 'app-facultativo',
  templateUrl: './facultativo.component.html',
  styleUrls: ['./facultativo.component.css']
})
export class FacultativoComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['codRamos', 'ramos', 'sumaLimite', 'cesion', 'nomina', 'reas', 'primaTotal'];
  dataSource = ELEMENT_DATA;
  public watermark: string = 'Select a time';
  // sets the format property to display the time value in 24 hours format.
  public dateValue: Date = new Date();
  public formatString: string = 'HH:mm';
  public interval: number = 60;
  public selectedTime: any;
  public form: FormGroup;
  public formReaseguros: FormGroup
  public entities: any = [];
  public selectedOption: any;
  public createForm: any;
  public currency: any = []
  public user: any
  public ramos: any
  md: any
  statefinal: boolean;
  cod = '';
  contrato: any;
  selectMoneda: any;
  listareasu: any;
  temporal: any
  public rta: boolean = false
  private item = { c: '', e: '', r: '' };
  private _pct = new Procentajes();
  
  constructor(
    private myFormBuilder: FormBuilder,
    private authService: AuthService,
    private alertService: AlertService,
    private router: Router,
    private localStorageService: LocalstoreService,
    private dialog: MatDialog
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
  
  ngOnInit() {
    this.onCreate()
    this.user = new SessionUser(this.router)
    this.user.getAuthUser()
    this.createFormReasegurador()
    if (sessionStorage.getItem('formCuotaP') != "" && sessionStorage.getItem('formCuotaP') != null) {
      this.formLoad();
    }
    if (localStorage.getItem('idcontrato')) {
      console.log('aqui se daña');

      this.contrato = JSON.parse(localStorage.getItem('idcontrato'));
      const contra = JSON.parse(localStorage.getItem('idcontrato'));
      this.authService.getFacultativoContra(contra.a).then(
        res => {
          this.listareasu = res;
          console.log(res);
        },
        err => {
          console.log(err);
        }
      )
    }
    this.initial()
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
    this.authService.getRamos().then((resulta: any )=> {
      this.ramos = resulta
      console.log('ramos: ', resulta)

    })
    this.user.getAuthUser()
  }
  saveData(item: any) {
    if (!sessionStorage.getItem('formCuotaP')) {
      console.log('aqui llega 1')
      const form = this.form.value;
      var d = new Date(form.starHours);
      var e = new Date(form.endHours);
      sessionStorage.setItem('formCuotaP', JSON.stringify(form));
      // tslint:disable-next-line:no-debugger ..≤
      const form2 = JSON.parse(sessionStorage.getItem('formCuotaP'));
      const formfinal = this.form.value;
      if (this.form.invalid) {
        this.alertService.error('Faltan campos por llenar', 'Error')
      } else if (form2) {
        console.log('aqui llega 2');

        const data1 = {
          codigocontrato: 'ATL-FAC-' + this.cod,
        };

        //this.user = this.localStorageService.getAuthUser();
        this.authService.postBuscarContratos(data1).then(
          res => {
            const buscar = res
            console.log(buscar)
            if (buscar == "N.N") {
              this.temporal = localStorage.getItem('rsltntmpcntrt')
              this.cod = this.temporal.c + ' - ' + this.temporal.r
              console.log('entro')// esto para verificar el if
              const data = {
                idusers: this.user.authUser.id,
                tipocontrato: 10,
                codigocontrato: this.cod,
                descripcion: form2['descripcion'],
                fechaInicio: form2['starDate'],
                fechaFin: form2['endDate'],
                moneda: form2['money'],
                siniestroContrato: this._pct.removerDesimal(form2['sinistros']),
                observacion: form2['observations'],
                horainicio: d.getHours() + ':' + d.getMinutes(),
                horafin: e.getHours() + ':' + e.getMinutes()
              };
              console.log('este es el objeto data,', data)
              this.authService.postFacultativoContra(data).then(
                res => {
                  console.log('esta es la respuesta del post', res);

                  localStorage.setItem('idcontrato', JSON.stringify(res));
                  this.contrato = JSON.parse(localStorage.getItem('idcontrato'));
                  this.statefinal = true;
                  console.log(res);
                  console.log('si llega')
                }, err => {
                  console.log('error 1', err)
                }
              )
            } else {
              this.alertService.error('Error', 'Número de contrato ya existe');
            }

          }, err => {
            console.log('error 01', err)
          });
        //Solicitud de respaldo
        /*
        this.authService.postBuscarContratosRespaldo(data1).then(
          
          res => {
            const buscar = res
            console.log(buscar)
            if (buscar == "N.N") {
              const data = {
                idusers: this.user.authUser.id,
                tipocontrato: 10,
                codigocontrato: this.cod,
                descripcion: form2['descripcion'],
                fechaInicio: form2['fechaInicio'],
                fechaFin: form2['fechaFin'],
                moneda: form2['moneda'],
                siniestroContrato: this._pct.removerDesimal(form2['siniestroContrato']),
                observacion: form2['observacion'],
                horainicio: d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds(), // Hours
                horafin: e.getHours() + ':' + e.getMinutes() + ':' + e.getSeconds()
              };
              this.authService.postFacultativoContra(data).then(
                res => {
                  localStorage.setItem('idcontrato', JSON.stringify(res));
                  this.contrato = JSON.parse(localStorage.getItem('idcontrato'));
                  this.statefinal = true;
                  console.log(res);
                }, err =>{
                  console.log(err)
                }
              )
            }else {
              this.alertService.error('Error', 'Número de contrato ya existe');
            }

          }, err =>{
            console.log('error 2, entro a la solicitud de respaldo',err)
          });
        */

      } else {
        this.contrato = JSON.parse(localStorage.getItem('idcontrato'));
        this.statefinal = true;
      }
      this.alertService.success('Formulario Enviado', 'Ok')
    }else {
      this.alertService.error('El formulario no se ha podido enviar', 'Error')
    }
    console.log(' formulario : ', item)
  }
  formLoad() {
    const form = JSON.parse(sessionStorage.getItem('formCuotaP'));
    this.form.controls.codigoContrato.setValue(form['codigocontrato']);
    this.form.controls.descripcion.setValue(form['descripcion']);
    this.form.controls.starDate.setValue(form['fechaInicio']);
    this.form.controls.endDate.setValue(form['fechaFin']);
    this.form.controls.money.setValue(form['moneda']);
    this.selectMoneda = form['moneda'];
    this.form.controls.sinistros.setValue(form['siniestroContrato']);
    this.form.controls.observations.setValue(form['observacion']);
    this.form.controls.horafin.setValue(form['horafin']);
    this.form.controls.horainicio.setValue(form['horainicio']);
  }
  storageClear() {
    localStorage.removeItem('idcontrato');
    localStorage.removeItem('formCuotaP');
    sessionStorage.removeItem('formCuotaP');
    // localStorage.clear();
    this.form.reset();
    sessionStorage.clear();
  }
  onCreate() {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.width = '30%',
    dialogConfig.disableClose = true
    this.dialog.open(ModalComponent, dialogConfig)
    this.rta = true
  }
  ngOnDestroy() {
    // Llamada al método storageClear al destruir el componente
    this.storageClear();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
  }
  createFormReasegurador(){
    this.formReaseguros = this.myFormBuilder.group({
      codigo: [Menssage.empty, Validators.compose([Validators.required])],
      ramos: [Menssage.empty, Validators.compose([Validators.required])],
      contrato: [Menssage.empty, Validators.compose([Validators.required])],
      sumaLimite: [Menssage.empty, Validators.compose([Validators.required])],
      seccion: [Menssage.empty, Validators.compose([Validators.required])],
      reas: [Menssage.empty, Validators.compose([Validators.required])],
      id: [Menssage.empty, Validators.compose([Validators.required])]
    })
  }
}