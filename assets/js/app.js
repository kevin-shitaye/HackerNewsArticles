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
