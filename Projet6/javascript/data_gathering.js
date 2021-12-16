// Get and sort the API datas
//

const baseURL = "http://localhost:8000/api/v1/titles/?imdb_score=&imdb_score_min=9.3" 
const ninetiesURL = "http://localhost:8000/api/v1/titles/?min_year=1990&max_year=1999&imdb_score=&imdb_score_min=8.8"
const nicolasCageURL = "http://localhost:8000/api/v1/titles/?imdb_score=&imdb_score_min=7.3&actor=Nicolas+Cage&actor_contains="
const adventureURL = "http://localhost:8000/api/v1/titles/?genre=&genre_contains=adventure&imdb_score=&imdb_score_min=8.6"


let alreadyShownFilm = []


async function getLinksPages(url) {
    // Get the different pages of a research
    // Arg : A root URL
    // Return : An array of URLs

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
    // Arg : The getLinksPages function (containing array of URLs)
    // Return : An array containing films as json datas

    const linksArray = await getLinksPages
    let ContentArray = []

    for (let page in linksArray) {
        const Res= fetch(linksArray[page]);
        const response= await Res;
        const json = await response.json()
        for (let film in json["results"]) {
            ContentArray.push(json["results"][film])
        }
    }
    return ContentArray
}


async function returnBestFilm(getFilmsContent) {
    // Return the best film based on two criteria, the
    // imdb score and the number of votes
    // Arg : The getfilmsContent function ( Array of films in json format)
    // Return : The best film (in json format)

    let filmsArray = await getFilmsContent
    let bestFilm = filmsArray[0]

    for (let film in filmsArray) {
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

    let sortedarr = await arr.sort(function(a,b) {
        return b.imdb_score - a.imdb_score;
    })

    let filteredArray = []
    let index = 0 
    while (true) {
        if (!alreadyShownFilm.includes(sortedarr[index].title)) {
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


export async function getDatas() {
    // Return all the chosen datas
    // Return : An array of array that contains films datas in JSON format
    
    const greatFilms = await getFilmsContent(getLinksPages(baseURL))
    const bestFilm = await returnBestFilm(greatFilms)
    const bestFilms = await returnBestFilms(greatFilms)
    const bestNinetiesFilms = await returnBestFilms(getFilmsContent(getLinksPages(ninetiesURL)))
    const nicolasCageBestFilms = await returnBestFilms(getFilmsContent(getLinksPages(nicolasCageURL)))
    const bestAdventureFilms = await returnBestFilms(getFilmsContent(getLinksPages(adventureURL)))
    const films_array = [bestFilm, bestFilms, bestNinetiesFilms, nicolasCageBestFilms, bestAdventureFilms]

    return films_array
}



