//URL TO MODIFY
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


/* async function showImage() {
    // Replace the loading images by the correct film cover in the HTML file

    const greatFilms = await getFilmsContent(getLinksPages(baseURL))
    const bestFilm = await returnBestFilm(greatFilms)
    const bestFilms = await returnBestFilms(greatFilms)
    const bestNinetiesFilms = await returnBestFilms(getFilmsContent(getLinksPages(ninetiesURL)))
    const nicolasCageBestFilms = await returnBestFilms(getFilmsContent(getLinksPages(nicolasCageURL)))
    const bestAdventureFilms = await returnBestFilms(getFilmsContent(getLinksPages(adventureURL)))
    const films_array = [bestFilms, bestNinetiesFilms, nicolasCageBestFilms, bestAdventureFilms]
    for (value in films_array) {
        const filmByCategory = films_array[value]
        for (film in filmByCategory) {
            document.getElementById("img"+value+"-"+film).src = filmByCategory[film]['image_url'];
        }
    }
    let content = document.getElementById('modal1');
    content.firstElementChild.firstElementChild.innerHTML = "Oui"
}

showImage() */


async function getDatas() {
    const greatFilms = await getFilmsContent(getLinksPages(baseURL))
    const bestFilm = await returnBestFilm(greatFilms)
    const bestFilms = await returnBestFilms(greatFilms)
    const bestNinetiesFilms = await returnBestFilms(getFilmsContent(getLinksPages(ninetiesURL)))
    const nicolasCageBestFilms = await returnBestFilms(getFilmsContent(getLinksPages(nicolasCageURL)))
    const bestAdventureFilms = await returnBestFilms(getFilmsContent(getLinksPages(adventureURL)))
    const films_array = [bestFilm, bestFilms, bestNinetiesFilms, nicolasCageBestFilms, bestAdventureFilms]

    return films_array
}

async function showImage(getFunctionResult) {
    filmsArray = await getFunctionResult;
    for (value in filmsArray) {
        const filmByCategory = filmsArray[value]
        if (value != 0) {
            for (film in filmByCategory) {
                document.getElementById("img"+value+"-"+film).src = filmByCategory[film]['image_url'];
                
            }
        }
    }
}

async function addFilmsInfos(getFunctionResult) { 
    filmsArray = await getFunctionResult;
    let index = 0
    for (value in filmsArray) {
        const filmByCategory = filmsArray[value]
        if (value == 0) {
            let content = document.getElementById('modal'+index);
            content.firstElementChild.firstElementChild.innerHTML = filmsArray[value]['title'];
            let modalBody = document.getElementsByClassName('modal-body')[index];

            index +=1
            } 
        else {
            for (film in filmByCategory) {
                let content = document.getElementById('modal'+index);
                content.firstElementChild.firstElementChild.innerHTML = filmByCategory[film]['title'];
                let modalBody = document.getElementsByClassName('modal-body')[index];
                //test(filmByCategory[film])
                generateTable(index, filmByCategory[film]);
                index += 1;
            }
        }
    }
} 

async function generateTable(tableIndex, data) {
    data = await data
    table = document.querySelectorAll("table")[tableIndex]
    unwantedElements = ["id","url","imdb_url","title","image_url"]
    for (let element in data) {
      if (!unwantedElements.includes(element)) {
        let tableKey = element;
        let tableValue = data[element];
        let row = table.insertRow();
  
        let cell1 = row.insertCell();
        let cell2 = row.insertCell();
  
        let text1 = document.createTextNode(tableKey);
        let text2 = document.createTextNode(tableValue);
        
        cell1.appendChild(text1);
        cell2.appendChild(text2);
      }
    }
  }



async function test(data) {
    data = await data
    for (let x in data) {
        console.log(x + ": "+ data[x])
     }
}










let datas = getDatas()
showImage(datas)
addFilmsInfos(datas)






const openModalButtons = document.querySelectorAll('[data-modal-target]')
const closeModalButtons = document.querySelectorAll('[data-close-button]')
const overlay = document.getElementById('overlay')

openModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = document.querySelector(button.dataset.modalTarget)
    openModal(modal)
  })
})

overlay.addEventListener('click', () => {
  const modals = document.querySelectorAll('.modal.active')
  modals.forEach(modal => {
    closeModal(modal)
  })
})

closeModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = button.closest('.modal')
    closeModal(modal)
  })
})

function openModal(modal) {
  if (modal == null) return
  modal.classList.add('active')
  overlay.classList.add('active')
}

function closeModal(modal) {
  if (modal == null) return
  modal.classList.remove('active')
  overlay.classList.remove('active')
}

