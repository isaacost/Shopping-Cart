const items = document.querySelector('.items');
const cartItems = document.querySelector('.cart__items');
const botaoLimpar = document.querySelector('.empty-cart');

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

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const cartItemClickListener = (event) => {
  cartItems.removeChild(event.target);
  localStorageProdutos = localStorageProdutos.filter((elemento) => elemento !== event.target); // faz um filter no array, criando um novo array com os elementos que forem diferentes do local do evento
};

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
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

const funcQ8 = () => {
  const local = JSON.parse(getSavedCartItems() || '[]'); // retorna os objetos salvos no localStorage no formato JSON ou vazio
  local.forEach((element) => {
    const produto = createCartItemElement(element); // cria esse elemento no carrinho quando a pagina é carregada
    cartItems.appendChild(produto); // apenda o elemento anterior 
  });
};

const limpaCarrinho = () => {
  while (cartItems.firstChild) {
    cartItems.removeChild(cartItems.firstChild);
  }
};
botaoLimpar.addEventListener('click', limpaCarrinho);

window.onload = async () => {
  await funcQ2();
  funcQ8();
};
