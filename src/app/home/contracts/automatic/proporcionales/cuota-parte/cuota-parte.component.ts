import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalComponent } from '../../../facultativos/modal/modal.component';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Menssage } from 'src/app/models/router';
import { AuthService } from 'src/app/service/auth.service';
import { AlertService } from 'src/app/service/alert.service';
import { PercentageService } from 'src/app/service/percentage.service';
import { SessionUser } from 'src/app/home/global/sessionUser';
import { Router } from '@angular/router';
import { Procentajes } from 'src/app/home/commos/porcentajes';
import { Observable } from 'rxjs';

const ELEMENT_DATA = [{ data: '' }];


declare var $: any;
const now = new Date();
@Component({
  selector: 'app-cuota-parte',
  templateUrl: './cuota-parte.component.html',
  styleUrls: ['./cuota-parte.component.css']
})
export class CuotaParteComponent implements OnInit {
  yearsArray: number[] = [];
  calendarfi: JQuery;
  calendarff: JQuery;
  number: JQuery;
  statefinal: boolean;
  contar = 0;
  public formatString: string = 'h:mm:ss a';
  public interval: number = 60;
  md = { r: '', c: '' };
  item = { c: '', e: '', r: '' };
  frmValues = { cd: '', d: '', fi: '', ff: '', mn: '', s: '', o: '', sl1: '', cs1: '', re1: '', sl2: '', cs2: '', re2: '', sl3: '', cs3: '', re4: '' };
  d = '';
  cod = '';
  currency: Observable<any>;
  rl: string = '/rsltncntrts';
  modulo: string = 'Cuota Parte';
  selectMoneda: any;
  sumaComision = 0;
  private _pct = new Procentajes();
  date: { year: number, month: number };
  model;
  ctb1: any;
  ctb2: any;
  ctb3: any;
  user: any;
  userfinal: any;

  cuotaParteForm: FormGroup;
  cuotaParteFormreasegurador: FormGroup;
  dataShow = {
    error: false,
    mensaje: []
  };
  state: boolean;
  reasegurador: any;
  listareasu: any;
  listareasu2: any;
  contrato: any;
  constructor(
    private router: Router,
    private service: AuthService,
    private fb: FormBuilder,
    private AlertService: AlertService
  ) {
    this.user = new SessionUser(this.router);
    this.user.getAuthUser();
    service.getCurrency().then((res: any)=> {this.currency = res});
    if (localStorage.getItem('rsltntmpcntrt') === null) {
      this.item.e = '';
      this.item.r = '';
      this.item.c = '';
      let a = setInterval(() => {
        $('#modalShow').click();
        clearInterval(a);
      }, 300);
    } else {

      this.item = JSON.parse(localStorage.getItem('rsltntmpcntrt'));
      this.item.e = this.item.r;
      this.cod = this.item.c + ' - ' + this.item.r;

    }


    if (sessionStorage.getItem('cntrt') === null) {
      this.frmValues = { cd: '', d: '', fi: '', ff: '', mn: '', s: '', o: '', sl1: '', cs1: '', re1: '', sl2: '', cs2: '', re2: '', sl3: '', cs3: '', re4: '' };
    } else {
      this.frmValues = JSON.parse(sessionStorage.getItem('cntrt'));
    }

  }
  

  eventDate() {

  }

