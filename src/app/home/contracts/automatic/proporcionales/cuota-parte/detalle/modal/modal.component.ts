import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DetalleComponent } from '../detalle.component';
import { MatDialogRef } from '@angular/material/dialog';
import { Menssage } from 'src/app/models/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/service/alert.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  public formT: any = {
    cartera: "",
    depositoRetenido: '',
    comision: "", 
    corredor: "",
    dtbrok: "",
    deposito: {
      moneda: "",
      periodoR: "",
      periodoT: "",
      PorcentajeI: "",
      PorcentajeR: "",
      reservaAsumida: ""
    },
    traspasoCartera: {
      Cuenta: '',
      traspaso: ''
    },
    ModelComision: {
      sobrecomisionMaxCheck: false,
      sobrecomisionMaxVal: "",
      sobrecomisionMinCheck: false,
      sobrecomisionMinVal: "",
      siniestralidadMaxCheck: false,
      siniestralidadMaxVal: "",
      siniestralidadMinCheck: false,
      siniestralidadMinVal: "",
      valueFija: "",
      ComVal: "",
      ComCheck: false,
      SinVal: "",
      SinChech: false
    }
  };
  public form: FormGroup;
  private valorComision: string;
  comisionArray = { fija: false, provisional: false, escalonada: false };
  public formCartera: FormGroup;
  public selectedOption: any;
  public comsion: Boolean = false;
  public deposito: Boolean = false;
  public cartera: Boolean = false;
  public fija: Boolean = false;
  datosRecibidos: any;
  constructor(
    public dialog: MatDialogRef<DetalleComponent>,
    private myformBuilder: FormBuilder,
    public alert: AlertService,
    public router: Router,
    private authService: AuthService,

  ) { 
    
  } 

  ngOnInit(): void {
    this.authService.getDataObser().subscribe(data => {
      if (data) {
        this.datosRecibidos = data; // Asignar los datos recibidos
        console.log('Datos recibidos del hijo:', this.datosRecibidos);
        if (this.datosRecibidos.comison === true) {
          this.comsion = true;
        } else {
          this.comsion = false
        }
        if (this.datosRecibidos.deposito === true) {
          this.deposito = true;
        } else {
          this.deposito = false
        }
        if (this.datosRecibidos.cartera === true) {
          this.cartera = true;
        } else {
          this.cartera = false
        }
      }else {
        console.log('not data');
        
      }
    });
    this.initial() 
  }
  reservaAsumida() {
    this.formT.depositoRetenido = 0;
    this.porcentaje("depositoRetenido");
  }
  saveData(inform: any) {
    if (this.formT.deposito.reservaAsumida == true) {
      this.reservaAsumida()
    } else {
      this.formT.depositoRetenido = this.formT.deposito.PorcentajeR;
    }
    this.authService.setData(this.formT);
    this.dialog.close();
  }
  sendModalTra() {
    this.formT.cartera = this.formT.traspasoCartera.traspaso;
    this.authService.setCarteraData(this.formT);
    this.dialog.close();
  }
  onClickComision(key: any) {
    this.fija = true
    this.valorComision = key;
    let data = Object.keys(this.comisionArray);
    data.forEach(element => {
      if (element == key) {
        this.comisionArray[element] = true;
      } else {
        this.comisionArray[element] = false;
      }
    });
  }

  sendModalCom() {
    console.log(this.formT.ModelComision);
    if (this.formT.ModelComision.sobrecomisionMaxCheck == true) {
      this.formT.comision = this.formT.ModelComision.sobrecomisionMaxVal;
    }
    if (this.formT.ModelComision.sobrecomisionMinCheck == true) {
      this.formT.comision = this.formT.ModelComision.sobrecomisionMinVal;
    }
    if (this.formT.ModelComision.siniestralidadMaxCheck == true) {
      this.formT.comision = this.formT.ModelComision.siniestralidadMaxVal;
    }
    if (this.formT.ModelComision.siniestralidadMinCheck == true) {
      this.formT.comision = this.formT.ModelComision.siniestralidadMinVal;
    }

    if (this.formT.ModelComision.ComCheck == true) {
      this.formT.comision = this.formT.ModelComision.ComVal;
    }
    if (this.formT.ModelComision.SinChech == true) {
      this.formT.comision = this.formT.ModelComision.SinVal;
    }

    if (this.valorComision == "fija") {
      this.formT.comision = this.formT.ModelComision.valueFija;
      console.log('ok');
      
    }
    this.formT.comision = this.desimalPor(this.formT.comision);
    this.authService.setComisionData(this.formT);
    this.dialog.close();

  }


  initial() {
    this.form = this.myformBuilder.group({
      periodo: [Menssage.empty, Validators.compose([Validators.required])],
      money: [Menssage.empty, Validators.compose([Validators.required])],
      mes: [Menssage.empty, Validators.compose([Validators.required])],
      porcenta: [Menssage.empty, Validators.compose([Validators.required])],
      interes: [Menssage.empty, Validators.compose([Validators.required])],
    })
    
    this.formCartera = this.myformBuilder.group({
      traspaso: [Menssage.empty, Validators.compose([Validators.required])],
      cuentas: [Menssage.empty, Validators.compose([Validators.required])],
    })
  }
  cancel() {
    this.dialog.close()
  }
  navigate(item: string) {
    this.router.navigate([item])
  }
  porcentaje(key: string) {
    if (key != '') {
      this.form[key] = this.desimalPor(this.form[key]);
    }
  }

  porcentajeR(key: string) {
    if (key != '') {
      this.formT.deposito[key] = this.desimalPor(this.formT.deposito[key]);
    }
  }

  desimalPor(key: any) {
    let e = key
    return e + '%';
  }
}
