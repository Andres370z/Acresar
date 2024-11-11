import { Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Procentajes } from 'src/app/home/commos/porcentajes';
import { SessionUser } from 'src/app/home/global/sessionUser';
import { AlertService } from 'src/app/service/alert.service';
import { AuthService } from 'src/app/service/auth.service';
import { Observable } from 'rxjs';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);
const now = new Date();

const ELEMENT_DATA = [{ data: '' }];
@Component({
  selector: 'app-facultativo',
  templateUrl: './facultativo.component.html',
  styleUrls: ['./facultativo.component.css']
})
export class FacultativoComponent implements OnInit {

  @ViewChild('tbody') tbody: ElementRef;
  yearsArray: number[] = [];

  calendarfi: JQuery;
  calendarff: JQuery;
  number: JQuery;
  md = { r: "", c: "" };
  item = { c: '', e: '', r: '' };
  frmValues = { cd: '', d: '', fi: '', ff: '', mn: '', s: '', o: '', sl1: '', cs1: '', re1: '', sl2: '', cs2: '', re2: '', sl3: '', cs3: '', re4: '' };
  d = '';
  cod = '';
  currency: Observable<any>;
  rl: string = '/rsltncntrts';
  modulo: string = 'Facultativo';
  selectMoneda: any;
  sumaComision = 0;

  date: { year: number, month: number };
  model;
  ctb1: any;
  ctb2: any;
  ctb3: any;
  ctb4: any;
  ctb5: any;
  contrato: any;
  public formatString: string = 'h:mm:ss a';
  public interval: number = 60;
  cuotaParteForm: FormGroup;
  cuotaParteFormreasegurador: FormGroup;
  dataShow = {
    error: false,
    mensaje: []
  };
  state: boolean;
  statefinal: boolean;
  ramos: any;
  prima1: any;
  prima2: any;
  prima3: any;
  prima4: any;
  prima5: any;
  reasegurador: any;
  listareasu: any;
  listareasu2: any;
  public user: any;
  listTb: any = [];
  contar = 0;
  private _pct = new Procentajes();
  constructor(
    private router: Router,
    private _currency: AuthService,
    private service: AuthService,
    private fb: FormBuilder,
    private _rd: Renderer2,
    private alertService: AlertService

  ) {
    this.user = new SessionUser(this.router);
    this.user.getAuthUser();
    $('#fini').on('change', () => {
      this.fecha('fini');
    });
    _currency.getCurrency().then((res: any) => { this.currency = res });
    if (localStorage.getItem('rsltntmpcntrt') === null) {
      this.item.e = '';
      this.item.r = '';
      this.item.c = '';
      const a = setInterval(() => {
        $("#modalShow").click();
        clearInterval(a);
      }, 300);
    } else {

      this.item = JSON.parse(localStorage.getItem('rsltntmpcntrt'));
      this.item.e = this.item.r;
      this.cod = this.item.c + ' - ' + this.item.r;
    }


    if (sessionStorage.getItem('cntrt') === null) {
      // tslint:disable-next-line:max-line-length
      this.frmValues = { cd: '', d: '', fi: '', ff: '', mn: '', s: '', o: '', sl1: '', cs1: '', re1: '', sl2: '', cs2: '', re2: '', sl3: '', cs3: '', re4: '' };
    } else {
      this.frmValues = JSON.parse(sessionStorage.getItem('cntrt'));
      // console.log(this.frmValues);
      // this.d = this.frmValues.d;
    }

  }