  ngOnInit() {
    this.yearsArray = this.getYearsArray();
    this.statefinal = false;
    this.userfinal = this.user.authUser
    if ( this.user.authUser.id_rol === '5' ||  this.user.authUser.id_rol === '3' ) {
      this.router.navigate(['home/contracs']);
    }
    this.state = false;
    console.log(localStorage.getItem('idcontrato'))
    this.ctb1 = '+';
    this.ctb2 = '+';
    this.ctb3 = '+';



    this.createForm();
    this.createFormreasegurador();

    if (sessionStorage.getItem('comision') != '' && sessionStorage.getItem('comision') != null) {
      const comisionLocal = JSON.parse(sessionStorage.getItem('comision'));
      if (comisionLocal.length > 0) {
        this.formLoad();
      }
    }

    if (sessionStorage.getItem('formCuotaP') != '' && sessionStorage.getItem('formCuotaP') != null) {
      this.formLoad();
    }
    if (localStorage.getItem('idcontrato')) {
      this.contrato = JSON.parse(localStorage.getItem('idcontrato'));
      const contra = JSON.parse(localStorage.getItem('idcontrato'));
      this.service.getDtaRamos(contra.a).then(
        res => {
          this.listareasu = res;
          console.log(res);
        },
        err => {
          console.log(err);
        }
      );
    }
    if (sessionStorage.getItem('idcontratoreasegurador')) {
      const contra = JSON.parse(sessionStorage.getItem('idcontratoreasegurador'));
      this.service.getLoadRamos(contra.a).then(
        res => {
          this.listareasu2 = res;
          console.log(res);
        },
        err => {
          console.log(err);
        }
      );
      this.service.getComision(contra.a).then(
        res => {
          this.contar = res;
          console.log(res);
        },
        err => {
          console.log(err);
        }
      );
    }
    if (sessionStorage.getItem('fecha') == "") {
      this.cuotaParteForm.controls.horafin.valueChanges.subscribe(
        (input) => {
          if (this.cuotaParteForm.controls.fechaInicio.value !== '' && this.cuotaParteForm.controls.fechaFin.value !== '') {
            const dateStart = new Date((this.cuotaParteForm.controls.fechaInicio.value.year + 1), this.cuotaParteForm.controls.fechaInicio.value.month, (this.cuotaParteForm.controls.fechaInicio.value.day - 1));
            const dateEnd = new Date(this.cuotaParteForm.controls.fechaFin.value.year, this.cuotaParteForm.controls.fechaFin.value.month, (this.cuotaParteForm.controls.fechaFin.value.day - 1));
            if (dateStart > dateEnd) {
              this.AlertService.info('Hey','Contrato es menor a un año');
            }
            if (dateStart < dateEnd) {
              this.AlertService.info('Hey','Contrato es mayor a un año');
            }
          }
        }
      );
    }
  }

  selectToday() {
    this.model = { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() };
  }
  comisionItem(item: any) {
    item = JSON.parse(item);

    if (item.length > 0) {
      for (let i = 0; i <= (item.length - 1); i++) {
        const data = item[i];
        if (data != null) {
          this.sumaComision = this.sumaComision + parseFloat(data['participacion']);
        }

      }
    }
  }

  valid() {
    this.md.r.toString();
    this.state = this.md.r != '' && this.md.c != '' ? true : false;

  }
  ngRedirect() {

    this.md.r.toString();
    localStorage.setItem('rsltntmpcntrt', JSON.stringify(this.md));
    this.cod = this.md.c + ' - ' + this.md.r;
  }
  regresar() {

    localStorage.removeItem('alerta');
    localStorage.removeItem('idcontrato');
    // localStorage.clear();
    this.cuotaParteForm.reset();
    this.cuotaParteFormreasegurador.reset();
    sessionStorage.clear();
    this.router.navigate(['home/contracts']);

  }
  procentaje(item: any) {
    console.log(item);
    //this.form.participacion = this.form.participacion+' %';
  }
  formLoad() {
    const form = JSON.parse(sessionStorage.getItem('formCuotaP'));
    this.cuotaParteForm.controls.codigocontrato.setValue(form['codigocontrato']);
    this.cuotaParteForm.controls.descripcion.setValue(form['descripcion']);
    this.cuotaParteForm.controls.epiContrato.setValue(form['epiContrato']);
    this.cuotaParteForm.controls.fechaInicio.setValue(form['fechaInicio']);
    this.cuotaParteForm.controls.fechaFin.setValue(form['fechaFin']);
    this.cuotaParteForm.controls.moneda.setValue(form['moneda']);
    this.selectMoneda = form['moneda'];
    this.cuotaParteForm.controls.siniestroContrato.setValue(form['siniestroContrato']);
    this.cuotaParteForm.controls.observacion.setValue(form['observacion']);
    this.cuotaParteForm.controls.horainicio.setValue(form['horainicio']);
    this.cuotaParteForm.controls.horafin.setValue(form['horafin']);
  }

