const items = document.querySelector('.items');
const cartItems = document.querySelector('.cart__items');
const botaoLimpar = document.querySelector('.empty-cart');
const valorTotal = document.querySelector('.total-price');

let localStorageProdutos = []; // cria um array vazio

const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const somaCarrinho = () => {
  const total = localStorageProdutos.reduce((acc, produto) => acc + (produto.salePrice), 0);
  valorTotal.innerText = total.toPrecision();
};

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const cartItemClickListener = (event, sku) => {
  cartItems.removeChild(event.target);
  const itemIndex = localStorageProdutos.findIndex((item) => item.id === sku);
  localStorageProdutos.splice(itemIndex, 1);
  somaCarrinho();
  saveCartItems(JSON.stringify(localStorageProdutos));
};

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', (event) => cartItemClickListener(event, sku));
  return li;
};

const funcQ4 = async (evento) => {
  const sku = getSkuFromProductItem(evento.target.parentElement);
  const resultado = await fetchItem(sku);
  const { title: name, price: salePrice } = resultado;
  const produto = { sku, name, salePrice };
  const novoItem = createCartItemElement(produto);  
  cartItems.appendChild(novoItem);
  localStorageProdutos.push(produto); // salva o produto no array
  saveCartItems(JSON.stringify(localStorageProdutos)); // salva no localStorage no formato de string
  somaCarrinho();
  };

const createProductItemElement = ({ sku, name, image }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const botao = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  botao.addEventListener('click', funcQ4);
  section.appendChild(botao);

  return section;
};

const funcQ2 = async () => {
  const resultado = await fetchProducts('computador');
  resultado.results.forEach((elemento) => {
    const { id: sku, title: name, thumbnail: image } = elemento;
    const produto = {
      sku,
      name,
      image,
    };
    const sectionProduto = createProductItemElement(produto);
    items.appendChild(sectionProduto);
  });
};

const funcQ8 = (produtos) => {
  produtos.forEach((produto) => {
    const produtoSalvo = createCartItemElement(produto);
    cartItems.appendChild(produtoSalvo);
  });
  somaCarrinho();
};

botaoLimpar.addEventListener('click', () => {
  localStorageProdutos = [];
  saveCartItems(JSON.stringify(localStorageProdutos));
  while (cartItems.firstChild) {
    cartItems.removeChild(cartItems.firstChild);
  }
  somaCarrinho();
});

window.onload = async () => {
  await funcQ2();
  localStorageProdutos = JSON.parse(getSavedCartItems('cartItems')) || [];
  funcQ8(localStorageProdutos);
  somaCarrinho();
};
