
const bookShelf = document.getElementById('book-container');
const searchBar = document.getElementById('search-field');
const searchBtn = document.getElementById('search-btn');
const totalResultCounter = document.getElementById('total-result-counter');
const showResulCounter = document.getElementById('show-result-counter');



searchBtn.addEventListener('click', () => {
    let keyword = searchBar.value;
    let uri = `https://openlibrary.org/search.json?q=${keyword}`;
    fetch(uri)
        .then(res => res.json())
        .then(loading())
        .then(data => {
            if (data.numFound !== 0) {
                totalResultCounter.innerHTML= `<h1 class="text-4xl">Total Result Found: ${data.numFound} </h1>`;
            }else {
                totalResultCounter.innerHTML= `<h1 class="text-4xl text-pink-600">No result found!</h1>`
            }
            
            searchResult(data.docs)
        })
        totalResultCounter.innerHTML = ``;
        showResulCounter.innerHTML =  ``;
});

let loading = () => {
    bookShelf.innerHTML = `
    <div class="w-full flex justify-center items-center">
        <lord-icon src="https://cdn.lordicon.com/msoeawqm.json" trigger="loop"
        colors="primary:#ffffff,secondary:#e8308c" stroke="100" style="width:200px;height:200px">
        </lord-icon>
        <h1 class="text-4xl text-pink-600 center">Searching for "${searchBar.value}"...<h1>
    </div>`;
}

let searchResult = (data) => {
        let showData = 0;
        
        bookShelf.innerHTML = "";
        
        data.slice(0,20).forEach(element => {
            showData++
            if (element.first_publish_year === undefined) {
                var firstPublished = `Unknown`;
            } else {
                var firstPublished = element.first_publish_year;
            }
            
            if (element.author_alternative_name === undefined) {
                var authorName = `Unknown`;
            } else {
                var authorName = element.author_alternative_name;
            }

            if (element.title === undefined) {
                var bookName = `Unknown`;
            } else {
                let str = element.title.split(":");
                var bookName = str[0];
                
            }
          
            if (element.cover_i === undefined) {
                var bookCoverImg = `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2tnk3ins9bLECH2xntrAPKrwcZ36Gd5o1pA&usqp=CAU`;
            } else {
                var bookCoverImg = `https://covers.openlibrary.org/b/id/${element.cover_i}-M.jpg`;
            }

            let div = document.createElement('div');
            div.classList.add("lg:w-1/4", "sm:w-1/2", "w-full", "p-4");
            div.innerHTML = `
            <div class="flex relative rounded-sm font-bold h-96 w-full">
                    <img alt="gallery" class="absolute inset-0 w-full h-full  object-center" src= "${bookCoverImg}" />
                    <div
                    class="px-4 py-10  relative z-10 w-full border-4 border-gray-800 bg-gray-900 opacity-0 hover:opacity-100">
                        <p class="tracking-widest text-sm title-font font-medium text-pink-200 mb-1">
                            First published: ${firstPublished}
                        </p>
                        <h1 class="title-font text-pink-500 text-3xl  font-bold text-white mb-3">
                        
                            ${bookName}
                        </h1>
                        <h3 class="text-white">
                            Author: ${authorName}
                        </h3>
                        <p class="class="w-full items-center bg-white border-0 mt-3 py-1 px-3 focus:outline-none text-pink-500 hover:bg-pink-500  hover:text-white font-bold rounded-lg text-center text-base mt-4 md:mt-0">
                            Publication: ${element.title}
                        </p>
                    </div>
                </div > 
            `;
            bookShelf.appendChild(div);
        });
        if (showData !== 0) {
            showResulCounter.innerHTML =  `Total Result Found: ${showData}`; 
        } else {
            showResulCounter.innerHTML =  ``; 
        }
        searchBar.value = "";
}









