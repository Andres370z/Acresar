import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Menssage } from 'src/app/models/router';
import { SafeUrl } from '@angular/platform-browser';
import { AlertService } from 'src/app/service/alert.service';
import { AuthService } from 'src/app/service/auth.service';
import { LocalstoreService } from 'src/app/service/localstore.service';
import { MenuService } from 'src/app/service/menu.service';
import html2canvas from "html2canvas";

@Component({
  selector: 'app-cistom-menu',
  templateUrl: './custom-menu.component.html',
  styleUrls: ['./custom-menu.component.css']
})
export class CistomMenuComponent implements OnInit {
  @ViewChild('screen') screen: ElementRef;
  @ViewChild('canvas') canvas: ElementRef;
  @ViewChild('downloadLink') downloadLink: ElementRef;
  public menuItems: any[] = [];
  isLinear: boolean = false
  //menu completo
  companias: boolean = false;
  contratos: boolean = false;
  asociacionContratos: boolean = false;
  adminreaseguros: boolean = false;
  gerencial: boolean = false;
  resportes: boolean = false;
  monitoreoContracs: boolean = false;
  menuLateral: boolean = false;
  //menu compañias
  companiasReasegurador: boolean = false;
  companiasCorredor: boolean = false;
  companiasAsegurador: boolean = false;
  companiasIntermediario: boolean = false;
  companiasInfo: boolean = false;
  companiasClientesyProveedores: boolean = false;
  companiasReacoex: boolean = false;
  //menu contratos
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
  ramos: boolean = false;
  contratosAsociacion: boolean = false;
  /*Administracion  Reaseguros Menu */
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
  nuevoAjusteAutomaticos: Boolean = false;
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
  /* Gerencial Menu */
  administracion: boolean = false;
  negocio: boolean = false;
  asigproveedores: boolean = false;
  admonProveedores: boolean = false;
  detalle: boolean = false;
  creacion: boolean = false;
  /*  Reportes */
  primasReporte: boolean = false;
  siniestrosReportes: boolean = false;
  cartera: boolean = false;
  informes: boolean = false;
  reporCesion: boolean = false;
  reauxPrima: boolean = false;
  reporteAutomatico: boolean = false;
  reporteFacultativo: boolean = false;
  resumenSinistros: boolean = false;
  reauxSinistro: boolean = false;
  reaseguroSinistro: boolean = false;
  reaseguradorCartera: boolean = false;
  companiaCartera: boolean = false;
  proveedorCartera: boolean = false;
  vencimientoCartera: boolean = false;
  pagosCartera: boolean = false;
  vencimientoCarteraReasegurador: boolean = false;
  vencimientoCarteraCmpania: boolean = false;
  vencimientoCarteraProveedor: boolean = false;
  /* Monitoreo de Contratos */
  monitoreoAutomaticos: boolean = false;
  monitoreoFacultativos: boolean = false;
  /* Menu lateral */
  resolutionLateral: boolean = false;
  reasegurosLateral: boolean = false;
  configuracionLateral: boolean = false;
  reportesLateral: boolean = false;
  seguridadLateral: boolean = false;
  servicedeskLateral: boolean = false;
  inicioLateral: boolean = false;
  ayudaLateral: boolean = false;
  ajusteReaseguroLateral: boolean = false;
  asociacionReaseguroLateral: boolean = false;
  contratosReaseguroLateral: boolean = false;
  companiasReaseguroLateral: boolean = false;
  cumulusReaseguroLateral: boolean = false;
  eliminarReaseguroLateral: boolean = false;
  lineasReaseguroLateral: boolean = false;
  reaseguroReaseguroLateral: boolean = false;
  contratosconfiguracionLateral: boolean = false;
  charJsreportesLateral: boolean = false;
  morrisreportesLateral: boolean = false;
  flotreportesLateral: boolean = false;
  inlineChartsreportesLateral: boolean = false;
  myDta: any;
  public nameUser: any
  public menuCompletOne: any
  public menuComplet: any
  public menuCompletTwo: any
  public menuCompletTree: any
  public menuCompletFour: any
  public menuCompletFive: any
  public menuCompletSix: any
  public nuevoMenu: any
  mostrarMenu: boolean = false;
  public dataUsers: any;
  public myAngularxQrCode: string = "";
  public qrCodeDownloadLink: SafeUrl = "";
  img: boolean = false;
  imgCreate: any;
  constructor(
    private menuService: MenuService,
    private router: Router,
    private _https:AuthService,
    private alert: AlertService,
    private localStore: LocalstoreService,
  ) {
    this.dataUsers = this.localStore.getItem("usersList")
    console.log(this.dataUsers.id)
    this.getMenu(this.dataUsers.id);
    let idBase = btoa(this.dataUsers.id.toString())
    this.myAngularxQrCode = `https://card.systemresolution.com/${idBase}`;
  }

