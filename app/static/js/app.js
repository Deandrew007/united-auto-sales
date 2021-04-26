import {UserProfile} from '../views/UserProfile.js';
import {Home} from '../views/Home.js';
import {Register} from '../views/Register.js';
import {Login} from '../views/Login.js';
import {Cars} from '../views/Cars.js';
import {NotFound} from '../views/NotFound.js';
/* Add your Application JavaScript */

const app = Vue.createApp({
  data() {
    return {
      tasks: [],
      token: "",
      result: {},
      error: false,
      user_id: ''      
    }

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
        <li class="nav-item active">
          <router-link to="/users/{{jwtData.id}}" class="nav-link">My Profile</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/login/" class="nav-link">Login</router-link>
        </li>
      </ul>
    </div>
  </nav>
</header>    
  `,
  created: function(){
    let self = this;

    localStorage.getItem('token')
  },
  data: function() {
    return {
      user_id: ''
    };
  },
  computed: {
    // this.jwtData will update whenever this.jwt changes.
    jwtData() {
      // JWT's are two base64-encoded JSON objects and a trailing signature
      // joined by periods. The middle section is the data payload.
      if (localStorage.getItem('token')) return JSON.parse(atob(this.jwt.split('.')[1]));
      return {};
    }
  }
});

app.component('app-footer', {
  name: 'AppFooter',
  template: 
  `
  <footer>
    <div class="container">
      <p>Copyright &copy; {{ year }} Flask Inc.</p>
    </div>
  </footer>
  `,
  data() {
    return {
      year: (new Date).getFullYear()
    }
  }
});


// Define Routes
const routes = [
  { path: "/", component: Home },
  // Put other routes here
  { path: '/register', component: Register },

  { path: '/login', component: Login },

  { path: "/explore", component: UserProfile},

  { path: "/cars/:car_id", component: Cars },

  { path: "/users/:user_id", component: UserProfile},
  // This is a catch all route in case none of the above matches
  { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFound }
];


const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes, // short for `routes: routes`
});

export {router}
app.use(router);
app.mount('#app');