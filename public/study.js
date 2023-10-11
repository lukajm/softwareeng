let registeredUser = [
  {useremail:"Dylan",
   password:"Kohlhofer"
  }
]
function logIN() {
	     var useremail = document.getElementById("email").value
	     var password = document.getElementById("password").value

      for(i=0; i<registeredUser.length; i++ ) {
        if(useremail == registeredUser[i].useremail && password == registeredUser[i].password)
            {console.log("Welcome to the Study Planner "+ useremail)
          }
      }
  }
