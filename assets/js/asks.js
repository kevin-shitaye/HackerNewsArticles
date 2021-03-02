// UIs
const main_author = document.querySelector("#main_by")
const main_time = document.querySelector("#main_time")
const main_topic = document.querySelector("#main_topic")
const main_text = document.querySelector("#main_text")
const comments_section = document.querySelector('#comments_section')

function getIdFromURL() {
    let parameter = new URLSearchParams(window.location.search)
    return parameter.get("id")
}

async function get_item(id) {

    let response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`);
    let data = await response.json();

    return data

}