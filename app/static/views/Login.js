import {router} from '../js/app.js';
const Login = {
    name: 'Login',
    template: `
    <div class="jumbotron">
    <div class="login-grid">
    <h1>Login to your account</h1>
    <form id="loginForm" enctype="multipart/form-data" @submit.prevent="loginUser">
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
           <br>
            <button type="submit" class="btn btn-success">Login</button>
    </form>
    
    </div>
  </div>
    `,
    data() {
    return {
  
    }
    },
    methods:{
      loginUser(){
        let loginForm = document.getElementById('loginForm');
        let form_data = new FormData(loginForm);
        console.log(form_data);
        fetch('/api/auth/login',{
            method:'POST',
            body: form_data,
            headers:{
                'X-CSRFToken': token
            },
            credentials: 'same-origin'
        })
        // .then(handleErrors)
        .then(function (response) {
          if (!response.ok) {
            router.push('/login');
          }
          return response.json();
        })
        .then(function (jsonResponse) {
            // show success message
            console.log(jsonResponse);
            router.push('/explore');
            localStorage.setItem('token', jsonResponse.token)
            // router.push('');
        })
        .catch (function(error){
            // show error message
            console.log(error);
        })              
    
      }
    },
   
};

export {Login};