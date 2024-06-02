const apiKey = "cb2d2ca56fcd4bedb17851ed9f425ff6";
const blogContainer = document.getElementById('blogcontainer');
const searchfield=document.getElementById('searchinput');
const searchbutton=document.getElementById("searchbutton")

async function fetchRandomNews() {
    try {
        const apiUrl = `https://newsapi.org/v2/everything?q=tesla&from=2024-04-16&sortBy=publishedAt&pageSize=30&apiKey=${apiKey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles;
    } catch (error) {
        console.error("Error fetching random news:", error);
        return [];
    }
}

searchbutton.addEventListener('click',async ()=>{
    const query=searchfield.value.trim();
    if(query!=""){
        try{
            const articles=await fetchnewsquery(query);
            displayBlogs(articles) 

        }catch(error){
            console.error("Error occured",error)
        }
    }
})

async function fetchnewsquery(query){
    try {
        const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=10&apiKey=${apiKey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles;
    } catch (error) {
        console.error("Error fetching random news:", error);
        return [];
    }
}

function displayBlogs(articles) {
    blogContainer.innerHTML = '';
    articles.forEach(article => {
        const blogCard = document.createElement("div");
        blogCard.classList.add('blogcard');

        const img = document.createElement('img');
        img.src = article.urlToImage;
        img.alt = article.title;

        const title = document.createElement('h2');
        const truncatedtitle=article.title.length>30?article.title.slice(0,30)+"...." :article.title;
        title.textContent=truncatedtitle;
        const description = document.createElement('p');
        const truncateddescription=article.description.length>120?article.description.slice(0,120)+"...." :article.description;
        description.textContent=truncateddescription;

        blogCard.appendChild(img);
        blogCard.appendChild(title);
        blogCard.appendChild(description);
        blogCard.addEventListener('click',()=>{
            window.open(article.url,'_blank')
        })
        blogContainer.appendChild(blogCard);
    });
}

(async () => {
    try {
        const articles = await fetchRandomNews();
        displayBlogs(articles);
    } catch (error) {
        console.error("Error fetching random news:", error);
    }
})();
