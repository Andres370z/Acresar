import { style } from '@angular/animations';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, Renderer2, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { Menssage } from 'src/app/models/router';
import { AlertService } from 'src/app/service/alert.service';
import { AuthService } from 'src/app/service/auth.service';
import { FileUploadService } from 'src/app/service/file-upload.service';


@Component({
  selector: 'app-ramos-edit',
  templateUrl: './ramos-edit.component.html',
  styleUrls: ['./ramos-edit.component.css']
})

export class RamosEditComponent implements OnInit {


  idEdit: any;
  ramos: any;
  modulo = "Ramos edit"
  subRamos: any;
  productos: any;
  coberturaData: any;
  myForm: FormGroup;
  Rsltnntdds: any;
  codSuper: any;
  namSuper: any;
  calendar: any;
  selectRamo: any;
  selectEntidad: any;
  dataRes: any;
  countProducto: number;
  countSubRamo: number;
  countCobertura: number;
  codActive: Number = 0;
  listRamosNew = [];
  codigos: Object = {
    ramos: '01',
    cobertura: '03',
    producto: '02',
    poliza: '04'
  };

  @ViewChild('producto') ViewProduct: ElementRef;
  @ViewChild('cobertura') ViewCovertura: ElementRef;
  @ViewChild('subRamo') viewSubRamo: ElementRef;
  constructor(
    private authService: AuthService,
    private alert: AlertService,
    private myFormBuilder: FormBuilder,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private _ls: AuthService,
    //private _Rsltnntdds: RsltnntddsService,
    private _router: Router,
    private _rd: Renderer2,
    private _Rsltnntdds: FileUploadService,
  ) { }

  ngOnInit(): void {
    console.clear();
    this.createForm()
    this._ls.getEntities().then((res: any) => {
      this.Rsltnntdds = res
    });
    this.idEdit = sessionStorage.getItem('rm');

    this._ls.getRamosEdit(this.idEdit)
      .then(
        res => {
          console.log('Entra 1');

          console.log(res);
          this.dataRes = res;
          this.ramos = res.rm;

          // tslint:disable-next-line: forin
          for (let i in res.cb) {
            const item = res.cb[i];
            const data = {
              cob: item['d'],
              abre: item['t'],
              nombre: item['r'],
              id: item['a']
            };

            this.createRowCellsInData(data, this.ViewCovertura.nativeElement);
          }

          // tslint:disable-next-line: forin
          for (let i in res.pr) {
            const item = res.pr[i];
            const data = {
              cob: item['r'],
              abre: item['e'],
              nombre: item['s'],
              id: item['a']
            };

            this.createRowCellsInData(data, this.ViewProduct.nativeElement);
          }

          // tslint:disable-next-line: forin
          for (let i in res.sr) {
            const item = res.sr[i];
            const data = {
              cob: item['d'],
              abre: item['t'],
              nombre: item['r'],
              id: item['a']
            };

            this.createRowCellsInData(data, this.viewSubRamo.nativeElement);
          }

          this.myForm.controls.abreviatura.setValue(this.ramos[0].s);
          this.myForm.controls.codigoRamoTecnico.setValue(this.ramos[0].e);
          this.myForm.controls.ramoTecnico.setValue(this.ramos[0].a2);
          this.myForm.controls.ramoSuper.setValue(this.ramos[0].c);
          this.myForm.controls.entidad.setValue(this.ramos[0].r);
          this.myForm.controls.codigoSuper.setValue(this.ramos[0].c);

          this.selectRamo = this.ramos[0].c;
          this.selectEntidad = this.ramos[0].r;


        },
        err => {
          console.log(err);
        }
      );

    this._ls.getSuper().then((res: any) => {
      this.codSuper = res
    });
    this._ls.getSuperCodigos().then((res: any) => {
      this.namSuper = res
    });




  }
  createForm() {
    this.myForm = new FormGroup({
      entidad: new FormControl("", Validators.required),
      ramoSuper: new FormControl("", Validators.required),
      codigoSuper: new FormControl("", Validators.required),
      codigoRamoTecnico: new FormControl("", Validators.required),
      abreviatura: new FormControl("", Validators.required),
      ramoTecnico: new FormControl("", Validators.required)
    });
  }

