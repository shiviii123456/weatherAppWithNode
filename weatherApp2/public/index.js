//calling the route to get the data

const forms = document.querySelector("form");
const search = document.getElementById("location");
const button = document.getElementById("btn");
let city = document.getElementById("city");
let desc = document.getElementById("desc");
let temp = document.getElementById("temperature");
let img = document.getElementById("images");
let btn = document.getElementById("btnn");
button.addEventListener("click", func1);
let convert;
async function func1(e) {
    try {
        e.preventDefault();

        let y = search.value;
        console.log(y);
        search.value = "";
        temp.innerHTML = "";
        desc.innerHTML = "loading...";
        city.innerHTML = "loading...";


        const response = await fetch(`/weather/${y}`);
        const data = await response.json();
        console.log(data.condition);
        if (data.temperature === "")
            convert = "";
        else
            convert = data.temperature - 273.15;

        temp.innerHTML = convert.toFixed(2) + "℃";
        desc.innerHTML = data.condition;
        city.innerHTML = data.names;
        const x = data.condition;
        console.log(x);
        if (convert >= 10 && convert <= 20) {
            img.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Cartoon_cloud.svg/1280px-Cartoon_cloud.svg.png";
        }
        else if (convert > 20) {
            img.src = "https://icons-for-free.com/iconfiles/png/512/sun+sunny+weather+icon-1320196635525068067.png";
        }
        else if (convert < 10 && convert > 0) {
            img.src = "https://www.svgrepo.com/show/162126/fog.svg";
        }
        else if (convert <= 0) {
            img.src = "https://www.svgrepo.com/show/281219/snowing.svg";
        }
    }
    catch (err) {
        temp.innerHTML = "";
        desc.innerHTML = "";
        city.innerHTML = "Enter valid City";
        img.src = "Loading...";
        console.log(err);
    }
}
btn.addEventListener("click", () => {
    navigator.geolocation.getCurrentPosition(async (position) => {
        try {
            temp.innerHTML = "";
            desc.innerHTML = "loading...";
            city.innerHTML = "loading...";
            console.log(position);
            const { latitude, longitude } = position.coords;
            console.log(latitude, longitude);
            const res = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=d2a9bd89d54e4354b46bedc4d365ec05`);
            const data = await res.json();
            console.log(data);
            const y = data.results[0].components.city;
            console.log(y);
            const response = await fetch(`/weather/${y}`);
            const resdata = await response.json();
            console.log(resdata.condition);
            let convert = resdata.temperature - 273.15;
            temp.innerHTML = convert.toFixed(2) + "℃";
            desc.innerHTML = resdata.condition;
            city.innerHTML = resdata.names;
            const x = resdata.condition;
            console.log(x);
            if (convert >= 10 && convert <= 20) {
                img.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Cartoon_cloud.svg/1280px-Cartoon_cloud.svg.png";
            }
            else if (convert > 20) {
                img.src = "https://icons-for-free.com/iconfiles/png/512/sun+sunny+weather+icon-1320196635525068067.png";
            }
            else if (convert < 10 && convert > 0) {
                img.src = "https://www.svgrepo.com/show/162126/fog.svg";
            }
            else if (convert <= 0) {
                img.src = "https://www.svgrepo.com/show/281219/snowing.svg";
            }
        }
        catch (err) {
            temp.innerHTML = "";
            desc.innerHTML = "";
            city.innerHTML = "Enter valid City";
            img.src = "Loading...";
            console.log(err);
        }
    })
});
// const date = new Date();
// const min = date.toLocaleDateString();
// console.log(min);


var today = new Date();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();