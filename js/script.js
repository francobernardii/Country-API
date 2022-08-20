window.onload = () => {
    loadCards("all")
}

function createCard(image,title,population,region,capital) {
    let cardBody = document.createElement('div')
    //create containers divs to group the info
    let containerImage = document.createElement('div')
    containerImage.setAttribute('style',`background: url("${image}") center no-repeat;background-size: cover;`)
    let containerTitle = document.createElement('div')
    let containerDetail = document.createElement('div')
    //create h1 tag where we put the country's name
    let h1 = document.createElement('h1')
    let contentT = document.createTextNode(title)
    h1.appendChild(contentT)
    //create h3 tags to put in the detail section of the card
    let detail1 = document.createElement('h3')
    let detail2 = document.createElement('h3')
    let detail3 = document.createElement('h3')
    let contentD1 = document.createTextNode('Population: ')
    let contentD2 = document.createTextNode('Region: ')
    let contentD3 = document.createTextNode('Capital: ')
    detail1.appendChild(contentD1)
    detail2.appendChild(contentD2)
    detail3.appendChild(contentD3)
    //create span tags where we load the info of each country
    let span1 = document.createElement('span')
    let span2 = document.createElement('span')
    let span3 = document.createElement('span')
    let contentS1 = document.createTextNode(population)
    let contentS2 = document.createTextNode(region)
    let contentS3 = document.createTextNode(capital)
    span1.appendChild(contentS1)
    span2.appendChild(contentS2)
    span3.appendChild(contentS3)
    //put everything together to build the full card
    //Container Detail
    detail1.appendChild(span1)
    detail2.appendChild(span2)
    detail3.appendChild(span3)
    containerDetail.appendChild(detail1)
    containerDetail.appendChild(detail2)
    containerDetail.appendChild(detail3)
    containerDetail.classList.add('container-detail')
    //container-title
    containerTitle.appendChild(h1)
    containerTitle.classList.add('container-title')
    //container-image
    containerImage.classList.add('container-image')
    //card
    cardBody.appendChild(containerImage)
    cardBody.appendChild(containerTitle)
    cardBody.appendChild(containerDetail)
    cardBody.classList.add('cards')
    if(darkMode){
        cardBody.classList.add('shadow-DM')
    }else{
        cardBody.classList.remove('shadow-DM')
    }

    return cardBody
}

function loadCards(link) {
    containerData = document.getElementById('container-data')
    containerData.innerHTML = ""
    fetch(`https://restcountries.com/v3.1/${link}`)
    .then(response => response.json())
    .then(data => {
        data.map(country => {
            let card = createCard(country.flags.png,country.name.common,country.population,country.region,country.capital)
            containerData.appendChild(card)
        })
    });
}

function filterRegion(continents) {
    if(continents.children[1].selected){
        loadCards(`region/${continents.children[1].value}`)
    }
    if(continents.children[2].selected){
        loadCards(`region/${continents.children[2].value}`)
    }
    if(continents.children[3].selected){
        loadCards(`region/${continents.children[3].value}`)
    }
    if(continents.children[4].selected){
        loadCards(`region/${continents.children[4].value}`)
    }
    if(continents.children[5].selected){
        loadCards(`region/${continents.children[5].value}`)
    }
}

function filterCountry(country){
    console.log(country)
    if(country === ""){
        loadCards("all")
    }else{
        loadCards(`name/${country}`)
    }
}

function toggleMode(){
    if(!darkMode){
        document.body.setAttribute('style','background: #202c37; color: #ffffff;')
        //the a tags in the footer
        document.getElementsByTagName("footer")[0].children[0].children[0].setAttribute('style','color: #ffffff;')
        document.getElementsByTagName("footer")[0].children[0].children[1].setAttribute('style','color: #ffffff;')
        //inputMarco
        document.getElementsByClassName('input-marco')[0].setAttribute('style','background: #202c37; color: #ffffff;box-shadow: 0 0 10px #0a0a0a;')
        //filterRegion
        document.getElementById('filterRegion').setAttribute('style','background: #202c37; color: #ffffff;box-shadow: 0 0 10px #0a0a0a;')
        //header
        document.getElementsByTagName("header")[0].setAttribute('style','border-bottom: 1px solid #0a0a0a;')
        //change Button Mode text and icon
        buttonDLMode.children[0].src = "./assets/sun-solid.svg"
        buttonDLMode.children[1].innerHTML = "Light Mode"

        darkMode = !darkMode
        loadCards("all")
    }else{
        document.body.setAttribute('style','background: #fafafa;')
        //the a tags in the footer
        document.getElementsByTagName("footer")[0].children[0].children[0].setAttribute('style','color: #111517;')
        document.getElementsByTagName("footer")[0].children[0].children[1].setAttribute('style','color: #111517;')
        //inputMarco
        document.getElementsByClassName('input-marco')[0].setAttribute('style','background: #fafafa;')
        //filterRegion
        document.getElementById('filterRegion').setAttribute('style','background: #fafafa;')
        //header
        document.getElementsByTagName("header")[0].setAttribute('style','border-bottom: 1px solid #e2e2e2;')
        //change Button Mode text and icon
        buttonDLMode.children[0].src = "./assets/moon-solid.svg"
        buttonDLMode.children[1].innerHTML = "Dark Mode"

        darkMode = !darkMode
        loadCards("all")
    }
}

const filterInput = document.getElementById('filterRegion')
filterInput.addEventListener("change",() => filterRegion(filterInput))

const searchBar = document.getElementById('searchBar')
searchBar.addEventListener("change", () => filterCountry(searchBar.value))

const buttonDLMode = document.getElementById('buttonDLMode')
let darkMode = false;
buttonDLMode.addEventListener("click", () => toggleMode())
