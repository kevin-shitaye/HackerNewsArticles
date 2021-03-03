// UIs
const spinner = document.querySelector("#spinner")
const search_input = document.querySelector("#search")
const sort_options = document.querySelectorAll(".dropdown-item")
const clear_all = document.querySelector("#remove_all")
// listners
search_input.addEventListener('keyup', search)
sort_options.forEach(item => {
    item.addEventListener('click', sort)
})
clear_all.addEventListener("click", removeAll)

spinner.style.visibility = "hidden";

const articles_div = document.createElement('div')

async function get_item(id) {

    let response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`);
    let data = await response.json();

    return data

}