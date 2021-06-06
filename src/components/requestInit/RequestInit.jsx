const reqInit = body => {

   let initialiser = {
      method: "GET",
      headers: {"Content-Type": "application/json"},
      cache: "default"
   }
   if(body !== undefined || body !== "") {
      initialiser.method = "POST"
      initialiser.body = body
   }
  return initialiser
}

export default reqInit