  ngOnInit() {
    this.yearsArray = this.getYearsArray();
    this.user.getAuthUser();

    if (this.user.authUser.id_rol === "5" || this.user.authUser.id_rol === "3") {
      this.router.navigate(['/admin/dashboard1']);
    }
    this.createForm();
    this.statefinal = false;
    this.createFormreasegurador();
    this.reasegurador = '';
    this.state = false;
    this.ctb1 = '+';
    this.ctb2 = '+';
    this.ctb3 = '+';
    this.ctb4 = '+';
    this.ctb5 = '+';




    this.service.getRamos().then(
      res => {
        this.ramos = res;
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );

    if (sessionStorage.getItem('formCuotaP') != "" && sessionStorage.getItem('formCuotaP') != null) {
      this.formLoad();
    }

    if (localStorage.getItem('idcontrato')) {
      this.contrato = JSON.parse(localStorage.getItem('idcontrato'));
      const contra = JSON.parse(localStorage.getItem('idcontrato'));
      this.service.getFacultativoContra(contra.a).then(
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
              this.alertService.messageInfo('Hey', 'Contrato es menor a un año');
            }
            if (dateStart < dateEnd) {
              this.alertService.messageInfo('Hey', 'Contrato es mayor a un año');
            }
          }
        }
      );
    }


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
    this.state = this.md.r !== '' && this.md.c !== '' ? true : false;

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
    // this.form.participacion = this.form.participacion+' %';
  }

  formLoad() {
    const form = JSON.parse(sessionStorage.getItem('formCuotaP'));
    this.cuotaParteForm.controls.codigocontrato.setValue(form['codigocontrato']);
    this.cuotaParteForm.controls.descripcion.setValue(form['descripcion']);
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
      tipocontrato: new FormControl('', Validators.required),
      codigocontrato: new FormControl('', Validators.required),
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

  goDetail() {
    this.alertService.loading();
    const form1 = JSON.parse(sessionStorage.getItem('formCuotaP1'));
    // tslint:disable-next-line:prefer-const
    let contar = + 0;
    const data = {
      idusers: this.user.authUser.id,
      codigo: form1['codigo'],
      secion: this._pct.removerDesimal(this._pct.removerPor(form1['secion'])),
      sumaLimite: this._pct.removerDesimal(form1['sumaLimite']),
      contrato: contar,
      reas: this._pct.removerDesimal(this._pct.removerPor(form1['reas'])),
      id: this.contrato.a,
    };

    console.log(data);
    this.service.postFacultativoContratb(data).then(
      res => {
        sessionStorage.setItem('idcontratoreasegurador', JSON.stringify(res));
        // CREAR ESTE COMPONENTE
        this.router.navigate(['home/contracts/Facultativos/edit/detalle']);
        this.reasegurador = JSON.parse(sessionStorage.getItem('idcontratoreasegurador'));
      });
    this.service.postFacultativoContratb(data).then(
      res => {
        sessionStorage.setItem('idcontratoreasegurador', JSON.stringify(res));
        this.reasegurador = JSON.parse(sessionStorage.getItem('idcontratoreasegurador'));
      });
  }
  agregarnomina(item: String, part: String) {
    const parti = this.cortarDesimales(part);
    console.log(parti);
    if (parti >= 100) {
      this.alertService.error('Error', 'Participacion igual al 100% ya no puedes seguir agregando mas nomina');
    } else {
      sessionStorage.setItem('id', JSON.stringify(item));
      this.router.navigate(['admin/contratos/facultativos/proporcionales/facultativo/detalle']);
    }
  }
  transformarHora(hora: string): string {
    const [hours, minutes] = hora.split(':');
    return `${parseInt(hours, 10)}:0:0`; // Convierte horas en número y formatea como H:0:0
  }
  transformarFecha(fecha: string): { day: number, month: number, year: number } {
    const [year, month, day] = fecha.split('-').map(Number); // Divide la fecha y convierte a número
    return { day, month, year };
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
        this.alertService.messageInfo('Hey', 'Campo del codigo del contrato es obligatorio');
      }
      // tslint:disable-next-line:one-line
      else if (formfinal.descripcion === undefined || formfinal.descripcion === '') {
        this.alertService.messageInfo('Hey', 'Campo descripción es obligatorio');
      }
      // tslint:disable-next-line:one-line
      else if (formfinal.fechaInicio === undefined || formfinal.fechaInicio === '') {
        this.alertService.messageInfo('Hey', 'Campo fecha de inicio es obligatorio');
      }
      // tslint:disable-next-line:one-line
      else if (formfinal.horainicio === undefined || formfinal.horainicio === '') {
        this.alertService.messageInfo('Hey', 'Campo hra inicial es obligatorio');
      }
      // tslint:disable-next-line:one-line
      else if (formfinal.fechaFin === undefined || formfinal.fechaFin === '') {
        this.alertService.messageInfo('Hey', 'Campo fecha final  es obligatorio');
      }
      // tslint:disable-next-line:one-line
      else if (formfinal.horafin === undefined || formfinal.horafin === '') {
        this.alertService.messageInfo('Hey', 'Campo  hora final es obligatorio');
      }
      // tslint:disable-next-line:one-line
      else if (formfinal.moneda === undefined || formfinal.model === '') {
        this.alertService.messageInfo('Hey', 'Campo moneda es obligatorio');
      }
      // tslint:disable-next-line:one-line
      else if (formfinal.observacion === '' || formfinal.observacion === undefined) {
        this.alertService.messageInfo('Hey', 'Campo observación es obligatorio');
      }
      // tslint:disable-next-line:one-line
      else if (formfinal.siniestroContrato === '' || formfinal.siniestroContrato === undefined) {
        this.alertService.messageInfo('Hey', 'Campo siniestro es obligatorio');
      }
      // tslint:disable-next-line:one-line
      else if (form2) {
        const data1 = {
          codigocontrato: 'ATL-FAC-' + this.cod,
        };
        this.alertService.loading();
        this.service.postBuscarContratos(data1).then(
          res => {
            const buscar = res
            console.log(buscar)
            if (buscar === "N.N") {
              const data = {
                idusers: this.user.authUser.id,
                tipocontrato: 10,
                codigocontrato: this.cod,
                descripcion: form2['descripcion'],
                fechaInicio: this.transformarFecha(form2['fechaInicio']),
                fechaFin: this.transformarFecha(form2['fechaFin']),
                moneda: form2['moneda'],
                siniestroContrato: this._pct.removerDesimal(form2['siniestroContrato']),
                observacion: form2['observacion'],
                horainicio: this.transformarHora(this.cuotaParteForm.value.horainicio),// Hours
                horafin: this.transformarHora(this.cuotaParteForm.value.horafin)
              };
              this.service.postFacultativoContra(data).then(
                res => {
                  localStorage.setItem('idcontrato', JSON.stringify(res));
                  this.contrato = JSON.parse(localStorage.getItem('idcontrato'));
                  this.statefinal = true;
                  console.log(res);
                  this.alertService.messagefin()
                },
                err => {
                  console.log(err);
                  this.alertService.messagefin()

                  this.alertService.error('Error', 'en el servidor');

                });
            } else {
              this.alertService.messagefin()

              this.alertService.error('Erro', 'Número de contrato ya existe');

            }

          },
          err => {
            console.log(err);
          });
        this.service.postBuscarContratos(data1).then(
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
                horainicio: d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds(), // Hours
                horafin: e.getHours() + ':' + e.getMinutes() + ':' + e.getSeconds()
              };
              this.service.postFacultativoContra(data).then(
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
          });

      }
    } else {
      this.contrato = JSON.parse(localStorage.getItem('idcontrato'));
      this.statefinal = true;
    }

  }
  fecha(item: string) {

    if (item === 'fini') {
      const e = $('#' + item).val();
      this.cuotaParteForm.controls.fechaInicio.setValue(e);
    }
    if (item === 'ffin') {
      this.cuotaParteForm.controls.fechaInicio.setValue($('#' + item).val());
    }

    // debugger;
    const fechaInicio = this.cuotaParteForm.controls.fechaInicio.value;
    const fechaFin = this.cuotaParteForm.controls.fechaFin.value;
    const ano = Number(fechaInicio.year) + 1;
    console.log(fechaFin, fechaInicio, ano);
    console.log(fechaInicio[0] < ano || fechaInicio[1] < fechaFin[2] || fechaInicio[2] < fechaFin[2]);
    console.log(fechaInicio[0] > ano || fechaInicio[1] > fechaFin[2] || fechaInicio[2] > fechaFin[2]);
    // this.contar = 0;

    if (localStorage.getItem('alerta') === null) {
      console.log(this.contar);
      if (fechaInicio.year <= ano || fechaInicio.month <= fechaFin.month || fechaInicio.day <= fechaFin.day) {

        this.alertService.info('Contrato es menor a un año', '');
        localStorage.setItem('alerta', 'hola');
      }
      if (fechaInicio.year >= ano || fechaInicio.month >= fechaFin.month || fechaInicio.day >= fechaFin.day) {

        this.alertService.info('Contrato es mayor a un año', '');
        localStorage.setItem('alerta', 'hola');
      }

    }


  }
  validarForm() {

    this.dataShow.error = false;
    this.dataShow.mensaje = [];
    const data = this.cuotaParteForm.value;
    const tb1 = data.tb1;
    const tb2 = data.tb2;
    const tb3 = data.tb3;

    if (data.codigocontrato === undefined && data.codigocontrato === '') {
      this.dataShow.error = true;
      this.dataShow.mensaje.push('Codigo contrato es requerido');
    }
    if (data.descripcion === undefined || data.descripcion === '') {
      this.dataShow.error = true;
      this.dataShow.mensaje.push('la descripcion es requerida');
    }
    if (data.moneda === undefined || data.model === '') {
      this.dataShow.error = true;
      this.dataShow.mensaje.push('selecione una moneda campo requerido');
    }
    if (data.observacion === '' || data.observacion === undefined) {
      this.dataShow.error = true;
      this.dataShow.mensaje.push('la observacion es requerida');
    }
    if (data.siniestroContrato === '' || data.siniestroContrato === undefined) {
      this.dataShow.error = true;
      this.dataShow.mensaje.push('el campo siniestro contrato es requerido')
    }

    if (tb1.secion !== '' || tb1.reas !== '' || tb1.sumaLimite !== '' || tb1.consiliacion.length > 0) {
      if (tb1.secion === '') {
        this.dataShow.error = true;
        this.dataShow.mensaje.push('valor de secion es obligatorio en la capa 1');
      }
      if (tb1.reas === '') {
        this.dataShow.error = true;
        this.dataShow.mensaje.push('valor de reas es obligatorio en la capa 1')
      }

    }
    if (tb2.secion2 !== '' || tb2.reas2 !== '' || tb2.sumaLimite2 !== '' || tb2.consiliacion2.length > 0) {
      if (tb1.secion2 === '') {
        this.dataShow.error = true;
        this.dataShow.mensaje.push('valor de secion es obligatorio en la capa 2');
      }
      if (tb1.reas2 === '') {
        this.dataShow.error = true;
        this.dataShow.mensaje.push('valor de reas es obligatorio en la capa 2')
      }

    }
    if (tb3.secion3 !== '' || tb3.reas3 !== '' || tb3.sumaLimite3 !== '' || tb3.consiliacion3.length > 0) {
      if (tb1.secion3 === '') {
        this.dataShow.error = true;
        this.dataShow.mensaje.push('valor de secion es obligatorio en la capa 3');
      }
      if (tb1.reas3 === '') {
        this.dataShow.error = true;
        this.dataShow.mensaje.push('valor de reas es obligatorio en la capa 3')
      }
    }
  }
  ramosEvent(key: any, num: any, tb: any) {
    const from = this.cuotaParteFormreasegurador.value;
    let data = this.cuotaParteFormreasegurador.controls[tb];
    data = data.value;
    if (key === 'codigo') {

      from[tb][`ramos${num}`] = Number(from[tb][`codigo${num}`]);

      this.cuotaParteForm.setValue(from);
    } else if (key === 'ramos') {
      from[tb][`codigo${num}`] = Number(from[tb][`ramos${num}`]);
      this.cuotaParteForm.setValue(from);
    }

  }
  desimalPor(key: any) {
    let e = key;
    if (e !== undefined) {
      e = e.split('');
      let count = 0, rst = '';
      for (let i = e.length - 1; i >= 0; i--) {
        count = count + 1;
        rst = e[i] + rst;
        if (count === 2) {
          if (e[i - 1] !== undefined) {
            rst = '.' + rst;
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
  desimaldo(key: any) {
    let e = key;
    if (e !== undefined) {
      e = e.split('');
      let count = 0, rst = '';
      for (let i = e.length - 1; i >= 0; i--) {
        count = count + 1;
        rst = e[i] + rst;
        if (count === 3) {
          if (e[i - 1] !== undefined) {
            rst = '.' + rst;
          }
          count = 0;
        }
      }
      return rst;
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
  cortarDesimales(item: any) {
    return Math.trunc(item);
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
  evenRamos(key: string) {
    if (!!key) {
      if (key === 'ramos') {
        const val = this.cuotaParteFormreasegurador.controls[key].value;
        this.cuotaParteFormreasegurador.controls.codigo.setValue(val);
      } else {
        const val = this.cuotaParteFormreasegurador.controls[key].value;
        this.cuotaParteFormreasegurador.controls.ramos.setValue(val);
      }
    }
  }
  // tslint:disable-next-line:one-line
  verificar() {
    if (sessionStorage.getItem('formCuotaP') && sessionStorage.getItem('formCuotaP1')) {
      localStorage.removeItem('idcontrato')
      sessionStorage.clear();
      this.cod = '';
      this.cuotaParteForm.reset();
      // tslint:disable-next-line:prefer-const
      let res = 'Contrato creado exitosamente';
      this.alertService.success('Ok', res);
      this.router.navigate(['admin/contratos']);
      // tslint:disable-next-line:one-line 
    } else {
      this.alertService.info('Desea salir sin agregar ramos al contrato', '');
      this.router.navigate(['home/contracs']);


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
