const fetchProducts = async ($QUERY) => {
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${$QUERY}`;

  const resultado = await fetch(url)
    .then((resposta) => resposta.json())
    .then((data) => data);
  
    return resultado;
  };

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
