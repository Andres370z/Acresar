import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Menssage } from 'src/app/models/router';
import { AlertService } from 'src/app/service/alert.service';
import { AuthService } from 'src/app/service/auth.service';
import { ExcelService } from 'src/app/service/excel.service';
import { LocalstoreService } from 'src/app/service/localstore.service';

@Component({
  selector: 'app-contracs',
  templateUrl: './contracs.component.html',
  styleUrls: ['./contracs.component.css']
})
export class ContracsComponent implements OnInit {
  displayedColumns: string[] = ['contrato', 'FechaInicio', 'FechaFin', 'TipoAsociacion', 'Ramo', 'Accion'];
  data: any[] = [];
  public dataSource: MatTableDataSource<any>
  @ViewChild(MatPaginator) paginator: MatPaginator;


  calendarfi: JQuery;
  calendarff: JQuery;
  modulo: string = 'Asociación de Contratos';
  forms = {idContrato: ''}
  formularioTwo: FormGroup;
  ramos: any;
  tiposAsoc: any;
  dataReq: any;
  lisRequest = false;
  showList = false;
  showAssoc = false;
  detail: any;
  selectedDetailItems = [];
  rl = 'asociaciondecontratos';
  list: any;
  listAsociacion = new Array();
  checkList = [];
  rta: boolean = false;
  constructor(
    private authService: AuthService,
    private router: Router,
    public _http: AuthService,
    public alertService: AlertService,
    private localService: LocalstoreService,
    private excel: ExcelService
  ) { }

