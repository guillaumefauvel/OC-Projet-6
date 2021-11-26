

let baseURL = "http://localhost:8000/api/v1/titles/?imdb_score=&imdb_score_min=9.4"


function getData(url) {
    // Modify a html paragraph with the movie titles of a page
    
axios.get(url)
.then(function (response) {

    console.log(response);
    
    let films = Object.values(response)[0]['results'];
    console.log(Object.values(response)[0]['results'].length);
    console.log(Object.values(response)[0]['next']);

    let filmNames = []
    for (key in films) {
        filmNames.push(films[key]["title"])
    }
    
    document.getElementById("demo").innerHTML = filmNames;

    return response
})
.catch(function (error) {
    console.log(error);
})
.then(function () {
});

}       


async function getLinksPages(url) {
    // Get the different page of a research
    // Arg : A root URL
    // Return : An array of URL


    let linkArray = []
    while (true) {
        if (Boolean(url) == true) {
        const Res= fetch(url);
        const response= await Res;
        const json = await response.json();
        linkArray.push(url)
        url = json["next"]
        }
        else {
            return linkArray
    }
 }
}


async function getFilmsContent(getLinksPages) {
    // Get the films json datas
    // Arg : The getLinksPages function (containing array of URL)
    // Return : An array containing films as json datas

    let linksArray = await getLinksPages
    let ContentArray = []

    for (page in linksArray) {
        const Res= fetch(linksArray[page]);
        const response= await Res;
        const json = await response.json()
        for (film in json["results"]) {
            ContentArray.push(json["results"][film])
        }
    }
    return ContentArray
}

async function returnBestFilm(getFilmsContent) {
    // Return the best film based on two criteria, the
    // imdb score and the number of votes
    // Arg : The getfilmsContent function
    // Return : The best film, type : json


    let filmsArray = await getFilmsContent
    let bestFilms = filmsArray[0]

    for (film in filmsArray) {
        if (filmsArray[film]["imdb_score"] >= bestFilms["imdb_score"] ) {
            if (filmsArray[film]["votes"] > bestFilms["votes"] ) {
            bestFilms = filmsArray[film]
            }
        }
    }
    console.log(bestFilms)
}


 



