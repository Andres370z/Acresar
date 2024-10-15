import { empty } from "rxjs";

export const RoutersLink = {
    gettotaldataDelete:"deleteRegisterEvent/",
    gettotaldatagallery:"gettotaldatagallery/",
    gettotaldata:"gettotaldata/",
    assistantDetail:"home/assistantList/assistantDetail/",
    register: "register",
    userCreate:"configuracion/usuarios",
    registerUpdate: "registerUpdate",
    imgUpdate:"imgUpdate",
    registerChallenge:"registerChallenge",
    registerExpoAllies: "registerExpoAllies",
    passwordUpdate:"passwordUpdate",
    home:"/home/dashboard",
    content:"home/content",
    profile:"home/profile",
    login:"pages/login/",
    loginApi:"auth/login",
    loginApi2: '/auth/login',
    forgotPassword:"forgotPassword/",
    city:"city",
    category:"category",
    status:"status/",
    getUsersData:"getUsersData/",
    getUsers:"configuracion/usuarios",
    benefits:"benefits",
    scale:"scale",
    challenges:"challenges",
    customerDetail:"customerDetail/",
    menu:"menu/",
    getMenuIdUsers:"menu/idUsers/",
    gettotal:"gettotal?id=",
    createEventosGetfinal:"create_eventos_getfinal?idClientsProjects=",
    getEvent:"create_eventos_getfinal?idClientsProjects=",
    getEventImg:"listRegisterImageEventsList?idClientsProjects=",
    deleteRegisterImageEvent:"deleteRegisterImageEvent/",
    resgisterImageEvents:"resgisterImageEvents",
    /*Andres*/
    get: 'rsltncrgrsgrdrsrcx',
    getAgency: 'agenciacalificadora',
    reaseguradoresList: "reaseguradoras",
    reasegurador: "reaseguradoras/",
    getEntities: "entidades",
    getCorredor: "corredores",
    getAsegurado: "aseguradoras/facultativo/client/total",
    getAseguradoras: "aseguradoras",
    getIntermediarios: "intermediarios",
    getDirectorios: "contactos/list/full", 
    getReaco: "reaseguradoras/list/reacoex",
    getClientes: "clientes/0",
    getPaises: "pais",
    getReacoex: "reaseguradoras/list/reacoex",
    getCorredoresList: "corredores/list/reacoex",
    getAsociacionList: "asociaciondecontratos",
    getRamos: "ramos",
    getAsoTipos: "asociaciondecontratos/tipos",
    getPrimas: "aseguradoras/facultativo/reportenomina/get",
    deleted: 'contratos/automaticos/proporcionales/cuotaparte/',
    getDtaForm: 'contratos/automaticos/proporcionales/cuotaparte/',
    getDtaFormFacultativo: 'contratos/facultativos/proporcionales/facultativo/',
    getCurrency: 'monedas',
    getDtaRamos: 'contratos/automaticos/proporcionales/cuotaparte/ramos/',
    getLoadRamos: 'facultativo/contrato/comision/',
    getFacultativoContrato: 'facultativo/contrato/especial/',
    getFacultativoContra: 'facultativo/contrato/',
    getContratoExcel: 'contratos/automaticos/get/excel/',
    getContratoExcelFaculta: 'facultativo/contrato/count/faculta/',
    getPoliza: 'contratos/automaticos/poliza/get/contratos',
    getNumRamos: 'ramos/list/superintendencia',
    getSuper: 'ramos/list/superintendencia?order=code',
    getTraspasocartera : "traspasocartera/tipos",
    getTraspasocarteraCuenta: "traspasocartera/cuentas",
    getComision: "facultativo/contrato/count/comision/",
    getrsltncntrts: "rsltncntrts",
    
    /** POSTS **/
    postContactos: 'contactos',
    editRamos:"contratos/facultativo/edit/ramos",
    postRazonSocial: 'razonSocial',
    postNomina: "contratos/facultativo/edit/nomina",
    postFacultativos: 'contratos/asociacion/search',
    postFacultativosContrato: 'contratos/facultativo/search',
    postFacultativosAseguradoras: 'aseguradoras/facultativo',
    postAseguradoraNomina: 'aseguradoras/facultativo/getaseguradonomina',
    postFacultativosRamos: 'aseguradoras/facultativo/ramos/id',
    postBuscarContrato: 'contratos/facultativo/buscar/contrato',
    postBuscarContra: 'contratos/facultativo/buscar/contrato',
    postBuscarSiniestro: 'aseguradoras/facultativo/search/siniestro',
    postFacultaRamosEdit: 'aseguradoras/facultativo/ramos/id',
    postFacultativoGasto: 'aseguradoras/facultativo/getasegurado',
    postCuotaRamo: 'contratos/automaticos/proporcionales/cuotaparte/ramos',
    postCuotaparteNomina: 'final/contratos/automaticos/no/proporcionales/cuotaparte/nominas',

    postFacultativoContra: 'facultativo/contrato',
    postFacultativoContratb: 'facultativo/contrato/tb',
    postSearchProporcionalesCuotaAparte: 'contratos/automaticos/proporcionales/cuotaparte/buscar',
    postContratoCuotaAparte: 'contratos/automaticos/proporcionales/cuotaparte/contrato',
    postEditContrato: 'final/contratos/no/proporcionales/cuotaparte/edit/contrato',
    postEditContratoFacultativo: 'contratos/facultativo/edit/contrato',
    postSearchIdcontracs: 'contratos/search',
    postContratosDetail: 'asociaciondecontratos/detail',
    postReporteNomina: 'aseguradoras/facultativo/reportenomina',
    postSinistroReporteNomina: 'aseguradoras/facultativo/proceso/siniestro/reportenomina',
    postPolizaReporteNomina: 'contratos/automaticos/poliza/get/reporte',
    postExcel: 'contratos/automaticos/poliza/get/excel',
    postPolizaReasegurador: 'contratos/automaticos/poliza/get/reasegurador',
    postCorredores: 'corredores',
    postAseguradoras: 'aseguradoras',
    putReaseguradoras: 'reaseguradoras',
    postClientes: 'clientes',
    postPrimas: 'primas/search/certf',
    postAseguradoraSeach: 'aseguradoras/facultativo/search',
    postAseguradoraClient: 'aseguradoras/facultativo/client',
    deleteReaseguradoras: "reaseguradoras/",
    menuList:"menuList",
    getMenu:"menu",
    editList:"editList",

    deleteCorredor: 'corredores/',
    deleteAse: 'aseguradoras/',
    putAse: 'aseguradoras/'
    
};

