let addShopperForm = document.getElementById("add-shopper-form-ajax");

// Modify the objects we need
addShopperForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputUsername = document.getElementById("input-username-ajax");
    let inputPassword = document.getElementById("input-password-ajax");
    let inputFirstName = document.getElementById("input-fname-ajax");
    let inputLastName = document.getElementById("input-lname-ajax");
    let inputEmail = document.getElementById("input-email-ajax");
    let inputPhoneNumber = document.getElementById("input-phone-ajax");

    // Get the values from the form fields
    let usernameValue = inputUsername.value;
    let passwordValue = inputPassword.value;
    let firstNameValue = inputFirstName.value;
    let lastNameValue = inputLastName.value;
    let emailValue = inputEmail.value;
    let phoneNumberValue = inputPhoneNumber.value;

    // Put our data we want to send in a javascript object
    let data = {
        username: usernameValue,
        password: passwordValue,
        first_name: firstNameValue,
        last_name: lastNameValue,
        email: emailValue,
        phone_number: phoneNumberValue
    }

     // Setup our AJAX request
     var xhttp = new XMLHttpRequest();
     xhttp.open("POST", "/add-shopper-ajax", true);
     xhttp.setRequestHeader("Content-type", "application/json");

    
     // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputUsername.value = '';
            inputPassword.value = '';
            inputFirstName.value = '';
            inputLastName.value = '';
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

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("shoppers-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and cells
    let row = document.createElement("TR");
    let shopperIdCell = document.createElement("TD");
    let usernameCell = document.createElement("TD");
    let passwordCell = document.createElement("TD");
    let firstNameCell = document.createElement("TD");
    let lastNameCell = document.createElement("TD");
    let emailCell = document.createElement("TD");
    let phoneNumberCell = document.createElement("TD");

    // Fill the cells with correct data
    shopperIdCell.innerText = newRow.shopper_id;
    usernameCell.innerText = newRow.username;
    passwordCell.innerText = newRow.password;
    firstNameCell.innerText = newRow.first_name;
    lastNameCell.innerText = newRow.last_name;
    emailCell.innerText = newRow.email;
    phoneNumberCell.innerText = newRow.phone_number;


    // Add the cells to the row
    row.appendChild(shopperIdCell) ;
    row.appendChild(usernameCell);
    row.appendChild(passwordCell);
    row.appendChild(firstNameCell);
    row.appendChild(lastNameCell);
    row.appendChild(emailCell);
    row.appendChild(phoneNumberCell);

    // Add the row to the table
    currentTable.appendChild(row);
}