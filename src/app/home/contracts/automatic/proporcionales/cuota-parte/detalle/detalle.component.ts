import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Menssage } from 'src/app/models/router';
import { AuthService } from 'src/app/service/auth.service';
import { PercentageService } from 'src/app/service/percentage.service';
import { ModalComponent } from './modal/modal.component';
import { SessionUser } from 'src/app/home/global/sessionUser';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/service/alert.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {
  datajsonNominas: any = [];
  public formT: any = {
    cartera: "",
    depositoRetenido: '',
    comision: "",
    corredor: "",
    dtbrok: "",
    deposito: {
      moneda: "",
      periodoR: "",
      periodoT: "",
      PorcentajeI: "",
      PorcentajeR: "",
      reservaAsumida: ""
    },
    traspasoCartera: {
      Cuenta: '',
      traspaso: ''
    },
    ModelComision: {
      sobrecomisionMaxCheck: false,
      sobrecomisionMaxVal: "",
      sobrecomisionMinCheck: false,
      sobrecomisionMinVal: "",
      siniestralidadMaxCheck: false,
      siniestralidadMaxVal: "",
      siniestralidadMinCheck: false,
      siniestralidadMinVal: "",
      valueFija: "",
      ComVal: "",
      ComCheck: false,
      SinVal: "",
      SinChech: false
    }
  }
  public form: FormGroup;
  public selectedOption: string = 'selecciona un corredor';
  public corredor: any;
  public asegurador: any;
  public depositoRetenido: any;
  receivedData: any;
  receivedDataDos: any;
  receivedDataTres: any;
  listareasu: any;

  public user: any;
  errores = {
    error: false,
    mensaje: []
  };
  constructor(
    private myFormBuilder: FormBuilder,
    private authService: AuthService,
    private percentaje: PercentageService,
    private dialog: MatDialog,
    public router: Router,
    public alertService: AlertService


  ) {
    this.user = new SessionUser(this.router);
    this.user.getAuthUser();
  }

  ngOnInit(): void {
    this.initial()
    this.authService.getCorredor().then
      ((resulta: any) => {
        this.corredor = resulta
        console.log('estos son los corredores', resulta)
      })
    this.authService.getReinsurer().then
      ((resulta: any) => {
        this.asegurador = resulta
        console.log('estos son las aseguradoras', resulta)
      })
  }
  initial() {
    this.form = this.myFormBuilder.group({
      corredor: [Menssage.empty, Validators.compose([Validators.required])],
      reasegurador: [Menssage.empty, Validators.compose([Validators.required])],
      participacion: [Menssage.empty, Validators.compose([Validators.required])],
      comision: [Menssage.empty, Validators.compose([Validators.required])],
      depositosRetenidos: [Menssage.empty, Validators.compose([Validators.required])],
      comisionUtilidadespor: [Menssage.empty, Validators.compose([Validators.required])],
      comisionUtilidades: [Menssage.empty, Validators.compose([Validators.required])],
      gastos: [Menssage.empty, Validators.compose([Validators.required])],
      impuestos: [Menssage.empty, Validators.compose([Validators.required])],
      impRenta: [Menssage.empty, Validators.compose([Validators.required])],
      traspaso: [Menssage.empty, Validators.compose([Validators.required])],
      arrastrePerdida: [Menssage.empty, Validators.compose([Validators.required])],
      brokerage: [Menssage.empty, Validators.compose([Validators.required])],
      cuenta: [Menssage.empty, Validators.compose([Validators.required])],
    })

  }

  test() {
    this.authService.getDataObser().subscribe(data => {
      if (data) {
        this.receivedData = data;
        this.formT.deposito.reservaAsumida = this.receivedData.deposito.reservaAsumida;
        this.formT.deposito.PorcentajeR = this.receivedData.deposito.PorcentajeR;
        this.formT.deposito.PorcentajeI = this.receivedData.deposito.PorcentajeI;
        this.formT.depositoRetenido = this.receivedData.deposito.PorcentajeR;
        this.depositoRetenido = this.receivedData.deposito.PorcentajeR;
        const dataFinal = this.depositoRetenido
        console.log('data final: ', dataFinal);
        this.form.controls.depositosRetenidos.setValue(dataFinal)
      }
    });
  }
  recibeModalTra() {
    this.authService.getCarteraDataObser().subscribe(data => {
      if (data) {
        console.log('---dataModal---> ', data);

        this.receivedDataDos = data;
        this.formT.traspasoCartera.Cuenta = this.receivedDataDos.traspasoCartera.Cuenta
        this.formT.traspasoCartera.traspaso = this.receivedDataDos.traspasoCartera.traspaso
        this.formT.cartera = this.receivedDataDos.traspasoCartera.traspaso;
        console.log(this.formT.cartera); // Aquí tendrás acceso al objeto completo
        const dataCartera = this.formT.cartera;
        console.log('dataCartera: ', dataCartera);
        this.form.controls.traspaso.setValue(dataCartera)
      }
    });
  }

  recibeModalComi() {
    this.authService.getComisionDataObser().subscribe(data => {
      if (data) {
        console.log('---dataModal---> ', data);

        this.receivedDataTres = data;
        this.formT.comision = this.receivedDataTres.ModelComision.valueFija;
        this.formT.ModelComision.valueFija = this.receivedDataTres.ModelComision.valueFija;
        console.log(this.formT.comision); // Aquí tendrás acceso al objeto completo
        const dataComi = this.formT.comision;
        console.log('dataComi: ', dataComi);
        this.form.controls.comision.setValue(dataComi)
      }
    });
  }

  comsionModal() {
    const datos = {
      comison: true,
      deposito: false
    };
    this.authService.setData(datos)
    this.onCreate();
  }
  depositoModal() {
    const datos = {
      comison: false,
      deposito: true
    };
    this.authService.setData(datos)
    this.onCreate();
  }

  depositoCarteraModal() {
    const datos = {
      comison: false,
      deposito: false,
      cartera: true
    };
    this.authService.setData(datos)
    this.onCreate();
  }
  saveForm() {
    let value1: any;
    value1 = this.form.controls.corredor.value;
    this.removeProsentaje(value1)
    console.log(value1)
  }
  removeProsentaje(e: any) {
    if (e != "") {

      if (typeof e == "string") {
        const a = e.split("%");
        return a[0];
      }
    }
  }
  onCreate() {
    localStorage.removeItem('rsltntmpcntrt')
    const dialogConfig = new MatDialogConfig()
    dialogConfig.width = '50%',
      dialogConfig.disableClose = true
    this.dialog.open(ModalComponent, dialogConfig)

  }
  porcentaje(key: string) {
    if (key != '') {
      this.form[key] = this.desimalPor(this.form[key]);
    }
  }

  porcentajeR(key: string) {
    if (key != '') {
      this.formT.deposito[key] = this.desimalPor(this.formT.deposito[key]);
    }
  }

  desimalPor(key: any) {
    let e = key
    return e + '%';
  }
  porcentajes(key: string, form?) {
    if (!!form) {
      const value = this.form.controls[key].value;
      this.form.controls[key].setValue(
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
  cortarDesimales(item: any) {
    return Math.trunc(item);
  }

  guardar() {
    if (this.form.valid) {
      this.formT.reseasegurador = this.form.value.reasegurador
      this.formT.cuenta = this.form.value.cuenta
      this.formT.comisionUtilidadtesto = this.form.value.comisionUtilidades
      this.formT.ModelComision.valueFijados = this.removeProsentaje(this.form.value.brokerage)
      this.formT.depositoRetenido = this.depositoRetenido;
      this.formT.depositoRetenido = this.removeProsentaje(this.formT.depositoRetenido);
      this.formT.comision = this.removeProsentaje(this.formT.comision);
      this.formT.comisionUtilidad = this.form.value.comisionUtilidadespor;
      this.formT.comisionUtilidad = this.removeProsentaje(this.formT.comisionUtilidad);
      this.formT.gasto = this.removeProsentaje(this.form.value.gastos);
      this.formT.participacion = this.removeProsentaje(this.form.value.participacion);
      this.formT.inpuestoPrimaCedidas = this.removeProsentaje(this.form.value.impuestos);
      this.formT.inpuestoRenta = this.removeProsentaje(this.form.value.impRenta);
      this.formT.arrastrePerdida = this.form.value.arrastrePerdida;
      this.formT.participacion = this.form.value.participacion
      var n = this.formT.participacion.replace(",", ".");
      var x = this.formT.comision.replace(",", ".");
      this.formT.participacion = n;
      this.formT.comision = x;
      console.log(n)
      this.formT.inpuestoPrimaCedidas = this.removeProsentaje(this.formT.inpuestoPrimaCedidas);
      this.formT.inpuestoRenta = this.removeProsentaje(this.formT.inpuestoRenta);

      if (this.formT.deposito.reservaAsumida != true) {
        this.formT.deposito.PorcentajeR = this.removeProsentaje(this.formT.deposito.PorcentajeR);
        this.formT.deposito.PorcentajeI = this.removeProsentaje(this.formT.deposito.PorcentajeI);
        var q = this.formT.deposito.PorcentajeR.replace(",", ".");
        this.formT.inpuestoRenta = q;
        var i = this.formT.deposito.PorcentajeI.replace(",", ".");
        this.formT.inpuestoRenta = i;
        console.log('-------> ENTRA');

      }
      this.formT.inpuestoRenta = this.form.value.impRenta
      var p = this.formT.inpuestoRenta.replace(",", ".");
      this.formT.inpuestoRenta = p;
      var r = this.formT.inpuestoRenta.replace(",", ".");
      this.formT.inpuestoRenta = r;
      this.formT.corredor = this.form.value.corredor
      this.formT.dtbrok = this.form.value.brokerage

      if (this.formT.corredor == '') {
        this.formT.dtbrok = '';
      } else {
        this.formT.dtbrok = this.removeProsentaje(this.formT.dtbrok);
      }
      if (this.formT.cartera == 'Sin traspaso') {
        this.formT.traspasoCartera.Cuenta = 6;
      }

      if (this.errores.error == false) {
        this.formT.participacion = this.form.value.participacion
        if (this.formT.participacion != null && this.formT.participacion <= 100) {
          let idfinal = '';
          if (JSON.parse(sessionStorage.getItem('id'))) {
            idfinal = JSON.parse(sessionStorage.getItem('id'))
            console.log(idfinal);
          } else {
            let final = JSON.parse(sessionStorage.getItem('idcontratoreasegurador'));
            idfinal = final.a;
            console.log(idfinal);
          }
          this.formT.idusers = this.user.authUser.id,
            this.formT.id = idfinal;
          this.datajsonNominas.push(this.formT);
          console.log('-------> ENTRA 2');
          localStorage.setItem('comision', JSON.stringify(this.datajsonNominas));

          let data = JSON.parse(localStorage.getItem('comision'));
          console.log(data);
          this.alertService.loading();
          const contra = JSON.parse(localStorage.getItem('idcontrato'));
          this.authService.getDtaRamos(contra.a).then((res: any)=>{
            this.alertService.messagefin()
            console.log('llega res', res);
            this.listareasu = res;
            console.log(idfinal);
            var parti: Number;
            for (let index = 0; index < this.listareasu.length; index++) {
              if (this.listareasu[index].a == idfinal) {
            console.log('---------> listareasu ',this.listareasu[index].part);

                parti = this.cortarDesimales(this.listareasu[index].part);
              }

            }
            console.log('---------> participa  ',this.formT.participacion);
            var por: Number = parseInt(this.removeProsentaje(this.formT.participacion));
            console.log('---------> por ',por);
            console.log('---------> parti ',parti);
            var suma = Number(parti) + Number(por);
            console.log(suma);
            if (suma > 100) {
              console.log('---------> ',suma);
              console.log('SE DAÑO');
              this.alertService.error('Error', 'intentalo una vez mas')
            }else {
              this.authService.postCuotaparteNomina(JSON.parse(localStorage.getItem('comision'))).then((res: any)=>{
                console.log('Legga 2');
                data = null;
                  console.log(res);
                  localStorage.removeItem("comision");
                  if (localStorage.getItem('idcontrato')) {
                    const contra = JSON.parse(localStorage.getItem('idcontrato'));
                    this.authService.getDtaRamos(contra.a).then(
                      res => {
                        this.listareasu = res;
                        console.log(this.listareasu)
                        let parti: any;
                        for (let index = 0; index < this.listareasu.length; index++) {
                          if (this.listareasu[index].a == idfinal) {
                            parti = this.cortarDesimales(this.listareasu[index].part);
                          }

                        }

                        var por: Number = parseInt(this.removeProsentaje(this.formT.participacion));
                        var suma = Number(parti) + Number(por);
                        console.log(parti);
                        if (parti > 100) {
                          sessionStorage.removeItem('editarC');
                          sessionStorage.removeItem('v');
                          sessionStorage.removeItem('idcrearfinal');
                          sessionStorage.removeItem('id');
                          sessionStorage.removeItem('idramos');
                          sessionStorage.removeItem('idcontratoreasegurador');
                          console.log('Lista result ------>',this.listareasu.part);
                          this.navigate('home/contracts/Automaticos/proporcionales/cuota-parte')
                          this.alertService.success('Ok','detalle por Reasegurador')

                          //this.router.navigate(['/admin/contratos/automaticos/proporcionales/cuota-aparte']);
                        } else {
                          this.alertService.success('Ok', 'puedes seguir agregando nomina')
                          this.navigate('home/contracts/Automaticos/proporcionales/cuota-parte')

                          //this.messageInfo('Quieres seguir agregando nomina', '/admin/contratos/automaticos/proporcionales/cuota-aparte');
                        }
                        console.log(res);
                      },
                      err => {
                        console.log(err);
                      }
                    );
                  }
              }, err=> {
                console.log(err);
                
              })
            }
          }, err=> {
            console.log(err);
            
          })
        }

      }
      console.log('-------> objeto', this.formT);
    }
  }
  eliminarform() {
    this.formT.depositoRetenido = ""; //this.removeProsentaje(this.form.depositoRetenido);
    this.formT.comision = "";
    this.formT.comisionUtilidad = ""; // this.removeProsentaje(this.form.comisionUtilidad);
    this.formT.gasto = ""; // this.removeProsentaje(this.form.gasto);
    this.formT.participacion = "";
    this.formT.inpuestoPrimaCedidas = "";
    this.formT.inpuestoRenta = "";
    this.formT.deposito.reservaAsumida = "";
    this.formT.deposito.PorcentajeR = "";
    this.formT.deposito.PorcentajeI = "";
    this.formT.corredor == '';
    this.formT.dtbrok = '';
    this.formT.cartera == '';
    this.formT.traspasoCartera.Cuenta = '';
    this.datajsonNominas = [];
  };
  navigate(item: string) {
    this.router.navigate([item])
  }
}
