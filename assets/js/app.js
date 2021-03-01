// getting UI components
const all_stories = document.querySelector("#all_stories")
const asks = document.querySelector("#asks")
const job_alert = document.querySelector("#job_alerts")
const spinner = document.querySelector("#spinner")
const search_input = document.querySelector("#search")
const sort_options = document.querySelectorAll(".dropdown-item")
// adding eventLisner
all_stories.addEventListener('click', displayStrories)
asks.addEventListener('click', displayAsks)
job_alert.addEventListener('click', displayJobs)
search_input.addEventListener('keyup', search)
sort_options.forEach(item => {
    item.addEventListener('click', sort)
})


spinner.style.visibility = "hidden";
// creating div
const articles_posts = document.createElement('div')
const articles_asks = document.createElement('div')
const articles_jobs = document.createElement('div')

async function getStories() {

    let response = await fetch('https://hacker-news.firebaseio.com/v0/showstories.json?print=pretty');
    let data = await response.json();

    return data

}

async function getAsks() {

    let response = await fetch('https://hacker-news.firebaseio.com/v0/askstories.json?print=prett');
    let data = await response.json();

    return data

}

async function getJobs() {

    let response = await fetch('https://hacker-news.firebaseio.com/v0/jobstories.json?print=pretty');
    let data = await response.json();

    return data

}

async function get_item(id) {

    let response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`);
    let data = await response.json();

    return data

}
// creating a function to display stories
function displayStrories() {
    spinner.style.visibility = "visible";

        // making this nav active
        all_stories.classList.add("active")
        asks.classList.remove("active")
        job_alert.classList.remove("active")

        // displaying the right div
        articles_asks.style.display = "none"
        articles_jobs.style.display = "none"
        articles_posts.style.display = "block"


        //articles_asks
        articles_asks.innerHTML = ""
        articles_jobs.innerHTML = ""
        getStories().then(ids =>{
            spinner.style.visibility = "hidden";
            ids.forEach(id => {

                get_item(id).then(data =>{

                    if (data != null) {
                        let date = moment.unix(data.time).fromNow()

                        let text = ""
                        if (data.text) {
                            text = data.text.slice(0, 80)
                        }
                        const article = document.createElement('div')
                        article.innerHTML = ` 
                        <article class="article">
                        <a href="${data.url}" target="_blank"><h2>${data.title.slice(8)}</h2></a> 
                        <div class="bookmark_btn" id="btn${data.id}"><i class="fas fa-bookmark"></i></div>
                        <p>${text}...</p>
                        <p><b>By</b>: <i>${data.by} |</i>  
                        <i class="far fa-star">Score: ${data.score} |</i> 
                        <i>${date}</i></p>
                        </article>
                        `




                         // adding date to the article for sorting
                         article.firstElementChild.dataset.date = data.time
                         articles_posts.appendChild(article)
                         articles.appendChild(articles_posts)
 
                         
                         // marking saved bookmarks
                         let bookmark_btn = document.querySelector(`#btn${data.id}`)
                         let saved = localStorage.getItem("bookmarks")
                         if (saved) {
                             if (saved.includes(data.id)) {
                                 bookmark_btn.style.color = "purple"
                             }
                         }



                         // appending event lisner to the bookmark
                        
                        bookmark_btn.addEventListener("click", ()=>{
                            if (!(bookmark_btn.style.color == "purple")) {
                                bookmark_btn.style.color = "purple"
                                addToBookMark(data.id)
                            } else {
                                bookmark_btn.style.color = "purple"
                                removeFromBookMark(id)
                            }
                            
                        })
                    }
                    
                    
                })
                
            });
        })
    
    

}
