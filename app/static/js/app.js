/* Add your Application JavaScript */
// Instantiate our main Vue Instance
const app = Vue.createApp({
  data() {
    return {}
  }
});

app.component('app-header', {
  name: 'AppHeader',
  template: 
  `
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
    <a class="navbar-brand" href="#">Lab 7</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
  
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <router-link class="nav-link" to="/">Home <span class="sr-only">(current)</span></router-link>
        </li>
        <li class="nav-item active">
          <router-link class="nav-link" to="/upload">Upload <span class="sr-only">(current)</span></router-link>
        </li>
      </ul>
    </div>
  </nav>
  `
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

const Home = {
  name: 'Home',
  template: 
  `
  <div class="jumbotron">
      <h1>Lab 7</h1>
      <p class="lead">
        In this lab we will demonstrate VueJS working with Forms and Form Validation from Flask-WTF.
      </p>
  </div>
  `,
  data() {
    return {}
  }
};

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
        <img src="{{ url_for('get_image', filename= photo) }}" alt="Image of Car">
    </div>
    <div class="car-details">
        <h1 class="make">{{ make }}</h1>
        <h3 class="model">{{ model }}</h3>

        <p class="details">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam cum corrupti veritatis distinctio qui sed aperiam dolorum, dolore eos, cumque, repudiandae mollitia quisquam omnis quaerat nesciunt. Fuga cumque expedita maiores ullam enim ratione, doloremque omnis suscipit dolore exercitationem fugiat modi impedit aliquam vel repellat voluptas tempore dignissimos aliquid? Nesciunt, expedita.
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
      carID = this.id;
      // userID = this.????;
    }
  }
}


// Define Routes
const routes = [
  { path: "/", component: Home },
  // Put other routes here
  { path: "/cars/:car_id", component: Cars },
  // This is a catch all route in case none of the above matches
  { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFound }
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes, // short for `routes: routes`
});

app.use(router);

app.mount('#app');