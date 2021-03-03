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

function display() {
    get_item(getIdFromURL()).then(data => {
        let time = moment.unix(data.time).fromNow()
        main_author.textContent = `By: ${data.by}`
        main_time.innerHTML = time
        main_topic.textContent = data.title
        main_text.innerHTML = data.text

        data.kids.forEach(id => {
            get_item(id).then(comment =>{
                let time = moment.unix(comment.time).fromNow()
                let card = document.createElement("div")
                card.classList.add("card")
                card.innerHTML = `<div class="card-body">
                <h5 class="card-title">By: <i>${comment.by}</i> </h5>
                <h6 class="card-subtitle mb-2 text-muted">${time}</h6>
                <p class="card-text">${comment.text}</p>
              </div>`

              comments_section.appendChild(card)
            })
        });

    })
}

display()
