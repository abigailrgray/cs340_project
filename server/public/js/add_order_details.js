let addOrderDetailsForm = document.getElementById("add-order-details-form-ajax");

// Modify the objects we need
addOrderDetailsForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputOrderId = document.getElementById("input-order-id-ajax");
    let inputItemId = document.getElementById("input-item-id-ajax");
    let inputItemQuantity = document.getElementById("input-item-quantity-ajax");
    let inputSoldPrice = document.getElementById("input-sold-price-ajax");

    // Get the values from the form fields
    let orderIdValue = inputOrderId.value;
    let itemIdValue = inputItemId.value;
    let itemQuantityValue = inputItemQuantity.value;
    let soldPriceValue = inputSoldPrice.value;

    // Put our data we want to send in a javascript object
    let data = {
        order_id: orderIdValue,
        item_id: itemIdValue,
        item_quantity: itemQuantityValue,
        sold_price: soldPriceValue
    }

     // Setup our AJAX request
     var xhttp = new XMLHttpRequest();
     xhttp.open("POST", "/add-order-details-ajax", true);
     xhttp.setRequestHeader("Content-type", "application/json");

     // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputOrderId.value = '';
            inputItemId.value = '';
            inputItemQuantity.value = '';
            inputSoldPrice.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})

// Creates a single row from an Object representing a single record from 
// ClothingItems_Orders
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("order-details-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and cells
    let row = document.createElement("TR");
    let orderDetailsIDCell = document.createElement("TD");
    let orderIdCell = document.createElement("TD");
    let itemIdCell = document.createElement("TD");
    let itemQuantityCell = document.createElement("TD");
    let soldPriceCell = document.createElement("TD");

    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    orderDetailsIDCell.innerText = newRow.order_details_id;
    orderIdCell.innerText = newRow.order_id;
    itemIdCell.innerText = newRow.item_id;
    itemQuantityCell.innerText = newRow.item_quantity;
    soldPriceCell.innerText = newRow.sold_price;

    let deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Delete";
    deleteButton.onClick = function(){
        deleteOrderDetails(newRow.order_details_id);
    };
    deleteCell.append(deleteButton);

    // Add the cells to the row
    row.appendChild(orderDetailsIDCell);
    row.appendChild(orderIdCell);
    row.appendChild(itemIdCell);
    row.appendChild(itemQuantityCell);
    row.appendChild(soldPriceCell);
    row.appendChild(deleteCell);

    row.setAttribute('data-value', newRow.order_details_id);


    // Add the row to the table
    currentTable.appendChild(row);
    
    // Update dropdown menu
    let selectMenu = document.getElementById("mySelect");
    let option = document.createElement("option");
    option.text = 'Order ' + newRow.order_id + ' Item ' +  newRow.item_id;
    option.value = newRow.id;
    selectMenu.add(option);
}
        
