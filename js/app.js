
// Grab all HTML Element 
const bookShelf = document.getElementById('book-container');
const searchBar = document.getElementById('search-field');
const searchBtn = document.getElementById('search-btn');
const totalResultCounter = document.getElementById('total-result-counter');
const showResulCounter = document.getElementById('show-result-counter');

// Triggre All Functionality By Clicking Search Button
searchBtn.addEventListener('click', () => {
    // Grab Input Value As  Keyword
    let keyword = searchBar.value;

    let url = `https://openlibrary.org/search.json?q=${keyword}`;

    // Fretching data from API 
    fetch(url)
        .then(res => res.json())
        .then(loading()) // Calling Loading Animation Function
        .then(data => {
            if (data.numFound !== 0) {
                // Displaing All Result Quantity If Found Any Book
                totalResultCounter.innerHTML= `<h1 class="font-bold text-4xl">Total Result Found: ${data.numFound} </h1>`;
            }else {
                // Displaing "No result found!" If No Book Found
                totalResultCounter.innerHTML= `<h1 class="font-bold text-4xl text-pink-600">No result found!</h1>`
            }
            // Calling Search Result Function
            searchResult(data.docs)
        })

        // Clear Result Counter Div
        totalResultCounter.innerHTML = ``;
        showResulCounter.innerHTML =  ``;
});

// Creating Loading Animation Function
let loading = () => {
    bookShelf.innerHTML = `
    <div class="w-full flex justify-center items-center">
        <lord-icon src="https://cdn.lordicon.com/msoeawqm.json" trigger="loop"
        colors="primary:#ffffff,secondary:#e8308c" stroke="100" style="width:200px;height:200px">
        </lord-icon>
        <h1 class="text-4xl text-pink-600 center">Searching for "${searchBar.value}"...<h1>
    </div>`;
}

// Creating Search Result Function
let searchResult = (data) => {

        let showData = 0;
        // Clear Book Container's Content
        bookShelf.innerHTML = "";
        
        // Grab Book From API 
        data.forEach(element => {

            // Increase Book Counder Value
            showData++

            let firstPublished = element.first_publish_year;
            let authorName = element.author_name[0];
            // Check Availability Of Title
            if (element.title === undefined) {
                var bookName = `Unknown`;
            } else {
                let str = element.title.split(":");
                var bookName = str[0];
            }

            // Check Availability Of Book Cover Image
            if (element.cover_i === undefined) {
                var bookCoverImg = `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2tnk3ins9bLECH2xntrAPKrwcZ36Gd5o1pA&usqp=CAU`;
            } else {
                var bookCoverImg = `https://covers.openlibrary.org/b/id/${element.cover_i}-M.jpg`;
            }

            // Creating Book Holding DIV
            let div = document.createElement('div');
            // Add Class To Book Holding DIV
            div.classList.add("lg:w-1/4", "sm:w-1/2", "w-full", "p-4");
            // Add Book Information In Book Holding DIV
            div.innerHTML = ` 
                <div class="flex relative rounded-sm font-bold md:h-96 h-screen w-full">
                    <img alt="gallery" class="absolute inset-0 w-full h-full  object-center" src= "${bookCoverImg}" />
                    <div class="transition duration-500 px-4 py-10 flex flex-col justify-center items-center relative z-10 w-full border-4 border-gray-800 bg-gray-900 opacity-0 overflow-hidden hover:opacity-100">
                        <p class="tracking-widest text-sm title-font font-medium text-pink-200 mb-1">
                            First published: ${firstPublished}
                        </p>
                        <h1 class="title-font text-center text-pink-500 text-4xl md:text-3xl  font-bold text-white mb-3">
                            ${bookName}
                        </h1>
                        <p class="text-white">
                            Author: ${authorName}
                        </p>
                    </div>
                </div >`;
            // Push Book Holding DIV Into Book Container Div
            bookShelf.appendChild(div);
        });
        
        if (showData !== 0) {
            // If Book Found 
            showResulCounter.innerHTML =  `Total Result Show: ${showData}`; 
        } else {
            // If No Book Found 
            showResulCounter.innerHTML =  ""; 
        }

        // Blank Input Field
        searchBar.value = "";
}
