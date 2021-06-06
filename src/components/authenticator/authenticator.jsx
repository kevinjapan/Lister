import reqInit from "../requestInit/RequestInit"


export const authenticator = {

   isAuthenticated: false,
   token: "",
   restart: false,
   attempts: 0,
   max_attempts:5,

   authenticate(api,credentials,cb_fail,cb_success,cb_restart) {
      this.attempts++
      if(this.attempts < this.max_attempts) {
         authenticateAtServer(api,credentials,cb_fail,cb_success)
      }
      else {
         this.restart = true
         cb_restart()
      }
   },
   logout(api,cb) {
      this.isAuthenticated = false
      logoutAtServer(api)
      cb()
   }
}

function authenticateAtServer(api_server_path,credentials,cb_fail,cb_success) {

   let myRequest = new Request(
      api_server_path + "/security/authenticateAdmin.php",
      reqInit(JSON.stringify(credentials))
   )

   fetch(myRequest)
      .then(response => {
         return response.json();
      })
      .then(jsonDataSet => {

         if(jsonDataSet.server_response.outcome === "success") {
            authenticator.token = jsonDataSet.server_response.token
            authenticator.isAuthenticated = true
            cb_success()
         }
         else if(jsonDataSet.server_response.outcome === "no_session") {
            authenticator.isAuthenticated = false
            cb_fail()
         }
         else {
            authenticator.isAuthenticated = false
            cb_fail()
         }
      })
      .catch(error => {
         authenticator.isAuthenticated = false
         cb_fail()
      })
}


function logoutAtServer(api_server_path) {

   let credentials = {name:'',username:'',password:''}

   let myRequest = new Request(
      api_server_path + "/security/logout.php",
      reqInit(JSON.stringify(credentials))
   )

   fetch(myRequest)
      .then(response => {
         return response.json();
      })
      .then(jsonDataSet => {
         if(jsonDataSet.server_response.outcome === "success") {
            authenticator.isAuthenticated = true
         }
         else if(jsonDataSet.server_response.outcome === "no_session") {
            authenticator.isAuthenticated = false
         }
         else {
            authenticator.isAuthenticated = false
         }
      })
      .catch(error => {
         authenticator.isAuthenticated = false
      })
}

