import {router} from '../js/app.js';
const Register = {
    name: 'Register',
    template: `
    <div class="jumbotron">
    <div class="register-grid">
    <h1>Register New User</h1>
  
    <form id="registerForm" enctype="multipart/form-data" @submit.prevent="registerUser">
            <div class = "form-grid">
            <div>
                <label for="username" class="form-label">Username</label>
                <br>
                <input type="text" name="username" id="username" required>
            </div>
            <div>
                <label for="password" class="form-label">Password</label>
                <br>
                <input type="password" name="password" id="password" required>
            </div>
            </div>
            <div class = "form-grid">
                <div>
                    <label for="fullname" class="form-label">Fullname</label>
                    <br>
                    <input type="text" name="fullname" id="fullname" required>        
                </div>
                <div>
                    <label for="email" class="form-label">Email</label>
                    <br>
                    <input type="email" name="email" id="email" required>        
                </div>
                </div>
            <label for="location" class="form-label">Location</label>
            <br>
            <input type="text" name="location" id="location" required>
            <br>
            <label for="Biography" class="form-label">Biography</label>
            <br>
            <textarea class="form-control" name="biography"></textarea>
            <br>
            <label for="photo" class="form-label">Upload Photo</label>
            <br>
            <input type="file" name="photo" class="form-control">
            <br>
            <button type="submit" class="btn btn-success">Register</button>
    </form>
    
    </div>
  </div>
    `,
    data() {
    return {
  
    }
    },
    methods:{
        registerUser(){
            let registerForm = document.getElementById('registerForm');
            let form_data = new FormData(registerForm);
  
            fetch('/api/register',{
                method:'POST',
                body: form_data,
                headers:{
                    //Accept: 'application/json',
                    //'Content-Type': 'multipart/form-data',
                    'X-CSRFToken': token
                },
                credentials: 'same-origin'
            })
            .then(function (response) {
                if (!response.ok) {
                    throw Error(response.statusText);
                  }
                return response.json();
            })
            .then(function (jsonResponse) {
                // show success message
                console.log(jsonResponse);
                  router.push('/explore');
            })
            .catch (function(error){
                // show error message
                console.log(error);
            })              
  
          }
        }
};

export {Register};
  