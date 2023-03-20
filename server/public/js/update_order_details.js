// Get the objects we need to modify
let updateOrderDetailsForm = document.getElementById('update-order-details-form-ajax');

// Modify the objects we need
updateOrderDetailsForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputOrderDetails = document.getElementById("mySelect");
    let inputItemQuantity = document.getElementById("input-item-quantity-update");
    let inputSoldPrice = document.getElementById("input-sold-price-update");

    // Get the values from the form fields
    let orderDetailsValue = inputOrderDetails.value;
    let itemQuantityValue = inputItemQuantity.value;
    let soldPriceValue = inputSoldPrice.value;

    // Seperate Order ID and Item ID values from Order Details value
    // orderDetailsValue = orderDetailsValue.split('#');
    // let orderIdValue = orderDetailsValue[0]
    // let itemIdValue = orderDetailsValue[1];
    
    // currently the database table for bsg_people does not allow updating values to NULL
    // so we must abort if being bassed NULL for homeworld

    // if (isNaN(homeworldValue)) 
    // {
    //     return;
    // }


    // Put our data we want to send in a javascript object
    let data = {
        order_details_id: orderDetailsValue,
        item_quantity: itemQuantityValue,
        sold_price: soldPriceValue
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-order-details-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, orderDetailsValue);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(data, orderDetailsID){
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("order-details-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == orderDetailsID) {

            // Get the location of the row where we found the matching person ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get tds
            // let orderIdCell = updateRowIndex.getElementsByTagName("td")[0];
            // let itemIdCell = updateRowIndex.getElementsByTagName("td")[1];
            let itemQuantityCell = updateRowIndex.getElementsByTagName("td")[3];
            let soldPriceCell = updateRowIndex.getElementsByTagName("td")[4];

            // Reassign homeworld to our value we updated to
            // orderIdCell.innerHTML = parsedData[0].order_id; 
            // itemIdCell.innerHTML = parsedData[0].item_id;
            itemQuantityCell.innerHTML = parsedData[0].item_quantity;
            soldPriceCell.innerHTML = parsedData[0].sold_price;

       }
    }
}