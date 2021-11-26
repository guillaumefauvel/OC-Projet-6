

const baseURL = "http://localhost:8000/api/v1/titles/?imdb_score=&imdb_score_min=9.3" //URL TO MODIFY
const ninetiesURL = "http://localhost:8000/api/v1/titles/?min_year=1990&max_year=1999&imdb_score=&imdb_score_min=8.8"
const nicolasCageURL = "http://localhost:8000/api/v1/titles/?imdb_score=&imdb_score_min=7.3&actor=Nicolas+Cage&actor_contains="
const adventureURL = "http://localhost:8000/api/v1/titles/?genre=&genre_contains=adventure&imdb_score=&imdb_score_min=8.6"

let alreadyShownFilm = []


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

    const linksArray = await getLinksPages
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
    // Arg : The getfilmsContent function ( Array of films in json format)
    // Return : The best film, format : json


    let filmsArray = await getFilmsContent
    let bestFilm = filmsArray[0]

    for (film in filmsArray) {
        if (filmsArray[film]["imdb_score"] >= bestFilm["imdb_score"] ) {
            if (filmsArray[film]["votes"] > bestFilm["votes"] ) {
            bestFilm = filmsArray[film]
            }
        }
    }
    alreadyShownFilm.push(bestFilm.title)

    return bestFilm
}


async function returnBestFilms(array) {  
    // Return the best films 
    // Arg : A array of films (in json format)
    // Return : A sorted array of films (in json format)
    let numberOffilms = 7
    let arr = await array;

    sortedarr = await arr.sort(function(a,b) {
        return b.imdb_score - a.imdb_score;
    })
    let filteredArray = []
    let index = 0 
    while (true) {
        if (!alreadyShownFilm.includes(sortedarr[index].title)) {
            console.log(alreadyShownFilm)
            alreadyShownFilm.push(sortedarr[index].title)
            filteredArray.push(sortedarr[index])
            index += 1
        }
        if (filteredArray.length == numberOffilms) { 
            break
        }
        else if (alreadyShownFilm.includes(sortedarr[index].title)) {
            index += 1 
        }
    }
    return filteredArray
}

const greatFilms = getFilmsContent(getLinksPages(baseURL))

const bestFilm = returnBestFilm(greatFilms)
const bestFilms = returnBestFilms(greatFilms)

const bestNinetiesFilms = returnBestFilms(getFilmsContent(getLinksPages(ninetiesURL)))

const nicolasCageBestFilms = returnBestFilms(getFilmsContent(getLinksPages(nicolasCageURL)))

const bestAdventureFilms = returnBestFilms(getFilmsContent(getLinksPages(adventureURL)))
