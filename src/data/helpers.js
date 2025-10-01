export const navCliente = (usuario=null) => {
  return  [
    {
      nombre: "Menu",
      imagen: "/menu_icon.svg",
      link: "/cliente",
      usuario: usuario,
    },
    {
      nombre: "Historial",
      imagen: "/historial_icon.svg",
      link: "/historial",
      usuario: usuario,
    },
    {
      nombre: "Perfil",
      imagen: "/perfil_icon.svg",
      link: "/perfil",
      usuario: usuario,
    },
    {
      nombre: "IA",
      imagen: "/ia_icon.png",
      link: "/iaPortal",
      usuario: usuario,
    },
  ]
};

export const navAdmin = [
  { nombre: "Ordenes", imagen: "/menu_icon.svg", link: "/ordenesAdmin" },
  {
    nombre: "Productos",
    imagen: "/historial_icon.svg",
    link: "/productosAdmin",
  },
  {
    nombre: "Historial",
    imagen: "/perfil_icon.svg",
    link: "/historialAdmin",
  },
  {
      nombre: "IA",
      imagen: "/ia_icon.png",
      link: "/iaPortalAdmin",
    },
];

export const iconsI = [
  { nombre: "Hamburguesas", imagen: "/icon_hamburguesa.svg" },
  { nombre: "Perros", imagen: "/icon_hot_dog.png" },
  { nombre: "Pizzas", imagen: "/icon_pizza.svg" },
];
