import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-facultativos',
  templateUrl: './facultativos.component.html',
  styleUrls: ['./facultativos.component.css']
})

export class FacultativosComponent implements OnInit {
  isLinear: boolean = false
  myMenuNew: boolean = false;
  public menuComplet: any
  public nuevoMenu: any
  mostrarMenu: boolean = false;
  
  /* Menu completo desde contentend */

  /* Menu Companias */
  companias: boolean = false;
  companiasReasegurador: boolean = false;
  companiasCorredor: boolean = false;
  companiasAsegurador: boolean = false;
  companiasIntermediario: boolean = false;
  companiasInfo: boolean = false;
  companiasClientesyProveedores: boolean = false;
  companiasReacoex: boolean = false;
  /* Menu Contratos */
  contratos: boolean = false;
  automaticos: boolean = false;
  contratosProporcionales: boolean = false;
  contratosProporcionalesCuotaAparte: boolean = false;
  contratosAutomaticos: boolean = false;
  facultativos: boolean = false;
  facultativosProporcionales: boolean = false;
  facultativosProporcionalesFaculta: boolean = false;
  facultativosEspeciales: boolean = false;
  facultativosEspecialesesFaculta: boolean = false;
  cotizacion: boolean = false;
  /*Asociacion de contratos Menu */
  asociacionContratos: boolean = false;
  ramos: boolean = false;
  contratosAsociacion: boolean = false;
  /*Administracion  Reaseguros Menu */
  administracionReaseguros: boolean = false;
  primas: boolean = false;
  reaseguroManual: boolean = false;
  reaseguroAutomatico: boolean = false;
  borrarRea: boolean = false;
  nuevaDistribucion: boolean = false;
  modificarDistribucion: boolean = false;
  nuevoAjuste: boolean = false;
  borrarAjuste: boolean = false;
  nuevaDistribucionFacultativos: boolean = false;
  nuevaDistribucionEspecial: boolean = false;
  nuevaDistribucionAutomaticos: boolean = false;
  modificarDistribucionProrroga: boolean = false;
  modificarDistribucionFaculta: boolean = false;
  modificarDistribucionAutomaticos: boolean = false;
  nuevoAjusteFacultativo: boolean = false;
  reaseguroAutomaticoCargar: boolean = false;
  reaseguroAutomaticoProcesar: boolean = false;
  sinistro: boolean = false;
  siniestroManual: boolean = false;
  siniestroAutomatico: boolean = false;
  manualDistribucion: boolean = false;
  manualModificarDistribucion: boolean = false;
  manualNuevoAjuste: boolean = false;
  manualBorrarAjuste: boolean = false;
  manualDistribucionFacultativos: boolean = false;
  manualDistribucionAutomaticos: boolean = false;
  siniestroAutomaticoCargar: boolean = false;
  siniestroAutomaticoProcesar: boolean = false;
  siniestroAutomaticoCargarReserva: boolean = false;
  siniestroAutomaticoProcesarReserva: boolean = false;
  /*Coaseguros */
  coaseguros: boolean = false;
  administracion: boolean = false;
  negocio: boolean = false;
  asignacionProvedores: boolean = false;
  admonProvedores: boolean = false;
  detalle: boolean = false;
  creacion: boolean = false;

  /*Reportes */
  reportes: boolean = false;
  constructor(
    private auth: AuthService
  ) { }

  ngOnInit(): void {

  }

  generarMenucCmpleto() {
    this.myMenuNew = true
    console.log('entra')
    this.menuComplet = null;

    const myMenu = {
      mainContent: {
        mainOptions: []
      }
    }
    if (this.myMenuNew) {
      /*Companias*/

      if (this.companias) {
        const optionscompanies = {
          title: "Compañias",
          subMenuCompanies: []
        }
        myMenu.mainContent.mainOptions.push(optionscompanies)
        //opcion reasegurador
        if (this.companiasReasegurador) {
          const companiasReaseguradorOptions = {
            name: "Reasegurador",
            subMenu: []
          }
          optionscompanies.subMenuCompanies.push(companiasReaseguradorOptions)
        }
        //Opcion Corredor
        if (this.companiasCorredor) {
          const compamiesCorredor = {
            name: "Corredor",
            subMneu: []
          }
          optionscompanies.subMenuCompanies.push(compamiesCorredor)
        }
        //Opcion Aseguradora
        if (this.companiasAsegurador) {
          const companiesAsegurador = {
            name: "Aseguradora",
            subMenu: []
          }
          optionscompanies.subMenuCompanies.push(companiesAsegurador)
        }
        //Opcion Intermediario
        if (this.companiasIntermediario) {
          const companiesIntermediary = {
            name: "Intermediario",
            subMenu: []
          }
          optionscompanies.subMenuCompanies.push(companiesIntermediary)
        }
        //Opcion Info
        if (this.companiasInfo) {
          const companiesInfo = {
            name: "Info",
            subMenu: []
          }
          optionscompanies.subMenuCompanies.push(companiesInfo)
        }
        //Opcion Clientes y Proveedores
        if (this.companiasClientesyProveedores) {
          const companiesClientsandSuppliers = {
            name: "Clientes y Proveedores",
            subMenu: []
          }
          optionscompanies.subMenuCompanies.push(companiesClientsandSuppliers)
        }
        //Reacoex
        if (this.companiasReacoex) {
          const companiesReacoex = {
            name: "Reacoex",
            subMenu: []
          }
          optionscompanies.subMenuCompanies.push(companiesReacoex)
        }


      }
      if (this.contratos) {
        const optionsContrats = {
          title: "Contratos",
          subMenuContracts: []
        }
        myMenu.mainContent.mainOptions.push(optionsContrats)
        //automaticos
        if (this.automaticos) {
          const contratosAutomaticosOptions = {
            name: "Automaticos",
            subMenu: []
          }
          optionsContrats.subMenuContracts.push(contratosAutomaticosOptions)
          if (this.contratosProporcionales) {
            const proporcionalesOptions = {
              name: "Proporcionales",
              subMenuProporcionales: []
            }
            contratosAutomaticosOptions.subMenu.push(proporcionalesOptions)
            if (this.contratosProporcionalesCuotaAparte) {
              const proporcionalesCuotaOptions = {
                name: "Cuota Aparte",
                subMenu: []
              }
              proporcionalesOptions.subMenuProporcionales.push(proporcionalesCuotaOptions)
            }
          }
          if(this.contratosAutomaticos){
            const automaticosOptions = {
              name: "Automaticos",
              subMenuAutomaticos: []
            }
            contratosAutomaticosOptions.subMenu.push(automaticosOptions)
          }
        }
        //Facultativos
        if(this.facultativos){
          const contratosFacultativosOptions = {
            name: "Facultativos",
            subMenu: []
          }
          optionsContrats.subMenuContracts.push(contratosFacultativosOptions);
          
        }
        
      }

    }



    this.menuComplet = myMenu;
  }

}
