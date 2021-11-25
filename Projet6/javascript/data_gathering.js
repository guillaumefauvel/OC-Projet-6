

let url = "http://localhost:8000/api/v1/titles/?year=&min_year=&max_year=&imdb_score=&imdb_score_min=9.3&imdb_score_max=&title=&title_contains=&genre=&genre_contains=&sort_by=&director=&director_contains=&writer=&writer_contains=&actor=&actor_contains=&country=&country_contains=&lang=&lang_contains=&company=&company_contains=&rating=&rating_contains="

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


function getPages(url, list) {
    // We gather the page
    let ListOfPage = list
    if (url != null) {
    ListOfPage.push(url);
    
    axios.get(url)
    .then(function (response) {
    let page = Object.values(response)[0]['next'];
    console.log(page)
    
    getPages(page, ListOfPage)
    })}
    else {
        return ListOfPage
    }
    return ListOfPage
}

function ReturnPageContent(ListOfPage) {
    // Return an array of films contents
    // Arg : Array of page link

    listOfContent = []
    console.log(ListOfPage)
    for (page of ListOfPage) {
        axios.get(page)
        .then(function (response) {
        for (film of (Object.values(response)[0]['results'])) {
            listOfContent.push(film);
            
        }
        }) 
}   
    console.log(listOfContent)
    return listOfContent
}

function returnBestFilm(listOfContent) {
    // Read the json file and return the best film

    bestFilm = ""
    bestFilmScore = 0
    console.log(listOfContent)
  }

const launch = new Promise ((resolve, reject) => {
    let resu = ReturnPageContent(getPages(url, [url]))
    if (resu.length > 0) {
        return resolve(resu)
    }else {
        console.log("Nothing to show")
    }
})
function launchit() {
    launch.then((result) => {
        console.log(result)
    })}

