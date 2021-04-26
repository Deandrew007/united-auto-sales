import {router} from '../js/app.js';
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
            Authorization: "Bearer " + localStorage.getItem("token"),
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
            Authorization: "Bearer " + localStorage.getItem("token"),
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
};

export {Cars};