import {router} from '../js/app.js';
const Explore = {
    name: 'explore',
    template:
    `
    <form id="searchForm" enctype="multipart/form-data" @submit.prevent="Search">
    <div class="d-flex justify-content-center">
        <h3 class="text-success"> You Can Search By Either Car Make, Car Model, or Both </h3>
    </div>
    
    <br>
    <div class = "form-grid d-flex justify-content-center">
      <div>
          <label for="make" class="form-label">Search By Make</label>
          <br>
          
          <input type="text" name="make" id="make">
      </div>
      <br>
      <div>
        <label for="model" class="form-label">Search By Model</label>
        <br>
        <input type="text" name="model" id="model">
      </div>
      </div>
      <br>
      <button type="submit" class="btn btn-lg btn-block btn-primary">Search</button>
      <br>
      <div class="d-flex justify-content-center">
        <h5 class="text-danger btn-info"> AN EMPTY SEARCH WILL RETURN ALL CARS </h5>
      </div>
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
        })
        .then(function(response){
          return response.json();
        })
        .then(function(json){
          console.log(json);
          // return json;
          const html = json.map(function(cars){
            return `
            <div class="col align-self-center" id="results_d">
              
                    <div class="card" style="width:18rem;">
                        <img src="${cars.photo}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h4 class="card-title">Car Make is ${cars.make} and Car Model is ${cars.model}</h4>
                            <p class="card-text"> ${cars.description} </p>
                            <a href="/cars/:${cars.id}" @click="$router.push('/cars/:${cars.id}')" class="btn btn-primary">Go somewhere</a>
                            
                        </div>
                    </div>
                
          
            </div>
            <br><br><br>
            `;
          })
          .join("");
          // console.log(html);
          // document.querySelector('#results').innerHTML = "";
          var results1 = document.getElementById("results");
          document.getElementById("results").innerHTML=" ";
            // results1.removeChild(document.getElementById("results_d"));
          // results1.parentNode.replaceChild(results1.cloneNode(false), results1);
          // document.getElementById("results_d").remove();
          // document.querySelector('#results').insertAdjacentHTML("afterend",html);
          document.querySelector('#results').innerHTML=html;
        })
        .catch(function(error){
          console.log(error);
        });
      },
  
    
    }  
  
};

export {Explore};