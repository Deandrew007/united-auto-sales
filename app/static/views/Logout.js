import {router} from '../js/app.js'
const Logout = {
    name: 'Logout',
    template: 
    `
    <div>
        <h1>404 - Not Found</h1>
    </div>
    `,
    created: ()=>{
        // console.log("Token here "+token);
        fetch("/api/auth/logout", {
            method: 'POST',
            headers: {
                Accept:'application/json',
                Authorization: "Bearer " + localStorage.getItem("token"),
                'X-CSRFToken': token,
            },
            credentials: 'same-origin'
          })
          .then(function(response) {
            if (!response.ok) {
              throw Error(response.statusText);
            }
            // Parses the response
            // console.log(response);
            return response.json();
          })
          .then(function(jsonResponse) {
            // Saving the data into SELF/THIS
            localStorage.removeItem('token');
            router.push("/");
            //console.log(jsonResponse);
          })
          .catch(function(error) {
            console.log(error);
          });        
    },
    data() {
      return {}
    }
};

export {Logout};