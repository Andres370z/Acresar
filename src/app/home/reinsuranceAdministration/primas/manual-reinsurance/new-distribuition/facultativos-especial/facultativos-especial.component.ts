import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Procentajes } from 'src/app/home/commos/porcentajes';
import { SessionUser } from 'src/app/home/global/sessionUser';
import { Menssage } from 'src/app/models/router';
import { AlertService } from 'src/app/service/alert.service';
import { AuthService } from 'src/app/service/auth.service';
import Swal from 'sweetalert2';

interface years {
  value: string;
  viewValue: string;
}

type NewType = years;

@Component({
  selector: 'app-facultativos-especial',
  templateUrl: './facultativos-especial.component.html',
  styleUrls: ['./facultativos-especial.component.css']
})
export class FacultativosEspecialComponent implements OnInit {
  modulo = 'Prima Facultativos Especials';
  money: any;
  mon: any;
  sucursales: any;
  compania: any;
  dataForm: any;
  poliza: String;
  ctb1: any;
  final: any;
  finaldetalle: any;
  valor: number;
  valor1: number;
  moneda;
  lisRequest: boolean;
  lisRequest2: boolean;
  lisRequest3: boolean;
  nombrecontrato: string;
  reasegurador: any;
  validar: any;
  listasegurado: any;
  listasegurado2: any;
  listasegurado3: any;
  ///
  cuotaParteForm: FormGroup;
  enviardatos: FormGroup;
  cuotaParteFormreasegurador: FormGroup;
  fromajustes: FormGroup;
  certificado;
  modeda;
  inicio = '';
  fin;
  sucursalesSelect;
  companiaSelect;
  ramo;
  descripcion;
  sumaAsegurada;
  sumaDistribucion;
  prima;
  identificacion;
  fecha1;
  fecha2;
  statefinal;
  ciudad;
  ramos: any;
  proceso: any;
  procesodos: any;
  tabla = {
    contrato: '',
    tramo: '',
    sumaRetencion: '',
    sumaCedida: '',
    primaRetenida: '',
    primaCedida: ''
  };
  ramotecnico;
  primaDistribucion;
  ProductoSubramo;
  listareasu: any;
  listareasu2: any;
  contratofinal: any;
  aseguradornit: any;
  aseguradorpoliza: any;
  contrato: any;
  polizacontrato: any;
  selectpoliza: any;
  selectcontrato: any;
  idsegurador;
  idpoliza;
  polizaramos: any;
  public user: any;
  private _pct = new Procentajes();

  constructor(
    private myFormBuilder: FormBuilder,
    private myFormBuilderTwo: FormBuilder,
    private authService: AuthService,
    private alertService: AlertService,
    private router: Router,
    private http: AuthService,

  ) {
    this.user = new SessionUser(this.router);
    this.user.getAuthUser();
  }

  ngOnInit(): void {
    this.createFormreas();
    this.createFormreasegurador();
    this.fromajustesfinales();
    console.log(localStorage.getItem('idcontrato'))
    this.http.getRamos().then(
      res => {
        this.ramos = res;
      }
    );
    this.valor = 0;
    this.valor1 = 0;
    this.http.getData().then(
      res => {
        this.reasegurador = res;
      }
    );
  }

  createFormreas() {
    this.cuotaParteForm = this.myFormBuilder.group({
      poliza: [Menssage.empty, Validators.compose([Validators.required])],
      certificado: [Menssage.empty, Validators.compose([Validators.required])],
      fechaemision: [Menssage.empty, Validators.compose([Validators.required])],
      ciudad: [Menssage.empty, Validators.compose([Validators.required])],
      idsegurador: [Menssage.empty, Validators.compose([Validators.required])],
      asegurador: [Menssage.empty],
      nit: [Menssage.empty],
    });
  }
  fromajustesfinales() {
    this.fromajustes = this.myFormBuilder.group({
      codigoedit: [Menssage.empty, Validators.compose([Validators.required])],
      ramosedit: [Menssage.empty, Validators.compose([Validators.required])],
      contratoedit: [Menssage.empty, Validators.compose([Validators.required])],
      sumaLimiteedit: [Menssage.empty, Validators.compose([Validators.required])],
      primasedit: [Menssage.empty, Validators.compose([Validators.required])],
      primascentesedit: [Menssage.empty, Validators.compose([Validators.required])],
    });
  }
  createFormreasegurador() {
    this.cuotaParteFormreasegurador = this.myFormBuilder.group({
      codigo: [Menssage.empty, Validators.compose([Validators.required])],
      ramos: [Menssage.empty, Validators.compose([Validators.required])],
      contrato: [Menssage.empty, Validators.compose([Validators.required])],
      sumaLimite: [Menssage.empty, Validators.compose([Validators.required])],
      primas: [Menssage.empty, Validators.compose([Validators.required])],
      primascentes: [Menssage.empty, Validators.compose([Validators.required])],
      reas: [Menssage.empty, Validators.compose([Validators.required])],
      id: [Menssage.empty, Validators.compose([Validators.required])],
      idContrato: [Menssage.empty, Validators.compose([Validators.required])],
      idContratopk: [Menssage.empty, Validators.compose([Validators.required])],
      moneda: [Menssage.empty],
      descripcion: [Menssage.empty],
      inicio: [Menssage.empty],
      fin: [Menssage.empty],
      word: [Menssage.empty],
      idpoliza: [Menssage.empty],
    });
  }

