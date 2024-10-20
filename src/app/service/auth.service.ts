import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { RoutersLink } from '../models/router';
import { AlertService } from './alert.service';
import { HttpsService } from './https.service';
import { BehaviorSubject, Observable } from 'rxjs'
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

  checkSession():boolean{
    return localStorage.getItem('rsltnsri')?true:false;
  }

  returnToken(): string {
    let tk = localStorage.getItem('rsltnsrt');
    return tk;
  }



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
  create(inform: any) {
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
    return this.registeresquest.POST(RoutersLink.userCreate, fm)
  }

  usersUpdate(inform: any, id: number) {
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
    return this.registeresquest.POST(RoutersLink.userCreate + '/' + id, fm)
  }

  resgisterImageEvents(inform: any) {
    return this.registeresquest.POST(RoutersLink.resgisterImageEvents, inform)
  }
  loginAcresar(inform: any) {
    return this.registeresquest.POSTS(RoutersLink.loginApi2, inform)
  }
  login(inform: any) {
    return this.registeresquest.POST(RoutersLink.loginApi, inform)
  }

  cerra() {
    this.alert.messagefin();
    localStorage.removeItem('token')
    this.route.navigate(['pages/login']);
  }

  getCity() {
    return this.registeresquest.GET(RoutersLink.city)
  }

  getStatus(item: string) {
    return this.registeresquest.GET(RoutersLink.status + item)
  }

  getUsers() {
    return this.registeresquest.GET(RoutersLink.getUsers)
  }



  getUsersData(item: number) {
    return this.registeresquest.GET(RoutersLink.getUsersData + item)
  }

  getCustomerDetail(item: string) {
    return this.registeresquest.GET(RoutersLink.customerDetail + item)
  }

  gettotal(item: number, search: string) {
    return this.registeresquest.GET(RoutersLink.gettotal + item + '&buscar=' + search)
  }

  getmenu(item: number,) {
    return this.registeresquest.GET(RoutersLink.menu + item)
  }
  getMenuIdUsers(item: number,) {
    return this.registeresquest.GET(RoutersLink.getMenuIdUsers + item)
  }


  gettotaldatagallery(item: number,) {
    return this.registeresquest.GET(RoutersLink.gettotaldatagallery + item)
  }

  getEvent(item: number) {
    return this.registeresquest.GET(RoutersLink.getEvent + item)
  }

  gettotaldata(item: number,) {
    return this.registeresquest.GET(RoutersLink.gettotaldata + item)
  }

  gettotaldataDelete(item: number,) {
    return this.registeresquest.GET(RoutersLink.gettotaldataDelete + item)
  }
  deleteRegisterImageEvent(item: number) {
    return this.registeresquest.GET(RoutersLink.deleteRegisterImageEvent + item)
  }
  getEventImg(item: number, itemEvent: string) {
    return this.registeresquest.GET(RoutersLink.getEventImg + item + '&idevento=' + itemEvent)
  }

  getCategory() {
    return this.registeresquest.GET(RoutersLink.category)
  }

  getBenefits() {
    return this.registeresquest.GET(RoutersLink.benefits)
  }
  getScale() {
    return this.registeresquest.GET(RoutersLink.scale)
  }

  getChallenges() {
    return this.registeresquest.GET(RoutersLink.challenges)
  }

  forgotPassword(item: string) {
    return this.registeresquest.GET(RoutersLink.forgotPassword + item)
  }

  createExpoalidos(inform: any) {
    const data = {
      businessName: inform.businessName,
      identificationCard: inform.identificationCard,
      idCategoryToRegister: inform.idCategoryToRegister,
      address: inform.address,
      phone: inform.phone,
      email: inform.email,
      monthlyBudget: inform.monthlyBudget,
      contactPerson: inform.contactPerson,
      terms: inform.terms,
      legalRepresentatives: inform.terms
    };
    return this.registeresquest.POST(RoutersLink.registerExpoAllies, data)
  }

  createChallenge(inform: any) {
    const formData = new FormData();
    formData.append("file", inform.file);
    formData.append("businessDescription", inform.description);
    formData.append("nit", inform.nit);
    formData.append("businessName", inform.businessName);
    formData.append("nameWorks", inform.name);
    formData.append("numberContact", inform.numberContact);
    formData.append("typeCategory", inform.typeCategory);
    return this.registeresquest.POST(RoutersLink.registerChallenge, formData)
  }

  createEditUsers(inform: any) {
    const data = {
      businessName: inform.businessName,
      identificationCard: inform.identificationCard,
      idCategoryToRegister: inform.idCategoryToRegister,
      address: inform.address,
      phone: inform.phone,
      email: inform.email,
      idCity: inform.idCity,
      businessDescription: inform.businessDescription,
      contactPerson: inform.contactPerson,
      telephoneContact: inform.telephoneContact,
      legalRepresentatives: inform.legalRepresentatives,
      password: inform.password,
      id: inform.id
    };
    return this.registeresquest.POST(RoutersLink.registerUpdate, data)
  }

  createUpdatePassword(inform: any) {
    const data = {
      id: inform.id,
      email: inform.email,
      password: inform.password,
    };
    return this.registeresquest.POST(RoutersLink.passwordUpdate, data)
  }

  createImgUpdate(inform: any) {
    const formData = new FormData();
    formData.append("file", inform.file);
    formData.append("id", inform.id);
    return this.registeresquest.POST(RoutersLink.imgUpdate, formData)
  }
  /*ANDRES*/

  getOne() {
    return this.registeresquest.GETER(RoutersLink.get)
  }
  getData() {
    return this.registeresquest.GETER('reaseguradoras')
  }
  getDtaContracts() {
    return this.registeresquest.GETER('rsltncntrts')
      .catch((error: any) => {
        console.log(error)
      })
  }
  getReinsurer() {
    return this.registeresquest.GETER(RoutersLink.reaseguradoresList)
  }
  getTraspasocartera() {
    return this.registeresquest.GETER(RoutersLink.getTraspasocartera)
  }
  getTraspasoCarteratipo() {
    return this.registeresquest.GETER(RoutersLink.getTraspasoCartera)
  }
  getTraspasocarteraCuenta() {
    return this.registeresquest.GETER(RoutersLink.getTraspasocarteraCuenta)
  }
  getEntities() {
    return this.registeresquest.GETER(RoutersLink.getEntities)
  }

  gersltncntrtst() {
    return this.registeresquest.GETER(RoutersLink.getrsltncntrts)
  }
  getCorredor() {
    return this.registeresquest.GETER(RoutersLink.getCorredor)
  }
  getAsegurado() {
    return this.registeresquest.GETER(RoutersLink.getAsegurado)
  }
  getAgency() {
    return this.registeresquest.GETER(RoutersLink.getAgency)
  }
  getAseguradoras() {
    return this.registeresquest.GETER(RoutersLink.getAseguradoras)
  }
  getPrima() {
    return this.registeresquest.GETER(RoutersLink.getPrimas)
  }
  getIntermediarios() {
    return this.registeresquest.GETER(RoutersLink.getIntermediarios)
  }
  getDirectorios() {
    return this.registeresquest.GETER(RoutersLink.getDirectorios)
  }
  getClients() {
    return this.registeresquest.GETER(RoutersLink.getClientes)
  }
  getCountries() {
    return this.registeresquest.GETER(RoutersLink.getPaises)
  }
  getDirectorio() {
    return this.registeresquest.GETER(RoutersLink.getDirectorio)
  }
  RegisterForm(item: any) {
    return this.registeresquest.POSTS(RoutersLink.reaseguradoresList, item)
  }
  postRazonsocial(item: any) {
    return this.registeresquest.POSTS(RoutersLink.postRazonSocial, {item})

  }
  getReacoex() {
    return this.registeresquest.GETER(RoutersLink.getReacoex)
  }
  getCorredoresList() {
    return this.registeresquest.GETER(RoutersLink.getCorredoresList)
  }
  getAsociacionList() {
    return this.registeresquest.GETER(RoutersLink.getAsociacionList)
  }
  getRamos() {
    return this.registeresquest.GETER(RoutersLink.getRamos)
  }
  getReaco() {
    return this.registeresquest.GETER(RoutersLink.getReaco)
  }
  getRamosEdit(id: any) {
    return this.registeresquest.GETER(`ramos/${id}/edit`)

  }
  getIntermediariosEdit(id: any) {
    return this.registeresquest.GETER(`/intermediarios/${id}/edit`)

  }
  getComision(id: any) {
    return this.registeresquest.GETER(RoutersLink.getComision + id)
  }
  getClientes(id: any) {
    return this.registeresquest.GETER(`/clientes/${id}/edit`)
  }
  getAutomaticoComision(id: any) {
    return this.registeresquest.GETER(RoutersLink.getAutomaticoComision + id)
  }
  delete(id: any) {
    return this.registeresquest.DELETED(RoutersLink.deleted + id)
  }
  deleteAseReporte(id: any) {
    return this.registeresquest.DELETED(RoutersLink.deleteAseReporte + id)
  }
  deleteIntermediario(id: any) {
    return this.registeresquest.DELETED(RoutersLink.deleteIntermediarios + id)
  }

  deleteCorredor(id: any) {
    return this.registeresquest.DELETED(RoutersLink.deleted + id)
  }
  deleteAse(id: any) {
    return this.registeresquest.DELETED(RoutersLink.deleteAse + id)
  }

  getDtaForm(id: any) {
    return this.registeresquest.GETER(RoutersLink.getDtaForm + id + '/edit')
  }

  getReaseguradoras(id: any) {
    return this.registeresquest.GETER(RoutersLink.reasegurador + id + '/edit')
  }
  getDtaFormFacultativo(id: any) {
    return this.registeresquest.GETER(RoutersLink.getDtaFormFacultativo + id + '/edit')
  }
  getCurrency() {
    return this.registeresquest.GETER(RoutersLink.getCurrency)
  }

  getSuper() {
    return this.registeresquest.GETER(RoutersLink.getSuper)
  }
  getSuperCodigos() {
    return this.registeresquest.GETER(RoutersLink.getNumRamos)
  }
  getProvedores() {
    return this.registeresquest.GETER(RoutersLink.getProvedores)
  }

  getAsoTipos() {
    return this.registeresquest.GETER(RoutersLink.getAsoTipos)
  }
  getDtaRamos(id: any) {
    return this.registeresquest.GETER(RoutersLink.getDtaRamos + id)
  }

  getLoadRamos(id: string) {
    return this.registeresquest.GETER(RoutersLink.getLoadRamos + id)
  }
  getFacultativoContrato(id: any) {
    return this.registeresquest.GETER(RoutersLink.getFacultativoContrato + id)
  }

  getFacultativoContra(item: any) {
    return this.registeresquest.GETER(RoutersLink.getFacultativoContra + item)
  }
  getContratoExcel(item: any) {
    return this.registeresquest.GETER(RoutersLink.getContratoExcel + item)
  }
  getPoliza() {
    return this.registeresquest.GETER(RoutersLink.getPoliza)
  }
  getContratoExcelFaculta(item: any) {
    return this.registeresquest.GETER(RoutersLink.getContratoExcelFaculta + item)
  }
  getEditReinsurer(id: any) {
    return this.registeresquest.GETER(`reaseguradoras/${id}/edit`)
  }
  getProveedores(id: any) {
    return this.registeresquest.GETER(`/provedores/${id}/edit`)
  }

  /** POST **/
  postFacultativosContratos(item: any) {
    return this.registeresquest.POSTS(RoutersLink.postFacultativosContrato, { item })
  }
  postSaveReportes(item: any) {
    return this.registeresquest.POSTS(RoutersLink.postSaveReportes, { item })
  }
  postGarantias(item: any) {
    return this.registeresquest.POSTS(RoutersLink.postGarantias, { item })
  }
  postDetallesGarantias(item: any) {
    return this.registeresquest.POSTS(RoutersLink.postDetallesGarantias, { item })
  }
  postContratoAsociacionFinal(item: any) {
    return this.registeresquest.POSTS(RoutersLink.postContratoAsociacionFinal, { item })
  }
  postSinistroRamo(item: any) {
    return this.registeresquest.POSTS(RoutersLink.postSinistroRamo, { item })
  }
  postAseSinistro(item: any) {
    return this.registeresquest.POSTS(RoutersLink.postAseSinistro, { item })
  }
  postAseSini(item: any) {
    return this.registeresquest.POSTS(RoutersLink.postAseSini, { item })
  }
  postAsocia(item: any) {
    return this.registeresquest.POSTS(RoutersLink.getAsociacionList, { item })
  }
  postFcultativos(item: any) {
    return this.registeresquest.POSTS(RoutersLink.postFacultativos, { item })
  }
  postBuscarAse(item: any) {
    return this.registeresquest.POSTS(RoutersLink.postBuscarAse, { item })
  }
  postContratoFinal(item: any) {
    return this.registeresquest.POSTS(RoutersLink.postContratoFinal, { item })
  }
  postAdmin(item: any) {
    return this.registeresquest.POSTS(RoutersLink.postAdmin, { item })
  }
  postContratosGet(item: any) {
    return this.registeresquest.POSTS(RoutersLink.postContratosGet, { item })
  }
  postCuotaparteNomina(item: any) {
    return this.registeresquest.POSTS(RoutersLink.postCuotaparteNomina, { item })
  }

  postContratoid(item: any) {
    return this.registeresquest.POSTS(RoutersLink.postContratoid, { item })
  }

  postForm(item: any) {
    return this.registeresquest.POSTS(RoutersLink.postForm, { item })
  }
  postValid(item: any) {
    return this.registeresquest.POSTS(RoutersLink.postValid, { item })
  }
  postUploadlist(item: any) {
    return this.registeresquest.POSTS(RoutersLink.postUploadlist, item )
  }
  postPrimaCarga(item: any) {
    return this.registeresquest.POSTS(RoutersLink.postPrimaCarga, item )
  }
  postNomina(item: any) {
    return this.registeresquest.POSTS(RoutersLink.postNomina, item)
  }
  postAseNominas(item: any) {
    return this.registeresquest.POSTS(RoutersLink.postAseNominas, {item})
  }
  getDtaCuotaAparte(item: any) {
    return this.registeresquest.POSTS(RoutersLink.getDtaCuotaAparte, {item})
  }
  postFacultativosAseguradoras(item: any) {
    return this.registeresquest.POSTS(RoutersLink.postFacultativosAseguradoras, { item })
  }
  postAseNomina(item: any) {
    return this.registeresquest.POSTS(RoutersLink.postAseNomina, { item })
  }
  editRamos(item: any) {
    return this.registeresquest.POSTS(RoutersLink.editRamos, { item })
  }
  postAseguradoraNomina(item: any) {
    return this.registeresquest.POSTS(RoutersLink.postAseguradoraNomina, { item })
  }
  postAseprocesoNomina(item: any) {
    return this.registeresquest.POSTS(RoutersLink.postAseprocesoNomina, { item })
  }
  postAsegetNomi(item: any) {
    return this.registeresquest.POSTS(RoutersLink.postAsegetNomi, { item })
  }
  postFacultativosRamos(item: any) {
    return this.registeresquest.POSTS(RoutersLink.postFacultativosRamos, { item })
  }
  postAseNominaFul(item: any) {
    return this.registeresquest.POSTS(RoutersLink.postAseNominaFul, { item })
  }

  postContactos(item: any) {
    return this.registeresquest.POSTS(RoutersLink.postContactos, { item })
  }

  postFacultativoGasto(item: any) {
    return this.registeresquest.POSTS(RoutersLink.postFacultativoGasto, { item })
  }
  postAseGetAse(item: any) {
    return this.registeresquest.POSTS(RoutersLink.postAseGetAse, { item })
  }
  postFacultaProcesoNomina(item: any) {
    return this.registeresquest.POSTS(RoutersLink.postFacultaProcesoNomina, { item })
  }
  postFacultativoRamo(item: any) {
    return this.registeresquest.POSTS(RoutersLink.postFacultativoRamo, { item })
  }
  postFaculProce(item: any) {
    return this.registeresquest.POSTS(RoutersLink.postFaculProce, { item })
  }
  postCuotaRamo(item: any) {
    return this.registeresquest.POSTS(RoutersLink.postCuotaRamo, { item })

  }
  postRamo(item: any) {
    return this.registeresquest.POSTS(RoutersLink.getRamos, { item })

  }

  //hice un cambio
  postBuscarContratos(item: any) {
    return this.registeresquest.POSTS(RoutersLink.postBuscarContra, { item })
  }
  postBuscarAseguadora(item: any) {
    return this.registeresquest.POSTS(RoutersLink.postAseguradoraSeach, { item })
  }
  postBuscarSiniestro(item: any) {
    return this.registeresquest.POSTS(RoutersLink.postBuscarSiniestro, { item })
  }
  postFacultativoClient(item: any) {
    return this.registeresquest.POSTS(RoutersLink.postAseguradoraClient, { item })
  }
  postAseProcesp(item: any) {
    return this.registeresquest.POSTS(RoutersLink.postAseProcesp, { item })
  }


  /**SOLICITUDES DE RESPALDO */
  postBuscarContratosRespaldo(item: any) {
    return this.registeresquest.POSTRESPALDO(RoutersLink.postFacultativoContra, { item })
  }
  postFacultativoContraRespaldo(item: any) {
    return this.registeresquest.POSTRESPALDO(RoutersLink.postFacultativoContra, { item })
  } 
  postFacultativoContra(item: any) {
    return this.registeresquest.POSTRESPALDO(RoutersLink.postFacultativoContra, { item })
  }
  postContratosComison(item: any) {
    return this.registeresquest.POSTRESPALDO(RoutersLink.postContratosComison, { item })
  }
  postFacultativoContratb(item: any) {
    return this.registeresquest.POSTRESPALDO(RoutersLink.postFacultativoContratb, { item })
  }
  postBuscarCuotaAparte(item: any) {
    return this.registeresquest.POSTRESPALDO(RoutersLink.postSearchProporcionalesCuotaAparte, { item })
  }
  postContratoCuotaAparte(item: any) {
    return this.registeresquest.POSTRESPALDO(RoutersLink.postContratoCuotaAparte, { item })
  }
  postEditContrato(item: any) {
    return this.registeresquest.POSTRESPALDO(RoutersLink.postEditContrato, { item })
  }
  postEditCorredores(item: any, id: any) {
    return this.registeresquest.POSTRESPALDO(`${RoutersLink.postCorredores}/${id}`, { item },)
  }
  postEditClientes(item: any, id: any) {
    return this.registeresquest.POSTRESPALDO(`${RoutersLink.postClientes}/${id}`, { item },)
  }
  postEditAseguradores(item: any, id?: any) {
    if (!id || id == null) {
      return this.registeresquest.POSTRESPALDO(RoutersLink.postAseguradoras, { item })
    } else if (item && id) {
      return this.registeresquest.POSTRESPALDO(`${RoutersLink.postAseguradoras}/${id}`, { item },)

    }
  }
  
  postClientes(item: any, id?: any) {
    if (!id || id == null) {
      return this.registeresquest.POSTRESPALDO(RoutersLink.postClientes, { item })
    } else if (item && id) {
      return this.registeresquest.POSTRESPALDO(`${RoutersLink.postClientes}/${id}`, { item },)

    }
  }
  postProveedores(item: any, id?: any) {
    if (!id || id == null) {
      return this.registeresquest.POSTRESPALDO(RoutersLink.getProvedores, { item })
    } else if (item && id) {
      return this.registeresquest.POSTRESPALDO(`${RoutersLink.getProvedores}/${id}`, { item },)

    }
  }
  postEditIntermediarios(item: any, id?: any) {
    if (!id || id == null) {
      return this.registeresquest.POSTRESPALDO(RoutersLink.getIntermediarios, { item })
    } else if (item && id) {
      return this.registeresquest.POSTRESPALDO(`${RoutersLink.getIntermediarios}/${id}`, { item },)

    }
  }
  postEditContratoFacultativo(item: any) {
    return this.registeresquest.POSTRESPALDO(RoutersLink.postEditContratoFacultativo, { item })
  }
  postContratosDetail(item: any) {
    return this.registeresquest.POSTRESPALDO(RoutersLink.postContratosDetail, { item })
  }
  postContraPoliza(item: any) {
    return this.registeresquest.POSTRESPALDO(RoutersLink.postContraPoliza, { item })
  }
  postContratosDetails(item: any) {
    return this.registeresquest.POSTS(RoutersLink.postContratosDetail, { item })
  }
  postSearchIdcontracs(item: any) {
    return this.registeresquest.POSTRESPALDO(RoutersLink.postSearchIdcontracs, { item })
  }
  postReporteNomina(item: any) {
    return this.registeresquest.POSTRESPALDO(RoutersLink.postReporteNomina, { item })
  }
  postSinistroReporteNomina(item: any) {
    return this.registeresquest.POSTRESPALDO(RoutersLink.postSinistroReporteNomina, { item })
  }
  postPolizaReporteNomina(item: any) {
    return this.registeresquest.POSTRESPALDO(RoutersLink.postPolizaReporteNomina, { item })
  }
  postExcel(item: any) {
    return this.registeresquest.POSTRESPALDO(RoutersLink.postExcel, { item })
  }
  postPolizaReasegurador(item: any) {
    return this.registeresquest.POSTRESPALDO(RoutersLink.postPolizaReasegurador, { item })
  }
  postFacultaRamosEdit(item: any) {
    return this.registeresquest.POSTRESPALDO(RoutersLink.postFacultaRamosEdit, { item })

  }
  postAseProceUpdate(item: any) {
    return this.registeresquest.POSTRESPALDO(RoutersLink.postAseProceUpdate, { item })

  }
  postPrima(item: any) {
    return this.registeresquest.POSTRESPALDO(RoutersLink.postPrimas, { item })
  }
  //DELETE
  deleteRea(id: any) {
    return this.registeresquest.DELETED(RoutersLink.deleteReaseguradoras + id)
  }
  //PUT
  putCorredor(id: any, item: any) {
    return this.registeresquest.PUTS(`${RoutersLink.postCorredores}/${id}`, { item })
  }
  putFacul(id: any, item: any) {
    return this.registeresquest.PUTS(`${RoutersLink.putFacul}/${id}`, { item })
  }

  putAseUpdate(id: any, item: any) {
    return this.registeresquest.PUTS(`${RoutersLink.putAseUpdate}/${id}`, { item })
  }
  putCuotaAparte(id: any, item: any) {
    return this.registeresquest.PUTS(`${RoutersLink.getDtaForm}/${id}`, { item })
  }
  
  

  putFaculUpdate(id: any, item: any) {
    return this.registeresquest.PUTS(`${RoutersLink.putFaculUpdate}/${id}`, { item })
  }
  putRea(id: any, item: any) {
    return this.registeresquest.PUTS(`${RoutersLink.putReaseguradoras}/${id}`, { item })
  }
  putAse(id: any, item: any) {
    return this.registeresquest.PUTS(`${RoutersLink.postAseguradoras}/${id}`, { item })
  }
  putRam(id: any, item: any) {
    return this.registeresquest.PUTS(`${RoutersLink.getRamos}/${id}`, { item })
  }
  putUpdatepoliza(id: any, item: any) {
    return this.registeresquest.PUTS(`${RoutersLink.putUpdatepoliza}/${id}`, { item })
  }
  putIntermediarios(item: any, id?: any) {
    if (!id || id == null) {
      return this.registeresquest.PUTS(RoutersLink.getIntermediarios, { item })
    } else if (item && id) {
      return this.registeresquest.PUTS(`${RoutersLink.getIntermediarios}/${id}`, { item },)

    }
  }
  putClientes(item: any, id?: any) {
    if (!id || id == null) {
      return this.registeresquest.PUTS(RoutersLink.postClientes, { item })
    } else if (item && id) {
      return this.registeresquest.PUTS(`${RoutersLink.postClientes}/${id}`, { item },)

    }
  }
  putProveedores(item: any, id?: any) {
    if (!id || id == null) {
      return this.registeresquest.PUTS(RoutersLink.getProvedores, { item })
    } else if (item && id) {
      return this.registeresquest.PUTS(`${RoutersLink.getProvedores}/${id}`, { item },)

    }
  }
  // preuba menu
  getMenu() {
    return this.http.get('./assets/json/menu.json')
  }
  logout() {
    this.localStore.clear();
    this.route.navigate([RoutersLink.login]);
  }
}
