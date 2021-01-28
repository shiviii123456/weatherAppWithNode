
//calling the route to get the data
const forms = document.querySelector("form");
const search = document.getElementById("location");
const button = document.getElementById("btn");
let city = document.getElementById("city");
let desc = document.getElementById("desc");
let temp = document.getElementById("temperature");

button.addEventListener("click", func1);
function func1(e) {
    e.preventDefault();
    let y = search.value;
    console.log(y);
    search.value = "";
    temp.innerHTML = "";
    desc.innerHTML = "loading...";
    city.innerHTML = "loading...";
    fetch(`weather?city=${y}`)
        .then(response => {
            response.json().then(data => {
                if (data.error) {
                    temp.innerHTML = data.error;
                    desc.innerHTML = "";
                    city.innerHTML = "";
                }
                else {
                    console.log(data);
                    let x = data.temp - 273.15;
                    console.log(x);
                    temp.innerHTML = x.toFixed(2) + "℃";
                    desc.innerHTML = data.condition;
                    city.innerHTML = data.city;
                }
            })
        })


}
