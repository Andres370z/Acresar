import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/service/alert.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-admon-proveedores',
  templateUrl: './admon-proveedores.component.html',
  styleUrls: ['./admon-proveedores.component.css']
})
export class AdmonProveedoresComponent implements OnInit {
  public form: FormGroup
  constructor(
    private myFormBuilder: FormBuilder,
    private authService: AuthService,
    private alert: AlertService
  ) { }

  ngOnInit(): void {
    this.createForm()
  }
  createForm() {
    /*Este es el Formulario*/
    this.form = this.myFormBuilder.group({
      proveedor: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      tipoInforme: ['', Validators.compose([Validators.required])],
      documento: ['', Validators.compose([Validators.required])],
      starDate: ['', Validators.compose([Validators.required])],
      estado: ['', Validators.compose([Validators.required])],
      adjuntar: ['', Validators.compose([Validators.required])],
    });
  }
  

}
