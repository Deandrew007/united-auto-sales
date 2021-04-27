import {router} from '../js/app.js';
const AddPost = {
    name: 'Add Post',
    template: 
    `
    <div class="jumbotron">
      <div class="addCar-grid">
        <h1>Add New Car</h1>
        <form id="addform" enctype="multipart/form-data" @submit.prevent="addVehicle">
                <div class = "form-grid">
                  <div>
                    <label for="make" class="form-label">Make</label>
                    <br>
                    <input type="text" name="make" id="make" required>
                  </div>
                <div>
                  <label for="model" class="form-label">Model</label>
                  <br>
                  <input type="text" name="model" id="model" required>
                </div>
                </div>
                <div class = "form-grid">
                    <div>
                        <label for="colour" class="form-label">Colour</label>
                        <br>
                        <input type="text" name="colour" id="colour" required>        
                    </div>
                    <div>
                        <label for="year" class="form-label">Year</label>
                        <br>
                        <input type="text" name="year" id="year" required>        
                    </div>
                    </div>
                <div class = "form-grid">
                  <div>
                      <label for="price" class="form-label">Price</label>
                      <br>
                      <input type="text" name="price" id="price" required>
                  </div>
                  <div>
                      <label for="car_type" class="form-menu">Car Type</label>
                      <select name="car_type" id="car_type">
                        <option value="SUV">SUV</option>
                        <option value="Sedan">Sedan</option>
                        <option value="Hatchback">Hatchback</option>
                        <option value="Minivan">Minivan</option>
                      </select>
                  
                  </div>
                  </div>
                <label for="transmission" class="form-menu">Transmission</label>
                <select name= "transmission" id="transmission">
                <option value="Automatic">Automatic</option>
                <option value="Manual">Manual</option> 
                </select>
                <br>
                <label for="description" class="form-label">Description</label>
                <br>
                <textarea class="form-control" name="description"></textarea>
                <br>
                <label for="photo" class="form-label">Upload Photo</label>
                <br>
                <input type="file" name="photo" class="form-control">
                <br>
                <button type="submit" class="btn btn-success">Save</button>
        </form>
      
      </div>
  </div>
    `,
    data(){
    return{
  
    } 
    },
    methods:{
      addVehicle(){
          let addform = document.getElementById('addform');
          console.log('add form ', addform)
          let form_data = new FormData(addform);

            console.log('Form Data', form_data.values().next());
          fetch('/api/cars',{
              method:'POST',
              body:form_data,
              headers:{
                //Accept:'application/json',
                //'Content-Type' : 'application/json',
                Authorization: "Bearer " + localStorage.getItem("token"),
                'X-CSRFToken': token
              },
              credentials: 'same-origin'
          })
          .then(function (response) {
            console.log(response)
            if (!response.ok) {
              throw Error(response.statusText);
            }
            
              return response.json();
          })
          .then(function (jsonResponse) {
                router.push('/cars/new');
          })
          .catch (function(error){
              // show error message
              console.log(error);
          })              
  
        }
    }
  
};

export {AddPost};