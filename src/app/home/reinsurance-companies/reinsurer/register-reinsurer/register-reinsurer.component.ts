import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  paises: any
  idEdit: any
  reaseguroData = { a2: "", rg: "", ag: "", e: "", act: '', c: '', pc: '', s: '', ca: '', sa: '', cxa: '', nc: "", r2: "", ct: "", dr: "", nb: "" };

  itemData: any;
  dataRes: any;

  constructor(
    private myFormBuilder: FormBuilder,
    private authService: AuthService,
    private alert: AlertService,
    private router: Router

  ) { }

  ngOnInit(): void {
    this.initial();
    this.initialUpdate();
    this.getPaises();
    const dataJson = sessionStorage.getItem('companiaR');
    if (dataJson != null) {
      const data = JSON.parse(dataJson);
      this.idEdit = data.a;
      this.dataRes = data
      this.reaseguroData.nc = data.r2;
      this.reaseguroData.r2 = data.o2;
      this.reaseguroData.s = data.n;
      this.reaseguroData.ct = data.nc;
      this.reaseguroData.dr = data.c2;
      this.reaseguroData.ca = data.e;
      this.reaseguroData.nb = data.s;
      this.reaseguroData.e = data.e;
      this.reaseguroData.a2 = data.a2;
      this.reaseguroData.ct = data.r2;
      this.reaseguroData.rg = data.s2;
      this.reaseguroData.c = data.ac;
      this.reaseguroData.e = data.c;


      this.itemData = data;

    }
  }
  initial() {
    this.form = this.myFormBuilder.group({
      razon: [Menssage.empty, Validators.compose([Validators.required])],
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
      representativeOffice: [Menssage.empty, Validators.compose([Validators.required])],
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
        this.form.controls.razon.setValue(data.e);
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
              this.buscarPais(this.form.value.countryOrigin)

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
    } else {
      this.alert.error('Error', 'No ems podido caragar la informacion')
    }
    this.alert.messagefin()
  }
  //Actualizar data
  saveData(items: any) {
    if (this.form.valid) {
      const itemsT = {
        "item": {
          "act": items.state,
          "ag": 2,
          "c": "",
          "cl": items.qualification,
          "cn": items.contac,
          "cod": items.cod,
          "d": items.adress,
          "e": items.entities,
          "es": items.state,
          "na": items.abbreviatedName,
          "ni": items.nit,
          "of": items.representativeOffice,
          "p": this.valorEncontrado,
          "r": items.razon,
          "rg": items.region,
        }
      };
      if (this.idEdit < 1) {
        const item = {
          "item": {
            "act": items.state,
            "ag": 2,
            "c": "",
            "cl": items.qualification,
            "cn": items.contac,
            "cod": items.cod,
            "d": items.adress,
            "e": items.entities,
            "es": items.state,
            "na": items.abbreviatedName,
            "ni": items.nit,
            "of": items.representativeOffice,
            "p": this.valorEncontrado,
            "r": items.razon,
            "rg": items.region,
          }
        };

      } else {
        let jsonData = sessionStorage.getItem('companiaR');
        jsonData = JSON.parse(jsonData);
        console.log(">> else", itemsT);
        const data = {
          "e": "1",
          "c": "",
          "r": itemsT.item.r,
          "na": itemsT.item.na,
          "ni": itemsT.item.ni,
          "cn": itemsT.item.cn,
          "d": itemsT.item.d,
          "es": itemsT.item.es,
          "p": this.dataRes.r,
          "cl": itemsT.item.cl,
          "rg": itemsT.item.rg,
          "ag": this.dataRes.u,
          "of": itemsT.item.of,
          "ofr": itemsT["ofr"],
          "ofn": itemsT["ofn"],
          "ofl": itemsT["ofl"],
          "ofcr": itemsT["ofcr"],
          "ofci": itemsT["ofci"],
          "ofd": itemsT["ofd"],
          "oft": itemsT["oft"],
          "act": itemsT.item.act
        };
        console.log('data >>>>', data);
        this.authService.putRea(this.idEdit, data).then(()=>{
          this.alert.success('Ok', 'Haz actualizado con exito!!!')
          this.navigate('home/companias/reinsurer/register-reinsurer');
        }, err =>{
          console.log(err);
            this.alert.error('lo sentimo','pero por ahora no puedes actualizar, intenta con otro')
        })
      }

      const item = {
        "item": {
          "act": items.state,
          "ag": 2,
          "c": "",
          "cl": items.qualification,
          "cn": items.contac,
          "cod": items.cod,
          "d": items.adress,
          "e": items.entities,
          "es": items.state,
          "na": items.abbreviatedName,
          "ni": items.nit,
          "of": items.representativeOffice,
          "p": this.valorEncontrado,
          "r": items.razon,
          "rg": items.region,
        }
      };
      console.log('listen 12', item)
      //l
    }

  }
  valorEncontrado: number | null = null; // Variable para almacenar el valor encontrado

  buscarPais(pais: string) {
    const paisEncontrado = this.paises.find(p => p.c.toLowerCase() === pais.toLowerCase());

    if (paisEncontrado) {
      this.valorEncontrado = paisEncontrado.a; // Asigna el valor de 'a' si el país fue encontrado
      console.log(this.valorEncontrado);

    } else {
      this.valorEncontrado = null; // Si no lo encuentra, asigna null
      console.log('null', this.valorEncontrado);

    }
  }
  getPaises() {
    this.authService.getCountries().then((obj) => {
      console.log('paises: ', obj);
      this.paises = obj
    })
  }
  navigate(item: string){
    this.router.navigate([item])
  }
  cargar() {
    this.buscarPais(this.form.value.paisOrigen)
  }
}
