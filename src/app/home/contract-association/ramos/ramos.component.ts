import { Component, ElementRef, OnInit, Renderer2, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Route, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Menssage } from 'src/app/models/router';
import { AlertService } from 'src/app/service/alert.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-ramos',
  templateUrl: './ramos.component.html',
  styleUrls: ['./ramos.component.css']
})
export class RamosComponent implements OnInit {
  displayedColumns: string[] = ['codigo', 'abreviatura', 'ramoTecnico', 'ramoSuperintendencia', 'entidad', 'Accion'];
  data: any[] = [];
  public dataSource: MatTableDataSource<any>
  @ViewChild(MatPaginator) paginator: MatPaginator;


  calendar: JQuery;
  ls: Observable<any>;
  codSuper: Observable<any>;
  namSuper: Observable<any>;
  modulo: string = "Listado de Ramos";
  Rsltnntdds: Observable<any>;
  ready: boolean = false;
  subRamo = [];
  cobertura = [];
  producto = [];
  abreviatura = [];
  codProducto = [];
  it: JQuery;
  myForm: FormGroup;
  list: any;
  rt = '/ramos';
  datatableshow = true;
  listRamosNew = [];

  litCodSub: any = [];
  codActive: Number = 0;
  codigos: Object = {
    ramos: '01',
    cobertura: '03',
    producto: '02',
    poliza: '04'
  };


  @ViewChild('producto') ViewProduct: ElementRef;
  @ViewChild('cobertura') ViewCovertura: ElementRef;
  @ViewChild('poliza') ViewPoliza: ElementRef;
  @ViewChild('subRamo') viewSubRamo: ElementRef;


  calendarfi: JQuery;
  calendarff: JQuery;
  formulario: FormGroup;
  ramos: any;
  tiposAsoc: any;
  dataReq: any;
  lisRequest = false;
  showList = false;
  showAssoc = false;
  detail: any;
  selectedDetailItems = [];
  rl = '/asociaciondecontratos';
  listAsociacion = new Array();
  checkList = [];
  constructor(
    private authService: AuthService,
    private _http: AuthService,
    private _ls: AuthService,
    private router: Router,
    private myFormBuilder: FormBuilder,
    private alert: AlertService,
    private _rd: Renderer2
    
  ) { }

  ngOnInit(): void {
    this.getDta(); 
    this.loadDataTable();
    this.createForms()
    this.createForm();
    this._http.getRamos().then(
      res => {
        this.ramos = res;
      }
    );
    this._ls.getSuper().then((res: any) => {
      this.codSuper = res
    });
    this._ls.getSuperCodigos().then((res: any) => {
      this.namSuper = res
    });

    this._http.getAsoTipos().then(
      res => {
        this.tiposAsoc = res;
      }
    );
  }
  
