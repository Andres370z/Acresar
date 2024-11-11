import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AlertService } from 'src/app/service/alert.service';
import { AuthService } from 'src/app/service/auth.service';
import { FileUploadService } from 'src/app/service/file-upload.service';

@Component({
  selector: 'app-list-siniestro',
  templateUrl: './list-siniestro.component.html',
  styleUrls: ['./list-siniestro.component.css']
})
export class ListSiniestroComponent implements OnInit {
  ls: Observable<any>;
  modulo: string = 'Listado de siniestro';
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

  listData: any;
  pager: any = {};
  constructor(
    private _ls: AuthService,
    private _httpFile: FileUploadService,
    private router: Router,
    private alertService: AlertService
  ) {
    this.alertService.loading();
    this._ls.postAseNominas('').then((res: any) => {
      this.ls = res
    })
  }

  ngOnInit(): void {
    
  }
  
  editItemForm(item: any) {
    if (item != "") {
      this.dataEdit = item;
      sessionStorage.setItem('editarsiniestro', JSON.stringify(item));

      this.router.navigate(["home"])
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
      this._ls.postContactos(data).then(
        res => {
          this.alertService.success('Ok',res.mensaje);
        },
        err => {
          this.alertService.error('Error',err.message);
        }
      )
    }
  }

  procesarBanco() {
    let form = new FormData();
    form.append('tit', this.bancoForm.titular);
    form.append("num", this.bancoForm.numeroCuenta.toString());
    form.append("mon", this.bancoForm.moneda.toString());
    form.append("swi", this.bancoForm.aba);
    form.append("ban", this.bancoForm.banco)
    form.append("cer", "");
    form.append("code_comp", this.dataEdit.a);
    this._httpFile.upload(form, "/bancos").subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      }
    )

  }

  delete(id) {
    if (id != null) {
      this._ls.deleteAseReporte(id).then(
        res => {

          this.alertService.success('Ok',res.mensaje);
        },
        err => { }
      )
    }
  }

}
