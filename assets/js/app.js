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


function displayAsks() {
    spinner.style.visibility = "visible";

        // making this nav active
        all_stories.classList.remove("active")
        asks.classList.add("active")
        job_alert.classList.remove("active")

        // displaying the right div
        articles_posts.style.display = "none"
        articles_jobs.style.display = "none"
        articles_asks.style.display = "block"

        articles_posts.innerHTML = ""
        articles_jobs.innerHTML = ""

        getAsks().then(ids =>{
            
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
                        <a href="../asks.html?id=${data.id}"><h2>${data.title}</h2></a>
                        <div class="bookmark_btn" id="btn${data.id}"><i class="fas fa-bookmark"></i></div>
                        <p>${text}...</p>
                        <p><b>By</b>: <i>${data.by} |</i>  
                        <i class="far fa-star">Score: ${data.score} |</i> 
                        <i>${date}</i></p>
                        </article>
                        `
                        // adding date to the article for sorting
                        article.firstElementChild.dataset.date = data.time
                        articles_asks.appendChild(article)
                        articles.appendChild(articles_asks)

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
                                bookmark_btn.style.color = "gray"
                                removeFromBookMark(id)
                            }
                            
                        })
                        
                    }
                    
                    
                })
                
            });
        })
    
    
}

function displayJobs() {
    spinner.style.visibility = "visible";

    // making this nav active
    all_stories.classList.remove("active")
    asks.classList.remove("active")
    job_alert.classList.add("active")

    // displaying the right div
    articles_posts.style.display = "none"
    articles_asks.style.display = "none"
    articles_jobs.style.display = "block"

    articles_posts.innerHTML = ""
    articles_asks.innerHTML = ""
    
        getJobs().then(ids =>{
            spinner.style.visibility = "hidden";
            ids.forEach(id => {

                get_item(id).then(data =>{
                    if (data != null) {
                        let date = moment.unix(data.time).fromNow()
                        const article = document.createElement('div')
                        article.innerHTML = ` 
                        <article class="article">
                        <a href="${data.url}" target="_blank"><h2>${data.title}</h2></a> 
                        <div class="bookmark_btn" id="btn${data.id}"><i class="fas fa-bookmark"></i></div>
                        <p><b>By</b>: <i>${data.by} |</i>  
                        <i class="far fa-star">Score: ${data.score} |</i> 
                        <i>${date}</i></p>
                        </article>
                        `
                        article.firstElementChild.dataset.date = data.time
                        articles_jobs.appendChild(article)
                        articles.appendChild(articles_jobs)

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
                                bookmark_btn.style.color = "gray"
                                removeFromBookMark(id)
                            }
                            
                        })
                    }
                    
                    
                })
                
            });
            
        })
        

}


function search() {
    let keyWord = search_input.value.toLowerCase();
    let collection_list = document.querySelectorAll('.article')
    

        collection_list.forEach(element => {
            let str = element.firstElementChild.firstElementChild.textContent.toLowerCase()
            if (str.includes(keyWord)) {
                element.style.display = "block";
            } else {
                element.style.display = "none";
            }
        });
    
}



function sort(e) {
    list_of_dates = []
    let collection_list = document.querySelectorAll('.article')
    parent = collection_list[0].parentElement
    collection_list.forEach(article => {
        list_of_dates.push(article.dataset.date)
    });
    
    list_of_dates.sort()

    if (e.target.id == 'new') {
        list_of_dates.reverse()
    }

    // clearing the dom so i can append the sorted one
    parent.innerHTML = ""
    for (let i = 0; i < list_of_dates.length; i++) {
        for (let j = 0; j < collection_list.length; j++) {
            if (collection_list[j].dataset.date == list_of_dates[i]) {
                parent.appendChild(collection_list[j])
            }
            
        }
    
    }
}


displayStrories()



function addToBookMark(id) {
    let bookmarks = localStorage.getItem("bookmarks")
    if (bookmarks) {
        bookmarks_list = JSON.parse(bookmarks)
        bookmarks_list.push(id)
        
    } else {
        bookmarks_list = [id]
    }
    
    
}


function removeFromBookMark(id) {
    let bookmarks = localStorage.getItem("bookmarks")
    if (bookmarks) {
        bookmarks_list = JSON.parse(bookmarks)
        const index = bookmarks_list.indexOf(id);
        if (index > -1) {
            bookmarks_list.splice(index, 1);
        }

    } else {
        return false
    }
   
}
