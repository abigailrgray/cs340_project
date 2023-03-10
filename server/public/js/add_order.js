// Get data from the form input, send it in POST request to add it to db, and add row to UI table
// Also need to add route handler for POST request in app.js

let addordersForm = document.getElementById("add-orders-form-ajax");

addordersForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputOrderid = document.getElementById("input-orderid-ajax");
    let inputOrderdate = document.getElementById("input-orderdate-ajax");
    let inputTotalcost = document.getElementById("input-totalcos-ajax");
    let inputShopperid = document.getElementById("input-shopperid-ajax");
    let inputSellerid = document.getElementById("input-sellerid-ajax");

    // Get the values from the form fields
    let orderidValue = inputOrderid.value;
    let orderdateValue = inputOrderdate.value;
    let totalcosValue = inputTotalcost.value;
    let shopperid = inputShopperid.value;
    let sellerid = inputSellerid.value;

    // Put our data we want to send in a javascript object
    let data = {
        order_id: orderidValue,
        order_date: orderdateValue,
        total_cost: totalcosValue,
        shopper_id: shopperid,
        seller_id: sellerid,
    }

     // Setup our AJAX request
     var xhttp = new XMLHttpRequest();
     xhttp.open("POST", "/add-orders-ajax", true);
     xhttp.setRequestHeader("Content-type", "application/json");

    
     // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputOrderid.value = '';
            inputOrderdate.value = '';
            inputTotalcost.value = '';
            inputShopperid.value = '';
            inputSellerid.value = '';
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
    let orderidCell = document.createElement("TD");
    let orderdateCell = document.createElement("TD");
    let totalcostCell = document.createElement("TD");
    let shopperidCell = document.createElement("TD");
    let selleridCell = document.createElement("TD");

    // Fill the cells with correct data
    orderidCell.innerText = newRow.order_id;
    orderdateCell.innerText = newRow.order_date;
    totalcostCell.innerText = newRow.total_cost;
    shopperidCell.innerText = newRow.shopper_id;
    selleridCell.innerText = newRow.seller_id;

    // Add the cells to the row
    row.appendChild(orderidCell) ;
    row.appendChild(orderdateCell);
    row.appendChild(totalcostCell);
    row.appendChild(shopperidCell);
    row.appendChild(selleridCell);

    // Add the row to the table
    currentTable.appendChild(row);
}
