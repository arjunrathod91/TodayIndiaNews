const API_KEY = "5d7d2f406b564587b8664c8adeb81eac";
const url = "https://newsapi.org/v2/everything?q=";

//simply i make a api and url

window.addEventListener("load", () => fetchNews("India"));

//window addevenlistner load function fectnews a function india 

//make a async function fetchnews
async function fetchNews(query) {
  const res = await fetch(`${url}${query}&apiKey=${API_KEY}`); //we created a res fetch await
  const data = await res.json(); //and we have await in json 
  bindData(data.articles); //and here we created a bindData function 
}

function bindData(articles) {
  const cardContainer = document.getElementById('cards-container'); // we get the container of cards-container 
  const newsCardsTemplate = document.getElementById('template-news-card'); //and we take the template news card aslo

  cardContainer.innerHTML = ''; //for now this is a blank card but we will addon data in it

  articles.forEach((article) => {  //foreach if urlto img not showing eturn
    if (!article.urlToImage) return; //we dont need this optional
    const cardClone = newsCardsTemplate.content.cloneNode(true);   //content.cloneNode(true); what this mean
    fillDataInCard(cardClone, article);
    cardContainer.appendChild(cardClone);
  });
}

function fillDataInCard(cardClone, article) {
  const newsImg = cardClone.querySelector('#news-img');
  const newsTitle = cardClone.querySelector('#news-title');
  const newsSource = cardClone.querySelector('#news-source');
  const newsDesc = cardClone.querySelector('#news-desc');

  newsImg.src = article.urlToImage;
  newsTitle.innerHTML = article.title;
  newsDesc.innerHTML = article.description;

  const date = new Date(article.publishedAt).toLocaleString("en-US", {
    timeZone: "Asia/Jakarta",
  }); //optional 

  newsSource.innerHTML = `${article.source.name} | ${date}`; //optional 

  newsImg.addEventListener('click', () => {
    window.open(article.url, "_blank");
  });
}
let curSelectedNav = null;
function onNavItemClick(id) {
  fetchNews(id);
  const navItem = document.getElementById(id);
  curSelectedNav?.classList.remove('active');
  curSelectedNav = navItem;
  curSelectedNav.classList.add('active');
}

const searchButton = document.getElementById('search-btn');
const searchText = document.getElementById('search-text');

searchButton.addEventListener('click',()=>{
  const query = searchText.value;
  if (!query) return;
  fetchNews(query);
  curSelectedNav.classList.remove('active');
  curSelectedNav = null;
})


