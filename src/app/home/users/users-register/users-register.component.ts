import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import html2canvas from 'html2canvas';
import { Menssage } from 'src/app/models/router';
import { AlertService } from 'src/app/service/alert.service';
import { AuthService } from 'src/app/service/auth.service';
import { LocalstoreService } from 'src/app/service/localstore.service';

@Component({
  selector: 'app-users-register',
  templateUrl: './users-register.component.html',
  styleUrls: ['./users-register.component.css']
})
export class UsersRegisterComponent implements OnInit {
  public dataUsers: any;
  public validType: boolean = true;
  public form: FormGroup;
  public listRol: any = [];
  public file: File;
  public myAngularxQrCode: string = "";
  public qrCodeDownloadLink: SafeUrl = "";
  @ViewChild('screen') screen: ElementRef;
  @ViewChild('canvas') canvas: ElementRef;
  @ViewChild('downloadLink') downloadLink: ElementRef;
  perfil: any = [
    { id: 1, name: 'Administrador' },
    { id: 2, name: 'Gerente' },
    { id: 3, name: 'Coordinador' },
    { id: 4, name: 'Analista facultativos' },
    { id: 5, name: 'Analista contratos' }
  ];
  pais: any = [
    { id: 10, name: 'Colombia' },
    { id: 30, name: 'Mexico' },
    { id: 42, name: 'U.S.A' },
  ];
  status: any = [
    { id: 1, name: 'Activo' },
    { id: 0, name: 'Inactivo' },
  ];
  constructor(
    private router: Router,
    private alert: AlertService,
    private localStore: LocalstoreService,
    public formBuilder: FormBuilder,
    private authService: AuthService,
  ) { 
    this.dataUsers = this.localStore.getItem("usersEdit")
    this.initial()
    if (this.dataUsers) {
      this.validType = false;
      this.editAdd(this.dataUsers)
      let idBase = btoa(this.dataUsers.id.toString())
      this.myAngularxQrCode = `https://card.systemresolution.com/${idBase}`;
    }
  }
  dowloadImg() {
    html2canvas(this.screen.nativeElement).then(canvas => {
      var dataURL = canvas.toDataURL();
      this.canvas.nativeElement.src = dataURL;
      this.downloadLink.nativeElement.href = canvas.toDataURL('image/png');
      this.downloadLink.nativeElement.download = 'card-atlantic.png';
      this.downloadLink.nativeElement.click();
    });
  }
  onChangeURL(url: SafeUrl) {
    this.qrCodeDownloadLink = url;
  }
  editAdd(dataUsers: any) {
    console.log("hola",dataUsers)
    this.form.controls.name.setValue(dataUsers.name);
    this.form.controls.surname.setValue(dataUsers.lastName);
    this.form.controls.telephone.setValue(dataUsers.telephone);
    this.form.controls.identificationCard.setValue(dataUsers.name);
    this.form.controls.email.setValue(dataUsers.email);
    this.form.controls.pais.setValue(dataUsers.idPais);
    this.form.controls.jobTitle.setValue(dataUsers.jobTitle);
    this.form.controls.shippingAddress.setValue(dataUsers.shippingAddress);
    this.form.controls.idrol.setValue(dataUsers.id_rol);
    this.form.controls.state.setValue(dataUsers.state);
  }

  ngOnInit(): void {
  }

  initial(){
    this.form = this.formBuilder.group({
      name: [Menssage.empty, Validators.compose([
        Validators.required,
      ])],
      surname: [Menssage.empty, Validators.compose([
        Validators.required,
      ])],
      telephone: [Menssage.empty, Validators.compose([
        Validators.required,
      ])],
      identificationCard: [Menssage.empty, Validators.compose([
        Validators.required,
      ])],
      email: [Menssage.empty, Validators.compose([
        Validators.required,
        Validators.pattern(Menssage.valiEmail),
        Validators.minLength(5)
      ])],
      jobTitle: [Menssage.empty, Validators.compose([
        Validators.required,
      ])],
      pais: [Menssage.empty, Validators.compose([
        Validators.required,
      ])],
      state: [Menssage.empty, Validators.compose([
        Validators.required,
      ])],
      shippingAddress: [Menssage.empty],
      password: [Menssage.empty, Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ])],
      passwordVerifi: [Menssage.empty, Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ])],
      idrol: [Menssage.empty, Validators.compose([
        Validators.required,
      ])],
    });
  }
  onSubmit(item: any){
    console.log(item)
    const list ={
      name: item.name,
      surname: item.surname,
      telephone: item.telephone,
      identificationCard: item.identificationCard,
      email: item.email,
      jobTitle: item.jobTitle,
      pais: item.pais,
      shippingAddress: item.shippingAddress,
      password: item.password,
      state:item.state,
      passwordVerifi: item.passwordVerifi,
      idrol: item.idrol,
      file:this.file
    }
    if (this.validType) {
      this.save(list)
    } else {
      this.editSave(list)
    }
  }
  save(item: any){
    if (this.valid(item)) {
      this.alert.loading();
      this.authService.create(item).then((resulta: any)=>{
          this.form.reset();
          this.router.navigate(['/home/usuarios/lista']);
      }).catch((err: any)=>{
        console.log(err)
        this.alert.error(Menssage.error, Menssage.server);
      });
  }
  }
  editSave(item: any){
    if (this.valid(item)) {
      this.alert.loading();
      this.authService.usersUpdate(item, this.dataUsers.id).then((resulta: any)=>{
          console.log(resulta)
          this.alert.success("Exitoso", resulta.mensaje)
      }).catch((err: any)=>{
        console.log(err)
        this.alert.error(Menssage.error, Menssage.server);
      });
    }
  }
  fileEvent(e) {
    this.file = e.target.files[0];
    console.log(this.file);
  }
  valid(item: any): boolean{
    let valid = true
    if (item.name === Menssage.empty) {
      this.alert.error(Menssage.error, Menssage.name);
      valid = false
    }
    if (item.surname === Menssage.empty) {
      this.alert.error(Menssage.error, Menssage.surname);
      valid = false
    }
    if (item.telephone === Menssage.empty) {
      this.alert.error(Menssage.error, Menssage.telephone);
      valid = false
    }
    if (item.identificationCard === Menssage.empty) {
      this.alert.error(Menssage.error, Menssage.identificationCard);
      valid = false
    }
    if (item.email === Menssage.empty) {
      this.alert.error(Menssage.error, Menssage.email);
      valid = false
    }
    if (item.password === Menssage.empty) {
      this.alert.error(Menssage.error, Menssage.password);
      valid = false
    }
    if (item.passwordVerifi === Menssage.empty) {
      this.alert.error(Menssage.error, Menssage.passwordVerifi);
      valid = false
    }
    if (item.passwordVerifi != item.password) {
      this.alert.error(Menssage.error, "El La contraseña deben ser iguales");
      valid = false
    }
    if (item.idrol === Menssage.empty) {
      this.alert.error(Menssage.error, Menssage.idrol);
      valid = false
    }
    
    return valid
  }

}
