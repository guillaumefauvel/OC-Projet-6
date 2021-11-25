

let url = "http://localhost:8000/api/v1/titles/"

function getData(url) {
    
axios.get(url)
.then(function (response) {

    console.log(response);
    
    let films = Object.values(response)[0]['results'];
    console.log(Object.values(response)[0]['results'].length);
    let filmNames = []
    for (key in films) {
        filmNames.push(films[key]["title"])
    }
    
    //document.getElementById("demo").innerHTML = JSON.stringify(response.data);
    document.getElementById("demo").innerHTML = JSON.stringify(filmNames);

    return response
})
.catch(function (error) {
    console.log(error);
})
.then(function () {
});

}       