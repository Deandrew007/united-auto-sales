/* Add your Application JavaScript */
const Home = {
  name: 'Home',
  template: `
  <div class="home-grid">
  <div class="home-text-section">
      <h1>Buy and Sell Cars Online</h1>
      <p>United Auto Sales provides the fastest easiest and most user friendly way to buy and sell cars online.
      Find a Great Price on the Vehicle You Want.</p>
    
      <button class="btn btn-primary mb-2" @click="$router.push('register')">Register</button>
      
      <button class="btn btn-success mb-2"  @click="$router.push('login')" >Login</button>
     
  </div>

  <img class="home-image" src="../static/images/car.png" alt="Car Image">

</div>
  `,
  data() {
  return {

  }
  }
 };

 const Register = {
  name: 'Register',
  template: `
  <div class="jumbotron">
  <div class="register-grid">
  <h1>Register New User</h1>
  <form id="registerForm" enctype="multipart/form-data">
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
                  'X-CSRFToken': token
              },
              credentials: 'same-origin'
          })
          .then(function (response) {
              return response.json();
          })
          .then(function (jsonResponse) {
              // display a success message
              console.log(jsonResponse);
          })
          .catch (function(error){
              console.log(error);
          })              

        }
      }
 };

 const Login = {
  name: 'Login',
  template: `
  <div class="jumbotron">
  <div class="login-grid">
  <h1>Login to your account</h1>
  <form id="loginUser" enctype="multipart/form-data">
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
          <button type="submit" class="btn btn-success">Register</button>
  </form>
  
  </div>
</div>
  `,
  data() {
  return {

  }
  }
 };

const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes: [
  { path: '/', component: Home },
  { path: '/register', component: Register },
  { path: '/login', component: Login },


  ]
 });

const app = Vue.createApp({
  data() {
    return {
    }
  },
  components: {
    'home': Home,
    }
});

app.component('app-header', {
  name: 'AppHeader',
  template: `
  <header>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
    <a class="navbar-brand" href="/">United Auto Sales</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <router-link to="/register" class="nav-link">Register</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/login" class="nav-link">Login</router-link>
        </li>
      </ul>
    </div>
  </nav>
</header>    
  `,
  data: function() {
    return {};
  }
});

app.component('app-footer', {
  name: 'AppFooter',
  template: `
      <footer>
          <div class="container">
              <p>Copyright &copy {{ year }} Flask Inc.</p>
          </div>
      </footer>
  `,
  data: function() {
      return {
          year: (new Date).getFullYear()
      }
  }
})

app.use(router)
app.mount('#app');