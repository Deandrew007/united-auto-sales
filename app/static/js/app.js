import {UserProfile} from '../views/UserProfile.js';
import {Home} from '../views/Home.js';
import {Register} from '../views/Register.js';
import {Login} from '../views/Login.js';
import {CarDetails} from '../views/CarDetails.js';
import {NotFound} from '../views/NotFound.js';
import {AddPost } from '../views/AddPost.js';
import {Logout} from '../views/Logout.js'
import {Explore} from '../views/Explore.js'
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
        <li v-if="jwtData.id==null" class="nav-item active">
          <router-link to="/register" class="nav-link">Register</router-link>
        </li>
        <li v-if="jwtData.id!=null" class="nav-item active" >
          <router-link to="/cars/new" class="nav-link">Add Car</router-link>
        </li>
        <li v-if="jwtData.id!=null" class="nav-item active">
          <router-link to="/explore" class="nav-link">Explore</router-link>
        </li>
        <li v-if="jwtData.id!=null" class="nav-item active">
          <router-link :to="'/users/'+jwtData.id" class="nav-link">My Profile</router-link>
        </li>
        <li v-if="jwtData.id==null" class="nav-item">
          <router-link to="/login" class="nav-link">Login</router-link>
        </li>
        <li v-else class="nav-item">
          <router-link to="/logout" class="nav-link">Logout</router-link>
        </li>
      </ul>
    </div>
  </nav>
</header>    
  `,
  created: function(){
    let self = this;

    self.jwt = localStorage.getItem('token');
    console.log(self.jwt);
  },
  data: function() {
    return {
      user_id: '',
      jwt: ''
    };
  },
  computed: {
    // this.jwtData will update whenever this.jwt changes.
    jwtData() {
      // JWT's are two base64-encoded JSON objects and a trailing signature
      // joined by periods. The middle section is the data payload.
      // let jwt = localStorage.getItem('token');
      if (this.jwt){
        let payload = JSON.parse(atob(this.jwt.split('.')[1]));
        console.log('Decode jwt payload '+payload.id);
        return payload
      }
      return {id: null, username: null};
    }
  }
});

app.component('app-footer', {
  template: `
      <footer>
          <div class="container">
              <p>Copyright &copy {{ year }} United Auto Sales</p>
          </div>
      </footer>
  `,
  data: function() {
      return {
          year: (new Date).getFullYear()
      };
  }
});


// Define Routes
const routes = [
  { path: "/", component: Home },
  { path: '/register', component: Register },
  { path: '/login', component: Login },
  { path: '/logout', component: Logout },
  { path: "/explore", component: Explore},
  { path: "/users/:user_id", component: UserProfile},
  { path: '/cars/new', component: AddPost },
  { path: "/cars/:car_id", component: CarDetails },

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