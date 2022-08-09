const items = document.querySelector('.items');
const cartItems = document.querySelector('.cart__items');

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
  const produto = {
    sku,
    name,
    salePrice,
  };
  const novoItem = createCartItemElement(produto);
  
  cartItems.appendChild(novoItem);
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

window.onload = () => { funcQ2(); };
