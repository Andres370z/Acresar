import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionUser } from 'src/app/home/global/sessionUser';
import { Menssage } from 'src/app/models/router';
import { AlertService } from 'src/app/service/alert.service';
import { AuthService } from 'src/app/service/auth.service';
import { PercentageService } from 'src/app/service/percentage.service';
@Component({
  selector: 'app-actualizar-cliente',
  templateUrl: './actualizar-cliente.component.html',
  styleUrls: ['./actualizar-cliente.component.css']
})
export class ActualizarClienteComponent implements OnInit {
  form: FormGroup;
  entidades: any;
  idEdit: number = 0;
  url: any
  public selectedOption: any;
  constructor(
    private authService: AuthService,
    private alert: AlertService,
    private myFormBuilder: FormBuilder,
    private porcentajes: PercentageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getEntidades()
    this.createForm()
    this.initial()
  }
  createForm() {
    /*Este es el Formulario*/
    this.form = this.myFormBuilder.group({
      entidad: [Menssage.empty, Validators.compose([Validators.required])],
      razonSocial: [Menssage.empty, Validators.compose([Validators.required])],
      nombreAbreviado: [Menssage.empty, Validators.compose([Validators.required])],
      nit: [Menssage.empty, Validators.compose([Validators.required])],
      cod: [Menssage.empty, Validators.compose([Validators.required])],
      telefono: [Menssage.empty, Validators.compose([Validators.required])],
      direccion: [Menssage.empty, Validators.compose([Validators.required])],
      contacto: [Menssage.empty, Validators.compose([Validators.required])],
      paisOrigen: [Menssage.empty, Validators.compose([Validators.required])],
      estado: [Menssage.empty, Validators.compose([Validators.required])],
      region: [Menssage.empty, Validators.compose([Validators.required])],
    });

  }
  getEntidades() {
    this.authService.getEntities().then((res: any) => {
      console.log('esta son las entidades, ', res)
      this.entidades = res
    })
  }
  initial() {
    console.log('2 exist')
    const data = JSON.parse(sessionStorage.getItem('cliente'));
    if (data != null) {
      this.idEdit = data.a;
      console.log('1 exist')
      //Trae datos formulario
      this.form.controls.entidad.setValue(data.nc);
      this.form.controls.razonSocial.setValue(data.a2);
      this.form.controls.nombreAbreviado.setValue(data.c);
      this.form.controls.nit.setValue(data.r2);
      //this.form.controls.cod.setValue(cnt.o);
      this.form.controls.telefono.setValue(data.c2);
      this.form.controls.direccion.setValue(data.o);
      this.form.controls.contacto.setValue(data.n);
      this.form.controls.paisOrigen.setValue(data.pc);
      this.form.controls.estado.setValue(data.l);
      this.form.controls.region.setValue(data.s2);

      this.url = this.idEdit
    }else{
      this.url = "/corredores";
    }
  }
  create(item){
    if(this.form.valid){
      this.authService.postEditClientes(item,this.url).then((res: any)=>{
        this.alert.success('Ok', 'El corredor fue editado')
      }).catch((err) => {
        console.log(err);
        this.alert.error('Error', 'error en el servidor')
      });
    }else{
      this.alert.error('Error', 'Algo salio mal')
    }
  }
}
