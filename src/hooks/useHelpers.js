export const useHelpers = () => {
    //Funciones auxiliares
  const formatoCOP = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
  });

  
  return {
    formatoCOP
  };
};
