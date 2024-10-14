import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { AlertService } from 'src/app/service/alert.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-intermediary',
  templateUrl: './intermediary.component.html',
  styleUrls: ['./intermediary.component.css']
})
export class IntermediaryComponent implements OnInit {
  displayedColumns: string[] = ['codigo', 'Nombre', 'RazonSocial', 'Contacto', 'Telefono', 'Acción',];
  data: any[] = [];
  public dataSource: MatTableDataSource<any>

  ls: Observable<any>;
  modulo: string = 'Listado de Intermediarios';
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
dataEdit: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    private authService: AuthService,
    private router: Router,
    private _rd: Renderer2,
    private _service: AuthService,
    private cookieService: CookieService,
    private alert: AlertService,
    private myFormBuilder: FormBuilder,
    //private _httpFile: FileUploadServiceService
  ) { }

  ngOnInit(): void {
    sessionStorage.clear()
    this.getDta()
  }
  getDta() {
    this.authService.getIntermediarios().then((res: any) => {
      console.log('esta es tu respuesta intermediarios ', res);
      this.data = res;
      this.dataSource = new MatTableDataSource(res)
      this.dataSource.paginator = this.paginator;
    })
  }
  




  
editItem(item: any) {
  this.dataEdit = item;
}

editJson(item: any) {
  if (item != "") {
    sessionStorage.setItem('companiaI', JSON.stringify(item));
    this.router.navigate(['home/companias/intermediary/edit']);
  }
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
        this.alert.success('Ok',res.mensaje);
      },
      err => {
        this.alert.error('Error',err.message);
      }
    )
  }
}


fileLoad(file: any) {
  this.bancoForm.certificacion = file.target.files[0];
  console.log(this.bancoForm.certificacion);
}

delete (id: number) {
  if (id != null) {
    this._service.deleteIntermediario(id).then(
      res => {

        this.alert.success('Ok',res.mensaje);


      },
      err => { }
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
  form.append("cer", this.bancoForm.certificacion);
  form.append("ciu", this.bancoForm.ciudad),
    form.append("pai", this.bancoForm.pais)
  form.append("code_comp", this.dataEdit.a);
  /*
  this._httpFile.upload(form, "/bancos").subscribe(
    res => {
      console.log(res);
    },
    err => {
      console.log(err);
    }
  )
  */
}

}
