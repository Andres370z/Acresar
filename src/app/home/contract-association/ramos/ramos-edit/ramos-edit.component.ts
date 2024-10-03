import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { Menssage } from 'src/app/models/router';
import { AlertService } from 'src/app/service/alert.service';
import { AuthService } from 'src/app/service/auth.service';


@Component({
  selector: 'app-ramos-edit',
  templateUrl: './ramos-edit.component.html',
  styleUrls: ['./ramos-edit.component.css']
})

export class RamosEditComponent implements OnInit {
  selectedOptionOne: any;
  selectedOptionTwoo: any;
  selectedOptionThree: any;
  form: FormGroup;
  public values: any;
  entidades: any;
  superRamos: any;
  superRamoNumeros: any;
  displayedColumns: string[] = ['codigo', 'abrevia', 'name', 'accion'];
  codigo: '';
  abrevia: '';
  name: '';
  dataSource = [{ codigo: '', abrevia: '', name: '' }];
  dataSourceProducts = [{ codigoProducts: '', abreviaProducts: '', nameProducts: '' }];
  dataSourceCoberturas = [{ codigoCobertura: '', abreviaCobertura: '', nameCobertura: '' }];

  idEdit: any;
  inForm: any;

  @ViewChild(MatTable) table: MatTable<any[]>;
  @ViewChild('productsTable') productsTable!: MatTable<any>;      // Referencia para la tabla de Productos
  @ViewChild('coberturasTable') coberturasTable!: MatTable<any>;  // Referencia para la tabla de Coberturas

