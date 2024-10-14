import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { Menssage } from 'src/app/models/router';
import { AlertService } from 'src/app/service/alert.service';
import { AuthService } from 'src/app/service/auth.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-reinsurer',
  templateUrl: './reinsurer.component.html',
  styleUrls: ['./reinsurer.component.css']
})
export class ReinsurerComponent implements OnInit {

  displayedColumns: string[] = ['codigo', 'Reasegurador', 'Calificación', 'Angencia', 'Acción'];
  data: any[] = [];
  dataEdit: any;
  public eventList: any[] = []
  public dataSource: MatTableDataSource<any>
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ls: Observable<any>;
  modulo: string = 'Compañias ';
  contato: FormGroup;
  bancario: FormGroup;
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
    private auth: AuthService,
    private router: Router,
    private myFormBuilder: FormBuilder,
    private _rd: Renderer2,
    private _service: AuthService,
    private cookieService: CookieService,
    private alert: AlertService,
  ) { }

  ngOnInit(): void {
    this.getDta()
  }

  getDta() {
    this.auth.getReinsurer().then((res: any) => {
      console.log(res)
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
  updateRecors(data: any) {
    if (data != null || data != '') { }
    sessionStorage.setItem('companiaR', JSON.stringify(data))
    console.log(data);
    const ruta = 'home/companias/reinsurer/register-reinsurer'
    this.navigate(ruta)
  }
  deleteRea(id: any) {
    console.log('ESTE ES', id);

    Swal.fire({
      title: "Estas seguro?",
      text: "Estas apunto de borrar este registro!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminalo!"
    }).then((result) => {
      if (result.isConfirmed) {

        this.auth.deleteRea(id).then((res: any) => {
          console.log('eliminado', res);

          Swal.fire({
            title: "Se ha ido!",
            text: "Tu archivo ha sido borrado.",
            icon: "success"
          });
          setTimeout(() => {
            window.location.reload()
          }, 3000);

        }, err => {
          console.log(err);

        })

      }
    });
  }




  agregarContrato() {
    this.contato = this.myFormBuilder.group({
      nombreContrato: [Menssage.empty, Validators.compose([Validators.required])],
      direccion: [Menssage.empty, Validators.compose([Validators.required])],
      telefono: [Menssage.empty, Validators.compose([Validators.required])],
      pais: [Menssage.empty, Validators.compose([Validators.required])],
    });

  }

  datoBancario() {
    this.bancario = this.myFormBuilder.group({
      titular: [Menssage.empty, Validators.compose([Validators.required])],
      cuenta: [Menssage.empty, Validators.compose([Validators.required])],
      moneda: [Menssage.empty, Validators.compose([Validators.required])],
      aba: [Menssage.empty, Validators.compose([Validators.required])],
      banco: [Menssage.empty, Validators.compose([Validators.required])],
      pais: [Menssage.empty, Validators.compose([Validators.required])],
      ciudad: [Menssage.empty, Validators.compose([Validators.required])],
    });

  }



  editItemForm(item: any) {
    if (item != "") {
      this.dataEdit = item;
      sessionStorage.setItem('companiaR', JSON.stringify(item));
      this.router.navigate(['home/companias/reinsurer/register-reinsurer'])
    }
  }

  editItem(item: any) {
    console.log(item);
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
      this._service.postContactos(data).then(
        res => {
          this.alert.success('Ok', res.mensaje);
        },
        err => {
          this.alert.error('Ok', err.message);
        }
      )
    }
  }

  fileLoad(file: any) {
    this.bancoForm.certificacion = file.target.files[0];
    console.log(this.bancoForm.certificacion);
  }

  delete(id: number) {
    if (id != null) {
      this._service.deleteRea(id).then(
        res => {

          this.alert.success('Ok', res.mensaje);
          //this.dataTable.ajax.reload();
          //$("#myData").DataTable().ajax.reload();

        },
        err => { }
      )
    }
  }

  procesarBanco() {
    console.log(this.dataEdit);
    let form = new FormData();
    form.append('tit', this.bancoForm.titular);
    form.append("num", this.bancoForm.numeroCuenta.toString());
    form.append("mon", this.bancoForm.moneda.toString());
    form.append("swi", this.bancoForm.aba);
    form.append("ban", this.bancoForm.banco)
    form.append("cer", this.bancoForm.certificacion);
    form.append("ciu", this.bancoForm.ciudad),
      form.append("pai", this.bancoForm.pais)
    form.append("code_comp", this.dataEdit.a);
    

  }
}
