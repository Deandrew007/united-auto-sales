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
                  <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">News</a>
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
const addVehicle = Vue.component('addVehicle', {
    template: `
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


    `,
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
    data: function() {
        return {
            id: 0,
            messages: ""


        }
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

app.mount('#app');