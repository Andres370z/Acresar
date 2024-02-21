import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  constructor(
    private router: Router,
    private alert: AlertService,
    private localStore: LocalstoreService,
    public formBuilder: FormBuilder,
    private authService: AuthService,
  ) { 
    this.dataUsers = this.localStore.getItem("usersEdit")
    if (this.dataUsers) {
      this.validType = false;
      this.editAdd(this.dataUsers)
    }
  }
  editAdd(dataUsers: any) {
    this.form.controls.name.setValue(dataUsers.name);
    this.form.controls.surname.setValue(dataUsers.last_name);
    this.form.controls.telephone.setValue(dataUsers.telephone);
    this.form.controls.identificationCard.setValue(dataUsers.name);
    this.form.controls.email.setValue(dataUsers.email);
    this.form.controls.pais.setValue(dataUsers.pais);
    this.form.controls.jobTitle.setValue(dataUsers.jobTitle);
    this.form.controls.shippingAddress.setValue(dataUsers.shippingAddress);
    this.form.controls.idrol.setValue(dataUsers.perfil);
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
    if (this.validType) {
      this.save(item)
    } else {
      this.editSave(item)
    }
  }
  save(item: any){
    if (this.valid(item)) {
      this.alert.loading();
      this.authService.create(item).then((resulta: any)=>{
          this.form.reset();
      }).catch((err: any)=>{
        console.log(err)
        if (err.error.message != undefined) {
          this.authService.logout()
        }
        this.alert.error(Menssage.error, Menssage.server);
      });
  }
  }
  editSave(item: any){
    if (this.valid(item)) {
      this.alert.loading();
      this.authService.create(item).then((resulta: any)=>{
          this.form.reset();
      }).catch((err: any)=>{
        console.log(err)
        if (err.error.message != undefined) {
          this.authService.logout()
        }
        this.alert.error(Menssage.error, Menssage.server);
      });
  }
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
