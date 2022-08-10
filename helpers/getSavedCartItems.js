const getSavedCartItems = () => {
  const resultado = localStorage.getItem('cartItems');
  return resultado; // tem que retornar algo ou não funciona
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
