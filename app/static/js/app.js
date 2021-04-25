/* Add your Application JavaScript */
const app = Vue.createApp({
  data() {
    return {
      welcome: 'Hello World! Welcome to VueJS'
    }
  }
});

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
  <div>
        <ul class="main">
            {% for car in results %}
            <li>
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
  data:function(){
    return {
      results =[]
    };
  },
  created:function(){
    let self = this;

    fetch('/api/search',{
      method:'GET',
      body:{}
      // headers: 
    })
    .then(function(response){
      response = response.json();
      // data = response.json();
      this.results =data;
    })

  }

});


// Define Routes
const router = new VueRouter({
  data: function(){
    return {
      userid : null
    }
  },
  
  routes: [
      {path: "/explore", component: Explore}
  ]
});


app.mount('#app');