const saveCartItems = (produto) => {
  localStorage.setItem('cartItems', produto);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
