// Component for viewing Car Details page 
const UserProfile = {
  name: 'User Profile',
  template: 
  `
  <div class="flexing">
    <div class="user-favs">
      <div class="user-card">
          <img :src=user.photo alt="profile pic">
          <div class="user-details">
              <h1>{{user.name}}</h1>
              <h2 class="grey">@{{user.username}}</h2>
              <p class="bio">{{user.biography}}</p>
              <div class="other-info">
                  <div>
                      <p class="grey">Email</p><p>{{user.email}}</p>
                  </div>
                  <div>
                      <p class="grey">Location</p><p>{{user.location}}</p>
                  </div>
                  <div>
                      <p class="grey">Joined</p><p>{{user.date_formated}}</p>
                  </div>
              </div>
          </div>
        </div>

        <div class="favourites">
          <h2>Cars Favourited</h2>
          <div class="car-grid">
            <div v-for="car in fav_cars" class="fav-car">
              <img src="{{car.photo}}" alt="A car">
              <div class="row">
                  <p>{{car.year}} {{car.make}}</p>
                  <p class="price">
                      <i class="fas fa-tag"></i>{{car.price}}
                  </p>
              </div>
              <p class="grey">{{car.model}}</p>
              <a href="#">View more details</a>
            </div>
          </div>
        </div>
    </div>
  </div>
  `,
  created: function() {
    let self = this;
    // let user_id = self.id; // gets the id
    let user_id = 3; // gets the id
    let dates = {'01':'January', '02': 'February', '03': 'March', '04': 'April', '05': 'May', '06': 'June', 
                  '07': 'July','08': 'August', '09': 'September', '10': 'October', '11': 'November', '12': 'December'}
    /*==============GET USER  DETAILS==============*/
    // user ID should be there
    fetch("/api/users/" + user_id, {
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
    .then(handleErrors)
    .then(function(response) {
      // Parses the response
      return response.json();
    })
    .then(function(jsonResponse) {
      // Saving the data into SELF/THIS
      self.user = jsonResponse;

      let date = (self.user.date_joined.split(" ")[0]).split("-");
      console.log(date);
      self.user.date_formated = dates[date[1]] +" "+dates[2]+", "+dates[0];
      // console.log(jsonResponse);
    })
    .catch(function(error) {
      console.log(error);
    });

    /*==============GET FAVOURITED CARS==============*/
    fetch("/api/users/"+user_id+"/favourites", {
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
    .then(handleErrors)
    .then(function(response) {
      // Parses the response
      return response.json();
    })
    .then(function(jsonResponse) {
      // Saving the data into SELF/THIS
      self.fav_cars = jsonResponse
      console.log(jsonResponse);
    })
    .catch(function(error) {
      console.log(error);
    });
  },
  data() {
    return {
      user : {},
      fav_cars: []
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
      .then(handleErrors)
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


function handleErrors(response) {
  if (!response.ok) {
      throw Error(response.statusText);
  }
  return response;
}


export {UserProfile};