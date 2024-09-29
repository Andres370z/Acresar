import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Menssage } from 'src/app/models/router';
import { AlertService } from 'src/app/service/alert.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-register-reinsurer',
  templateUrl: './register-reinsurer.component.html',
  styleUrls: ['./register-reinsurer.component.css']
})
export class RegisterReinsurerComponent implements OnInit {
  public form: FormGroup;
  public entities: any = [];
  public selectedOptionEntities: any;
  public selectedOption: any;
  public createForm: any;

  constructor(
    private myFormBuilder: FormBuilder,
    private authService: AuthService,
    private alert: AlertService,
  ) { }

  ngOnInit(): void {
    this.initial();
    this.initialUpdate();
  }
  initial() {
    this.form = this.myFormBuilder.group({
      names: [Menssage.empty, Validators.compose([Validators.required])],
      entities: [Menssage.empty, Validators.compose([Validators.required])],
      abbreviatedName: [Menssage.empty, Validators.compose([Validators.required])],
      cod: [Menssage.empty, Validators.compose([Validators.required])],
      nit: [Menssage.empty, Validators.compose([Validators.required])],
      contac: [Menssage.empty, Validators.compose([Validators.required])],
      adress: [Menssage.empty, Validators.compose([Validators.required])],
      state: [Menssage.empty, Validators.compose([Validators.required])],
      countryOrigin: [Menssage.empty, Validators.compose([Validators.required])],
      qualification: [Menssage.empty, Validators.compose([Validators.required])],
      region: [Menssage.empty, Validators.compose([Validators.required])],
      ratingAgency: [Menssage.empty, Validators.compose([Validators.required])],
      RepresentativeOffice: [Menssage.empty, Validators.compose([Validators.required])],
    })
    this.getEntities()

  }
  
  getEntities() {
    this.authService.getEntities().then((resunta: any) => {
      //console.log(resunta);
      this.entities = resunta
    })
  }
  //Actualizar
  initialUpdate() {
    this.alert.loading();
    let data = JSON.parse(sessionStorage.getItem('companiaR'));
    if (data != null) {
      //console.log('listem 9',data.a)
      this.authService.getEditReinsurer(data.a).then((resTwo: any) => {
        resTwo = resTwo[0];
        data = resTwo;
        //Trae los datos al form
      this.form.controls.abbreviatedName.setValue(data.s);
      this.form.controls.names.setValue(data.e);
      this.form.controls.nit.setValue(data.a2);
      this.form.controls.contac.setValue(data.r2);
      this.form.controls.adress.setValue(data.c2);
      this.form.controls.state.setValue(data.o2);
      //pais
      this.authService.getCountries().then((res: any) => {
        //console.log('listen 5', res)
        for (let index = 0; index < res.length; index++) {
          const p = res[index];
          //console.log('listen ', p)
          if (resTwo.o == p.a) {
            let temp: any;
            temp = this.form.controls.countryOrigin.setValue(p.c)
            //console.log('listen 6', temp)
          }
        }
      }).catch(err => {
        console.log(err)
        this.alert.error('Error', 'algo falló')
      })
      //calificacion
      this.form.controls.qualification.setValue(data.n);
      this.form.controls.region.setValue(data.s2)
      this.form.controls.ratingAgency.setValue(data.agencia);
      //entidad
      let entities = data.entidad;
      this.form.controls.entities.setValue(entities);
      console.log('listen 10', resTwo)
      })
    }else {
      this.alert.error('Error', 'No ems podido caragar la informacion')
    }
    this.alert.messagefin() 
  }
  //Actualizar data
  saveData(items: any) {
    if (this.form.valid) {
      const item = {
        "item": {
          "act": items.estado,
          "ag": 2,
          "c": "",
          "cl": items.calificacion,
          "cn": items.contacto,
          "cod": items.cod,
          "d": items.direccion,
          "e": items.entidad,
          "es": items.estado,
          "na": items.nombreAbreviado,
          "ni": items.nit,
          "of": items.oficinaRepresentacion,
          "p": items.paisOrigen,
          "r": items.razonSocial,
          "rg": items.region,
        }
      };
    }
    
    console.log('listen 12', items)
  }
}
