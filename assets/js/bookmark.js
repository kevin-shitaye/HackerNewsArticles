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

function displayBookmarked() {
    articles_div.innerHTML = ""
    let bookmarks = localStorage.getItem("bookmarks")
    if (bookmarks && JSON.parse(bookmarks).length != 0) {
        let list_of_ids = JSON.parse(bookmarks)


        spinner.style.visibility = "visible";

        list_of_ids.forEach(id => {
            get_item(id).then(data =>{
                spinner.style.visibility = "hidden";
                if (data != null) {
                    let date = moment.unix(data.time).fromNow()

                    let text = ""
                    if (data.text) {
                        text = data.text.slice(0, 80)
                    }
                    const article = document.createElement('div')
                    article.innerHTML = ` 
                    <article class="article">
                    <a href="${data.url}" target="_blank"><h2>${data.title}</h2></a> 
                    <div class="bookmark_btn" id="btn${data.id}"><i class="fas fa-bookmark"></i></div>
                    <p>${text}...</p>
                    <p><b>By</b>: <i>${data.by} |</i>  
                    <i class="far fa-star">Score: ${data.score} |</i> 
                    <i>${date}</i></p>
                    </article>
                    `

                    


                    // adding date to the article for sorting
                    article.firstElementChild.dataset.date = data.time
                    articles_div.appendChild(article)
                    articles.appendChild(articles_div)

                      // marking saved bookmarks
                      let bookmark_btn = document.querySelector(`#btn${data.id}`)
                      bookmark_btn.style.color = "purple"
  
                      // appending event lisner to the bookmark
                      
                      bookmark_btn.addEventListener("click", ()=>{
                              removeFromBookMark(data.id)
                      })
                  }
                  
                  
              })
          });
  
          
      } else {
          spinner.style.visibility = "hidden";
          articles_div.innerHTML = "<h2>Bookmark is Empty!</h2>"
          articles.appendChild(articles_div)
      }
      
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
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks_list))
    console.log(localStorage.getItem("bookmarks"));
    displayBookmarked()
}

function removeAll() {
    localStorage.setItem("bookmarks", "")
    displayBookmarked()
}

displayBookmarked()