  loadDataTable() {
    this._ls.getRamos().then(
      res => {
        this.list = res;
      }
    );
  }
  reloadTable() {
    this._ls.getRamos().then(
      res => {
        this.list = res;
        console.log(this.list);
      }
    );
  }
  getDta() {
    this.authService.getRamos().then(res => {
      console.log('esta es tu respuesta de ramos', res);
      this.data = res;
      this.dataSource = new MatTableDataSource(res)
      this.dataSource.paginator = this.paginator;
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  navigate(item: string) {
    this.router.navigate([item])
  }

  createForm() {
    this.myForm = this.myFormBuilder.group({
      entidad: [Menssage.empty, Validators.compose([Validators.required])],
      ramoSuper: [Menssage.empty, Validators.compose([Validators.required])],
      codigoSuper: [Menssage.empty, Validators.compose([Validators.required])],
      codigoRamoTecnico: [Menssage.empty, Validators.compose([Validators.required])],
      abreviatura: [Menssage.empty, Validators.compose([Validators.required])],
      ramoTecnico: [Menssage.empty, Validators.compose([Validators.required])],
    });
  }


  sinconiza(i: string) {
    const form = this.myForm.value;
    console.log(form);
    if (i == 'codigo') {
      this.codSuper.subscribe(
        res => {
          for (let i in res) {
            const a = res[i];
            if (a['a'] == form['codigoSuper']) {
              const e = Number(a['c']) < 10 ? `0${a['c']}` : a['c'];
              this.myForm.controls.codigoRamoTecnico.setValue(e);
              this.myForm.controls.ramoTecnico.setValue(a['r'])
            }
          }
        }
      );
      this.myForm.controls.ramoSuper.setValue(form['codigoSuper']);

    }
    if (i == 'ramo') {
      this.codSuper.subscribe(
        res => {
          for (let i in res) {
            const a = res[i];

            if (a['a'] == form['ramoSuper']) {

              const e = Number(a['c']) < 10 ? `0${a['c']}` : a['c'];
              this.myForm.controls.codigoRamoTecnico.setValue(e);
              this.myForm.controls.ramoTecnico.setValue(a['r'])
            }
          }
        }
      );
      this.myForm.controls.codigoSuper.setValue(form['ramoSuper']);
    }

  }

  editar(id: any) {
    console.log(id);
    if (id > 0) {
      sessionStorage.setItem('rm', id);
      this.router.navigate(['home/asociacion/ramos/edit'])
    }
  }

  guardar() {
    let data = this.myForm.value;
    data.detalleRamo = this.pakageActive();

    console.log(data);
    this._ls.postRamo(data).then(
      res => {

        this.removeRows();
        this.listRamosNew = [];
        this.myForm.reset();

        this.alert.success('Ramo', 'Ramo creado con exito');
        this.reloadTable();
        this.datatableshow = !this.datatableshow;

      },
      err => {
        this.alert.error('Error', 'por favor intente de nuevo');
      }
    );
  }

  view(): void {
    if (this.datatableshow) {
      this.datatableshow = !this.datatableshow;
    }
  }

  removeRows(): any {
    const subRamo = this.viewSubRamo.nativeElement.childrenNode;
    const producto = this.ViewCovertura.nativeElement.childrenNode;
    const cobertura = this.ViewProduct.nativeElement.childrenNode;

    // tslint:disable-next-line: forin
    for (let e in subRamo) {
      console.log(e);
      this._rd.removeChild(this.viewSubRamo.nativeElement, e);
    }

    // tslint:disable-next-line: forin
    for (let e in producto) {
      this._rd.removeChild(this.ViewProduct.nativeElement, e);
    }

    // tslint:disable-next-line: forin
    for (let e in cobertura) {
      this._rd.removeChild(this.ViewCovertura.nativeElement, e);
    }
  }


  createRowCells(view: TemplateRef<any>, key: string) {
    const tr = this._rd.createElement('tr');
    const td1 = this._rd.createElement('td');
    const td2 = this._rd.createElement('td');
    const td3 = this._rd.createElement('td');
    const td4 = this._rd.createElement('td');

    const input1 = this._rd.createElement('input');
    const input2 = this._rd.createElement('input');
    const input3 = this._rd.createElement('input');
    const btn = this._rd.createElement('button');
    //addicionar clase
    this._rd.addClass(input1, 'form-control');
    this._rd.addClass(input2, 'form-control');
    this._rd.addClass(input3, 'form-control');
    this._rd.addClass(btn, 'btn');
    this._rd.addClass(btn, 'btn-primary');

    //adicionar atributos
    this._rd.setAttribute(input1, 'type', 'text');
    this._rd.setAttribute(input2, 'type', 'text');
    this._rd.setAttribute(input3, 'type', 'text');

    this._rd.setAttribute(input1, 'name', 'cod');
    this._rd.setAttribute(input2, 'name', 'abre');
    this._rd.setAttribute(input3, 'name', 'nombre');

    //faicon
    const i = this._rd.createElement('i');
    this._rd.addClass(i, 'fas');
    this._rd.addClass(i, 'fa-trash-alt');

    this._rd.appendChild(btn, i);
    this._rd.listen(btn, 'click', (e) => {
      this.removeRow(e.target);
    });

    this._rd.listen(input1, 'change', (e) => {
      const value = e.target.value.split(' ').length > 1 ? e.target.value.split(' ')[1] : e.target.value;
      e.target.value = `${this.codigos[key]} ${value}`;
    });

    this._rd.listen(input1, 'change', (e) => {
      const value = e.target.value;
      const valN = Number(value) < 10 ? `0${value}` : value;
      e.target.value = valN;
    });

    //adicionar elementos
    this._rd.appendChild(td1, input1);
    this._rd.appendChild(td2, input2);
    this._rd.appendChild(td3, input3);
    this._rd.appendChild(td4, btn);
    this._rd.appendChild(tr, td1);
    this._rd.appendChild(tr, td2);
    this._rd.appendChild(tr, td3);
    this._rd.appendChild(tr, td4);

    this._rd.appendChild(view, tr);
  }


  removeRow(e: any) {
    const parent = e.parentNode.parentNode.parentNode;
    parent.remove();
  }

  pakageActive(): Object {
    const json = {
      coberturas: [],
      productos: [],
      subRamos: [],
    };
    const productos = this.ViewProduct.nativeElement.rows;
    const coberturas = this.ViewCovertura.nativeElement.rows;
    const subRamos = this.viewSubRamo.nativeElement.rows;

    for (let row of productos) {
      const cells = row.cells;
      const productoList = {
        cod: cells[0].firstChild.value,
        abreviatura: cells[1].firstChild.value,
        nombre: cells[2].firstChild.value,
      };
      if (productoList.cod !== undefined && productoList.abreviatura !== undefined && productoList.nombre !== undefined) {
        json.productos.push(productoList);
      }
    }


    for (let row of coberturas) {
      const cells = row.cells;
      const coberturaList = {
        cod: cells[0].firstChild.value,
        abreviatura: cells[1].firstChild.value,
        nombre: cells[2].firstChild.value,
      };

      if (coberturaList.cod !== undefined && coberturaList.abreviatura !== undefined && coberturaList.nombre !== undefined) {
        json.coberturas.push(coberturaList);
      }
    }

    for (let row of subRamos) {
      const cells = row.cells;
      const subRamosList = {
        cod: cells[0].firstChild.value,
        abreviatura: cells[1].firstChild.value,
        nombre: cells[2].firstChild.value,
      };

      if (subRamosList.cod !== undefined && subRamosList.abreviatura !== undefined && subRamosList.nombre !== undefined) {
        json.subRamos.push(subRamosList);
      }
    }


    return json;
  }




  createForms() {
    this.formulario = new FormGroup({
      tipoContrato: new FormControl('', Validators.required),
      idContrato: new FormControl('', Validators.required),
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

    const ramo = this.buscarId(this.ramos, this.formulario.controls.ramo.value, 'a', 'a2');
    const tipoAs = this.buscarId(this.tiposAsoc, this.formulario.controls.tipoAsociacion.value, 'a', 'c');

    let data = this.formulario.value;
    data.ramoN = ramo;
    data.tipoAs = tipoAs;
    data['detalle'] = this.checkList;

    this.listAsociacion.push(data);
    this.formulario.reset();
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

  guardaras() {
    let dataJson = []
    if (this.listAsociacion.length > 0) {
      const form = this.formulario.value;
      form['detalle'] = this.checkList;
      dataJson = this.listAsociacion;
      dataJson.push(form);
      this.checkList = [];
    } else {
      dataJson = this.formulario.value;
      dataJson["detalle"] = this.checkList;
      this.checkList = [];
    }

    this._http.postAsocia(dataJson).then(
      item => {
        this.alert.success('Ok',item.item.mensaje);
        $("#cancelar").click();
        this.reloadTable();
      },
      error => console.log(<any>error)
    );
  }

  cargar(item) {
    this.formulario.controls.idContratopk.setValue(item.a);
    this.formulario.controls.idContrato.setValue(item.o);
    this.formulario.controls.descripcion.setValue(item.c);
    this.formulario.controls.fInicio.setValue(item.r);
    this.formulario.controls.fFin.setValue(item.e);
    this.formulario.controls.tipoContrato.setValue(item.cat);
    this.lisRequest = false;
  }

  consultar() {
    this.lisRequest = true;
    if (this.formulario.controls.idContrato.value) {
      const item = { word: this.formulario.controls.idContrato.value };

      this._http.postSearchIdcontracs(item)
        .then(
          res => {
            this.dataReq = res;
          }
        );
    }
  }

  ShowAssoc() {
    this.showAssoc = false;
    this.showAssoc = this.formulario.controls.ramo.value != '' ? true : false;
  }

  getDetail() {
    if (this.formulario.controls.tipoAsociacion.value != 0) {
      const item = { ramo: this.formulario.controls.ramo.value, tipo: this.formulario.controls.tipoAsociacion.value };
      this._http.postContratosDetail(item).then(
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

  edit(item: any) {
    // campo a2 tipo de contratos
    // facultativo = 10
    // cuotaparte = 3
    sessionStorage.setItem('cp', JSON.stringify(item));
    console.log(item);
    if (item.a2 == 3) {
      this.router.navigate(['home/contracts/Automaticos/proporcionales/cuota-parte']);
    }
    if (item.a2 == 10) {
      this.router.navigate(['home/contracts']);
    }
  }

  delete(id: any) {

    this._http.delete(id)
      .then(
        res => {
          this._http.gersltncntrtst().then(
            res => {
              this.list = res;
            });
        },
        error => {}
      );
  }
}
