import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalComponent } from '../../../facultativos/modal/modal.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Menssage } from 'src/app/models/router';
import { AuthService } from 'src/app/service/auth.service';
import { AlertService } from 'src/app/service/alert.service';
import { PercentageService } from 'src/app/service/percentage.service';
import { SessionUser } from 'src/app/home/global/sessionUser';
import { Router } from '@angular/router';
import { Procentajes } from 'src/app/home/commos/porcentajes';

const ELEMENT_DATA = [{ data: '' }];

@Component({
  selector: 'app-cuota-parte',
  templateUrl: './cuota-parte.component.html',
  styleUrls: ['./cuota-parte.component.css']
})
export class CuotaParteComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['contrato', 'sumaLimite', 'cesion', 'nomina', 'reas'];
  dataSource = ELEMENT_DATA;
  public form: FormGroup;
  private _pct = new Procentajes();
  public cuotaParteFormreasegurador: FormGroup;
  currency: any;
  ramos: any;
  public selectedOption: any;
  fechaAlmacenda: any;
  fechaAlmacendaFin: any;
  temporal: any;
  cod = '';
  contrato: any;
  item = { c: '', e: '', r: '' };

  listareasu: any;
  ramosrta: boolean = false
  public user: any;
  constructor(
    private dialog: MatDialog,
    private myFormBuilder: FormBuilder,
    private authService: AuthService,
    private alert: AlertService,
    private percentageService: PercentageService,
    private router: Router,
  ) {
    this.authService.getDataObser().subscribe(data => {
      if (data) {
        this.cod = data.id + ' - ' + data.year;
        console.log('Informacion pa', data, 'codigo: ', this.cod);


      }
    });
    if (localStorage.getItem('rsltntmpcntrt') === null) {
      this.item.e = '';
      this.item.r = '';
      this.item.c = '';
    } else {
      this.item = JSON.parse(localStorage.getItem('rsltntmpcntrt'));
      this.item.e = this.item.r;
      this.cod = this.item.c + ' - ' + this.item.r;

      //this.form.controls.codigoContrato.setValue(this.cod)
    }
  }


  ngOnDestroy(): void {
    //this.storageClear()
  }

  ngOnInit(): void {
    this.initial()

    this.createFormreasegurador()
    if (sessionStorage.getItem('formCuotaP') != '' && sessionStorage.getItem('formCuotaP') != null) {
      this.formLoad();
      this.formLoadreasegurador();

    } else {
      this.onCreate()
      
    }
    this.user = new SessionUser(this.router)
    this.user.getAuthUser()
    this.createFormreasegurador()
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
  }
  cargaCod(){
    this.form.controls.codigoContrato.setValue(this.cod)
  }
  onCreate() {
    localStorage.removeItem('rsltntmpcntrt')
    const dialogConfig = new MatDialogConfig()
    dialogConfig.width = '30%',
      dialogConfig.disableClose = true
    this.dialog.open(ModalComponent, dialogConfig)

  }

  initial() {
    this.form = this.myFormBuilder.group({
      codigoContrato: [Menssage.empty, Validators.compose([Validators.required])],
      descripcion: [Menssage.empty, Validators.compose([Validators.required])],
      epi: [Menssage.empty, Validators.compose([Validators.required])],
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

  saveData(dta: any) {
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
      this.alert.loading()
      const form = this.form.value;
      sessionStorage.setItem('formCuotaP', JSON.stringify(form))
      const form2 = JSON.parse(sessionStorage.getItem('formCuotaP'));
      if (this.form.invalid) {
        this.alert.error('Error', 'Faltan algunos campos en tu formulario')
      } else if (form2) {
        console.log('aqui llega 2');
        const data1 = {
          codigocontrato: 'ATL-FAC-' + this.cod,
        };
        this.authService.postBuscarCuotaAparte(data1).then(
          res => {
            console.log(res)
            if (res == "N.N") {
              this.temporal = JSON.parse(localStorage.getItem('rsltntmpcntrt'))
              this.cod = this.temporal.c + ' - ' + this.temporal.r
              console.log('entro')// esto para verificar el if
              const data = {
                idusers: this.user.authUser.id,
                tipocontrato: 10,
                codigocontrato: this.cod,
                descripcion: form2['descripcion'],
                epiContrato: this.percentageService.removerDesimal(form2['epi']),
                fechaInicio: this.fechaAlmacenda,
                fechaFin: this.fechaAlmacendaFin,
                moneda: form2['money'],
                siniestroContrato: this.percentageService.removerDesimal(form2['sinistros']),
                observacion: form2['observations'],
                horainicio: form2['starHours'],
                horafin: form2['endHours']
              };

              this.authService.postContratoCuotaAparte(data).then(
                res => {
                  this.alert.messagefin();
                  localStorage.setItem('idcontrato', JSON.stringify(res));
                  this.contrato = JSON.parse(localStorage.getItem('idcontrato'));
                  console.log(res);
                  this.ramosrta = true
                  this.alert.success('Formulario Registrado', 'El siguiente paso es que agregues un ramo a tu contrato')
                }, err => {
                  this.alert.messagefin();
                  console.log(err);
                  this.alert.error('Error', 'Fallo en el servidor')
                }
              )
            }
            else {
              this.alert.messagefin();
              this.alert.error('Error', 'El id de formulario ya exite')
            }
          }
        )
      }
    } else {
      this.contrato = JSON.parse(localStorage.getItem('idcontrato'));
      this.ramosrta = true;
    }
    console.log(this.form)
  }
  createFormreasegurador() {
    this.cuotaParteFormreasegurador = this.myFormBuilder.group({
      contrato: [Menssage.empty, Validators.compose([Validators.required])],
      sumaLimite: [Menssage.empty, Validators.compose([Validators.required])],
      cesion: [Menssage.empty, Validators.compose([Validators.required])],
      reas: [Menssage.empty, Validators.compose([Validators.required])],
    });
  }
  onSubmit() {
    console.log('working');

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
    this.alert.loading();
    const form1 = JSON.parse(sessionStorage.getItem('formCuotaP1'))
    let contar = + 0;
    var por = this._pct.removerPor(form1['cesion'])
    var q = por.replace(",", ".");
    const data = {
      idusers: this.user.authUser.id,
      secion: q,
      sumaLimite: this._pct.removerDesimal(form1['sumaLimite']),
      contrato: contar,
      id: this.contrato.a,
    };
    console.log(data);
    this.authService.postCuotaRamo(data).then((res: any) => {
      this.alert.success('Ok', 'Validacion correcta puedes seguir')
      sessionStorage.setItem('idcontratoreasegurador', JSON.stringify(res));
      this.navigate('home/contracts/Automaticos/proporcionales/cuota-parte/detalle')
    }, err => {

      this.alert.error('Error', 'error en el servidor')
    })

  }
  miles(form: string, key: string) {
    if (form === 'cuotaParteForm') {
      let value = this.form.controls[key].value;
      if (value.split('.').length > 2) {
        value = this.percentageService.removerDesimal(this.form.controls[key].value);
      }
      const val = this.percentageService.desimalDeMiles(value);
      this.form.controls[key].setValue(val.toString());
    }
    if (form === 'cuotaParteFormreasegurador') {

      let value = this.cuotaParteFormreasegurador.controls[key].value;
      if (value.split('.').length > 2) {
        value = this.percentageService.removerDesimal(this.cuotaParteFormreasegurador.controls[key].value);
      }
      const val = this.percentageService.desimalDeMiles(value);
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
  desimal(key: any) {
    return key.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
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
  agregarnomina(item: String, part: String) {
    const parti = this.cortarDesimales(part);
    console.log(`>> ${parti}`);
    if (parti >= 100) {
      this.alert.error('Error', 'Participacion igual al 100% ya no puedes seguir agregando mas nomina')
    } else {
      sessionStorage.setItem('id', JSON.stringify(item));
      this.router.navigate(['/home/contracts/Automaticos/proporcionales/cuota-parte/detalle']);
    }
  }

  onchangedecimal(key: any) {
    let data;
    let decimalConver;
    switch (key) {
      case 'sumaLimite':
        data = this.form.controls.tb1;
        data = data.value;
        decimalConver = this.desimal(this.removerDesimal(data[key]));
        data[key] = decimalConver;
        this.form.controls.tb1.setValue(data);
        break;
      case 'sumaLimite2':
        data = this.form.controls.tb2;
        data = data.value;
        console.log(data);
        decimalConver = this.desimal(data[key]);
        data[key] = decimalConver;
        this.form.controls.tb2.setValue(data);
        break;
      case 'sumaLimite3':
        data = this.form.controls.tb3;
        data = data.value;
        decimalConver = this.desimal(data[key]);
        data[key] = decimalConver;
        this.form.controls.tb3.setValue(data);
        break;
      default:
        const inp = this.form.controls[key].value
        decimalConver = this.desimal(inp);
        this.form.controls[key].setValue(decimalConver.toString());
        break;
    }
  }
  navigate(item: string) {
    this.router.navigate([item])
  }
  formLoad() {
    this.ramosrta = true
    const form = JSON.parse(sessionStorage.getItem('formCuotaP'));
    this.form.controls.codigoContrato.setValue(form['codigoContrato']);
    this.form.controls.descripcion.setValue(form['descripcion']);
    this.form.controls.epi.setValue(form['epi']);
    this.form.controls.starDate.setValue(form['starDate']);
    this.form.controls.endDate.setValue(form['endDate']);
    this.form.controls.money.setValue(form['money']);
    this.form.controls.sinistros.setValue(form['sinistros']);
    this.form.controls.observations.setValue(form['observations']);
    this.form.controls.starHours.setValue(form['starHours']);
    this.form.controls.endHours.setValue(form['endHours']);
  }
  formLoadreasegurador() {
    const form1 = JSON.parse(sessionStorage.getItem('formCuotaP1'));
    this.cuotaParteFormreasegurador.controls.contrato.setValue(form1['contrato']);
    this.cuotaParteFormreasegurador.controls.sumaLimite.setValue(form1['sumaLimite']);
    this.cuotaParteFormreasegurador.controls.cesion.setValue(form1['cesion']);
    this.cuotaParteFormreasegurador.controls.reas.setValue(form1['reas']);
  }

  verificar(){
    this.alert.loading()
    if (sessionStorage.getItem('formCuotaP') && sessionStorage.getItem('formCuotaP1')){
      localStorage.removeItem('idcontrato')
      sessionStorage.clear();
      this.cod = '';
      this.form.reset();
      // tslint:disable-next-line:prefer-const
      let res = 'Contrato creado exitosamente';
      this.alert.success('Ok',res);
      this.navigate('home/contracts');
    // tslint:disable-next-line:one-line
    }else{
      this.alert.success('Ok', 'No agragaste un ramo al contrato');
      this.navigate('home/contracts');
    }
  }


}
