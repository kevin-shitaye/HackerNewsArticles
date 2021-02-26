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