  contratosfacultativos() {
    this.lisRequest = true;
    console.log(this.cuotaParteFormreasegurador.controls.idContrato.value);
    if (this.cuotaParteFormreasegurador.controls.idContrato.value) {
      const item = {
        word: this.cuotaParteFormreasegurador.controls.idContrato.value,
        type: 13,
      };
      console.log(item);
      this.alertService.loading()

      this.http.postFacultativosContratos(item).then(
        res => {
          this.contratofinal = res;
          console.log(this.contratofinal);
          this.alertService.messagefin();


        },
        err => {
          console.log(err);
          this.alertService.messagefin();
        }
      );
    }
  }
  aseguradorfinal() {
    this.lisRequest2 = true;
    console.log(this.cuotaParteForm.controls.asegurador.value);
    if (this.cuotaParteForm.controls.asegurador.value) {
      const item = {
        word: this.cuotaParteForm.controls.asegurador.value
      };
      console.log(item);
      this.alertService.loading()
      this.http.postFacultativoClient(item).then(
        res => {
          this.aseguradornit = res;
          console.log(this.aseguradornit);
          this.alertService.messagefin();
        },
        err => {
          console.log(err);
        }
      );
    }
  }
  consultar(item: any) {
    console.clear()
    this.alertService.loading()
    const data2 = {
      word: item.a
    }
    console.log('------------->  3');

    this.http.postFacultativoClient(data2).then(
      res => {
        console.log(data2)
        console.log('------------->  4', data2);

        console.log(res);
        if (res.length === 0) {
          this.statefinal = true;
          this.cuotaParteForm.controls.poliza.setValue(item.c);
          this.cuotaParteForm.controls.certificado.setValue(item.r);
          this.cuotaParteForm.controls.fechaemision.setValue(item.e);
          this.cuotaParteForm.controls.ciudad.setValue(item.s);
          this.cuotaParteForm.controls.asegurador.setValue(item.pc);
          this.cuotaParteForm.controls.nit.setValue(item.pn);
          this.idsegurador = item.pa;
          this.idpoliza = item.a;
          this.lisRequest3 = false;
          this.statefinal = true;
          this.polizacontrato = item;
          this.cuotaParteForm.enable();
          this.cuotaParteFormreasegurador.enable();
          this.fromajustes.enable();
          this.alertService.messagefin();
          this.loadramos();
          console.log('------------->  5',this.polizacontrato);

        } else {
          this.statefinal = false;
          this.lisRequest3 = false;
          this.alertService.messagefin();
          this.alertService.info('Hey', 'Esta poliza asignada');
          /* this.cuotaParteForm.disable();
          this.cuotaParteForm.controls.poliza.enable();
          this.cuotaParteFormreasegurador.disable();
          this.fromajustes.disable(); */
        }
      },
      err => {
        console.log(err);
        //this.alertService.messagefin();
      });
  }
  polizabuscar() {
    this.lisRequest3 = true;
    console.log(this.cuotaParteForm.controls.poliza.value);
    if (this.cuotaParteForm.controls.poliza.value) {
      const item = {
        word: this.cuotaParteForm.controls.poliza.value,
        date: 2019
      };
      console.log(item);
      this.alertService.loading()
      this.http.postBuscarAseguadora(item).then(
        res => {
          this.aseguradorpoliza = res;
          this.alertService.messagefin();

        },
        err => {
          console.log(err);
          this.alertService.messagefin();
        }
      );
    }
  }

