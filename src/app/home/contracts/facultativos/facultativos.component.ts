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
  munuList: any = {
    path: "/home/content",
    title: "Home",
    type: "link",
    icontype: "home",
    collapse: null,
    children: null,
    imgMenu: null,
    idRol: 1,
    idUsers: 2
}
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
          path: "/home/companias",
          title: "Compañias",
          type: "link",
          icontype: "dashboard",
          collapse: null,
          children: [],
          imgMenu: null,
          idRol: 1,
          idUsers: 2
        }
        myMenu.mainContent.mainOptions.push(optionscompanies)
        //opcion reasegurador
        if (this.companiasReasegurador) {
          const companiasReaseguradorOptions = {
            name: "Reasegurador",
            url: "home/companias/reinsurer",
            subMenu: []
          }
          optionscompanies.children.push(companiasReaseguradorOptions)
        }
        //Opcion Corredor
        if (this.companiasCorredor) {
          const compamiesCorredor = {
            name: "Corredor",
            url: "home/companias/corredor",
            subMneu: []
          }
          optionscompanies.children.push(compamiesCorredor)
        }
        //Opcion Aseguradora
        if (this.companiasAsegurador) {
          const companiesAsegurador = {
            name: "Aseguradora",
            url: "home/companias/insurance-carrier",
            subMenu: []
          }
          optionscompanies.children.push(companiesAsegurador)
        }
        //Opcion Intermediario
        if (this.companiasIntermediario) {
          const companiesIntermediary = {
            name: "Intermediario",
            url: "home/companias/intermediary",
            subMenu: []
          }
          optionscompanies.children.push(companiesIntermediary)
        }
        //Opcion Info
        if (this.companiasInfo) {
          const companiesInfo = {
            name: "Info",
            url: "home/companias/info/directorio",
            subMenu: []
          }
          optionscompanies.children.push(companiesInfo)
        }
        //Opcion Clientes y Proveedores
        if (this.companiasClientesyProveedores) {
          const companiesClientsandSuppliers = {
            name: "Clientes y Proveedores",
            url: "home/companias/clients",
            subMenu: []
          }
          optionscompanies.children.push(companiesClientsandSuppliers)
        }
        //Reacoex
        if (this.companiasReacoex) {
          const companiesReacoex = {
            name: "Reacoex",
            url: "home/companias/reacoex",
            subMenu: []
          }
          optionscompanies.children.push(companiesReacoex)
        }


      }
      if (this.contratos) {
        const optionsContrats = {
          path: "/home/companias",
          title: "Contratos",
          type: "link",
          icontype: "dashboard",
          collapse: null,
          children: [],
          imgMenu: null,
          idRol: 1,
          idUsers: 2
        }
        myMenu.mainContent.mainOptions.push(optionsContrats)
        //automaticos
        if (this.automaticos) {
          const contratosAutomaticosOptions = {
            name: "Automatico",
            url: "home/contracts/Automaticos",
            subMenu: []
          }
          optionsContrats.children.push(contratosAutomaticosOptions)
          if (this.contratosProporcionales) {
            const proporcionalesOptions = {
              name: "Proporcionales",
              url: "home/contracts/Automaticos/proporcionales",
              subMenuProporcionales: []
            }
            contratosAutomaticosOptions.subMenu.push(proporcionalesOptions)
            if (this.contratosProporcionalesCuotaAparte) {
              const proporcionalesCuotaOptions = {
                name: "Cuota Aparte",
                url: "home/contracts/Automaticos/proporcionales/cuota-parte",
                subMenu: []
              }
              proporcionalesOptions.subMenuProporcionales.push(proporcionalesCuotaOptions)
            }
          }
          if(this.contratosAutomaticos){
            const automaticosOptions = {
              name: "Automaticos",
              url: "home/companias/clients",
              subMenuAutomaticos: []
            }
            contratosAutomaticosOptions.subMenu.push(automaticosOptions)
          }
        }
        //Facultativos
        if(this.facultativos){
          const contratosFacultativosOptions = {
            path: "home/contracts/Facultativos",
            title: "Contratos",
            type: "link",
            icontype: "dashboard",
            collapse: null,
            children: [],
            imgMenu: null,
            idRol: 1,
            idUsers: 2
          }
          contratosFacultativosOptions.children.push(contratosFacultativosOptions);
          if (this.facultativosProporcionales) {
            const proporcionalesOptions = {
              name: "Proporcionales",
              url: "home/contracts/Facultativos/proporcionales",
              subMenuProporcionales: []
            }
            contratosFacultativosOptions.children.push(proporcionalesOptions)
            if (this.facultativosProporcionales) {
              const proporcionalesCuotaOptions = {
                name: "Cuota Aparte",
                url: "home/contracts/Facultativos/proporcionales/facultativos",
                subMenu: []
              }
              proporcionalesOptions.subMenuProporcionales.push(proporcionalesCuotaOptions)
            }
            if (this.facultativosEspeciales) {
              const proporcionalesCuotaOptions = {
                name: "Facultativos",
                url: "home/reinsuranceAdministration/primas/new-distribuition",
                subMenu: []
              }
              proporcionalesOptions.subMenuProporcionales.push(proporcionalesCuotaOptions)
            }
          }
          if (this.facultativosEspeciales) {
            const proporcionalesOptions = {
              name: "Proporcionales",
              url: "home/reinsuranceAdministration/primas/new-distribuition",
              subMenuProporcionales: []
            }
            contratosFacultativosOptions.children.push(proporcionalesOptions)
            if (this.facultativosEspecialesesFaculta) {
              const proporcionalesCuotaOptions = {
                name: "Facultativos",
                url: "home/reinsuranceAdministration/primas/new-distribuitio",
                subMenu: []
              }
              proporcionalesOptions.subMenuProporcionales.push(proporcionalesCuotaOptions)
            }
          }
        }
        
      }
      if (this.companias) {
        const optionscompanies = {
          path: "/home/companias",
          title: "Compañias",
          type: "link",
          icontype: "dashboard",
          collapse: null,
          children: [],
          imgMenu: null,
          idRol: 1,
          idUsers: 2
        }
        myMenu.mainContent.mainOptions.push(optionscompanies)
        //opcion reasegurador
        if (this.companiasReasegurador) {
          const companiasReaseguradorOptions = {
            name: "Reasegurador",
            url: "home/companias/reinsurer",
            subMenu: []
          }
          optionscompanies.children.push(companiasReaseguradorOptions)
        }
        //Opcion Corredor
        if (this.companiasCorredor) {
          const compamiesCorredor = {
            name: "Corredor",
            url: "home/companias/corredor",
            subMneu: []
          }
          optionscompanies.children.push(compamiesCorredor)
        }
        //Opcion Aseguradora
        if (this.companiasAsegurador) {
          const companiesAsegurador = {
            name: "Aseguradora",
            url: "home/companias/insurance-carrier",
            subMenu: []
          }
          optionscompanies.children.push(companiesAsegurador)
        }
        //Opcion Intermediario
        if (this.companiasIntermediario) {
          const companiesIntermediary = {
            name: "Intermediario",
            url: "home/companias/intermediary",
            subMenu: []
          }
          optionscompanies.children.push(companiesIntermediary)
        }
        //Opcion Info
        if (this.companiasInfo) {
          const companiesInfo = {
            name: "Info",
            url: "home/companias/info/directorio",
            subMenu: []
          }
          optionscompanies.children.push(companiesInfo)
        }
        //Opcion Clientes y Proveedores
        if (this.companiasClientesyProveedores) {
          const companiesClientsandSuppliers = {
            name: "Clientes y Proveedores",
            url: "home/companias/clients",
            subMenu: []
          }
          optionscompanies.children.push(companiesClientsandSuppliers)
        }
        //Reacoex
        if (this.companiasReacoex) {
          const companiesReacoex = {
            name: "Reacoex",
            url: "home/companias/reacoex",
            subMenu: []
          }
          optionscompanies.children.push(companiesReacoex)
        }


      }

    }



    this.menuComplet = myMenu;
  }

}