  ngOnInit(): void {
    localStorage.removeItem('editAdministra');
    sessionStorage.removeItem('editAdministra');
    this.getDta()

    this._http.getQuery('ramos').then(
      res => {
        this.ramos = res;
      }
    );

    this._http.getQuery('asociaciondecontratos/tipos').then(
      res => {
        this.tiposAsoc = res;
      }
    );

    this.createForm();

  }
  getDta() {
    this.authService.getAsociacionList().then(res => {
      console.log('esta es tu respuesta de los contratos', res);
      this.data = res;
      this.dataSource = new MatTableDataSource(res)
      this.dataSource.paginator = this.paginator;
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  navigate(item: any) {
    this.router.navigate([item])
  }

  createForm() {
    this.formularioTwo = new FormGroup({
      tipoContrato: new FormControl('', Validators.required),
      // idContrato: new FormControl('', Validators.required),
      idContratopk: new FormControl('', Validators.required),
      descripcion: new FormControl('', Validators.required),
      fInicio: new FormControl('', Validators.required),
      fFin: new FormControl('', Validators.required),
      ramo: new FormControl('', Validators.required),
      tipoAsociacion: new FormControl('', Validators.required)
    });
  }

  buscarId(obj: any, id: number, key: string, value: string) {
    let res;
    for (let i = 0; i < obj.length; i++) {
      const element = obj[i];
      if (parseInt(element[key]) == id) {
        res = element[value]
      }
    }
    return res;
  }

  agregar() {

    const ramo = this.buscarId(this.ramos, this.formularioTwo.controls.ramo.value, 'a', 'a2');
    const tipoAs = this.buscarId(this.tiposAsoc, this.formularioTwo.controls.tipoAsociacion.value, 'a', 'c');

    let data = this.formularioTwo.value;
    data.ramoN = ramo;
    data.tipoAs = tipoAs;
    data['detalle'] = this.checkList;

    this.listAsociacion.push(data);
    this.formularioTwo.reset();
    this.checkList = [];
    this.showAssoc = false;

  }

  detalle(item: any) {
    if (item != undefined) {
      if (this.checkList.indexOf(item.name) == -1) {
        this.checkList.push(item.id);
      } else {
        const id = this.checkList.indexOf(item.name);
        this.checkList.splice(id, 1);
      }
    }
  }

  guardar() {
    let dataJson = []
    if (this.listAsociacion.length > 0) {
      const form = this.formularioTwo.value;
      form['detalle'] = this.checkList;
      dataJson = this.listAsociacion;
      dataJson.push(form);
      this.checkList = [];
    } else {
      dataJson = this.formularioTwo.value;
      dataJson["detalle"] = this.checkList;
      this.checkList = [];
    }

    this._http.postQuery(dataJson, this.rl).then(
      item => {
        this.alertService.success('Ok', item.item.mensaje);
        this.ngOnInit();
      },
      error => console.log(<any>error)
    );
  }

  cargar(item: any) {
    console.log('Datos cargados en el formularioTwo:', item);

    if (item) {
        this.formularioTwo.controls.idContratopk.setValue(item.a || '');
        // this.formularioTwo.controls.idContrato.setValue(item.o || '');
        this.forms.idContrato = item.o
        this.formularioTwo.controls.descripcion.setValue(item.c || '');
        this.formularioTwo.controls.fInicio.setValue(item.r || '');
        this.formularioTwo.controls.fFin.setValue(item.e || '');
        this.formularioTwo.controls.tipoContrato.setValue(item.cat || '');
    }

    this.lisRequest = false;
  }

  consultar() {
    this.lisRequest = true;
    if (this.formularioTwo.controls.idContrato.value) {
      const item = { word: this.formularioTwo.controls.idContrato.value };

      this._http.postQuery(item, 'contratos/search')
        .then(
          res => {
            this.dataReq = res; 
          }
        );
    }
  }

  ShowAssoc() {
    this.showAssoc = false;
    this.showAssoc = this.formularioTwo.controls.ramo.value != '' ? true : false;
  }

  getDetail() {
    if (this.formularioTwo.controls.tipoAsociacion.value != 0) {
      const item = { ramo: this.formularioTwo.controls.ramo.value, tipo: this.formularioTwo.controls.tipoAsociacion.value };
      this._http.postQuery(item, 'asociaciondecontratos/detail').then(
        res => {
          this.showList = true;
          this.detail = res;
        }
      );

    } else {
      this.showList = false;
      this.selectedDetailItems = [];
      this.detail = {};
    }
  }

  // edit(item: any) {
  //   // campo a2 tipo de contratos
  //   // facultativo = 10
  //   // cuotaparte = 3
  //   sessionStorage.setItem('cp', JSON.stringify(item));
  //   console.log(item);
  //   if (item.a2 == 3) {
  //     this.router.navigate(['/admin/contratos/automaticos/proporcionales/cuota-aparte-edit']);
  //   }
  //   if (item.a2 == 10) {
  //     this.router.navigate(['/admin/contratos/automaticos/proporcionales/facob/edit']);
  //   }
  // }

  delete(id: any) {

    this._http.delete('contratos/automaticos/proporcionales/cuotaparte/' + id)
      .then(
        res => {
          this._http.getQuery('rsltncntrts').then(
            res => {
              this.list = res;
            });
        },
        error => { }
      );
  }

  // editar

  consultarContrato(items: any) {
    this.alertService.loading()
    if (items) {
      let datas = this.extraer(items.con)
      const item = { word: datas};

      this._http.postQuery(item, 'contratos/search')
        .then(
          res => {
            this.dataReq = res;
            this.localService.setItem(this.dataReq, 'editAdministra', )
            this.alertService.messagefin()
            this.router.navigate(['home/asociacion/contratos/edit'])
          }
        );
    }
  }
  formLoad(data: any) {
    console.log('edit ', data);
    // this.consultarContrato()
  }

  extraer(pabra: string) {
    // Expresión regular para capturar el patrón deseado
    let resultado = pabra.match(/^([A-Z]+-[A-Z]+-\d+ - \d{4})/);

    // Verificamos que el resultado no sea nulo y obtenemos el primer grupo capturado
    let textoExtraido = resultado ? resultado[1] : "";

    return textoExtraido  // Salida: "ATL-AUT-000001 - 2021"
  }
  download(){
      if (this.data.length != 0) {
            this.excel.exportAsExcelFile(this.data, Menssage.nameEvents);
          }else{
            this.alertService.error(Menssage.error, Menssage.nameEventsNull);
      }
  }
}