  cargar(item) {
    this.cuotaParteFormreasegurador.controls.idContratopk.setValue(item.a);
    this.cuotaParteFormreasegurador.controls.idContrato.setValue(item.o);
    this.cuotaParteFormreasegurador.controls.descripcion.setValue(item.c);
    this.cuotaParteFormreasegurador.controls.inicio.setValue(item.r);
    this.cuotaParteFormreasegurador.controls.fin.setValue(item.e);
    if (item.s == 3) {
      this.cuotaParteFormreasegurador.controls.moneda.setValue('COP');
    } else if (item.s == 2) {
      this.cuotaParteFormreasegurador.controls.moneda.setValue('EUR');
    } else {
      this.cuotaParteFormreasegurador.controls.moneda.setValue('USD');
    }
    this.lisRequest = false;
    this.selectcontrato = item;
    this.http.getFacultativoContrato(item.pro_id).then(
      res => {
        this.listareasu = res;
        console.log(res);
        this.alertService.messagefin();

      },
      err => {
        console.log(err);
        this.alertService.messagefin();
      }
    );
  }
  cargarnit(item) {
    this.cuotaParteForm.controls.asegurador.setValue(item.a2);
    this.cuotaParteForm.controls.nit.setValue(item.r2);
    this.idsegurador = item.a;
    this.lisRequest2 = false;

  }
  cargarpoliza(item) {
    this.alertService.loading();
    this.consultar(item);
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
    if (form === 'cuotaParteFormreasegurador') {

      let value = this.cuotaParteFormreasegurador.controls[key].value;
      if (value.split('.').length > 2) {
        value = this.desimal(this.cuotaParteFormreasegurador.controls[key].value);
      }
      const val = this.desimal(value);
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
      } else if (key === 'codigoedit') {
        const val = this.fromajustes.controls[key].value;
        this.fromajustes.controls.ramosedit.setValue(val);
      } else if (key === 'ramosedit') {
        const val = this.fromajustes.controls[key].value;
        this.fromajustes.controls.codigoedit.setValue(val);
      } else {
        const val = this.cuotaParteFormreasegurador.controls[key].value;
        this.cuotaParteFormreasegurador.controls.ramos.setValue(val);
      }
    }
  }
  desimal(key: any) {
    return key.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }
  // tslint:disable-next-line:one-line
  verificar() {
    sessionStorage.clear();
    this.cuotaParteForm.reset();
    // tslint:disable-next-line:prefer-const
    let res = 'Contrato creado exitosamente';
    this.alertService.success('Ok', res);
    this.router.navigate(['admin/contratos']);
    // tslint:disable-next-line:one-line
  }
  enviardatosfinal() {

  }
  create() {
    if (this.cuotaParteForm.controls.poliza.value === undefined || this.cuotaParteForm.controls.poliza.value === '') {
      this.alertService.info('Hey', 'Campo del número de poliza es obligatorio');
    }
    // tslint:disable-next-line:one-line
    else if (this.cuotaParteForm.controls.certificado.value === undefined || this.cuotaParteForm.controls.certificado.value === '') {
      this.alertService.info('Hey', 'Campo certificado es obligatorio');
    }
    // tslint:disable-next-line:one-line
    else if (this.cuotaParteForm.controls.fechaemision.value === undefined || this.cuotaParteForm.controls.fechaemision.value === '') {
      this.alertService.info('Hey', 'Campo fecha es obligatorio');
    }
    // tslint:disable-next-line:one-line
    else if (this.cuotaParteForm.controls.ciudad.value === undefined || this.cuotaParteForm.controls.ciudad.value === '') {
      this.alertService.info('Hey', 'Campo ciudad es obligatorio');
    }
    // tslint:disable-next-line:one-line
    else if (this.cuotaParteForm.controls.asegurador.value === undefined || this.cuotaParteForm.controls.asegurador.value === '') {
      this.alertService.info('Hey', 'Campo Asegurador  es obligatorio');
    }
    // tslint:disable-next-line:one-line
    else if (this.cuotaParteForm.controls.poliza.value !== '') {
      // sessionStorage.setItem('formCuotaP', JSON.stringify(form));
      const data = {
        poliza: this.cuotaParteForm.controls.poliza.value,
        certificado: this.cuotaParteForm.controls.certificado.value,
        fechaemision: this.cuotaParteForm.controls.fechaemision.value,
        ciudad: this.cuotaParteForm.controls.ciudad.value,
        idsegurador: this.idsegurador,
        idusers: this.user.authUser.id,
      };
      console.log(data);
      this.http.postFacultativosAseguradoras(data).then(
        res => {
          localStorage.setItem('idcontrato', JSON.stringify(res));
          this.polizacontrato = res;
          console.log('res', this.polizacontrato);
          this.statefinal = true;
          //this.selectpoliza = JSON.parse(localStorage.getItem('idcontrato'));;
          console.log(res);

        },
        err => {
          console.log(err);
        });
    }


  }
  createnomina() {
    if (this.cuotaParteFormreasegurador.controls.codigo.value === undefined || this.cuotaParteFormreasegurador.controls.codigo.value === '') {
      this.alertService.info('Hey', 'Campo del codigo es obligatorio');
    }
    // tslint:disable-next-line:one-line
    else if (this.cuotaParteFormreasegurador.controls.ramos.value === undefined || this.cuotaParteFormreasegurador.controls.ramos.value === '') {
      this.alertService.info('Hey', 'Campo ramos es obligatorio');
    }
    // tslint:disable-next-line:one-line
    else if (this.cuotaParteFormreasegurador.controls.sumaLimite.value === undefined || this.cuotaParteFormreasegurador.controls.sumaLimite.value === '') {
      this.alertService.info('Hey', 'Campo suma limite es obligatorio');
    }
    // tslint:disable-next-line:one-line
    else if (this.cuotaParteFormreasegurador.controls.primas.value === undefined || this.cuotaParteFormreasegurador.controls.primas.value === '') {
      this.alertService.info('Hey', 'Campo total primas es obligatorio');
    }
    else if (this.cuotaParteFormreasegurador.controls.codigo.value !== '') {
      // sessionStorage.setItem('formCuotaP', JSON.stringify(form));
      const data = {
        codigo: this.cuotaParteFormreasegurador.controls.codigo.value,
        ramos: this.cuotaParteFormreasegurador.controls.ramos.value,
        sumaLimite: this._pct.removerDesimal(this.cuotaParteFormreasegurador.controls.sumaLimite.value),
        primas: this._pct.removerDesimal(this.cuotaParteFormreasegurador.controls.primas.value),
        primascedentes: this._pct.removerDesimal(this.cuotaParteFormreasegurador.controls.primascentes.value),
        idpoliza: this.polizacontrato.a,
        idusers: this.user.authUser.id,
      };
      console.log(data);
      this.alertService.loading();
      this.http.postFacultativoRamo(data).then(
        res => {
          this.statefinal = true;
          localStorage.setItem('idramos', JSON.stringify(res));
          this.polizaramos = JSON.parse(localStorage.getItem('idramos'));
          console.log(this.polizacontrato.a);
          this.cuotaParteFormreasegurador.reset();
          this.idpoliza = this.polizacontrato.a;
          this.loadramos()
        },
        err => {
          console.log(err);
        });
    }
  }
  loadramos() {
    console.log(this.aseguradorpoliza);
    if (this.aseguradorpoliza) {
      const data = {
        id: this.idpoliza
      }
      console.log(data);
      this.http.postFacultaRamosEdit(data).then(
        res => {
          this.alertService.messagefin();
          this.listareasu2 = res;
          console.log(res);

        }
      );
    }
  }
  procesar() {
    console.log('---------- 7', this.polizacontrato);
    
    //console.log(data);
    this.alertService.loading();
    if (this.polizacontrato.length === 0) {
      this.alertService.info('Hey', 'Campo del codigo es obligatorio');
    }
    // tslint:disable-next-line:one-line
    else if (this.selectcontrato.length === 0) {
      this.alertService.info('Hey', 'Campo ramos es obligatorio');
    }
    // tslint:disable-next-line:one-line
    else if (this.listareasu2.length === 0) {
      this.alertService.info('Hey', 'Campo suma limite es obligatorio');
    }
    // tslint:disable-next-line:one-line
    else if (this.listareasu.length !== 0 || this.listareasu2.length !== 0) {
      const data1 = {
        word: this.idpoliza,
        date: 2019 //preuba
      }
      this.http.postFacultativoGasto(data1).then(
        res => {
          console.log('----------> 2',);

          this.validar = res;
          console.log(res);
          this.alertService.messagefin();
          if (this.validar.length != 0) {
            this.listareasu = [];
            this.listareasu2 = [];
            this.cuotaParteForm.reset();
            this.alertService.error('Ups', 'Esta poliza ya fue asignada');
          } else {
            const data = {
              poliza: this.polizacontrato,
              contrato: this.selectcontrato,
              ramopoliza: this.listareasu2,
              ramocontratos: this.listareasu,
              idsegurador: this.idsegurador,
            }
            console.log('----------> 1', data)
            this.http.postFaculProce(data).then(
              res => {
                localStorage.setItem('preoceso', JSON.stringify(res));
                this.proceso = JSON.parse(localStorage.getItem('preoceso'));
                const data2 = {
                  word: this.polizacontrato.a
                }
                this.http.postFacultativoGasto(data2).then(
                  res => {
                    this.listasegurado = res;
                    console.log(res);
                    //this.alertService.messagefin();
                  },
                  err => {
                    console.log(err);
                    //this.alertService.messagefin();
                  });

                console.log(res);
                this.alertService.messagefin();
                this.alertService.info('Hey', 'Esta poliza asignada');
              },
              err => {
                console.log(err);
                this.alertService.messagefin();
              });
          }
        },
        err => {
          console.log(err);
          this.alertService.messagefin();
        });

    } else {
      this.alertService.messagefin();
    }



  }
  guardarpoliza() {
    console.log(this.listasegurado)
    if (this.listasegurado == undefined) {
      this.alertService.messageInfo('Hey', 'vas a salir sin agregar tu poliza a un contrato');
      this.cuotaParteForm.reset();
      this.cuotaParteFormreasegurador.reset();
      this.fromajustes.reset();
      this.listasegurado = [];
      this.listareasu2 = [];
      sessionStorage.clear();
    } else {
      this.alertService.success('Ok', 'Tu poliza fue asignada con exito');
      sessionStorage.clear();
      this.cuotaParteForm.reset();
      this.cuotaParteFormreasegurador.reset();
      this.fromajustes.reset();
      this.listasegurado = [];
      this.listareasu2 = [];
      this.listasegurado3 = [];
      this.contratofinal = [];
      this.listareasu = [];
      this.router.navigate(['admin/contratos/ajuste/list-primas']);
    }
  }
  procesarnomina(id: string) {
    this.alertService.loading(); ('Por favor esperes');
    const data = {
      poliza: this.polizacontrato,
      contrato: this.selectcontrato,
      idramos: id
    }
    console.log(data)
    this.http.postFacultaProcesoNomina(data).then(
      res => {
        console.log(res)
        sessionStorage.setItem('preocesodos', JSON.stringify(res));
        this.procesodos = JSON.parse(sessionStorage.getItem('preocesodos'));
        const data2 = {
          word: this.polizacontrato.a
        }
        this.http.postAseguradoraNomina(data2).then(
          res => {
            this.listasegurado = res;
            console.log(res);
            //this.alertService.messagefin();
          },
          err => {
            console.log(err);
            //this.alertService.messagefin();
          });

        console.log(res);
        this.alertService.messagefin();
        this.alertService.info('Hey', 'Esta poliza asignada');
      },
      err => {
        console.log(err);
        this.alertService.messagefin();
      });
  }
  procesarnominas(id: any) {
    this.alertService.loading(); ('Por favor esperes');
    const data6 = {
      word: parseInt(id.a)
    }
    console.log(id)
    this.http.postAseguradoraNomina(data6).then(
      res => {
        this.listasegurado3 = res;
        console.log(res);
        if (this.listasegurado3.length == 0) {
          const data3 = {
            poliza: this.polizacontrato,
            contrato: this.selectcontrato,
            ramopoliza: this.listareasu2,
            ramocontratos: this.listareasu,
            idramos: id
          }
          console.log(data3);
          this.http.postFacultaProcesoNomina(data3).then(
            res => {
              this.listasegurado2 = res[0];
              console.log(res);
              const data5 = {
                word: parseInt(id.a)
              }
              console.log(data5)
              this.http.postAseguradoraNomina(data5).then(
                res => {
                  this.listasegurado3 = res;
                  console.log(res);
                },
                err => {
                  console.log(err);
                  //this.alertService.messagefin();
                });
              this.alertService.messagefin();
              this.alertService.info('Hey', 'Esta poliza asignada');
            },
            err => {
              console.log(err);
              //this.alertService.messagefin();
            });
        } else {
          this.alertService.messagefin();
          this.alertService.info('Hey', 'Esta nomina ya fue asignada');
        }

      },
      err => {
        console.log(err);
        //this.alertService.messagefin();
      });
  }

  editarramos(res: any) {
    this.final = res;
    this.valor = 1;
    console.log(this.final);
    this.fromajustes.controls.codigoedit.setValue(res.re);
    this.fromajustes.controls.ramosedit.setValue(res.re);
    this.fromajustes.controls.sumaLimiteedit.setValue(this.desimal(this.cortarDesimales(res.e)));
    this.fromajustes.controls.primasedit.setValue(this.desimal(this.cortarDesimales(res.s)));
    this.fromajustes.controls.primascentesedit.setValue(this.desimal(this.cortarDesimales(res.a2)));

  }
  eliminarramos(res: any) {
    console.log(res);
    const data = {
      idusers: this.user.authUser.id,
    };
    this.alertService.loading();
    this.http.putFacul(res, data)
      .then(
        res => {
          this.loadramos()
          this.alertService.success('Ok', "Ramo Eliminado correctamente");
        },
        err => {
          console.log(err);
        }
      )
  }
  guardareditarramos(item: any) {
    this.alertService.loading();
    if (this.fromajustes.controls.codigoedit.value === undefined || this.fromajustes.controls.codigoedit.value === '') {
      this.alertService.info('Hey', 'Campo del codigo es obligatorio');
    }
    // tslint:disable-next-line:one-line
    else if (this.fromajustes.controls.ramosedit.value === undefined || this.fromajustes.controls.ramosedit.value === '') {
      this.alertService.info('Hey', 'Campo ramos es obligatorio');
    }
    // tslint:disable-next-line:one-line
    else if (this.fromajustes.controls.sumaLimiteedit.value === undefined || this.fromajustes.controls.sumaLimiteedit.value === '') {
      this.alertService.info('Hey', 'Campo suma limite es obligatorio');
    }
    // tslint:disable-next-line:one-line
    else if (this.fromajustes.controls.primasedit.value === undefined || this.fromajustes.controls.primasedit.value === '') {
      this.alertService.info('Hey', 'Campo total primas es obligatorio');
    }
    else if (this.fromajustes.controls.codigoedit.value !== '') {
      // sessionStorage.setItem('formCuotaP', JSON.stringify(form));
      const data = {
        codigo: parseInt(item.r),
        ramos: this.fromajustes.controls.ramosedit.value,
        sumaLimite: this._pct.removerDesimal(this.fromajustes.controls.sumaLimiteedit.value),
        primas: this._pct.removerDesimal(this.fromajustes.controls.primasedit.value),
        primascedentes: this._pct.removerDesimal(this.fromajustes.controls.primascentesedit.value),
        idpoliza: item.a,
        idusers: this.user.authUser.id,
      };
      console.log(data);
      this.alertService.loading();
      this.http.putFaculUpdate(item.a, data).then(
        res => {
          this.loadramos()
        },
        err => {
          console.log(err);
        });
    }

  }
  verdetalle(item: any) {
    this.finaldetalle = item;
    this.valor1 = 1;
  }
  nuevoContrato() {
    this.cuotaParteForm.reset();
    this.cuotaParteFormreasegurador.reset();
    this.fromajustes.reset();
    this.listasegurado = [];
    this.listareasu2 = [];
    this.listasegurado3 = [];
    this.contratofinal = [];
    this.listareasu = [];
  }
  cerrar() {
    this.cuotaParteForm.reset();
    this.cuotaParteFormreasegurador.reset();
    this.fromajustes.reset();
    this.listasegurado = [];
    this.listareasu2 = [];
    this.listasegurado3 = [];
    this.contratofinal = [];
    this.listareasu = [];
    this.router.navigate(['admin/contratos/ajuste/list-primas']);
  }
  idReasegurador(id: number) {
    if (this.reasegurador != undefined) {
      if (id > 0 && id != null) {
        for (let i = 0; i <= this.reasegurador.length; i++) {
          const e = this.reasegurador[i];
          if (id == e.a) {
            return e.e
          }
        }
      }
    }
  }
}
