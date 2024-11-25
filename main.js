var bookmarkInputName = document.getElementById("bookmarkName")
var bookmarkInputlink = document.getElementById("bookmarkUrl")

var bookmarkList = []

if (localStorage.getItem("bookmark") != null) {
    bookmarkList = JSON.parse(localStorage.getItem("bookmark"))
    display()
}


function addBookmark(){

    if (!bookmarkInputName.value.trim() || !bookmarkInputlink.value.trim()) {
        alert("Please fill in both the bookmark name and URL.");
        return; 
    }


    if (!isValidURL(bookmarkInputlink.value.trim())) {
        alert("Please enter a valid URL like www.google.com or https://www.google.com");
        return; 
    }


    var bookmark = {
        code:bookmarkInputName.value.trim(),
        link: formatURL(bookmarkInputlink.value.trim())
    }
    bookmarkList.push(bookmark)
    localStorage.setItem("bookmark", JSON.stringify(bookmarkList))
    display()
    clearInputs()
}


function display(){
    var cartona= ``
    for(var i = 0 ; i<bookmarkList.length ; i++ ){
        cartona += `
         <tr>
            <td class="ps-5">${i+1}</td>
            <td>${bookmarkList[i].code}</td>
            <td ><button onclick="visitBookmark('${bookmarkList[i].link}')"  class="btn btn-success"><i class="fa-solid fa-eye"></i> Visit</button></td>
            <td><button onclick="deleteBookmark(${i})" class="btn btn-danger"><i class="fa-solid fa-trash-can"></i> Delete</button></td>
        </tr>
        
        `
    }
    document.getElementById("rowData").innerHTML = cartona
}


function clearInputs(){
    bookmarkInputName.value= null
    bookmarkInputlink.value= null
}


function deleteBookmark(index){
    bookmarkList.splice(index,1)
    localStorage.setItem("bookmark" , JSON.stringify(bookmarkList))
    display();
}


function visitBookmark(link) {
    if (link) {
        window.open(link, "_blank"); 
    } else {
        alert("No URL provided!"); 
    }
}


function formatURL(url) {
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
        return "https://" + url; 
    }
    return url;
}


function isValidURL(url) {
    var urlPattern = /^(https?:\/\/)?([a-z0-9.-]+\.[a-z]{2,})(\/.*)?$/i;
    return urlPattern.test(url);
}