export const Menssage = {
    telephone:"",
    name:"",
    surname:"",
    passwordVerifi:"",
    idrol:"",
    idImg:"No haz agregado una imagen",
    idEvents:"No haz seleccionado un evento",
    nameEvents:"softsaenz",
    nameEventsNull:"No hay datos que descargar",
    passwordAES:"Softsaenz2023*",
    error:"Error",
    token:"token",
    customerDetail:"customerDetail",
    menu:"menu",
    menuSelect:"menuSelect",
    server:"En la conexión del servidor",
    userValid:"El correo ya se encuentra registrado",
    emailValid:"El Email ingresado no se encuentra registrado",
    businessName: "La razón social es obligatoria",
    identificationCard: "El numero de identificación es obligatorio",
    idCategoryToRegister: "La categoria es obligatoria",
    address: "La dirección es obligatoria",
    phone: "El teléfono es obligatorio",
    idCity: "La ciudad es obligatoria",
    email: "El Correo es obligatorio",
    nit: "El nit no es valido",
    empty: "",
    valiEmail: '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$',
    validNumber: /^[1-9]\d{6,10}$/,
    success: "Usuario registrado correctamente",
    successUpdate: "Usuario actualizado correctamente",
    successDelete: "Registro eliminado correctamente",
    successForgot: "Ha tu correo registrado enviamos un link para la recuperación de la contraseña",
    exito:"Exito",
    password: "La contraseña es obligatoria",
    updatePassword: "La contraseña y el correo fueron actualizado correctamente",
    habeas: false,
    habeasDataText:"Debes aceptar las política​ de habeas data",
    personalDataPolicy:"Debes acpetar los términos y condiciones",
    monthlyBudget:"El presupuesto mensual es obligatorio",
    contactPerson:"La persona de contacto es obligatorio",
    successExpo: "El registrado se ralizó correctamente",
    errorMenu:"No se pudo asignar el menu",
    succesMenu:"Menus asigandos correctamente",
    editMenu:"Menus editado correctamente",
};

export const idRol = {
    admin:1,
    client:2,
};