  formLoadreasegurador() {
    const form1 = JSON.parse(sessionStorage.getItem('formCuotaP1'));
    this.cuotaParteForm.controls.codigo.setValue(form1['codigo']);
    this.cuotaParteForm.controls.ramos.setValue(form1['ramos']);
    this.cuotaParteForm.controls.sumaLimite.setValue(form1['sumaLimite']);
    this.cuotaParteForm.controls.contrato = this.contrato;
    this.cuotaParteForm.controls.reas.setValue(form1['reas']);
    this.cuotaParteForm.controls.id.setValue(form1['id']);
  }

  createForm() {
    this.cuotaParteForm = new FormGroup({
      tipocontrato:  new FormControl('', Validators.required),
      codigocontrato: new FormControl('', Validators.required),
      epiContrato: new FormControl('', Validators.required),
      descripcion: new FormControl('', Validators.required),
      fechaInicio: new FormControl('', Validators.required),
      fechaFin: new FormControl('', Validators.required),
      moneda: new FormControl('', Validators.required),
      siniestroContrato: new FormControl('', Validators.required),
      observacion: new FormControl('', Validators.required),
      horainicio: new FormControl('', Validators.required),
      horafin: new FormControl('', Validators.required)
    });
  }
  createFormreasegurador() {
    this.cuotaParteFormreasegurador = new FormGroup({
      codigo: new FormControl('', Validators.required),
      ramos: new FormControl('', Validators.required),
      contrato: new FormControl('', Validators.required),
      sumaLimite: new FormControl('', Validators.required),
      secion: new FormControl('', Validators.required),
      reas: new FormControl('', Validators.required),
      id: new FormControl('', Validators.required),
    });
  }
  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.log(this.contrato);
    if (this.contrato) {
      const form1 = this.cuotaParteFormreasegurador.value;

      sessionStorage.setItem('formCuotaP1', JSON.stringify(form1));
      console.log(form1);
      if (form1) {
        this.goDetail();
      }
    }

  }
  goDetail() {
    const form1 = JSON.parse(sessionStorage.getItem('formCuotaP1'));
    // tslint:disable-next-line:prefer-const
    let contar = + 1;
    var por = this._pct.removerPor(form1['secion'])
    var q=por.replace(",",".");
    const data = {
      idusers: this.user.authUser.id,
      secion: q,
      sumaLimite: this._pct.removerDesimal(form1['sumaLimite']),
      contrato: contar,
      id: this.contrato.a,
    };

    console.log(data);
    this.service.postCuotaRamo(data).then(
      res => {
        sessionStorage.setItem('idcontratoreasegurador', JSON.stringify(res));
        this.router.navigate(['home/contracts']);
        this.reasegurador = JSON.parse(sessionStorage.getItem('idcontratoreasegurador'));
      });
      // this.service.postQueryrespaldo(data, '/contratos/automaticos/proporcionales/cuotaparte/ramos').then(
      //   res => {
      //     sessionStorage.setItem('idcontratoreasegurador', JSON.stringify(res));
      //     this.reasegurador = JSON.parse(sessionStorage.getItem('idcontratoreasegurador'));
      //   });
  }

  statusNomina:boolean= true;

  agregarnomina(item: String, part: String) {
    const parti = this.cortarDesimales(part);
    console.log(`>> ${parti}`);
    if (parti >= 100  ) {
      this.AlertService.error('Error','Participacion igual al 100% ya no puedes seguir agregando mas nomina');
    } else {
      sessionStorage.setItem('id', JSON.stringify(item));
      this.router.navigate(['home/contracts']);
    }
  }
  cortarDesimales(item: any) {
    return Math.trunc(item);
  }
  fecha(item: string) {

    if (item == 'fini') {
      this.cuotaParteForm.controls.fechaInicio.setValue($('#' + item).val());
    }
    if (item == 'ffin') {
      this.cuotaParteForm.controls.fechaFin.setValue($('#' + item).val());
    }

    const fechaInicio = this.cuotaParteForm.controls.fechaInicio.value;
    const fechaFin = this.cuotaParteForm.controls.fechaFin.value;
    const ano = Number(fechaFin.year) + 1;
    
    if(fechaInicio.year < ano || fechaInicio.month < fechaFin.month || fechaInicio.day < fechaFin.day ){
      this.AlertService.info('Het','Contrato es menor a un año');
    }
    if(fechaInicio.year > ano || fechaInicio.month > fechaFin.month || fechaInicio.day > fechaFin.day){
      this.AlertService.info('Hey','Contrato es mayo a un año');
    }


  }
  create() {

    if (!sessionStorage.getItem('formCuotaP')) {
      const form = this.cuotaParteForm.value;
      var d = new Date(form.horainicio);
      var e = new Date(form.horafin);
      sessionStorage.setItem('formCuotaP', JSON.stringify(form));
      // tslint:disable-next-line:no-debugger
      const form2 = JSON.parse(sessionStorage.getItem('formCuotaP'));
      const formfinal = this.cuotaParteForm.value;
      if (formfinal.codigocontrato === undefined && formfinal.codigocontrato === '') {
        this.AlertService.info('Hey','Campo del codigo del contrato es obligatorio');
      }
      // tslint:disable-next-line:one-line
      else if (formfinal.descripcion === undefined || formfinal.descripcion === '') {
        this.AlertService.info('Hey','Campo descripción es obligatorio');
      }
      // tslint:disable-next-line:one-line
      else if (formfinal.fechaInicio === undefined || formfinal.fechaInicio === '') {
        this.AlertService.info('Hey','Campo fecha de inicio es obligatorio');
      }
      // tslint:disable-next-line:one-line
      else if (formfinal.horainicio === undefined || formfinal.horainicio === '') {
        this.AlertService.info('Hey','Campo hra inicial es obligatorio');
      }
      // tslint:disable-next-line:one-line
      else if (formfinal.fechaFin === undefined || formfinal.fechaFin === '') {
        this.AlertService.info('Hey','Campo fecha final  es obligatorio');
      }
      // tslint:disable-next-line:one-line
      else if (formfinal.horafin === undefined || formfinal.horafin === '') {
        this.AlertService.info('Hey','Campo  hora final es obligatorio');
      }
      // tslint:disable-next-line:one-line
      else if (formfinal.moneda === undefined || formfinal.model === '') {
        this.AlertService.info('Hey','Campo moneda es obligatorio');
      }
      // tslint:disable-next-line:one-line
      else if (formfinal.observacion === '' || formfinal.observacion === undefined) {
        this.AlertService.info('Hey','Campo observación es obligatorio');
      }
      // tslint:disable-next-line:one-line
      else if (formfinal.siniestroContrato === '' || formfinal.siniestroContrato === undefined) {
        this.AlertService.info('Hey','Campo siniestro es obligatorio');
      }
      // tslint:disable-next-line:one-line
      else if (form2) {
        const data1 = {
          codigocontrato:'ATL-AUT-'+this.cod,
        };
        this.service.postCuotaRamo(data1).then(
          res => {
            const buscar = res
            console.log(buscar)
            if (buscar === "N.N") {
              const data = {
                idusers: this.user.authUser.id,
                tipocontrato: 10,
                codigocontrato: this.cod,
                descripcion: form2['descripcion'],
                fechaInicio: form2['fechaInicio'],
                fechaFin: form2['fechaFin'],
                moneda: form2['moneda'],
                siniestroContrato: this._pct.removerDesimal(form2['siniestroContrato']),
                epiContrato: this._pct.removerDesimal(form2['epiContrato']),
                observacion: form2['observacion'],
                horainicio: d.getHours()+':'+d.getMinutes()+':'+d.getSeconds(), // Hours
                horafin: e.getHours()+':'+e.getMinutes()+':'+e.getSeconds()
              };
              this.service.postContratoCuotaAparte(data).then(
                res => {
                  localStorage.setItem('idcontrato', JSON.stringify(res));
                  this.contrato = JSON.parse(localStorage.getItem('idcontrato'));
                  this.statefinal = true;
                  console.log(res);
      
                },
                err => {
                  console.log(err);
                });
            } else {
              this.AlertService.error('Error','Número de contrato ya existe');
            }

          },
          err => {
            console.log(err);
          });
          /* this.service.postQueryrespaldo(data1, '/contratos/automaticos/proporcionales/cuotaparte/buscar').then(
            res => {
              const buscar = res
              console.log(buscar)
              if (buscar === "N.N") {
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
                  horainicio: d.getHours()+':'+d.getMinutes()+':'+d.getSeconds(), // Hours
                horafin: e.getHours()+':'+e.getMinutes()+':'+e.getSeconds()
                };
                this.service.postQueryrespaldo(data, '/contratos/automaticos/proporcionales/cuotaparte/contrato').then(
                  res => {
                    localStorage.setItem('idcontrato', JSON.stringify(res));
                    this.contrato = JSON.parse(localStorage.getItem('idcontrato'));
                    this.statefinal = true;
                    console.log(res);
        
                  },
                  err => {
                    console.log(err);
                  });
              } 
  
            },
            err => {
              console.log(err);
            }); */
        
      }
    } else {
      this.contrato = JSON.parse(localStorage.getItem('idcontrato'));
      this.statefinal = true;
    }

  }
  onchangedecimal(key: any) {
    let data;
    let decimalConver ;
    switch (key) {
      case 'sumaLimite':
        data = this.cuotaParteForm.controls.tb1;
        data = data.value;
        decimalConver = this.desimal(this.removerDesimal(data[key]));
        data[key] = decimalConver;
        this.cuotaParteForm.controls.tb1.setValue(data);
        break;
      case 'sumaLimite2':
        data = this.cuotaParteForm.controls.tb2;
        data = data.value;
        console.log(data);
        decimalConver = this.desimal(data[key]);
        data[key] = decimalConver;
        this.cuotaParteForm.controls.tb2.setValue(data);
        break;
      case 'sumaLimite3':
        data = this.cuotaParteForm.controls.tb3;
        data = data.value;
        decimalConver = this.desimal(data[key]);
        data[key] = decimalConver;
        this.cuotaParteForm.controls.tb3.setValue(data);
        break;
      default:
        const inp = this.cuotaParteForm.controls[key].value
        decimalConver = this.desimal(inp);
        this.cuotaParteForm.controls[key].setValue(decimalConver.toString());
        break;
    }
  }

  onchangePor(key: string) {


    if (key == 'secion') {
      let data = this.cuotaParteForm.controls.tb1;
      data = data.value;
      const e = this.desimalPor(this.removerDesimal(data[key]));
      data[key] = e;
      this.cuotaParteForm.controls.tb1.setValue(data);
    }
    if (key == 'secion2') {
      let data = this.cuotaParteForm.controls.tb2;
      data = data.value;
      console.log(data);
      const e = this.desimalPor(data[key]);
      data[key] = e;
      this.cuotaParteForm.controls.tb2.setValue(data);
    }
    if (key == 'secion3') {
      let data = this.cuotaParteForm.controls.tb3;
      data = data.value;
      const e = this.desimalPor(data[key]);
      data[key] = e;
      this.cuotaParteForm.controls.tb3.setValue(data);
    }


  }
  submitForm() {
    this.cuotaParteForm.controls.codigocontrato.setValue($('#codigocontrato').val());
    this.removerReas();
    this.validarForm();
    console.log(this.cuotaParteForm.value);
    if (this.dataShow.error == false) {
      this.service.postBuscarCuotaAparte(this.cuotaParteForm.value).then(
        res => {
          const resultado = res
          if (resultado == 'N.N') {
            this.service.getDtaCuotaAparte(this.cuotaParteForm.value).then(
              res => {
                if (res.hs != false) {
                  sessionStorage.clear();
                  this.cod = '';
                  this.cuotaParteForm.reset();
                  this.ctb1 = '+';
                  this.ctb2 = '+';
                  this.ctb3 = '+';
                  this.AlertService.success('Ok',res.mensaje);
                  this.router.navigate(['home/contracts']);
                } else {
                  this.AlertService.error('Error',res.mensaje);
                }
              },
              err => {
                sessionStorage.clear();
                this.cuotaParteForm.reset();
      
                this.AlertService.error('Error','La informacion no fue guardada correctamente');
                this.router.navigate(['home/contracts']);
              }
            );
          } else {
            this.AlertService.error('Error','Número de contrato ya existe');
          }
        },
        err => {
          sessionStorage.clear();
          this.cuotaParteForm.reset();

          this.AlertService.error('Error','La informacion no fue guardada correctamente');
          this.router.navigate(['home/contracts']);
        }
      );
    }
  }

  removerReas() {
    let tb1 = this.cuotaParteForm.controls.tb1;
    let tb2 = this.cuotaParteForm.controls.tb2;
    let tb3 = this.cuotaParteForm.controls.tb3;

    this.cuotaParteForm.controls.siniestroContrato.setValue(this.removerDesimal(this.cuotaParteForm.controls.siniestroContrato.value));
    tb1 = tb1.value;
    tb2 = tb2.value;
    tb3 = tb3.value;

    tb1['reas'] = this.removerPor(tb1['reas']);
    tb2['reas2'] = this.removerPor(tb2['reas2']);
    tb3['reas3'] = this.removerPor(tb3['reas3']);
    tb1['secion'] = this.removerPor(tb1['secion']);
    tb2['secion2'] = this.removerPor(tb2['secion2']);
    tb3['secion3'] = this.removerPor(tb3['secion3']);

    tb1['sumaLimite'] = this.removerDesimal(tb1['sumaLimite']);
    tb2['sumaLimite2'] = this.removerDesimal(tb2['sumaLimite2']);
    tb3['sumaLimite3'] = this.removerDesimal(tb3['sumaLimite3']);

    this.cuotaParteForm.controls.tb1.setValue(tb1);
    this.cuotaParteForm.controls.tb2.setValue(tb2);
    this.cuotaParteForm.controls.tb3.setValue(tb3)

  }

  validarForm() {

    this.dataShow.error = false;
    this.dataShow.mensaje = [];
    const data = this.cuotaParteForm.value;
    const tb1 = data.tb1;
    const tb2 = data.tb2;
    const tb3 = data.tb3;

    if (data.codigocontrato == undefined && data.codigocontrato == '') {
      this.dataShow.error = true;
      this.dataShow.mensaje.push('Codigo contrato es requerido');
    }
    if (data.descripcion == undefined || data.descripcion == '') {
      this.dataShow.error = true;
      this.dataShow.mensaje.push('la descripcion es requerida');
    }
    if (data.moneda == undefined || data.model == '') {
      this.dataShow.error = true;
      this.dataShow.mensaje.push('selecione una moneda campo requerido');
    }
    if (data.observacion == '' || data.observacion == undefined) {
      this.dataShow.error = true;
      this.dataShow.mensaje.push('la observacion es requerida');
    }
    if (data.siniestroContrato == '' || data.siniestroContrato == undefined) {
      this.dataShow.error = true;
      this.dataShow.mensaje.push('el campo siniestro contrato es requerido')
    }
    if (tb1.secion != '' || tb1.reas != '' || tb1.sumaLimite != '' || tb1.consiliacion.length > 0) {
      if (tb1.secion == '') {
        this.dataShow.error = true;
        this.dataShow.mensaje.push('valor de secion es obligatorio en la capa 1');
      }
      if (tb1.reas == '') {
        this.dataShow.error = true;
        this.dataShow.mensaje.push('valor de reas es obligatorio en la capa 1')
      }

    }
    if (tb2.secion2 != '' || tb2.reas2 != '' || tb2.sumaLimite2 != '' || tb2.consiliacion2.length > 0) {
      if (tb1.secion2 == '') {
        this.dataShow.error = true;
        this.dataShow.mensaje.push('valor de secion es obligatorio en la capa 2');
      }
      if (tb1.reas2 == '') {
        this.dataShow.error = true;
        this.dataShow.mensaje.push('valor de reas es obligatorio en la capa 2')
      }

    }
    if (tb3.secion3 != '' || tb3.reas3 != '' || tb3.sumaLimite3 != '' || tb3.consiliacion3.length > 0) {
      if (tb1.secion3 == '') {
        this.dataShow.error = true;
        this.dataShow.mensaje.push('valor de secion es obligatorio en la capa 3');
      }
      if (tb1.reas3 == '') {
        this.dataShow.error = true;
        this.dataShow.mensaje.push('valor de reas es obligatorio en la capa 3')
      }
    }
  }

  desimalPor(key: any) {
    let e = key
    if (e != undefined) {
      e = e.split('');
      let count = 0, rst = '';
      for (let i = e.length - 1; i >= 0; i--) {
        count = count + 1
        rst = e[i] + rst;
        if (count == 2) {
          if (e[i - 1] != undefined) {
            rst = '.' + rst
          }
          count = 0;
        }
      }
      return rst + '%';
    }
  }

  desimal(key: any) {
    return key.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  removerDesimal(e: any) {
    if (e != '') {
      if (typeof e == 'string') {
        const a = e.split('.');
        let res = '';
        for (let i = 0; i < a.length; i++) {
          res = res + a[i];
        }
        return res == '' ? e : res;
      }
    } else {
      return '';
    }
  }

  removerPor(data: any) {
    if (data != undefined) {
      let e = data.split('%');
      return e[0];
    }
  }
  miles(form: string, key: string) {
    if (form === 'cuotaParteForm') {
      let value = this.cuotaParteForm.controls[key].value;
      if (value.split('.').length > 2) {
        value = this._pct.removerDesimal(this.cuotaParteForm.controls[key].value);
      }
      const val = this._pct.desimalDeMiles(value);
      this.cuotaParteForm.controls[key].setValue(val.toString());
    }
    if (form === 'cuotaParteFormreasegurador') {

      let value = this.cuotaParteFormreasegurador.controls[key].value;
      if (value.split('.').length > 2) {
        value = this._pct.removerDesimal(this.cuotaParteFormreasegurador.controls[key].value);
      }
      const val = this._pct.desimalDeMiles(value);
      this.cuotaParteFormreasegurador.controls[key].setValue(val.toString());
    }

    if (form === 'tabel') {
      const cortar = this.cortarDesimales(key)
      const quitar = this.desimal(cortar);
      return quitar;
    }

  }
  porcentaje(key: string, form?) {
    if (!!form) {
      const value = this.cuotaParteFormreasegurador.controls[key].value;
      this.cuotaParteFormreasegurador.controls[key].setValue(
        this.procentajedos(value)
      );
    } else {
      return this.procentajedos(key);
    }
  }
  procentajedos(item: any) {
    if (item != null && item !== '') {
      const e = parseFloat(item);
      return e + '%';
    }
  }
  verificar(){
    if (sessionStorage.getItem('formCuotaP') && sessionStorage.getItem('formCuotaP1')){
      localStorage.removeItem('idcontrato')
      sessionStorage.clear();
      this.cod = '';
      this.cuotaParteForm.reset();
      // tslint:disable-next-line:prefer-const
      let res = 'Contrato creado exitosamente';
      this.AlertService.success('Ok',res);
      this.router.navigate(['home/contracts']);
    // tslint:disable-next-line:one-line
    }else{
      this.AlertService.info('Ehy','Desea salir sin agregar ramos al contrato');
    }
  }


  getYearsArray(): number[] {
    const startYear = 2012;
    const endYear = 2100;
    const years = [];
    for (let year = startYear; year <= endYear; year++) {
      years.push(year);
    }
    return years;
  }
}
