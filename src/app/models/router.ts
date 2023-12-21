import { empty } from "rxjs";

export const RoutersLink = {
    gettotaldataDelete:"deleteRegisterEvent/",
    gettotaldatagallery:"gettotaldatagallery/",
    gettotaldata:"gettotaldata/",
    assistantDetail:"home/assistantList/assistantDetail/",
    register: "register",
    registerUpdate: "registerUpdate",
    imgUpdate:"imgUpdate",
    registerChallenge:"registerChallenge",
    registerExpoAllies: "registerExpoAllies",
    passwordUpdate:"passwordUpdate",
    home:"/home/dashboard",
    content:"home/content",
    profile:"home/profile",
    login:"pages/login/",
    loginApi:"login",
    forgotPassword:"forgotPassword/",
    city:"city",
    category:"category",
    status:"status/",
    getUsersData:"getUsersData/",
    benefits:"benefits",
    scale:"scale",
    challenges:"challenges",
    customerDetail:"customerDetail/",
    menu:"menu/",
    gettotal:"gettotal?id=",
    createEventosGetfinal:"create_eventos_getfinal?idClientsProjects=",
    getEvent:"create_eventos_getfinal?idClientsProjects=",
    getEventImg:"listRegisterImageEventsList?idClientsProjects=",
    deleteRegisterImageEvent:"deleteRegisterImageEvent/",
    resgisterImageEvents:"resgisterImageEvents",
    /*Andres*/
    reaseguradoresList: "/reaseguradoras",
    getEntities: "/entidades",
    getCorredor: "/corredores",
    getAseguradoras: "/aseguradoras",
    getIntermediarios: "/intermediarios",
    getDirectorios: "/contactos/list/full",
    getClientes: "/clientes/0",
    getPaises: "/pais",
    getReacoex: "/reaseguradoras/list/reacoex",
    getCorredoresList: "/corredores/list/reacoex",
    getAsociacionList: "/asociaciondecontratos",
    getRamos: "/ramos",
    getPrimas: "/aseguradoras/facultativo/reportenomina/get",
    deleted: '/contratos/automaticos/proporcionales/cuotaparte/',
    getDtaForm: '/contratos/automaticos/proporcionales/cuotaparte/',
    getCurrency: '/monedas',
    getDtaRamos: '/contratos/automaticos/proporcionales/cuotaparte/ramos/',
    postFacultativos: '/contratos/asociacion/search',
    getLoadRamos: '/facultativo/contrato/comision/'
};

export const Menssage = {
    idImg:"No haz agregado una imagen",
    idEvents:"No haz seleccionado un evento",
    nameEvents:"softsaenz",
    nameEventsNull:"No hay datos que descargar",
    passwordAES:"Softsaenz2023*",
    error:"Error",
    token:"token",
    customerDetail:"customerDetail",
    menu:"menu",
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
};