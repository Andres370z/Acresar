import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { RoutersLink } from '../models/router';
import { AlertService } from './alert.service';
import { HttpsService } from './https.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private registeresquest: HttpsService,
    private route: Router, 
    private alert: AlertService
  ) { }

  create(inform:any){
    const data = {
      businessName: inform.businessName,
      identificationCard: inform.identificationCard,
      idCategoryToRegister: inform.idCategoryToRegister,
      address: inform.address,
      phone: inform.phone,
      email: inform.email,
      password: "sumateClaro",
      password_confirmation : "sumateClaro",
      idCity: inform.idCity
    };
    return  this.registeresquest.POST(RoutersLink.register, data)
  }

  resgisterImageEvents(inform:any){
    return  this.registeresquest.POST(RoutersLink.resgisterImageEvents, inform)
  }
  
  login(inform:any){
    return  this.registeresquest.POST(RoutersLink.loginApi, inform)
  }

  cerra(){
    this.alert.messagefin();
    localStorage.removeItem('token')
    this.route.navigate(['pages/login']);
  }

  getCity(){
    return  this.registeresquest.GET(RoutersLink.city)
  }

  getStatus(item: string){
    return  this.registeresquest.GET(RoutersLink.status+item)
  }

  getUsers(){
    return  this.registeresquest.GET("user")
  }

  getUsersData(item: number){
    return  this.registeresquest.GET(RoutersLink.getUsersData+item)
  }

  getCustomerDetail(item: string){
    return  this.registeresquest.GET(RoutersLink.customerDetail+item)
  }

  gettotal(item: number, search: string){
    return  this.registeresquest.GET(RoutersLink.gettotal+item+'&buscar='+search)
  }

  getmenu(item: number, ){
    return  this.registeresquest.GET(RoutersLink.menu+item)
  }

  gettotaldatagallery(item: number, ){
    return  this.registeresquest.GET(RoutersLink.gettotaldatagallery+item)
  }

  getEvent(item: number){
    return  this.registeresquest.GET(RoutersLink.getEvent+item)
  }
  
  gettotaldata(item: number, ){
    return  this.registeresquest.GET(RoutersLink.gettotaldata+item)
  }

  gettotaldataDelete(item: number, ){
    return  this.registeresquest.GET(RoutersLink.gettotaldataDelete+item)
  }
  deleteRegisterImageEvent(item: number){
    return  this.registeresquest.GET(RoutersLink.deleteRegisterImageEvent+item)
  }
  getEventImg(item: number, itemEvent: string){
    return  this.registeresquest.GET(RoutersLink.getEventImg+item+'&idevento='+itemEvent)
  }

  getCategory(){
    return  this.registeresquest.GET(RoutersLink.category)
  }

  getBenefits(){
    return  this.registeresquest.GET(RoutersLink.benefits)
  }
  getScale(){
    return  this.registeresquest.GET(RoutersLink.scale)
  }

  getChallenges(){
    return  this.registeresquest.GET(RoutersLink.challenges)
  }

  forgotPassword(item: string){
    return  this.registeresquest.GET(RoutersLink.forgotPassword+item)
  }

  createExpoalidos(inform:any){
    const data = {
      businessName: inform.businessName,
      identificationCard: inform.identificationCard,
      idCategoryToRegister: inform.idCategoryToRegister,
      address: inform.address,
      phone: inform.phone,
      email: inform.email,
      monthlyBudget: inform.monthlyBudget,
      contactPerson : inform.contactPerson,
      terms: inform.terms,
      legalRepresentatives: inform.terms
    };
    return  this.registeresquest.POST(RoutersLink.registerExpoAllies, data)
  }

  createChallenge(inform:any){
    const formData = new FormData(); 
    formData.append("file", inform.file);
    formData.append("businessDescription", inform.description);
    formData.append("nit", inform.nit);
    formData.append("businessName", inform.businessName);
    formData.append("nameWorks", inform.name);
    formData.append("numberContact", inform.numberContact);
    formData.append("typeCategory", inform.typeCategory);
    return  this.registeresquest.POST(RoutersLink.registerChallenge, formData)
  }

  createEditUsers(inform:any){
    const data = {
      businessName: inform.businessName,
      identificationCard: inform.identificationCard,
      idCategoryToRegister: inform.idCategoryToRegister,
      address: inform.address,
      phone: inform.phone,
      email: inform.email,
      idCity: inform.idCity,
      businessDescription: inform.businessDescription,
      contactPerson : inform.contactPerson,
      telephoneContact: inform.telephoneContact,
      legalRepresentatives: inform.legalRepresentatives,
      password: inform.password,
      id: inform.id
    };
    return  this.registeresquest.POST(RoutersLink.registerUpdate, data)
  }

  createUpdatePassword(inform:any){
    const data = {
      id: inform.id,
      email: inform.email,
      password: inform.password,
    };
    return  this.registeresquest.POST(RoutersLink.passwordUpdate, data)
  }

  createImgUpdate(inform:any){
    const formData = new FormData(); 
    formData.append("file", inform.file);
    formData.append("id", inform.id);
    return  this.registeresquest.POST(RoutersLink.imgUpdate, formData)
  }
  /*ANDRES*/
  getData(){
    return this.registeresquest.GETER('/reaseguradoras')
  } 
  getDtaContracts(){
    return this.registeresquest.GETER('/rsltncntrts')
    .catch((error: any)=>{
      console.log(error)
    })
  }
  getReinsurer(){
    return this.registeresquest.GETER(RoutersLink.reaseguradoresList)
  }
  getEntities(){
    return this.registeresquest.GETER(RoutersLink.getEntities)
  }
  getCorredor(){
    return this.registeresquest.GETER(RoutersLink.getCorredor)
  }
  getAseguradoras(){
    return this.registeresquest.GETER(RoutersLink.getAseguradoras)
  }
  getPrima(){
    return this.registeresquest.GETER(RoutersLink.getPrimas)
  }
  getIntermediarios(){
    return this.registeresquest.GETER(RoutersLink.getIntermediarios)
  }
  getDirectorios(){
    return this.registeresquest.GETER(RoutersLink.getDirectorios)
  }
  getClients(){
    return this.registeresquest.GETER(RoutersLink.getClientes)
  }
  getCountries(){
    return this.registeresquest.GETER(RoutersLink.getPaises)
  }
  RegisterForm(inform: any){
    return this.registeresquest.POSTS(RoutersLink.reaseguradoresList, inform)
  }
  getReacoex(){
    return this.registeresquest.GETER(RoutersLink.getReacoex)
  }
  getCorredoresList(){
    return this.registeresquest.GETER(RoutersLink.getCorredoresList)
  }
  getAsociacionList(){
    return this.registeresquest.GETER(RoutersLink.getAsociacionList)
  }
  getRamos(){
    return this.registeresquest.GETER(RoutersLink.getRamos)
  }
  delete(id: any){
    return this.registeresquest.DELETED(RoutersLink.deleted + id)
  }
  getDtaForm(id: any){
    return this.registeresquest.GETER(RoutersLink.getDtaForm + id + '/edit')
  }
  getCurrency(){
    return this.registeresquest.GETER(RoutersLink.getCurrency)
  }
  getDtaRamos(id: any){
    return this.registeresquest.GETER(RoutersLink.getDtaRamos + id)
  }
  postFcultativos(item: any){
    return this.registeresquest.POSTS(RoutersLink.postFacultativos, {item})
  }
  getLoadRamos(id: string){
    return this.registeresquest.GETER(RoutersLink.getDtaRamos + id)
  }
}
