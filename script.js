document.addEventListener('DOMContentLoaded', function () {
  const addItemBtn = document.getElementById('addItemBtn');
  const updateItemBtn = document.getElementById('updateItemBtn');
  const inventoryTable = document.getElementById('inventoryTable').querySelector('tbody');
  const applyDiscountBtn = document.getElementById('applyDiscountBtn');
  
  let itemId = 1;
  let totalGoods = 0;
  let totalCost = 0;
  let currentEditRow = null;

  // Add Item Function
  addItemBtn.addEventListener('click', function () {
    const itemName = document.getElementById('itemName').value;
    const itemQuantity = parseInt(document.getElementById('itemQuantity').value);
    const itemPrice = parseFloat(document.getElementById('itemPrice').value);
    const itemCategory = document.getElementById('itemCategory').value;

    if (itemName && itemQuantity > 0 && itemPrice > 0 && itemCategory) {
      const itemTotal = (itemQuantity * itemPrice).toFixed(2);
      const row = document.createElement('tr');

      row.setAttribute('data-id', itemId);
      row.innerHTML = `
        <td>${itemId}</td>
        <td>${itemCategory}</td>
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
      document.getElementById('discountedTotal').textContent = totalCost.toFixed(2);

      itemId++;
      clearForm();
    }
  });

  // Update Item Function
  updateItemBtn.addEventListener('click', function () {
    if (currentEditRow) {
      const newName = document.getElementById('itemName').value;
      const newQty = parseInt(document.getElementById('itemQuantity').value);
      const newPrice = parseFloat(document.getElementById('itemPrice').value);
      const newCategory = document.getElementById('itemCategory').value;

      if (newName && newQty > 0 && newPrice > 0 && newCategory) {
        const oldQty = parseInt(currentEditRow.children[3].textContent);
        const oldTotal = parseFloat(currentEditRow.children[5].textContent.slice(1));

        totalGoods = totalGoods - oldQty + newQty;
        totalCost = totalCost - oldTotal + (newQty * newPrice);

        currentEditRow.children[1].textContent = newCategory;
        currentEditRow.children[2].textContent = newName;
        currentEditRow.children[3].textContent = newQty;
        currentEditRow.children[4].textContent = `₹${newPrice.toFixed(2)}`;
        currentEditRow.children[5].textContent = `₹${(newQty * newPrice).toFixed(2)}`;

        document.getElementById('totalGoods').textContent = totalGoods;
        document.getElementById('totalCost').textContent = totalCost.toFixed(2);
        document.getElementById('discountedTotal').textContent = totalCost.toFixed(2);

        clearForm();
        addItemBtn.style.display = 'inline-block';
        updateItemBtn.style.display = 'none';
        currentEditRow = null;
      }
    }
  });

  // Discount Calculation
  applyDiscountBtn.addEventListener('click', function () {
    const discount = parseFloat(document.getElementById('discount').value);

    if (discount >= 0 && discount <= 100) {
      const discountedTotal = totalCost - (totalCost * (discount / 100));
      document.getElementById('discountedTotal').textContent = discountedTotal.toFixed(2);
    } else {
      alert('Please enter a valid discount percentage (0-100)');
    }
  });

  // Clear form inputs
  function clearForm() {
    document.getElementById('itemName').value = '';
    document.getElementById('itemQuantity').value = '';
    document.getElementById('itemPrice').value = '';
    document.getElementById('itemCategory').value = '';
  }
});
