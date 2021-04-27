import {router} from '../js/app.js';
// Component for viewing Car Details page 
const CarDetails = {
  name: 'Car Details',
  template: 
  `
  <div class="car-card">
    <div class="car-image">
      <img v-bind:src="../static/uploads/" + photo" alt="Image of Car">
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
        <div class="hearts">
          <a id="filled" class="fav-heart" v-on:click="favouriteCar()">
            <i class="fas fa-heart"></i>
          </a>
          <a id="empty" class="fav-heart" v-on:click="favouriteCar()">
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
        Accept:'application/json',
        // Content-Type:application/json --> IGNORE THIS
        method: 'GET',
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
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
      /* 
        Saving the data into SELF/THIS. 
        Further parsing of the JSON object happens here.
      */

      // Get the heart elements
      filled_heart = document.getElementById("filled");
      empty_heart = document.getElementById("empty");

      // Check for errors
      if (car_status == 401) {
        console.log("ERROR: " + jsonResponse.message)
        router.push('/not found');
      }
      if (car_status == 200) {
        // self.isFavourited = false;
        empty_heart.classList.add("gone");
        filled_heart.classList.remove("gone");
      } else {
        // self.isFavourited = true;
        filled_heart.classList.add("gone");
        empty_heart.classList.remove("gone");
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
      // ,isFavourited: false
    }
  }, 
  methods: {
    favouriteCar: function() {
      // Initialize variables
      let self = this;
      let carID = self.id; // gets the id

      fetch("/api/cars/" + carID + "/favourite", {
        method: 'POST',
        headers: {
          Accept:'application/json',
          'Content-Type':'application/json',
          Authorization: "Bearer " + localStorage.getItem("token"),
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

          // Output a message
          console.log(jsonResponse.message);
          console.log("Favourited-" + status + " for Car: " + jsonResponse.car_id + ", by User: " + jsonResponse.user_id);
        } else {
          // If No, change the class of the icon to an un-filled heart
          self.isFavourited = false;

          // Output a message
          console.log(jsonResponse.message);
          console.log("Not Favourited-" + status + " for Car: " + jsonResponse.car_id + ", by User: " + jsonResponse.user_id);
        }
      })
      .catch(function(error) {
        console.log(error);
      });
    }
  }
};

export {CarDetails};