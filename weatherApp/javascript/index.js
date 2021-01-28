const { default: fetch } = require("node-fetch");

console.log("hell");
console.log("using fetch with async await");
const weather = async () => {
    try {
        const result = await fetch("https://api.github.com/users");
        const results = await result.json();
        console.log(results);
    }
    catch (err) {
        console.log(err);
    }
}
weather();
async function getUserAsync() {
    let response = await fetch(`https://api.github.com/users`);
    let data = await response.json()
    return data;
}

getUserAsync()
    .then(data => console.log(data)); 