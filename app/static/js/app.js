/* Add your Application JavaScript */
const app = Vue.createApp({
  data() {
    return {}
  }
});

/*-------------------------------------------------------------------------------*/
// DEANDREW SECTION - START
/*-------------------------------------------------------------------------------*/

// Route for viewing the Home page.
const Home = {
  name: 'Home',
  template: 
  `
  <div class="home-grid">
    <div class="home-text-section">
      <h1>Buy and Sell Cars Online</h1>
      <p>
        United Auto Sales provides the fastest easiest and most user friendly way to buy and sell cars online.
        Find a Great Price on the Vehicle You Want.
      </p>
    
      <button class="btn btn-primary mb-2" @click="$router.push('register')">Register</button>
      <button class="btn btn-success mb-2"  @click="$router.push('login')" >Login</button>
    </div>

    <img class="home-image" src="../static/images/car.png" alt="Car Image">
  </div>
  `,
  data() {
    return {}
  }
};

// Route for viewing the Register page.
const Register = {
  name: 'Register',
  template: 
  `
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
    return {}
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
        // show success message
        console.log(jsonResponse);
        console.log(jsonResponse.register.status);
        if (jsonResponse.register.status == 200) {
          router.push('/login');
        }else {
          router.push('/home');
        }
      })
      .catch (function(error){
        // show error message
        console.log(error);
      });
    }
  }
};

// Route for viewing the Login page.
const Login = {
  name: 'Login',
  template: 
  `
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
    return {}
  }
};