  update() {
    let data = this.myForm.value;
    data.detalleRamo = this.pakageActive();
    console.log(data);
    this._ls.putRam(this.idEdit, data).then(
      res => {
        this.alert.success('Ok', 'Ramo actualizado');
        this._router.navigate(['home/asociacion/ramos']);
      },
      err => {
        this.alert.error('Error', 'Por favor intente de nuevo');
      }
    );
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

  createRowCellsInData(data: any, view: any,) {
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
    this._rd.addClass(btn, 'btn-outline-danger',);

    //adicionar atributos
    this._rd.setAttribute(input1, 'type', 'text');
    this._rd.setAttribute(input2, 'type', 'text');
    this._rd.setAttribute(input3, 'type', 'text');

    this._rd.setAttribute(input1, 'name', 'cod');
    this._rd.setAttribute(input2, 'name', 'abre');
    this._rd.setAttribute(input3, 'name', 'nombre');
    this._rd.setProperty(btn, 'textContent', 'borrar');

    this._rd.setAttribute(input1, 'value', data.cob);
    this._rd.setAttribute(input2, 'value', data.abre);
    this._rd.setAttribute(input3, 'value', data.nombre);

    this._rd.setAttribute(input1, 'disabled', 'disabled');

    const inputid = this._rd.createElement('input');
    this._rd.setAttribute(inputid, 'value', data.id);
    this._rd.setAttribute(inputid, 'type', 'hidden');



    //faicon
    const i = this._rd.createElement('i');
    this._rd.addClass(i, 'bi');
    this._rd.addClass(i, 'bi-trash');

    this._rd.appendChild(btn, i);
    this._rd.listen(btn, 'click', (e) => {
      this.removeRow(e.target);
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
    this._rd.appendChild(td3, inputid);

    this._rd.appendChild(td4, btn);
    this._rd.appendChild(tr, td1);
    this._rd.appendChild(tr, td2);
    this._rd.appendChild(tr, td3);
    this._rd.appendChild(tr, td4);

    this._rd.appendChild(view, tr);

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
    this._rd.addClass(btn, 'btn-outline-danger');

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
  //eliminar fila delas tablas 
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
      console.log(cells);
      let productoList = {
        cod: cells[0].firstChild.value,
        abreviatura: cells[1].firstChild.value,
        nombre: cells[2].firstChild.value,
      };

      if (cells[2].children.length === 2) {
        productoList['id'] = cells[2].lastChild.value;
      }

      if (productoList.cod !== undefined && productoList.abreviatura !== undefined && productoList.nombre !== undefined) {

        json.productos.push(productoList);
      }
    }


    for (let row of coberturas) {
      const cells = row.cells;
      let coberturaList = {
        cod: cells[0].firstChild.value,
        abreviatura: cells[1].firstChild.value,
        nombre: cells[2].firstChild.value,
      };

      if (cells[2].children.length === 2) {
        coberturaList['id'] = cells[2].lastChild.value;
      }

      if (coberturaList.cod !== undefined && coberturaList.abreviatura !== undefined && coberturaList.nombre !== undefined) {
        json.coberturas.push(coberturaList);
      }
    }

    for (let row of subRamos) {
      const cells = row.cells;
      let subRamosList = {
        cod: cells[0].firstChild.value,
        abreviatura: cells[1].firstChild.value,
        nombre: cells[2].firstChild.value,
      };

      if (cells[2].children.length === 2) {
        subRamosList['id'] = cells[2].lastChild.value;
      }

      if (subRamosList.cod !== undefined && subRamosList.abreviatura !== undefined && subRamosList.nombre !== undefined) {
        json.subRamos.push(subRamosList);
      }
    }


    return json;
  }



  sinconiza(item: string) {

  }


}
