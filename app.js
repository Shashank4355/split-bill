const items = [];

const $ = (id) => document.getElementById(id);
const money = (n) => '$' + n.toFixed(2);

function calculate() {
  const subtotal = items.reduce((sum, item) => sum + item.price, 0);
  const tax = subtotal * (Number($('tax').value) || 0) / 100;
  const tip = subtotal * (Number($('tip').value) || 0) / 100;
  const total = subtotal + tax + tip;
  const people = Math.max(1, Math.floor(Number($('people').value) || 1));
  return { subtotal, tax, tip, total, perPerson: total / people };
}

function render() {
  const list = $('items');
  list.innerHTML = '';
  items.forEach((item, i) => {
    const li = document.createElement('li');
    const label = document.createElement('span');
    label.textContent = `${item.name} - ${money(item.price)}`;
    const remove = document.createElement('button');
    remove.textContent = 'Remove';
    remove.addEventListener('click', () => { items.splice(i, 1); render(); });
    li.append(label, remove);
    list.append(li);
  });

  const r = calculate();
  $('subtotal').textContent = money(r.subtotal);
  $('tax-amount').textContent = money(r.tax);
  $('tip-amount').textContent = money(r.tip);
  $('total').textContent = money(r.total);
  $('per-person').textContent = money(r.perPerson);
}

$('item-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const name = $('item-name').value.trim();
  const price = Number($('item-price').value);
  if (!name || !(price >= 0)) return;
  items.push({ name, price });
  $('item-name').value = '';
  $('item-price').value = '';
  $('item-name').focus();
  render();
});

['tax', 'tip', 'people'].forEach((id) => $(id).addEventListener('input', render));

render();