  constructor(
    private authService: AuthService,
    private alert: AlertService,
    private myFormBuilder: FormBuilder,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {

    console.clear();
    this.getMulti();
    this.createForm();
    this.updateForm();
  }
  getMulti() {
    this.authService.getEntities().then((res: any) => {
      console.log('esta son las entidades, ', res)
      this.entidades = res
    })
    const res = [
      { a: 1, c: 'SI' },
      { a: 1, c: 'NO' }
    ]
    this.authService.getSuper().then((res: any) => {
      console.log('Este es super ramos: ', res);
      this.superRamos = res;
    })
    this.authService.getSuperCodigos().then((res: any) => {
      console.log('Este es super codigos: ', res);
      this.superRamoNumeros = res;
    })
  }
  createForm() {
    /*Este es el Formulario*/
    this.form = this.myFormBuilder.group({
      entidad: [Menssage.empty, Validators.compose([Validators.required])],
      codramo: [Menssage.empty, Validators.compose([Validators.required])],
      ramosu: [Menssage.empty, Validators.compose([Validators.required])],
      codTecnico: [Menssage.empty, Validators.compose([Validators.required])],
      abreviatura: [Menssage.empty, Validators.compose([Validators.required])],
      ramoTecnico: [Menssage.empty, Validators.compose([Validators.required])],
    });

  }
  updateForm() {
    this.idEdit = sessionStorage.getItem('rm');
    this.authService.getRamosEdit(this.idEdit).then((res: any) => {
      this.inForm = res.rm;
      console.log('listen rm ', this.inForm);
      console.log('valor entidad predefinido: ', this.inForm[0].r);

      // Ahora establecemos los valores en el formulario
      this.form.controls.entidad.setValue(this.inForm[0].r);  // Asignamos entidad
      this.form.controls.codramo.setValue(this.inForm[0].s);  // Asignamos codramo
      this.form.controls.ramosu.setValue(this.inForm[0].c);   // Asignamos ramosu
      this.form.controls.codTecnico.setValue(this.inForm[0].e);   // Asignamos ramosu
      this.form.controls.abreviatura.setValue(this.inForm[0].s);   // Asignamos ramosu
      this.form.controls.ramoTecnico.setValue(this.inForm[0].a2);
    }, err => {
      console.log(err);
    });
  }
  saveData(data: any) {
    console.log(data);

  }
  // Método para agregar una nueva fila
  addRow() {
    const newRow = { codigo: '', abrevia: '', name: '' };
    this.dataSource = [...this.dataSource, newRow];  // Agregar una nueva fila
    this.table.renderRows()
  }
  // Método para eliminar una fila
  deleteRow() {
    this.dataSource.pop()  // Eliminar la fila por índice
    this.table.renderRows()
  }
  addRowProducts() {
    const newRow = { codigoProducts: '', abreviaProducts: '', nameProducts: '' };
    this.dataSourceProducts = [...this.dataSourceProducts, newRow];
    this.table.renderRows()
  }
  deleteRowProducts() {
    this.dataSourceProducts.pop()
    this.productsTable.renderRows()
  }


  addRowCoberturas() {
    const newRow = { codigoCobertura: '', abreviaCobertura: '', nameCobertura: '' };
    this.dataSourceCoberturas = [...this.dataSourceCoberturas, newRow];
    this.table.renderRows()
  }

  deleteRowCoberturas() {
    this.dataSourceCoberturas.pop()  // Eliminar la fila por índice
    this.coberturasTable.renderRows()
  }



  //ALISTANDO DATA
  createData() {

    console.log('Este es ', this.dataSource);

    const json = {
      coberturas: [],
      productos: [],
      subRamos: [],
    };

    // Recorre las filas desde el dataSource, que es el array que usas en la tabla
    for (let row of this.dataSource) {
      console.clear();
      this.dataSource.forEach((row, index) => {
        console.log(`Row ${index + 1}:`, row);
      });

      // Accede a las propiedades del objeto row
      let subRamosList = {
        cod: row.codigo,
        abreviatura: row.abrevia,
        nombre: row.name,
      };
      console.log(subRamosList);

      // Añade la fila solo si todos los campos están completos
      if (subRamosList.cod && subRamosList.abreviatura && subRamosList.nombre) {
        json.subRamos.push(subRamosList);
      }
    }

    for (let row of this.dataSourceProducts) {
      this.dataSourceProducts.forEach((row, index) => {
        console.log(`Row ${index + 1}:`, row);
      });

      let ProductList = {
        cod: row.codigoProducts,
        abreviatura: row.abreviaProducts,
        nombre: row.nameProducts,
      };
      console.log(ProductList);

      if (ProductList.cod && ProductList.abreviatura && ProductList.nombre) {
        json.productos.push(ProductList);
      }
    }

    for (let row of this.dataSourceCoberturas) {
      this.dataSourceProducts.forEach((row, index) => {
        console.log(`Row ${index + 1}:`, row);
      });

      let CovertList = {
        cod: row.codigoCobertura,
        abreviatura: row.abreviaCobertura,
        nombre: row.nameCobertura,
      };
      console.log(CovertList);

      if (CovertList.cod && CovertList.abreviatura && CovertList.nombre) {
        json.coberturas.push(CovertList);
      }
    }
    console.log('JSON final:', json);
    return json
  }

  finishDta() {
    if (this.form.valid) {
      let data = this.form.value;
      data.detalleRamo = this.createData();
      const item = {
        "abreviatura": data.abreviatura,
        "codigoRamoTecnico": data.codTecnico,
        "codigoSuper": data.codramo,
        "detalleRamo": data.detalleRamo,
        "entidad": data.entidad,
        "ramoSuper": data.ramosu,
        "ramoTecnico": data.ramoTecnico,
      }
      console.log('Aqui esta tu data ', item);

      this.authService.putRam(this.idEdit, item).then((res: any) =>{
        this.alert.success('Ok', res.mensaje)
        console.log(res);
        this.router.navigate(['home/asociacion/ramos']);
      }, err => {
        this.alert.error('Ups', 'intentalo mas tarde')
      })
    }else {
      this.alert.error('Falta algo','Los campos no estan completos')
    }
  }

}