// Component for the Footer
app.component('app-header', {
  name: 'AppHeader',
  template: 
  `
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
  data() {
    return {};
  }
});

// Component for the Footer
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

/*-------------------------------------------------------------------------------*/
// DEANDREW SECTION - END
/*-------------------------------------------------------------------------------*/


/*-------------------------------------------------------------------------------*/
// JONES' SECTION - START
/*-------------------------------------------------------------------------------*/

// Route for viewing the Car Details page.
const Cars = {
  name: 'Car Details',
  template: 
  `
  <div class="car-card">
    <div class="car-image">
      <img v-bind:src="'./uploads/' + photo" alt="Image of Car">
    </div>
    <div class="car-details">
      <h1 class="make">{{ make }}</h1>
      <h3 class="model">{{ model }}</h3>

      <p class="details">
        {{ description }}
      </p>

      <div class="other-details">
        <div class="item">
          <p class="key">Color</p>
          <p class="value">{{ colour }}</p>
        </div>
        <div class="item">
          <p class="key">Price</p>
          <p class="value">{{ price }}</p>
        </div>
        <div class="item">
          <p class="key">Body Type</p>
          <p class="value">{{ car_type }}</p>
        </div>
        <div class="item">
          <p class="key">Transmission</p>
          <p class="value">{{ transmission }}</p>
        </div>
      </div>

      <div class="base">
        <p v-if="isFavourited">TESTING</p>
        <a href="#" class="email">Email Owner</a>
        <div class="hearts">
          <a class="fav-heart" v-on:click="favouriteCar()" v-if="isFavourited">
            <i class="fas fa-heart"></i>
          </a>
          <a class="fav-heart" v-on:click="favouriteCar()" v-else>
            <i class="far fa-heart"></i>
          </a>
        </div>
      </div>
    </div>
  </div>
  `,
  created: function() {
    // Call the Favourite function on start up
    // this.favouriteCar(); // Should check if the car was favourited

    let self = this;
    let carID = self.id; // gets the id

    // car ID should be there
    fetch("/api/cars/" + carID, {
      headers: {
        // Accept:application/json       --> IGNORE THIS
        // Content-Type:application/json --> IGNORE THIS
        method: 'GET',
        headers: {
          'X-CSRFToken': token
        },
        credentials: 'same-origin'
      }
    })
    .then(function(response) {
      // Parses the response from   { {JSON object}, status-number }
      //                      E.g.  { {car_type: Type R}, 200 }
      let self = this;
      self.car_status = response.status; // Stores the status

      return response.json();
    })
    .then(function(jsonResponse) {
      // Saving the data into SELF/THIS
      // Further parsing of the JSON object happens here.

      if (car_status == 200) {
        self.isFavourited = false;
      } else {
        self.isFavourited = true;
      }
      
      self.id           = jsonResponse.id;
      self.description  = jsonResponse.description;
      self.year         = jsonResponse.year;
      self.make         = jsonResponse.make;
      self.model        = jsonResponse.model;
      self.colour       = jsonResponse.colour;
      self.transmission = jsonResponse.transmission;
      self.car_type     = jsonResponse.car_type;
      self.price        = jsonResponse.price;
      self.photo        = jsonResponse.photo;
      self.user_id      = jsonResponse.user_id;
      self.status       = jsonResponse.status;

      console.log(jsonResponse);
    })
    .catch(function(error) {
      // Logs/Prints the error
      console.log(error);
    });
  },
  data() {
    return {
      id: this.$route.params.car_id,
      description: '',
      year: '',
      make: '',
      model: '',
      colour: '',
      transmission: '',
      car_type: '',
      price: '',
      photo: '',
      user_id: ''
      ,isFavourited: false
    }
  }, 
  methods: {
    favouriteCar: function() {
      // Initialize variables
      let self = this;
      let carID = self.id; // gets the id
      // let userID = this.????;

      fetch("/api/cars/" + carID + "/favourite", {
        method: 'POST',
        headers: {
          'X-CSRFToken': token
        },
        credentials: 'same-origin'
      })
      .then(function(response) {
        // console.log("RESPONSE " + response.status)
        let self = this;
        self.fav_status = response.status; // Stores the status

        return response.json();
      })
      .then(function(jsonResponse) {
        // Check if the Car was 'favourited'
        if (fav_status == 200) {
          // If Yes, change the class of the icon to a filled heart
          self.isFavourited = true;

          // Output a message and refresh the page
          console.log("Favourited-" + status + " for Car: " + jsonResponse.car_id + ", by User: " + jsonResponse.user_id);
        } else {
          // If No, change the class of the icon to an un-filled heart
          self.isFavourited = false;

          // Output a message and refresh the page
          console.log("Not Favourited-" + status + " for Car: " + jsonResponse.car_id + ", by User: " + jsonResponse.user_id);
          // router.push('/cars/' + jsonResponse.car_id);
        }
      })
      .catch(function(error) {
        console.log(error);
      });
    }
  }
}
/*-------------------------------------------------------------------------------*/
// JONES' SECTION - END
/*-------------------------------------------------------------------------------*/



/*-------------------------------------------------------------------------------*/
// OTHER SECTION - START
/*-------------------------------------------------------------------------------*/

/*-------------------------------------------------------------------------------*/
// OTHER SECTION - END
/*-------------------------------------------------------------------------------*/


/*-------------------------------------------------------------------------------*/
// OTHER SECTION - START
/*-------------------------------------------------------------------------------*/

/*-------------------------------------------------------------------------------*/
// OTHER SECTION - END
/*-------------------------------------------------------------------------------*/


/*-------------------------------------------------------------------------------*/
// OTHER SECTION - START
/*-------------------------------------------------------------------------------*/

/*-------------------------------------------------------------------------------*/
// OTHER SECTION - END
/*-------------------------------------------------------------------------------*/



/*-------------------------------------------------------------------------------*/
// ROUTE & ROUTER SECTION - START
/*-------------------------------------------------------------------------------*/

// Route for the 404 page
const NotFound = {
  name: 'NotFound',
  template: 
  `
  <div>
    <h1>404 - Not Found</h1>
  </div>
  `,
  data() {
    return {}
  }
};

// Define Routes
const routes = [
  { path: "/", component: Home },
  
  // Put other routes here - @TEAM
  { path: '/register', component: Register }, // Deandrew
  { path: '/login', component: Login },       // Deandrew

  { path: "/cars/:car_id", component: Cars }, // Jones
  
  // This is a catch all route in case none of the above matches
  { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFound }
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes, // short for `routes: routes`
});

// Let's the application use the different routes and mounts the app
app.use(router);
app.mount('#app');

/*-------------------------------------------------------------------------------*/
// ROUTE & ROUTER SECTION - END
/*-------------------------------------------------------------------------------*/