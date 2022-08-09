const fetchItem = async ($ItemID) => {
  const url = `https://api.mercadolibre.com/items/${$ItemID}`;

  const resultado = await fetch(url)
    .then((resposta) => resposta.json())
    .then((data) => data);
  return resultado;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
