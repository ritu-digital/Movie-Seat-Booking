const container = document.querySelector(".display-container");
const seats = document.querySelectorAll(".movie-seats .seat:not(.occupied)");
const count = document.getElementById("total-seats")
const price = document.getElementById("total-price");
const movieSelect = document.getElementById("movie");

populateUI();

let ticketPrice = parseInt(movieSelect.value);

//Save Movie Data Index and Price
function setMovieData(movieIndex, moviePrice){
localStorage.setItem("selectedMovieIndex", movieIndex);
localStorage.setItem("selectedMoviePrice", moviePrice);
}

//Update the Seats and Price Count Function
function updateSelectedCount(){
    const selectedSeats = document.querySelectorAll(".movie-seats .seat.selected");
    console.log(selectedSeats);

    //Copy selected seats into arr
    // Map through new Array
    //return a new array indexes
    const seatsIndex = [...selectedSeats].map(seat =>[...seats].indexOf(seat));
    
    localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));
    
    const selectedSeatsCount = selectedSeats.length;
    
    count.innerText = selectedSeatsCount;
    price.innerText = selectedSeatsCount * ticketPrice;   
}

//Get Data from local storage and populate UI
function populateUI(){
    const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
    if(selectedSeats !== null && selectedSeats.length>0){
        seats.forEach((seat,index)=>{
            if(selectedSeats.indexOf(index) > -1){
                seat.classList.add("selected");
            }
        });
    }
    const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");
    if(selectedMovieIndex !== null){
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}

//Movie Select Event
movieSelect.addEventListener("click", e=>{
    ticketPrice = parseInt(e.target.value);
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
});


//Seat Click Event
container.addEventListener("click", e=>{
    if(e.target.classList.contains("seat") && !e.target.classList.contains("occupied")){
        e.target.classList.toggle("selected");
        updateSelectedCount();
    }
});

//Initial count and total set
updateSelectedCount();


