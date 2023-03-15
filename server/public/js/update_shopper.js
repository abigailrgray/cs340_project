// Get the objects we need to modify
let updateShopperForm = document.getElementById('update-shopper-form-ajax');

// Modify the objects we need
updateShopperForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputFullName = document.getElementById("mySelect");
    let inputUsername = document.getElementById("input-username-update");
    let inputPassword = document.getElementById("input-password-update");
    let inputFirstName = document.getElementById("input-fname-update");
    let inputLastName = document.getElementById("input-lname-update");
    let inputEmail = document.getElementById("input-email-update");
    let inputPhoneNumber = document.getElementById("input-phone-update");

    // Get the values from the form fields
    let fullNameValue = inputFullName.value;
    let usernameValue = inputUsername.value;
    let passwordValue = inputPassword.value;
    let firstNameValue = inputFirstName.value;
    let lastNameValue = inputLastName.value;
    let emailValue = inputEmail.value;
    let phoneNumberValue = inputPhoneNumber.value;
    
    // currently the database table for bsg_people does not allow updating values to NULL
    // so we must abort if being bassed NULL for homeworld

    // if (isNaN(homeworldValue)) 
    // {
    //     return;
    // }


    // Put our data we want to send in a javascript object
    let data = {
        full_name: fullNameValue,
        username: usernameValue,
        password: passwordValue,
        first_name: firstNameValue,
        last_name: lastNameValue,
        email: emailValue,
        phone_number: phoneNumberValue
    }
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-shopper-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, fullNameValue);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(data, shopperID){
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("shoppers-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == shopperID) {

            // Get the location of the row where we found the matching person ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get tds
            let usernameCell = updateRowIndex.getElementsByTagName("td")[1];
            let passwordCell = updateRowIndex.getElementsByTagName("td")[2];
            let firstNameCell = updateRowIndex.getElementsByTagName("td")[3];
            let lastNameCell = updateRowIndex.getElementsByTagName("td")[4];
            let emailCell = updateRowIndex.getElementsByTagName("td")[5];
            let phoneNumberCell = updateRowIndex.getElementsByTagName("td")[6];

            // Reassign homeworld to our value we updated to
            usernameCell.innerHTML = parsedData[0].username; 
            passwordCell.innerHTML = parsedData[0].password;
            firstNameCell.innerHTML = parsedData[0].first_name;
            lastNameCell.innerHTML = parsedData[0].last_name;
            emailCell.innerHTML = parsedData[0].email;  
            phoneNumberCell.innerHTML = parsedData[0].phone_number; 
       }
    }
}