  onChangeURL(url: SafeUrl) {
    this.qrCodeDownloadLink = url;
  }

  
  ngOnInit(): void {
    if (this.dataUsers) {
      this.nameUser = this.dataUsers.name;
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
    
    this.img = true;
  }
  saveDta() {
    const myFirstMenu = {
      mainOptions: []
    }

    if (this.companias) {
      const optionscompanies = {
        path: "home/companias",
        title: "Compañias",
        type: "link",
        icontype: "dashboard",
        collapse: null,
        imgMenu: null,
        idRol: this.dataUsers.id_rol,
        idUsers: this.dataUsers.id,
        children: [],
        id:null
      }
      myFirstMenu.mainOptions.push(optionscompanies)
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
      this.menuCompletOne = optionscompanies

    }
    if (this.contratos) {
      const optionsContrats = {
        path: "home/contracts",
        title: "Contratos",
        type: "link",
        icontype: "dashboard",
        collapse: null,
        imgMenu: null,
        idRol: this.dataUsers.id_rol,
        idUsers: this.dataUsers.id,
        children: []
      }
      myFirstMenu.mainOptions.push(optionsContrats)
      //automaticos
      if (this.automaticos) {
        const contratosAutomaticosOptions = {
          name: "Automaticos",
          url: "home/contracts/Facultativos",
          subMenu: []
        }
        optionsContrats.children.push(contratosAutomaticosOptions)
        if (this.contratosProporcionales) {
          const proporcionalesOptions = {
            name: "Proporcionales",
            url: "home/contratos/automaticos/proporcionales/list",
            subMenu: []
          }
          contratosAutomaticosOptions.subMenu.push(proporcionalesOptions)
          if (this.contratosProporcionalesCuotaAparte) {
            const proporcionalesCuotaOptions = {
              name: "Cuota Aparte",
              url: "home/contracts/Automaticos/proporcionales/cuota-parte",
              subMenu: []
            }
            proporcionalesOptions.subMenu.push(proporcionalesCuotaOptions)
          }
        }
        if (this.contratosAutomaticos) {
          const automaticosOptions = {
            name: "Automaticos",
            url: "home/contracts/Facultativos",
            subMenu: []
          }
          contratosAutomaticosOptions.subMenu.push(automaticosOptions)
        }
      }
      //Facultativos
      if (this.facultativos) {
        const contratosFacultativosOptions = {
          name: "Facultativos",
          url: "home/contratos/facultativos/list",
          subMenu: []
        }
        optionsContrats.children.push(contratosFacultativosOptions);
        if (this.facultativosProporcionales) {
          const facuproOptions = {
            name: "Propocionales",
            url: "home/contracts/Facultativos/proporcionales",
            subMenu: []
          }
          contratosFacultativosOptions.subMenu.push(facuproOptions)
          if (this.facultativosProporcionalesFaculta) {
            const facultaOptions = {
              name: "Facultativos",
              url: "home/contracts/Facultativos/proporcionales/facultativos",
              subMenu: []
            }
            facuproOptions.subMenu.push(facultaOptions)
          }
        }
        if (this.facultativosEspeciales) {
          const faculEspeciales = {
            name: "Especiales",
            url: "home/contratos/facultativos-especial/proporcionales/list",
            subMenu: []
          }
          contratosFacultativosOptions.subMenu.push(faculEspeciales)
          if (this.facultativosEspecialesesFaculta) {
            const especiOptions = {
              name: "Facultativos",
              url: "home/contracts/Facultativos/especiales/especiles-facultativos",
              subMenu: []
            }
            faculEspeciales.subMenu.push(especiOptions)
          }
        }


      }
      //Cotizacion
      if (this.cotizacion) {
        const cotizacion = {
          name: "Cotización",
          url: "home/contratos",
          subMenu: []
        }
        optionsContrats.children.push(cotizacion)
      }
      this.menuCompletTree = optionsContrats
    }

    if (this.asociacionContratos) {
      const menuAsociacion = {
        path: "home/asociacion/contratos",
        title: "Asociación de Contratos",
        type: "link",
        icontype: "dashboard",
        collapse: null,
        imgMenu: null,
        idRol: this.dataUsers.id_rol,
        idUsers: this.dataUsers.id,
        children: []
      }
      myFirstMenu.mainOptions.push(menuAsociacion)
      if (this.ramos) {
        const ramos = {
          name: "Ramos",
          url: "home/asociacion/ramos",
          subMenu: []
        }
        menuAsociacion.children.push(ramos)
      }
      if (this.contratosAsociacion) {
        const contratosAsociacion = {
          name: "Asociación de Contratos",
          url: "home/asociacion/asociacion-contratos",
          subMenu: []
        }
        menuAsociacion.children.push(contratosAsociacion)
      }
      this.menuCompletFour = menuAsociacion
    }

    if (this.adminreaseguros) {
      const myMenu = {
        path: "home/reinsuranceAdministration/primas",
        title: "Administración de reaseguros",
        icontype: "dashboard",
        type: "link",
        collapse: null,
        imgMenu: null,
        idRol: this.dataUsers.id_rol,
        idUsers: this.dataUsers.id,
        children: []
      };
      myFirstMenu.mainOptions.push(myMenu)
      // Opción Primas
      if (this.primas) {
        const optionsPrimas = {
          name: "Primas",
          url: "home/reinsuranceAdministration/primas",
          subMenu: []
        };
        myMenu.children.push(optionsPrimas);

        // Subopción Reaseguro Manual
        if (this.reaseguroManual) {
          const reaseguroManualOptions = {
            name: "Reaseguro Manual",
            url: "home/contratos/ajuste/primas",
            subMenu: []
          };
          optionsPrimas.subMenu.push(reaseguroManualOptions);

          // Sub-subopción Nueva Distribución
          if (this.nuevaDistribucion) {
            const nuevaDistribucionOptions = {
              name: "Nueva Distribución",
              url: "home/reinsuranceAdministration/primas/new-distribuition",
              subMenu: []
            };
            reaseguroManualOptions.subMenu.push(nuevaDistribucionOptions);

            // Sub-sub-subopciones para Nueva Distribución
            if (this.nuevaDistribucionFacultativos) {
              nuevaDistribucionOptions.subMenu.push({
                name: "Facultativos",
                url: "home/reinsuranceAdministration/primas/new-distribuition/primas-facultativos",
                subMenu: []
              });
            }
            if (this.nuevaDistribucionEspecial) {
              nuevaDistribucionOptions.subMenu.push({
                name: "Facultativos Especial",
                url: "home/reinsuranceAdministration/primas/new-distribuition/primas-especiales",
                subMenu: []
              });
            }
            if (this.nuevaDistribucionAutomaticos) {
              nuevaDistribucionOptions.subMenu.push({
                name: "Automaticos",
                url: "home/reinsuranceAdministration/primas/new-distribuition/primas-automaticos",
                subMenu: []
              });
            }
          }

          // Sub-subopción Modificar Distribución
          if (this.modificarDistribucion) {
            const modificarDistribucionOptions = {
              name: "Modificar Distribución",
              url: "home/administracion/reaseguros",
              subMenu: []
            };
            reaseguroManualOptions.subMenu.push(modificarDistribucionOptions);

            // Sub-sub-subopciones para Modificar Distribución
            if (this.modificarDistribucionProrroga) {
              modificarDistribucionOptions.subMenu.push({
                name: "Prorroga",
                url: "home/contratos/ajuste/modificar-primas",
                subMenu: []
              });
            }
            if (this.modificarDistribucionFaculta) {
              modificarDistribucionOptions.subMenu.push({
                name: "Modificar Facultativo",
                url: "home/contratos/ajuste/modificar-primas",
                subMenu: []
              });
            }
            if (this.modificarDistribucionAutomaticos) {
              modificarDistribucionOptions.subMenu.push({
                name: "Modificar Automaticos",
                url: "home/contratos/ajuste/modificar-primas-automatico",
                subMenu: []
              });
            }
          }

          // Sub-subopción Nuevo Ajuste
          if (this.nuevoAjuste) {
            const nuevoAjusteOptions = {
              name: "Nuevo Ajuste",
              url: "home/contratos/ajuste/ajustes-primas",
              subMenu: []
            };
            reaseguroManualOptions.subMenu.push(nuevoAjusteOptions);

            // Sub-sub-subopciones para Nuevo Ajuste
            if (this.nuevoAjusteFacultativo) {
              nuevoAjusteOptions.subMenu.push({
                name: "Ajuste Facultativos",
                ulr: "home/contratos/ajuste/ajustes-primas",
                subMenu: []
              });
            }
            if (this.nuevoAjusteAutomaticos) {
              nuevoAjusteOptions.subMenu.push({
                name: "Ajuste Automaticos",
                url: "home/contratos/ajuste/ajustes-primas",
                subMenu: []
              });
            }
          }

          // Sub-subopción Borrar Ajuste
          if (this.borrarAjuste) {
            reaseguroManualOptions.subMenu.push({
              name: "Borrar Ajuste",
              url: "home/contratos/ajuste/ajustes-primas",
              subMenu: []
            });
          }
        }

        // Subopción Reaseguro Automatico
        if (this.reaseguroAutomatico) {
          const reaseguroAutomaticoOptions = {
            name: "Reaseguro Automatico",
            url: "",
            subMenu: []
          };
          optionsPrimas.subMenu.push(reaseguroAutomaticoOptions);

          // Sub-subopciones para Reaseguro Automatico
          if (this.reaseguroAutomaticoCargar) {
            reaseguroAutomaticoOptions.subMenu.push({
              name: "Cargar",
              url: "",
              subMenu: []
            });
          }
          if (this.reaseguroAutomaticoProcesar) {
            reaseguroAutomaticoOptions.subMenu.push({
              name: "Procesar",
              url: "",
              subMenu: []
            });
          }
        }

        // Subopción Borrar Distribucion Rea
        if (this.borrarRea) {
          optionsPrimas.subMenu.push({
            name: "Borrar Distribucion Rea",
            url: "",
            subMenu: [],

          });
        }
      }

      // Opción Siniestro
      if (this.sinistro) {
        const optionsSinistro = {
          name: "Siniestro",
          subMenu: [],
          url: "home/contratos/ajuste/list-siniestro"
        };
        myMenu.children.push(optionsSinistro);

        // Subopción Siniestro Manual
        if (this.siniestroManual) {
          const siniestroManualOptions = {
            name: "Reaseguro Manual",
            subMenu: [],
            url: "home/contratos/ajuste/primas"
          };
          optionsSinistro.subMenu.push(siniestroManualOptions);

          // Sub-subopción Nueva Distribución
          if (this.manualDistribucion) {
            const manualDistribucionOptions = {
              name: "Nueva Distribución",
              subMenu: [],
              url: "home/contratos/ajuste/list-siniestro"
            };
            siniestroManualOptions.subMenu.push(manualDistribucionOptions);

            // Sub-sub-subopciones para Nueva Distribución
            if (this.manualDistribucionFacultativos) {
              manualDistribucionOptions.subMenu.push({
                name: "Facultativos",
                subMenu: [],
                url: "home/contratos/ajuste/siniestros-facultativos"
              });
            }
            if (this.manualDistribucionAutomaticos) {
              manualDistribucionOptions.subMenu.push({
                name: "Automaticos",
                subMenu: [],
                url: "home/contratos/ajuste/siniestros-facultativos"
              });
            }
          }

          // Sub-subopción Modificar Distribución
          if (this.manualModificarDistribucion) {
            siniestroManualOptions.subMenu.push({
              name: "Modificar Distribución",
              url: "",
              subMenu: []
            });
          }

          // Sub-subopción Nuevo Ajuste
          if (this.manualNuevoAjuste) {
            siniestroManualOptions.subMenu.push({
              name: "Nuevo Ajuste",
              url: "",
              subMenu: []
            });
          }

          // Sub-subopción Borrar Ajuste
          if (this.manualBorrarAjuste) {
            siniestroManualOptions.subMenu.push({
              name: "Borrar Ajuste",
              url: "",
              subMenu: []
            });
          }
        }

        // Subopción Siniestro Automatico
        if (this.siniestroAutomatico) {
          const siniestroAutomaticoOptions = {
            name: "Reaseguro Automatico",
            url: "",
            subMenu: [],

          };
          optionsSinistro.subMenu.push(siniestroAutomaticoOptions);

          // Sub-subopciones para Siniestro Automatico
          if (this.siniestroAutomaticoCargar) {
            siniestroAutomaticoOptions.subMenu.push({
              name: "Cargar Sinistros Pagados",
              url: "",
              subMenu: [],

            });
          }
          if (this.siniestroAutomaticoProcesar) {
            siniestroAutomaticoOptions.subMenu.push({
              name: "Procesar Sinistros Pagados",
              url: "",
              subMenu: [],

            });
          }
          if (this.siniestroAutomaticoCargarReserva) {
            siniestroAutomaticoOptions.subMenu.push({
              name: "Cargar reserva de siniestros",
              url: "",
              subMenu: [],

            });
          }
          if (this.siniestroAutomaticoProcesarReserva) {
            siniestroAutomaticoOptions.subMenu.push({
              name: "Procesar Reserva de pagados",
              url: "",
              subMenu: [],

            });
          }
        }
      }


      console.log(myMenu);
      this.menuCompletTwo = myMenu
    }

    if (this.gerencial) {
      const gerencial = {
        path: "home/gerencial",
        title: "Gerencial",
        icontype: "dashboard",
        type: "link",
        collapse: null,
        imgMenu: null,
        idRol: this.dataUsers.id_rol,
        idUsers: this.dataUsers.id,
        children: []

      }
      myFirstMenu.mainOptions.push(gerencial)
      if (this.administracion) {
        const administracion = {
          name: "Administración",
          url: "home/gerencial",
          subMenu: [],

        }
        gerencial.children.push(administracion)
        if (this.admonProveedores) {
          const admonProveedores = {
            name: "Admon Proveedores",
            url: "home/gerencial/admonProveedor",
            subMenu: [],

          }
          administracion.subMenu.push(admonProveedores)
        }
        if (this.asigproveedores) {
          const asigproveedores = {
            name: "Aignacion de proveedores",
            url: "home/gerencial/asignacion",
            subMenu: [],

          }
          administracion.subMenu.push(asigproveedores)
        }
      }

      if (this.negocio) {
        const negocio = {
          name: "Negocio",
          url: "gerencial/corredor_rea",
          subMenu: [],

        }
        gerencial.children.push(negocio)
        if (this.detalle) {
          const detalle = {
            name: "Detalle",
            url: "home/gerencial/reporte",
            subMenu: [],

          }
          negocio.subMenu.push(detalle)
          if (this.creacion) {
            const creacion = {
              name: "Creación",
              url: "home/corredor_rea/reportes",
              subMenu: [],

            }
            detalle.subMenu.push(creacion)
          }
        }

      }
      this.menuCompletFive = gerencial
    }

    if (this.resportes) {
      const myMenu = {
        path: "home/reportes",
        title: "Reportes",
        icontype: "dashboard",
        type: "link",
        collapse: null,
        imgMenu: null,
        idRol: this.dataUsers.id_rol,
        idUsers: this.dataUsers.id,
        children: []

      };
      myFirstMenu.mainOptions.push(myMenu)
      // Opción Primas
      if (this.primasReporte) {
        const optionsPrimas = {
          name: "Primas",
          url: "home/reportes/boderaux",
          subMenu: [],

        };
        myMenu.children.push(optionsPrimas);

        // Subopciones para Primas
        if (this.reporCesion) {
          optionsPrimas.subMenu.push({
            name: "Resumen de cesión",
            url: "",
            subMenu: [],

          });
        }
        if (this.reauxPrima) {
          optionsPrimas.subMenu.push({
            name: "Bordereaux de prima",
            url: "home/reportes/boderaux",
            subMenu: [],

          });
        }
        if (this.reporteAutomatico) {
          optionsPrimas.subMenu.push({
            name: "Reporte de contrato automatico",
            url: "home/reportes/contratos",
            subMenu: [],

          });
        }
        if (this.reporteFacultativo) {
          optionsPrimas.subMenu.push({
            name: "Reporte de contrato Facultativo",
            url: "home/reportes/contratos/fact",
            subMenu: [],

          });
        }
      }

      // Opción Sinistros
      if (this.siniestrosReportes) {
        const optionsSinistros = {
          name: "Sinistros",
          url: "home/reportes/reporte-siniestro",
          subMenu: [],

        };
        myMenu.children.push(optionsSinistros);

        // Subopciones para Sinistros
        if (this.resumenSinistros) {
          optionsSinistros.subMenu.push({
            name: "Resumen de sinistros",
            url: "",
            subMenu: [],

          });
        }
        if (this.reauxSinistro) {
          optionsSinistros.subMenu.push({
            name: "Bordereaux de sinistros",
            url: "home/reportes/reporte-siniestro",
            subMenu: [],

          });
        }
        if (this.reaseguroSinistro) {
          optionsSinistros.subMenu.push({
            name: "Sinistros de reasegurador",
            url: "home/reportes/siniestro/rea",
            subMenu: [],

          });
        }
      }

      // Opción Cartera
      if (this.cartera) {
        const optionsCartera = {
          name: "Cartera",
          url: "home/reportes/reasegurador",
          subMenu: [],

        };
        myMenu.children.push(optionsCartera);

        // Subopciones para Cartera
        if (this.reaseguradorCartera) {
          optionsCartera.subMenu.push({
            name: "Reasegurador",
            url: "home/reportes/reasegurador",
            subMenu: [],

          });
        }
        if (this.companiaCartera) {
          optionsCartera.subMenu.push({
            name: "Compañia",
            url: "home/reportes/compania",
            subMenu: [],

          });
        }
        if (this.proveedorCartera) {
          optionsCartera.subMenu.push({
            name: "Proveedor",
            url: "home/reportes/proveedor",
            subMenu: [],

          });
        }

        // Sub-subopciones para Vencimientos
        if (this.vencimientoCartera) {
          const optionsVencimientos = {
            name: "Vencimientos",
            url: "",
            subMenu: [],

          };
          optionsCartera.subMenu.push(optionsVencimientos);

          if (this.vencimientoCarteraReasegurador) {
            optionsVencimientos.subMenu.push({
              name: "Reasegurador",
              url: "home/reportes/reasegurador",
              subMenu: [],

            });
          }
          if (this.vencimientoCarteraCmpania) {
            optionsVencimientos.subMenu.push({
              name: "Compañia",
              url: "home/reportes/compania",
              subMenu: [],

            });
          }
          if (this.vencimientoCarteraProveedor) {
            optionsVencimientos.subMenu.push({
              name: "Proveedor",
              url: "home/reportes/proveedor",
              subMenu: [],

            });
          }
        }

        if (this.pagosCartera) {
          optionsCartera.subMenu.push({
            name: "Pagos",
            url: "home/reportes/pagos",
            subMenu: [],

          });
        }
      }

      // Opción Informes
      if (this.informes) {
        const optionsInformes = {
          name: "Informes",
          url: "home/reportes/estadocuenta",
          subMenu: [],

        };
        myMenu.children.push(optionsInformes);
      }
    }

    if (this.monitoreoContracs) {
      const myMenuMoni = {
        path: "home/monitoreo",
        title: "Monitoreo Contratos",
        icontype: "dashboard",
        type: "link",
        collapse: null,
        imgMenu: null,
        idRol: this.dataUsers.id_rol,
        idUsers: this.dataUsers.id,
        children: []
      };
      myFirstMenu.mainOptions.push(myMenuMoni)
      if (this.monitoreoAutomaticos) {
        const myMenu = {
          name: "Automaticos",
          url: "",
          subMenuReportes: []
        };
        myMenuMoni.children.push(myMenu)
      }
      if (this.monitoreoFacultativos) {
        const myMenu = {
          name: "Facultativos",
          url: "",
          subMenuReportes: []
        };
        myMenuMoni.children.push(myMenu)
      }
    }
    //this.alert.success('En hora buena', 'Tu menú personalizado ha sido guardado')
    //this.menuComplet = myFirstMenu;
    if (this.menuItems.length != 0) {
      this.editMenu(myFirstMenu.mainOptions)
    } else {
      this.resgisterMenu(myFirstMenu)
    }
    
  }

  resgisterMenu(item: any) {
    this.alert.loading()
    this.menuService.resgisterMenu(item).then(
      res => {
        this.alert.success(Menssage.exito, Menssage.succesMenu)
      }
    ).catch((err: any)=>{
      this.alert.error(Menssage.error, Menssage.errorMenu);
    });
  }

  getMenu(item: number){
    this.alert.loading();
    this._https.getMenuIdUsers(item).then((resulta: any[])=>{
          this.menuItems = resulta.filter(menuItem => menuItem);
          if (this.menuItems.length != 0) {
            console.log("compani")
            this.menuEdit(this.menuItems)
          }
          this.alert.messagefin()
    }).catch((err: any)=>{
      console.log(err)
      this.alert.error(Menssage.error, Menssage.server);
    });
  }

  menuEdit(menuItems: any[]) {
    menuItems.forEach(element => {
      switch (element.r) {
        case "Compañias":
          this.companias = true
          break;
        case "Contratos":
          this.contratos = true
          break;
        case "Asociación de Contratos":
          this.asociacionContratos = true
          break;
        case "Administración de reaseguros":
          this.adminreaseguros = true
          break;
        case "Gerencial":
          this.gerencial = true
          break;
        case "Reportes":
          this.resportes = true
          break;
        case "Monitoreo Contratos":
          this.monitoreoContracs = true
          break;
        default:
          break;
      }
      if (element.r2 != null) {
        this.subMenuEdit(element.r2);
      }
      
    });
  }

  subMenuEdit(subMenuEdit: any[]) {
    subMenuEdit.forEach(element => {
      switch (element.name) {
        case "Reasegurador":
          this.companiasReasegurador = true
          break;
        case "Corredor":
          this.companiasCorredor = true
          break;
        case "Aseguradora":
          this.companiasAsegurador = true
          break;
        case "Intermediario":
          this.companiasIntermediario = true
          break;
        case "Info":
          this.companiasInfo = true
          break;
        case "Clientes y Proveedores":
          this.companiasClientesyProveedores = true
          break;
        case "Reacoex":
          this.companiasReacoex = true
          break;
        case "Automaticos":
          this.automaticos = true
          break;
        case "Facultativos":
          this.facultativos = true
          break;
        case "Cotización":
          this.cotizacion = true
          break;
        case "Ramos":
          this.ramos = true
          break;
        case "Asociación de Contratos":
          this.contratosAsociacion = true
          break;
        case "Primas":
          this.primas = true
          this.primasReporte = true
          break;
        case "Siniestro":
          this.sinistro = true
          this.siniestrosReportes = true
          break;
        case "Administración":
          this.administracion = true
          break;
        case "Negocio":
          this.negocio = true
          break;
        case "Cartera":
          this.cartera = true
          break;
        case "Informes":
          this.informes = true
          break;
        default:
          break;
      }
      if (element.subMenu != undefined) {
        if (element.subMenu.length != 0) {
          this.subMenuList(element.subMenu)
        }
      }
      
    });
  }

  subMenuList(subMenuList: any[]) {
    subMenuList.forEach(element => {
      switch (element.name) {
        case "Proporcionales":
          this.contratosProporcionales = true
          this.facultativosProporcionales = true
          break;
        case "Automaticos":
          this.contratosAutomaticos = true
          break;
        case "Especiales":
          this.facultativosEspeciales = true
          break;
        case "Reaseguro Manual":
          this.reaseguroManual = true
          this.siniestroManual = true
          break;
        case "Reaseguro Automatico":
          this.reaseguroAutomatico = true
          this.siniestroAutomatico = true
          break;
        case "Borrar Distribucion Rea":
          this.borrarRea = true
          break;
        case "Especiales":
          this.facultativosEspeciales = true
          break;
        case "Admon Proveedores":
          this.admonProveedores = true
          break;
        case "Aignacion de proveedores":
          this.asigproveedores = true
          break;
        case "Detalle":
          this.detalle = true
          break;
        case "Resumen de cesión":
          this.reporCesion = true
          break;
        case "Bordereaux de prima":
          this.reauxPrima = true
          break;
        case "Reporte de contrato automatico":
          this.reporteAutomatico = true
          break;
        case "Reporte de contrato Facultativo":
          this.reporteFacultativo = true
          break;
        case "Resumen de sinistros":
          this.resumenSinistros = true
          break;
        case "Bordereaux de sinistros":
          this.reauxSinistro = true
          break;
        case "Sinistros de reasegurador":
          this.reaseguroSinistro = true
          break;
        case "Reasegurador":
          this.reaseguradorCartera = true
          break;
        case "Compañia":
          this.companiaCartera = true
          break;
        case "Proveedor":
          this.proveedorCartera = true
          break;
        case "Pagos":
          this.pagosCartera = true
          break;
        case "Vencimientos":
          this.vencimientoCartera = true
          break;
        default:
          break;
      }
      if (element.subMenu != undefined) {
        if (element.subMenu.length != 0) {
          this.subMenuListSub(element.subMenu)
        }
      }
    });
    
  }

  subMenuListSub(subMenuListSub: any[]) {
    subMenuListSub.forEach(element => {
      switch (element.name) {
        case "Cuota Aparte":
          this.contratosProporcionalesCuotaAparte = true
          break;
        case "Facultativos":
          this.facultativosProporcionalesFaculta = true
          this.facultativosEspecialesesFaculta = true
          break;
        case "Especiales":
          this.facultativosEspecialesesFaculta = true
          break;
        case "Borrar Ajuste":
          this.borrarAjuste = true
          this.manualBorrarAjuste = true
          break;
        case "Nuevo Ajuste":
          this.nuevoAjuste = true
          this.manualNuevoAjuste = true
          break;
        case "Modificar Distribución":
          this.modificarDistribucion = true
          this.manualModificarDistribucion = true
          break;
        case "Nueva Distribución":
          this.nuevaDistribucion = true
          this.manualDistribucion = true
          break;
        case "Cargar Sinistros Pagados":
          this.siniestroAutomaticoCargar = true
          break;
        case "Procesar Sinistros Pagados":
          this.siniestroAutomaticoProcesar = true
          break;
        case "Cargar reserva de siniestros":
          this.siniestroAutomaticoCargarReserva = true
          break;
        case "Procesar Reserva de pagados":
          this.siniestroAutomaticoProcesarReserva = true
          break;
        case "Cargar":
          this.reaseguroAutomaticoCargar = true
          break;
        case "Procesar":
          this.reaseguroAutomaticoProcesar = true
          break;
        case "Creación":
          this.creacion = true
          break;
        case "Reasegurador":
          this.vencimientoCarteraReasegurador = true
          break;
        case "Compañia":
          this.vencimientoCarteraCmpania = true
          break;
        case "Proveedor":
          this.vencimientoCarteraProveedor = true
          break; 
        default:
          break;
      }
      if (element.subMenu != undefined) {
        if (element.subMenu.length != 0) {
          this.subMenuSub(element.subMenu)
        }
      }
    });
  }

  subMenuSub(subMenuSub: any[]) {
    subMenuSub.forEach(element => {
      switch (element.name) {
        case "Facultativos Especial":
          this.nuevaDistribucionEspecial = true
          break;
        case "Facultativos":
          this.nuevaDistribucionFacultativos = true
          this.manualDistribucionFacultativos = true
          break;
        case "Automaticos":
          this.nuevaDistribucionAutomaticos = true
          this.manualDistribucionAutomaticos = true
          break;
        case "Prorroga":
          this.modificarDistribucionProrroga = true
          break;
        case "Modificar Facultativo":
          this.modificarDistribucionFaculta = true
          break;
        case "Modificar Automaticos":
          this.modificarDistribucionAutomaticos = true
          break;
        case "Ajuste Facultativos":
          this.nuevoAjusteFacultativo = true
          break;
        case "Ajuste Automaticos":
          this.nuevoAjusteAutomaticos = true
          break;
        default:
          break;
      }
    });
  }
  editMenu(item: any[]) {
    const menuList = {
      mainOptions: []
    }
    item.forEach(elnt => {
      this.menuItems.forEach(element => {
        if (elnt.title == element.r) {
          menuList.mainOptions.push({
            id: element.a,
            path: elnt.path,
            title: elnt.title,
            type: elnt.type,
            icontype: elnt.icontype,
            collapse: element.a2,
            imgMenu: element.r3,
            idRol:elnt.idRol,
            idUsers: elnt.idUsers,
            children: elnt.children
          })
        }
      });
    });
    
    console.log(menuList);
    this.alert.loading()
    this.menuService.editMenu(menuList).then(
      res => {
        this.alert.success(Menssage.exito, Menssage.editMenu)
      }
    ).catch((err: any)=>{
      this.alert.error(Menssage.error, Menssage.errorMenu);
    });

    if (this.menuLateral) {
      const menuLateral = {
        path: "home/dashboard1",
        title: "Menu Lateral",
        icontype: "dashboard",
        collapse: null,
        imgMenu: null,
        idRol: this.dataUsers.id_rol,
        idUsers: this.dataUsers.id,
        children: []
      }

    }
  }
}
