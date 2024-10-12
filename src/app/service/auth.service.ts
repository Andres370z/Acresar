import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { RoutersLink } from '../models/router';
import { AlertService } from './alert.service';
import { HttpsService } from './https.service';
import {BehaviorSubject, Observable} from 'rxjs'
import { LocalstoreService } from './localstore.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private registeresquest: HttpsService,
    private route: Router, 
    private alert: AlertService,
    private http: HttpClient,
    private localStore: LocalstoreService,
  ) { }

  private dataSubject = new BehaviorSubject<any>(null); // Comportamiento inicial nulo
  private carteraSubject = new BehaviorSubject<any>(null);
  private comiSubject = new BehaviorSubject<any>(null);
  setData(data: any) {
    this.dataSubject.next(data); // Emitir el nuevo objeto
  }

  getDataObser() {
    return this.dataSubject.asObservable(); // Retornar el observable
  }

  // Para traspaso de cartera
  setCarteraData(data: any) {
    this.carteraSubject.next(data);
  }

  getCarteraDataObser() {
    return this.carteraSubject.asObservable();
  }

  // Para traspaso de comision
  setComisionData(data: any) {
    this.comiSubject.next(data);
  }

  getComisionDataObser() {
    return this.comiSubject.asObservable();
  }
  create(inform:any){
    const fm = new FormData;
    
    fm.append('name', inform.name);
    fm.append('last_name', inform.surname);
    fm.append('telephone', inform.telephone);
    fm.append('identificationCard', inform.identificationCard);
    fm.append('shippingAddress', inform.shippingAddress);
    fm.append('jobTitle', inform.jobTitle);
    fm.append('email', inform.email);
    fm.append('email_confirmation', inform.email);
    fm.append('password', inform.password);
    fm.append('password_confirmation', inform.passwordVerifi);
    fm.append('photo', inform.file);
    fm.append('state', inform.state);
    fm.append('perfil', inform.idrol);
    fm.append('pais', inform.pais);
    return  this.registeresquest.POST(RoutersLink.userCreate, fm)
  }

  usersUpdate(inform:any, id: number){
    const fm = new FormData;
    fm.append('name', inform.name);
    fm.append('last_name', inform.surname);
    fm.append('telephone', inform.telephone);
    fm.append('identificationCard', inform.identificationCard);
    fm.append('shippingAddress', inform.shippingAddress);
    fm.append('jobTitle', inform.jobTitle);
    fm.append('email', inform.email);
    fm.append('email_confirmation', inform.email);
    fm.append('password', inform.password);
    fm.append('password_confirmation', inform.passwordVerifi);
    fm.append('photo', inform.file);
    fm.append('state', inform.state);
    fm.append('perfil', inform.idrol); 
    fm.append('pais', inform.pais);
    return  this.registeresquest.POST(RoutersLink.userCreate+'/'+id, fm)
  }

  resgisterImageEvents(inform:any){
    return  this.registeresquest.POST(RoutersLink.resgisterImageEvents, inform)
  }
  loginAcresar(inform:any){
    return this.registeresquest.POSTS(RoutersLink.loginApi2, inform)
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
    return  this.registeresquest.GET(RoutersLink.getUsers)
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
  getMenuIdUsers(item: number, ){
    return  this.registeresquest.GET(RoutersLink.getMenuIdUsers+item)
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
    return this.registeresquest.GETER('reaseguradoras')
  } 
  getDtaContracts(){
    return this.registeresquest.GETER('rsltncntrts')
    .catch((error: any)=>{
      console.log(error)
    })
  }
  getReinsurer(){
    return this.registeresquest.GETER(RoutersLink.reaseguradoresList)
  }
  getTraspasocartera(){
    return this.registeresquest.GETER(RoutersLink.getTraspasocartera)
  }
  getTraspasocarteraCuenta(){
    return this.registeresquest.GETER(RoutersLink.getTraspasocarteraCuenta)
  }
  getEntities(){
    return this.registeresquest.GETER(RoutersLink.getEntities)
  }
  getCorredor(){
    return this.registeresquest.GETER(RoutersLink.getCorredor)
  }
  getAsegurado(){
    return this.registeresquest.GETER(RoutersLink.getAsegurado)
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
  postRazonsocial(inform: any){
    return this.registeresquest.POSTS(RoutersLink.postRazonSocial, inform)

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
  getRamosEdit(id: any){
    return this.registeresquest.GETER(`ramos/${id}/edit`)
    
  }
  getComision(id: any){
    return this.registeresquest.GETER(RoutersLink.getComision+id)
    
  }
  delete(id: any){
    return this.registeresquest.DELETED(RoutersLink.deleted + id)
  }
  getDtaForm(id: any){
    return this.registeresquest.GETER(RoutersLink.getDtaForm + id + '/edit')
  }

  getReaseguradoras(id: any){
    return this.registeresquest.GETER(RoutersLink.reasegurador + id + '/edit')
  }
  getDtaFormFacultativo(id: any){
    return this.registeresquest.GETER(RoutersLink.getDtaFormFacultativo + id + '/edit')
  }
  getCurrency(){
    return this.registeresquest.GETER(RoutersLink.getCurrency)
  }

  getSuper(){
    return this.registeresquest.GETER(RoutersLink.getSuper)
  }
  getSuperCodigos(){
    return this.registeresquest.GETER(RoutersLink.getNumRamos)
  }
  getDtaRamos(id: any){
    return this.registeresquest.GETER(RoutersLink.getDtaRamos + id)
  }
  
  getLoadRamos(id: string){
    return this.registeresquest.GETER(RoutersLink.getLoadRamos + id)
  }
  getFacultativoContrato(id: any){
    return this.registeresquest.GETER(RoutersLink.getFacultativoContrato + id)
  }
  
  getFacultativoContra(inform: any){
    return this.registeresquest.GETER(RoutersLink.getFacultativoContra + inform)
  }
  getContratoExcel(item: any){
    return this.registeresquest.GETER(RoutersLink.getContratoExcel + item )
  }
  getPoliza(){
    return this.registeresquest.GETER(RoutersLink.getPoliza)
  }
  getContratoExcelFaculta(item: any){
    return this.registeresquest.GETER(RoutersLink.getContratoExcelFaculta + item )
  }
  getEditReinsurer(id: any){
    return this.registeresquest.GETER(`reaseguradoras/${id}/edit`)
  }

  /** POST **/
  postFacultativosContratos(item: any){
    return this.registeresquest.POSTS(RoutersLink.postFacultativosContrato, {item})
  }
  postFcultativos(item: any){
    return this.registeresquest.POSTS(RoutersLink.postFacultativos, {item})
  }
  postCuotaparteNomina(item: any){
    return this.registeresquest.POSTS(RoutersLink.postCuotaparteNomina, {item})

  }
  postNomina(item: any){
    return this.registeresquest.POSTS(RoutersLink.postNomina, item)
  }
  postFacultativosAseguradoras(item: any){
    return this.registeresquest.POSTS(RoutersLink.postFacultativosAseguradoras, {item})
  }
  editRamos(item: any){
    return this.registeresquest.POSTS(RoutersLink.editRamos, {item})
  }
  postAseguradoraNomina(item: any){
    return this.registeresquest.POSTS(RoutersLink.postAseguradoraNomina, {item})
  }
  postFacultativosRamos(item: any){
    return this.registeresquest.POSTS(RoutersLink.postFacultativosRamos, {item})
  }

  postFacultativoGasto(item: any){
    return this.registeresquest.POSTS(RoutersLink.postFacultativoGasto, {item})

  }
  postCuotaRamo(item: any){
    return this.registeresquest.POSTS(RoutersLink.postCuotaRamo, {item})

  }

  //hice un cambio
  postBuscarContratos(item: any){
    return this.registeresquest.POSTS(RoutersLink.postBuscarContra, {item})
  }
  postBuscarAseguadora(item: any){
    return this.registeresquest.POSTS(RoutersLink.postAseguradoraSeach, {item})
  }
  postBuscarSiniestro(item: any){
    return this.registeresquest.POSTS(RoutersLink.postBuscarSiniestro, {item})
  }
  postFacultativoClient(item: any){
    return this.registeresquest.POSTS(RoutersLink.postAseguradoraClient, {item})
  }
  

  /**SOLICITUDES DE RESPALDO */
  postBuscarContratosRespaldo(item: any){
    return this.registeresquest.POSTRESPALDO(RoutersLink.postFacultativoContra, {item})
  }
  postFacultativoContraRespaldo(item: any){
    return this.registeresquest.POSTRESPALDO(RoutersLink.postFacultativoContra, {item})
  }
  postFacultativoContra(item: any){
    return this.registeresquest.POSTRESPALDO(RoutersLink.postFacultativoContra, {item})
  }
  postFacultativoContratb(item: any){
    return this.registeresquest.POSTRESPALDO(RoutersLink.postFacultativoContratb, {item})
  }
  postBuscarCuotaAparte(item: any){
    return this.registeresquest.POSTRESPALDO(RoutersLink.postSearchProporcionalesCuotaAparte, {item})
  }
  postContratoCuotaAparte(item: any){
    return this.registeresquest.POSTRESPALDO(RoutersLink.postContratoCuotaAparte, {item})
  }
  postEditContrato(item: any){
    return this.registeresquest.POSTRESPALDO(RoutersLink.postEditContrato, {item})
  }
  postEditCorredores(item: any, id: any){
    return this.registeresquest.POSTRESPALDO( `${RoutersLink.postCorredores}/${id}`, {item}, )
  }
  postEditClientes(item: any, id: any){
    return this.registeresquest.POSTRESPALDO( `${RoutersLink.postClientes}/${id}`, {item}, )
  }
  postEditAseguradores(item: any, id: any){
    return this.registeresquest.POSTRESPALDO( `${RoutersLink.postAseguradoras}/${id}`, {item}, )
  }
  postEditContratoFacultativo(item: any){
    return this.registeresquest.POSTRESPALDO(RoutersLink.postEditContratoFacultativo, {item})
  }
  postSearchIdcontracs(item: any){
    return this.registeresquest.POSTRESPALDO(RoutersLink.postSearchIdcontracs, {item})
  }
  postReporteNomina(item: any){
    return this.registeresquest.POSTRESPALDO(RoutersLink.postReporteNomina, {item})
  }
  postSinistroReporteNomina(item: any){
    return this.registeresquest.POSTRESPALDO(RoutersLink.postSinistroReporteNomina, {item})
  }
  postPolizaReporteNomina(item: any){
    return this.registeresquest.POSTRESPALDO(RoutersLink.postPolizaReporteNomina, {item})
  }
  postExcel(item: any){
    return this.registeresquest.POSTRESPALDO(RoutersLink.postExcel, {item})
  }
  postPolizaReasegurador(item: any){
    return this.registeresquest.POSTRESPALDO(RoutersLink.postPolizaReasegurador, {item})
  }
  postFacultaRamosEdit(item: any){
    return this.registeresquest.POSTRESPALDO(RoutersLink.postFacultaRamosEdit, {item})
    
  }

  postPrima(item: any){
    return this.registeresquest.POSTRESPALDO(RoutersLink.postPrimas, {item})
  }
  //DELETE
  deleteRea(id: any){
    return this.registeresquest.DELETED(RoutersLink.deleteReaseguradoras+id)
  }
  //PUT
  putCorredor(id: any, item: any){
    return this.registeresquest.PUTO(`${RoutersLink.postCorredores}/${id}`, {item})
  }
  putRea(id: any, item: any){
    return this.registeresquest.PUTO(`${RoutersLink.putReaseguradoras}/${id}`, {item})
  }
  putAse(id: any, item: any){
    return this.registeresquest.PUTO(`${RoutersLink.postAseguradoras}/${id}`, {item})
  }
  putRam(id: any, item: any){
    return this.registeresquest.PUTO(`${RoutersLink.getRamos}/${id}`, {item})
  }
  // preuba menu
  getMenu(){
    return this.http.get('./assets/json/menu.json')
  }
  logout(){
    this.localStore.clear();
    this.route.navigate([RoutersLink.login]);
  } 
}
