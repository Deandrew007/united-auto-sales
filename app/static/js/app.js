/* Add your Application JavaScript */

const app = Vue.createApp({
  data() {
    return {}
  }
});


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

      <button class="btn btn-success mb-2"  @click="$router.push('explore')" >Explore</button>
     
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
        <li class="nav-item">
          <router-link to="/explore" class="nav-link">Explore</router-link>
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

// Component for viewing Car Details page 
const Cars = {
  name: 'Car Details',
  template: 
  `
  <div class="car-card">
    <div class="car-image">
        <img v-bind:src="'../static/uploads/' + photo" alt="Image of Car">
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
            <a href="#" class="email">Email Owner</a>
            <a v-on:click="favouriteCar()">
                <i class="far fa-heart"></i>
                <i class="fas fa-heart gone"></i>
            </a>
        </div>
    </div>
  </div>
  `,
  created: function() {
    let self = this;
    let carID = self.id; // gets the id

    // car ID should be there
    fetch("/api/cars/" + carID, {
      headers: {
        // Accept:application/json
        // Content-Type:application/json
        method: 'GET',
        headers: {
          'X-CSRFToken': token
        },
        credentials: 'same-origin'
      }
    })
    .then(function(response) {
      // Parses the response
      return response.json();
    })
    .then(function(jsonResponse) {
      // Saving the data into SELF/THIS
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
      // console.log(jsonResponse);
    })
    .catch(function(error) {
      console.log(error);
    });
  },
  data() {
    return {
      "id": this.$route.params.car_id,
      "description": '',
      "year": '',
      "make": '',
      "model": '',
      "colour": '',
      "transmission": '',
      "car_type": '',
      "price": '',
      "photo": '',
      "user_id": ''
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
        return response.json();
      })
      .then(function(jsonResponse) {
        console.log(jsonResponse)

        // Check if the Car was 'favourited'
        if (jsonResponse.favourite == "YES") {
          console.log("Yayyy");
        } else {
          console.log("Noooo");
          router.push('/cars/' + jsonResponse.car_id);
        }
      })
      .catch(function(error) {
        console.log(error);
      });
    }
  }
}

// Abbys
const AddCar = {
  name: 'Add Car',
  template: 
  `
  <div class="car-card">
    <div>
        <img class="single" src="{{ url_for('get_image', filename = car.photo)}} "/>
    </div>
    <div class="single-card-body">
        <h2>{{ car.title }}</h2>
        <div class="attributes">
            <span class="attribute price">{{ car.price }}</span> <span class="attribute type">{{ car.typeHA}}</span>
        </div>
        <p>{{ car.description }}</p>
        <div class="add-tab">
            <p><i class="fa fa-make"></i> {{ car.make }} Make</p>  
            <p><i class="fa fa-model"></i> {{ car.model}} Model</p>
        </div>
        <div class="add-tab">
            <p><i class="fa fa-colour"></i> {{ car.colour }} Colour</p>  
            <p><i class="fa fa-year"></i> {{ car.year}} Year </p>
        </div>
        <div class="add-tab">
            <p><i class="fa fa-price"></i> {{ car.price}} Price</p>  
            <p><i class="fa fa-car_type"></i> {{ car.car_type}} Car Type</p>
        </div>
	
        <p><i class="fa fa-transmission" aria-hidden="true"></i> {{ car.transmission }}</p>
        <p><i class="fa fa-description" aria-hidden="true"></i> {{ car.description }}</p>
        <button type="submit" class="btn email-btn">Email</button>
    </div>
  </div>
  `,created: function() {

  },
  methods: {
    uploadpost: function() {
      self = this;
      let AddForm = document.getElementById('AddForm');
      let form_data = new FormData(AddForm);
      let user_id = localStorage.getItem('car_id');
      fetch("/api/users/" + car_id + "/Add Vehicle", {

        method: 'POST',
        body: form_data,
        headers: {
            'X-CSRFToken': token,
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        credentials: 'same-origin'
      })
      .then(function(response) {
          return response.json();
      })
      .then(function(jsonResponse) {
          // display a success message
          //undefined - no erros
          console.log(jsonResponse.message)
          if (jsonResponse.message == "Car was uploaded sucessfully") {
              router.push('/search');
          }
      })
      .catch(function(error) {
          console.log(error);
      });
    }
  },
  data() {
    return {
      id: 0,
      messages: ""
    }
  }
};

const Explore = {
  name: 'explore',
  template:
  `
  <form id="searchForm" enctype="multipart/form-data" @submit.prevent="Search">
  <div class = "form-grid">
    <div>
        <label for="make" class="form-label">Search By Make</label>
        <br>
        
        <input type="text" name="make" id="make" required>
    </div>
    <br>
    <div>
    <h1> OR </h1>
    </div>
    <div>
      <label for="model" class="form-label">Search By Model</label>
      <br>
      <input type="text" name="model" id="model" required>
    </div>
    </div>
    <button type="submit" class="btn btn-primary">Search</button>
  </form>
  <br>
  <br>
  <br>
  <div class="row" id="results"></div>
  `,
  methods:{
    Search :function(){
      let self = this;
      let results =[];           
      let SearchForm = document.getElementById('searchForm');
      let make1 = document.getElementById('make').value;
      let model1 = document.getElementById('model').value;       
      
      fetch("/api/search?"+ new URLSearchParams({ make:make1,model:model1 }),{
        method:'GET',
        // body: form_data
        // headers: 
        // params:{"make":make, "model":model}
      })
      .then(function(response){
        return response.json();
      })
      .then(function(json){
        // console.log(json);
        // return json;
        const html = json.map(function(cars){
          return `
          <div class="col align-self-center">
            
                  <div class="card" style="width:18rem;">
                      <img src="${cars.photo}" class="card-img-top" alt="...">
                      <div class="card-body">
                          <h4 class="card-title">Car Make is ${cars.make} and Car Model is ${cars.model}</h4>
                          <p class="card-text"> ${cars.description} </p>
                          <a href="#" class="btn btn-primary">Go somewhere</a>
                      </div>
                  </div>
              
        
          </div>
          <br><br><br>
          `;
        })
        .join("");
        console.log(html);
        document.querySelector('#results').insertAdjacentHTML("afterend",html);
      })
      .catch(function(error){
        console.log(error);
      });
    }
  
    },
    data : function(){
      return{
        results:[]
      }

    }
  

};

// Define Routes
const routes = [
  { path: "/", component: Home },
  // Put other routes here
  { path: '/register', component: Register },

  { path: '/login', component: Login },

  { path: "/cars/:car_id", component: Cars },

  {path: "/explore", component: Explore},
  // This is a catch all route in case none of the above matches
  { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFound }
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes, // short for `routes: routes`
});

app.use(router);

app.mount('#app');