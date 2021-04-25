/* Add your Application JavaScript */
const app = Vue.createApp({
  data() {
    return {
    }
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
     
  </div>

  <img class="home-image" src="../static/images/car.png" alt="Car Image">

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
            <a class="navbar-brand" href="#">VueJS App</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                  <router-link class="nav-link" to="/explore">Explore<span class="sr-only">(current)</span></router-link>
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

const Explore = Vue.component('explore',{
  template:
  `
  <form id="searchForm" enctype="multipart/form-data" @submit.prevent="searchAll">
  <div class = "form-grid">
    <div>
        <label for="username" class="form-label">Username</label>
        <br>
        <input type="text" name="username" id="username" required>
    </div>
    <div>
      <label for="username" class="form-label">Username</label>
      <br>
      <input type="text" name="username" id="username" required>
    </div>
    </div>
  </form>
  <div>
        <ul class="main">
         <!-- {% for car in results %} --!>
            <li v-for="car in results">
                <div class="card" style="width:18rem;">
                    <img src="" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h4 class="card-title">Car Make is {{ car.make }} and Car Model is {{ car.model }}</h4>
                        <p class="card-text"> {{ car.description }} </p>
                        <a href="#" class="btn btn-primary">Go somewhere</a>
                    </div>
                </div>
            </li>
            {% endfor %}
        </ul>
        
    </div>
  
  `,
  methods:{
    Search :function(){
      let self = this;
            
      let SearchForm = document.getElementById('searchForm');
      let form_data = new FormData(SearchForm);  
      fetch('/api/search',{
        method:'GET',
        body: form_data
        // headers: 
      })
      .then(function(response){
        return response.json();
        // response = response.json();
        // data = response.json();
        // this.results =data;
      })
      .then(function(jsonResponse){
        self.results = jsonResponse;
      });
    }
  
    },
    data : function(){
      return{
        results=[]
      }

    }
  

});


// Define Routes
const router = new VueRouter({  
  routes: [
      {path: "/explore", component: Explore}
  ]
});


app.mount('#app');