let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function showTime(){
    const date = new Date();
    return date.getHours() + "Hrs: " + date.getMinutes() + " Mins: " + date.getSeconds() + " Secs: ";
}

function makeAJAXCall(methodType, url, callback, async = true, data = null){
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        // console.log(methodType + "State change called at: " +showTime() + " Ready State: " + xhr.readyState + " Status: " + xhr.status);
        if (xhr.readyState === 4) {
            if (xhr.status === 200 || xhr.status === 201) {
                callback(xhr.responseText);
            } else if (xhr.status >= 400) {
                console.log("handle 400 Client Error or 500 Server Error at: "+showTime());
            }
        }
    }
    xhr.open(methodType,url,true);
    if (data) {
        console.log(JSON.stringify(data));
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(data));
    } else xhr.send();
    console.log(methodType + " request sent to server at: " + showTime());
}

const getURL = "http://127.0.0.1:3000/employee/";
function getUserDetails(data){
    console.log("Get user data at: " + showTime() + " Data: " + data);
}

makeAJAXCall("GET", getURL, getUserDetails, true);
console.log("Made GET AJAX call to server at : " + showTime());

const deleteURL = "http://localhost:3000/employee/8";
function userDelete(data){
    console.log("User Deleted: " + showTime() + " Data: "+ data)
}

makeAJAXCall("DELETE", deleteURL, userDelete, false);
console.log("Made DELETE AJAX call to server at : " + showTime());

const postURL = "http://localhost:3000/employee"
const emplData = {"name": "F","salary": "800000"};

function userAdded(data){
    console.log("User Added: "  + showTime() + " Data: "+ data)
}

makeAJAXCall("POST", postURL, userAdded, true, emplData);
console.log("Made POST AJAX call to server at : " + showTime());



//curl -X POST -H "Content-Type: application/json" -d '{"name":"Z", "salary":"9000000"}' "http://localhost:3000/employee"
//curl -GET -H "Content-Type: application/json"  "http://127.0.0.1:3000/employee"
//curl -X DELETE -H "Content-Type: application/json" "http://localhost:3000/employee/4"

