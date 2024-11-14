import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AlertService } from 'src/app/service/alert.service';
import { AuthService } from 'src/app/service/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-distribuition',
  templateUrl: './new-distribuition.component.html',
  styleUrls: ['./new-distribuition.component.css']
})
export class NewDistribuitionComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['poliza', 'asegurado', 'noContrato', 'fechaInicio', 'fechaFinal', 'accion'];
  data: any[] = [];
  public dataSource: MatTableDataSource<any>
  ls: Observable<any>;
  modulo: string = 'listado de pólizas';
  dataEdit: any;
  contractoForm = {
    nombre: "",
    direccion: "",
    telefono: 0,
    pais: ""
  };

  bancoForm = {
    banco: "",
    certificacion: "",
    ciudad: "",
    moneda: 0,
    numeroCuenta: 0,
    pais: "",
    titular: '',
    aba: "",
  };

  listError = {
    msg: "",
    estado: false
  }

  constructor(
    private authService: AuthService,
    private _ls: AuthService,
    private router: Router,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.getDta()
  }
  getDta() {
    console.log('e escucho');

    this.authService.getPrima().then((res: any) => {
      console.log('esta es tu respuesta primas ', res);
      this.data = res;
      this.dataSource = new MatTableDataSource(res)
      this.dataSource.paginator = this.paginator;
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  editItemForm(item: any) {
    var contra = item.Id_contrato.substr(0, 7);

    if (contra == "ATL-AUT") {
      //this.messegeInfofinal("Estamos trabajando para dejar la funcionalidad");
      sessionStorage.setItem('editarprimasautomatico', JSON.stringify(item));
      this.router.navigate(["home/reinsuranceAdministration/primas/new-distribuition/editar-prima-automaticos"])
    } else if (contra == "ATL-FAC") {
      this.dataEdit = item;
      sessionStorage.setItem('editarprimas', JSON.stringify(item));
      this.router.navigate(["/admin/contratos/ajuste/primas-facultativos/edit"])
    } else {
      console.log(contra)
    }
  }

  editItem(item: any) {
    this.dataEdit = item;
  }

  procesarContacto() {
    if (this.contractoForm.nombre != "") {
      this.contractoForm.nombre = this.contractoForm.nombre.toUpperCase();
    } else {
      this.listError.estado = true;
      this.listError.msg = "El Nombre Contacto es requerido ";
    }

    if (this.contractoForm.direccion != "") {
      this.contractoForm.direccion = this.contractoForm.direccion.toUpperCase();
    }
    else {
      this.listError.estado = true;
      this.listError.msg = "La Dirección es requerida";
    }
    if (this.contractoForm.pais != "") {
      this.contractoForm.pais = this.contractoForm.pais.toUpperCase();
    }
    else {
      this.listError.estado = true;
      this.listError.msg = "El Pais es requerido ";
    }
    if (this.contractoForm.telefono != 0) {
      this.contractoForm.telefono = this.contractoForm.telefono;
    }
    else {
      this.listError.estado = true;
      this.listError.msg = "El Numero de telefono es requerido ";
    }
    console.log(this.contractoForm)
    if (this.listError.estado == false) {
      const data = {
        code_comp: this.dataEdit.a,
        nm: this.contractoForm.nombre,
        di: this.contractoForm.direccion,
        te: this.contractoForm.telefono,
        co: "",
        pa: this.contractoForm.pais
      };
      this._ls.postQuery(data, "/contactos").then(
        res => {
          this.alertService.success('Ok',res.mensaje);
        },
        err => {
          this.alertService.error('Ok',err.message);
        }
      )
    }
  }
  
  delete(item) {
    var contra = item.Id_contrato.substr(1, 7);
    Swal.fire({
      title: "Eliminar",
      text: "Estas seguro de esto?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, borralo!"
    }).then((result) => {
      if (result.isConfirmed) {

        if (contra == "ATL-AUT") {
          this.alertService.info('Hey',"Estamos trabajando para dejar la funcionalidad");
        } else if (contra == "ATL-FAC") {
          this._ls.delete(`aseguradoras/facultativo/reportenomina/eliminar/${item.idpoliza}`).then(
            res => {
              this.alertService.success('Hey',res.mensaje);
            },
            err => { 
              this.alertService.error('Error', 'En este momento no puedes eliminar')
            }
          )
        } else {
          console.log(contra)
        }
        
      }
    });
  }

}
