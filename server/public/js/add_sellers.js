// Get data from the form input, send it in POST request to add it to db, and add row to UI table
// Also need to add route handler for POST request in app.js
let addSellersForm = document.getElementById("add-sellers-form-ajax");

// Modify the objects we need
addSellersForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputUsername = document.getElementById("input-username-ajax");
    let inputPassword = document.getElementById("input-password-ajax");
    let inputShopname = document.getElementById("input-shopname-ajax");
    let inputEmail = document.getElementById("input-email-ajax");
    let inputPhoneNumber = document.getElementById("input-phone-ajax");

    // Get the values from the form fields
    let usernameValue = inputUsername.value;
    let passwordValue = inputPassword.value;
    let shopnameValue = inputShopname.value;
    let emailValue = inputEmail.value;
    let phoneNumberValue = inputPhoneNumber.value;

    // Put our data we want to send in a javascript object
    let data = {
        username: usernameValue,
        password: passwordValue,
        shop_name: shopnameValue,
        email: emailValue,
        phone_number: phoneNumberValue
    }

     // Setup our AJAX request
     var xhttp = new XMLHttpRequest();
     xhttp.open("POST", "/add-sellers-ajax", true);
     xhttp.setRequestHeader("Content-type", "application/json");

    
     // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputUsername.value = '';
            inputPassword.value = '';
            inputShopname.value = '';
            inputEmail.value = '';
            inputPhoneNumber.value = '';
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
    console.log(data)

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("sellers-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and cells
    let row = document.createElement("TR");
    let sellerIdCell = document.createElement("TD");
    let usernameCell = document.createElement("TD");
    let passwordCell = document.createElement("TD");
    let shopnameCell = document.createElement("TD");
    let emailCell = document.createElement("TD");
    let phoneNumberCell = document.createElement("TD");

    // Fill the cells with correct data
    sellerIdCell.innerText = newRow.seller_id;
    usernameCell.innerText = newRow.username;
    passwordCell.innerText = newRow.password;
    shopnameCell.innerText = newRow.first_name;
    emailCell.innerText = newRow.email;
    phoneNumberCell.innerText = newRow.phone_number;


    // Add the cells to the row
    row.appendChild(sellerIdCell) ;
    row.appendChild(usernameCell);
    row.appendChild(passwordCell);
    row.appendChild(shopnameCell);
    row.appendChild(emailCell);
    row.appendChild(phoneNumberCell);

    // Add the row to the table
    currentTable.appendChild(row);
}
