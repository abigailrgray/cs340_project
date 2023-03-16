let addClothingItemForm = document.getElementById("add-clothing-item-form-ajax");

// Modify the objects we need
addClothingItemForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputClothingType = document.getElementById("input-clothing-type-ajax");
    let inputColor = document.getElementById("input-color-ajax");
    let inputSize = document.getElementById("input-size-ajax");
    let inputBrand = document.getElementById("input-brand-ajax");
    let inputItemCondition = document.getElementById("input-item-condition-ajax");
    let inputCurrentPrice = document.getElementById("input-current-price-ajax");
    let inputQuantity = document.getElementById("input-quantity-ajax");
    let inputIsAvailable = document.getElementById("input-is-available-ajax");
    let inputSellerId = document.getElementById("input-seller-id-ajax");

    // Get the values from the form fields
    let clothingTypeValue = inputClothingType.value;
    let colorValue = inputColor.value;
    let sizeValue = inputSize.value;
    let brandValue = inputBrand.value;
    let itemConditionValue = inputItemCondition.value;
    let currentPriceValue = inputCurrentPrice.value;
    let quanityValue = inputQuantity.value;
    let isAvailableValue = inputIsAvailable.value;
    let sellerIdValue = inputSellerId.value;

    // Put our data we want to send in a javascript object
    let data = {
        clothing_type: clothingTypeValue,
        color: colorValue,
        size: sizeValue,
        brand: brandValue,
        item_condition: itemConditionValue,
        current_price: currentPriceValue,
        quanity: quanityValue,
        is_available: isAvailableValue,
        seller_id: sellerIdValue 
    }

     // Setup our AJAX request
     var xhttp = new XMLHttpRequest();
     xhttp.open("POST", "/add-clothing-item-ajax", true);
     xhttp.setRequestHeader("Content-type", "application/json");

    
     // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputClothingType.value = '';
            inputColor.value = '';
            inputSize.value = '';
            inputBrand.value = '';
            inputItemCondition.value = '';
            inputCurrentPrice.value = '';
            inputQuantity.value = '';
            inputIsAvailable.value = '';
            inputSellerId.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

});

// Creates a single row from an Object representing a single record from 
// ClothingItems_Orders
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("clothing-items-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and cells
    let row = document.createElement("TR");
    let itemIdCell = document.createElement("TD");
    let clothingTypeCell = document.createElement("TD");
    let colorCell = document.createElement("TD");
    let sizeCell = document.createElement("TD");
    let brandCell = document.createElement("TD");
    let itemConditionCell = document.createElement("TD");
    let currentPriceCell = document.createElement("TD");
    let quantityCell = document.createElement("TD");
    let isAvailableCell = document.createElement("TD");
    let sellerIdCell = document.createElement("TD");

    // Fill the cells with correct data
    itemIdCell.innerText = newRow.item_id;
    clothingTypeCell.innerText = newRow.clothing_type;
    colorCell.innerText = newRow.color;
    sizeCell.innerText = newRow.size;
    brandCell.innerText = newRow.brand;
    itemConditionCell.innerText = newRow.item_condition;
    currentPriceCell.innerText = newRow.current_price;
    quantityCell.innerText = newRow.quantity;
    isAvailableCell.innerText = newRow.is_available;
    sellerIdCell.innerText = newRow.seller_id;

    // Add the cells to the row
    row.appendChild(itemIdCell);
    row.appendChild(clothingTypeCell);
    row.appendChild(colorCell);
    row.appendChild(sizeCell);
    row.appendChild(brandCell);
    row.appendChild(itemConditionCell);
    row.appendChild(currentPriceCell);
    row.appendChild(quantityCell);
    row.appendChild(isAvailableCell);
    row.appendChild(sellerIdCell);

    // Add the row to the table
    currentTable.appendChild(row);
}