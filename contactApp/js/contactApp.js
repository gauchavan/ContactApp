// load the contact from json file
function loadJSON(callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', '/contact.json', true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}
var contactList = [];
// load the contact from json file
function init() {
    loadJSON(function(response) {
        var actual_JSON = JSON.parse(response);
        var blogContent = '';

        
        for(var key in actual_JSON) {
            if (actual_JSON.hasOwnProperty(key)) {
                var value = actual_JSON[key];
                var lastNameValue = value["lastName"];
                var emailValue = value["email"];
                var bgcolor = value["bgcolor"];
                var birthday = value["birthday"];
                contactList.push({name: lastNameValue, email: emailValue, bgcolor: bgcolor, birthday: birthday, firstname: value["firstName"], address: value["address"], phone: value["phone"]});
                //contactList.sort();

                contactList = contactList.sort(function (a, b) {
                    return a.name.localeCompare( b.name );
                });
            }
        }
        var contactpost = document.getElementById("contact_div");
        for (var i in contactList){
            contactpost.innerHTML += '<a href="#" class="contactnamediv" style="background-color:'+contactList[i].bgcolor+' " onclick="detailview(this);" data-email="'+contactList[i].email+'" >'+contactList[i].name+' '+contactList[i].firstname+'</a>';
        }
    });
}
window.onload = init;


//when you click on the contact - detail view is loaded
 function detailview(dis){
    $("#contact_div, #addnewcontact, .addnewcontactbtn").hide();
    $("#individual_contact").show();
    var emailid = $(dis).attr("data-email");
    var md5_email =  jQuery.md5(emailid);
    for(var i =0;i< contactList.length;i++){
        contactList[i].md5 = " ";
        if(emailid == contactList[i].email){
            contactList[i].md5 = md5_email;
        }
    }

    var jsonVar = "https://www.gravatar.com/"+md5_email+".json?callback=changeTitle";
    var x = document.createElement("SCRIPT");
    $(x).attr("src",jsonVar);
    document.body.appendChild(x);

 }
//when you click on the contact - detail view is loaded
function changeTitle( profile ) {
    var individualcontactpost = document.getElementById("individual_contact");
    $("#individual_contact").html("");
    for (var i in contactList){
        var x = contactList[i].md5;
        var y = profile.entry[0].requestHash;
        if(x == y){
            individualcontactpost.innerHTML += "<i class='fa fa-times pull-right' aria-hidden='true' style='cursor: pointer'  onclick='closeBtn();'></i>";
            individualcontactpost.innerHTML += "<span><img class='img-circle' src="+profile.entry[0].photos[0].value+"</span><span class='displayName'>"+contactList[i].firstname+" "+contactList[i].name+"</span>";
            individualcontactpost.innerHTML += "<p>Phone Number: "+contactList[i].phone+"</p>";
            individualcontactpost.innerHTML += "<p>Address: "+contactList[i].address+"</p>";
            individualcontactpost.innerHTML += "<p>Birth Date: "+contactList[i].birthday+"</p>";
            individualcontactpost.innerHTML += "<p>Email Id: "+contactList[i].email+"</p>";
            return false;
        }

    }


}
//close the detailed view
function closeBtn() {
    $("#individual_contact").hide();
    $("#contact_div, .addnewcontactbtn").show();

}
// open the new contact form
function addnewcontactbtnfunction(){
    $("#addnewcontact").show();
}
//close the new contact form
function  closeformBtn() {
    $("#addnewcontact").hide();
}

//creates the new contact
function createnewcontact() {
    var getFirstName = document.getElementById("firstname").value;
    var getLastName = document.getElementById("lastname").value;
    var getEmail = document.getElementById("email").value;
    var getPhoneNumber = document.getElementById("phonenumber").value;
    var getAddress = document.getElementById("address").value;
    var getBirthday = document.getElementById("birthday").value;

    if(getFirstName == ""){
        alert("Please Enter the FirstName");
        return false;
    }else if(getLastName == ""){
        alert("Please Enter the LastName");
        return false;
    }else if(getEmail == ""){
        alert("Please Enter the Email");
        return false;
    }else if(getPhoneNumber == ""){
        alert("Please Enter the PhoneNumber");
        return false;
    }else if(getAddress == ""){
        alert("Please Enter the Address");
        return false;
    }else if(getBirthday == ""){
        alert("Please Enter the Birthday");
        return false;
    }


    contactList.push({name: getLastName, email: getEmail, bgcolor : "#d1d1d1", birthday: getBirthday, firstname :getFirstName, address :getAddress, phone :getPhoneNumber});

    contactList = contactList.sort(function (a, b) {
        return a.name.localeCompare( b.name );
    });


    $( "#contact_div" ).html('');
    var contactpost = document.getElementById("contact_div");
    for (var i in contactList){
        contactpost.innerHTML += '<a href="#" class="contactnamediv" style="background-color:'+contactList[i].bgcolor+' " onclick="detailview(this);" data-email="'+contactList[i].email+'" >'+contactList[i].name+' '+contactList[i].firstname+'</a>';
    }

    $("#firstname").val("");
    $("#lastname").val("");
    $("#email").val("");
    $("#phonenumber").val("");
    $("#address").val("");
    $("#birthday").val("");

    alert("New Contact Added!!!!");
}