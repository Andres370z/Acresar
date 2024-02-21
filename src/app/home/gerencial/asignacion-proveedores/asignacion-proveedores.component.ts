import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/service/alert.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-asignacion-proveedores',
  templateUrl: './asignacion-proveedores.component.html',
  styleUrls: ['./asignacion-proveedores.component.css']
})
export class AsignacionProveedoresComponent implements OnInit {
  public form: FormGroup;
  public options: any[] = [];
  public click: any
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
      tipoContrato: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      idContrato: ['', Validators.compose([Validators.required])],
      descriContrato: ['', Validators.compose([Validators.required])],
      starDate: ['', Validators.compose([Validators.required])],
      endDate: ['', Validators.compose([Validators.required])],
      gastosContrato: ['', Validators.compose([Validators.required])],
      valorContrato: ['', Validators.compose([Validators.required])],
      proveedorContrato: ['', Validators.compose([Validators.required])],
      siniestros: ['', Validators.compose([Validators.required])],
      observacion: ['', Validators.compose([Validators.required])],
    });
  }

  searchContracs() {
    if (this.form.controls.tipoContrato.valid) {
      const data = {
        type: true,
        word: this.form.controls.tipoContrato.value
        
      }
      this.authService.postSearchIdcontracs(data).then(
        res => {
          this.options = res
        }, err => {
          this.alert.error('Error', 'Solicitud no enviada');
          console.log(err)
        }
      )
    }
  }
  upload(item: any){
    this.click = true
    console.log(item )
  }

}
