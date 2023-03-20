function deleteShopper(shopperID) {
    // Put our data we want to send in a javascript object
    let data = {
        shopper_id: shopperID
    };
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-shopper-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {

            // Add the new data to the table
            deleteRow(shopperID);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log("There was an error with the input.")
        }
    }
    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
}


function deleteRow(shopperID){

    let table = document.getElementById("shoppers-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
       if (table.rows[i].getAttribute("data-value") == shopperID) {
            table.deleteRow(i);
            deleteDropDownMenu(shopperID);
            break;
       }
    }
}

function deleteDropDownMenu(shopperID){
    let selectMenu = document.getElementById("mySelect");
    for (let i = 0; i < selectMenu.length; i++){
      if (Number(selectMenu.options[i].value) === Number(shopperID)){
        selectMenu[i].remove();
        break;
      } 
    }
  }