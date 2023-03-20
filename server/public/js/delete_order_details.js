function deleteOrderDetails(orderDetailsID) {
    // Put our data we want to send in a javascript object
    let data = {
        order_details_id: orderDetailsID
    };
    console.log(orderDetailsID);
    console.log(data);
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-order-details-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {

            // Add the new data to the table
            deleteRow(orderDetailsID);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log("There was an error with the input.")
        }
    }
    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
}


function deleteRow(orderDetailsID){

    let table = document.getElementById("order-details-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
       if (table.rows[i].getAttribute("data-value") == orderDetailsID) {
            table.deleteRow(i);
            deleteDropDownMenu(orderDetailsID);
            break;
       }
    }
}

function deleteDropDownMenu(orderDetailsID){
    let selectMenu = document.getElementById("mySelect");
    for (let i = 0; i < selectMenu.length; i++){
      if (Number(selectMenu.options[i].value) === Number(orderDetailsID)){
        selectMenu[i].remove();
        break;
      } 
    }
  }
