// Get data from the form input, send it in POST request to add it to db, and add row to UI table
// Also need to add route handler for POST request in app.js

let addOrderForm = document.getElementById("add-order-form-ajax");

addOrderForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputOrderDate = document.getElementById("input-order-date-ajax");
    let inputTotalCost = document.getElementById("input-total-cost-ajax");
    let inputShopperId = document.getElementById("input-shopper-id-ajax");
    let inputSellerId = document.getElementById("input-seller-id-ajax");

    // Get the values from the form fields
    let orderDateValue = inputOrderDate.value;
    let totalCostValue = inputTotalCost.value;
    let shopperIdValue = inputShopperId.value;
    let sellerIdValue = inputSellerId.value;

    console.log(totalCostValue);

    // Put our data we want to send in a javascript object
    let data = {
        order_date: orderDateValue,
        total_cost: totalCostValue,
        shopper_id: shopperIdValue,
        seller_id: sellerIdValue
    }

     // Setup our AJAX request
     var xhttp = new XMLHttpRequest();
     xhttp.open("POST", "/add-order-ajax", true);
     xhttp.setRequestHeader("Content-type", "application/json");

    
     // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputOrderDate.value = '';
            inputTotalCost.value = '';
            inputShopperId.value = '';
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
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("orders-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and cells
    let row = document.createElement("TR");
    let orderIdCell = document.createElement("TD");
    let orderDateCell = document.createElement("TD");
    let totalCostCell = document.createElement("TD");
    let shopperIdCell = document.createElement("TD");
    let sellerIdCell = document.createElement("TD");

    // Fill the cells with correct data
    orderIdCell.innerText = newRow.order_id;
    // orderDateText = newRow.order_date;
    // let DateComponents = orderDateText.slice(0, -1).split('T');
    // orderDate = DateComponents[0];
    orderDateCell.innerText = newRow.order_date;
    totalCostCell.innerText = newRow.total_cost;
    shopperIdCell.innerText = newRow.shopper_id;
    sellerIdCell.innerText = newRow.seller_id;

    // Add the cells to the row
    row.appendChild(orderIdCell);
    row.appendChild(orderDateCell);
    row.appendChild(totalCostCell);
    row.appendChild(shopperIdCell);
    row.appendChild(sellerIdCell);

    // Add the row to the table
    currentTable.appendChild(row);
}
