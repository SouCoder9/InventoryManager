// Wait until the page loads
document.addEventListener('DOMContentLoaded', function () {
  let itemId = 1; 
  let totalGoods = 0;
  let totalCost = 0;

  // Buttons and inputs
  const addItemBtn = document.getElementById('addItemBtn');
  const updateItemBtn = document.getElementById('updateItemBtn');
  const inventoryTable = document.getElementById('inventoryTable').querySelector('tbody');
  let currentEditRow = null;

  addItemBtn.addEventListener('click', function () {
    let itemName = document.getElementById('itemName').value;
    let itemQuantity = parseInt(document.getElementById('itemQuantity').value);
    let itemPrice = parseFloat(document.getElementById('itemPrice').value);

    if (itemName && itemQuantity > 0 && itemPrice > 0) {
      let itemTotal = (itemQuantity * itemPrice).toFixed(2);
      let row = document.createElement('tr');

      row.setAttribute('data-id', itemId);
      row.innerHTML = `
        <td>${itemId}</td>
        <td>${itemName}</td>
        <td>${itemQuantity}</td>
        <td>₹${itemPrice.toFixed(2)}</td>
        <td>₹${itemTotal}</td>
        <td>
          <button class="editBtn">Edit</button>
          <button class="deleteBtn">Delete</button>
        </td>
      `;

      inventoryTable.appendChild(row);

      totalGoods += itemQuantity;
      totalCost += parseFloat(itemTotal);

      document.getElementById('totalGoods').textContent = totalGoods;
      document.getElementById('totalCost').textContent = totalCost.toFixed(2);

      itemId++; // Next item ID
      clearForm();
    }
  });

  inventoryTable.addEventListener('click', function (e) {
    if (e.target.classList.contains('editBtn')) {
      let row = e.target.closest('tr');
      currentEditRow = row;

      document.getElementById('itemName').value = row.children[1].textContent;
      document.getElementById('itemQuantity').value = row.children[2].textContent;
      document.getElementById('itemPrice').value = row.children[3].textContent.slice(1);

      addItemBtn.style.display = 'none';
      updateItemBtn.style.display = 'inline-block';
    }

    if (e.target.classList.contains('deleteBtn')) {
      let row = e.target.closest('tr');
      let quantity = parseInt(row.children[2].textContent);
      let total = parseFloat(row.children[4].textContent.slice(1));

      totalGoods -= quantity;
      totalCost -= total;

      document.getElementById('totalGoods').textContent = totalGoods;
      document.getElementById('totalCost').textContent = totalCost.toFixed(2);

      row.remove();
    }
  });

  updateItemBtn.addEventListener('click', function () {
    if (currentEditRow) {
      let newName = document.getElementById('itemName').value;
      let newQty = parseInt(document.getElementById('itemQuantity').value);
      let newPrice = parseFloat(document.getElementById('itemPrice').value);

      if (newName && newQty > 0 && newPrice > 0) {
        let oldQty = parseInt(currentEditRow.children[2].textContent);
        let oldTotal = parseFloat(currentEditRow.children[4].textContent.slice(1));

        totalGoods = totalGoods - oldQty + newQty;
        totalCost = totalCost - oldTotal + (newQty * newPrice);

        currentEditRow.children[1].textContent = newName;
        currentEditRow.children[2].textContent = newQty;
        currentEditRow.children[3].textContent = `₹${newPrice.toFixed(2)}`;
        currentEditRow.children[4].textContent = `₹${(newQty * newPrice).toFixed(2)}`;

        document.getElementById('totalGoods').textContent = totalGoods;
        document.getElementById('totalCost').textContent = totalCost.toFixed(2);

        clearForm();
        addItemBtn.style.display = 'inline-block';
        updateItemBtn.style.display = 'none';
        currentEditRow = null;
      }
    }
  });

  function clearForm() {
    document.getElementById('itemName').value = '';
    document.getElementById('itemQuantity').value = '';
    document.getElementById('itemPrice').value = '';
  }
});
