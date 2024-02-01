// Basic Translator Functions Based/Adapted from: https://www.codingnepalweb.com/language-translator-app-html-css-javascript/

// data variables defined from the index.html document
// text area boxes 
let fromText = document.querySelector(".from-text");
let toText = document.querySelector(".to-text");
let fromCount = document.querySelector(".fromCount");
let toCount = document.querySelector(".toCount");
//icons 
let selectTag = document.querySelectorAll("select");
let exchangeIcon = document.getElementById("swap");
let fromVolumeIcon = document.getElementById("from-volume");
let toVolumeIcon = document.getElementById("to-volume");
let fromSaveIcon = document.getElementById("from-save");
let toSaveIcon = document.getElementById("to-save");
let tbodyRef = document.getElementById("tbody");
//buttons
let wordCountBtn = document.querySelector(".wordCount-button")
let translateBtn = document.querySelector(".translate-button");
let clearBtn = document.querySelector(".clear-button");
let randomBtn = document.querySelector('.random-button');


//change select tag to contain language choice
selectTag.forEach((tag, id) => {
    for (const country_code in countries) {
        let selected;
        //set default from language to english and default to language to spanish
        if(id == 0 && country_code == "en-GB") {
            selected = "selected";
        } else if (id == 1 && country_code == "es-ES"){
            selected = "selected";
        }
        let option = `<option value="${country_code}" ${selected}>${countries[country_code]}</option>`;
        //adding options tag inside select tag
        tag.insertAdjacentHTML("beforeend", option)}
});


//translate button - connect to translator API
translateBtn.addEventListener("click", () => {
    let text = fromText.value;
        //if no text entered, set an alert box, else run api  
        if (text == ""){
            alert("No text entered to translate.")
        } else {
        let translateFrom = selectTag[0].value
        let translateTo = selectTag[1].value;
        let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
        //fetch api response and return it with a parsing object into js, and in another then method recieve the object
        fetch(apiUrl).then(res => res.json()).then(data => {
            toText.value = data.responseData.translatedText;
        });
        }
});


//sleep timer for functions that involve the microservice
//use sleep function to allow microservice enough time to run before fetching results
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
} 


//word count button - return data from the microservice files
wordCountBtn.addEventListener("click", () => {
    if (fromText.value == ""){
        alert("No text entered to translate.")
    } else {
    //get and display word count for toText box
    sleep(3000).then(() => (
        fetch('/microservice/CCA1.json', {mode: 'no-cors'})
        .then(response => response.text())
        .then(data=> {
            fromCount.value = data})
        .catch(error => console.error(error))
    ));
    //get and display word count for fromText box
    sleep(3000).then(() => (   
        fetch('/microservice/CCA2.json', {mode: 'no-cors'})
        .then(response => response.text())
        .then(data=> {
            toCount.value = data})
        .catch(error => console.error(error))))
    }
});


//random word button - choose a random word from the randomWord list, translate it if necessary, will be translated again with the translate button
randomBtn.addEventListener("click", () => {
    let word = randomWords[Math.floor(Math.random() * randomWords.length)]
        //translate the random word into the first fromText language, unless selected is English
        if (selectTag[0].value == "en-GB"){
            fromText.value = word
        } else {
        let From = "en-GB";
        let To = selectTag[0].value;
        let apiUrl = `https://api.mymemory.translated.net/get?q=${word}&langpair=${From}|${To}`;
        //run the fetch API to change the toText word into the correct language
        fetch(apiUrl).then(res => res.json()).then(data => {
            fromText.value = data.responseData.translatedText;
        }); 
        }
});


//clear button - reset all textarea boxes back to blank ''
clearBtn.addEventListener("click",()=>{
    fromText.value = '';
    toText.value = '';
    fromCount.value = '';
    toCount.value = ''
});


//add event listener on swap_horz icon - swap which side the text is on
exchangeIcon.addEventListener("click",() => {
    //save first text/language in temp var
    let tempText = fromText.value,
    tempLang = selectTag[0].value;
    //set toText var to fromText var
    fromText.value = toText.value;
    selectTag[0].value = selectTag[1].value;
    //finally, set fromText var to the toText var saved in the temp var
    toText.value = tempText;
    selectTag[1].value = tempLang
});


//add event listener to the volume buttons - plays translated text as a sound aloud
//first volume button
fromVolumeIcon.addEventListener("click", () => {
    msg = new SpeechSynthesisUtterance(fromText.value);
    msg.lang = selectTag[0].value;
    speechSynthesis.speak(msg)
});

//second volume button
toVolumeIcon.addEventListener("click", () => {
    msg = new SpeechSynthesisUtterance(toText.value);
    msg.lang = selectTag[1].value;
    speechSynthesis.speak(msg)
});


//save translation into the saved table
//first save icon - data will appear with the toText first 
fromSaveIcon.addEventListener("click", () => {
    let row = tbodyRef.insertRow();
   
    //define the rows
    let fromLang = row.insertCell();
    let fromCell = row.insertCell();
    let toLang = row.insertCell();
    let toCell = row.insertCell();
    let deleteCell = row.insertCell();

    //get desired data
    fromLang.innerHTML = countries[selectTag[0].value];
    fromCell.innerHTML = fromText.value;
    toLang.innerHTML = countries[selectTag[1].value];
    toCell.innerHTML = toText.value;
    deleteCell.innerHTML = '<span class="material-symbols-outlined" onclick="DeleteRow()"> delete_forever </span>'

    //append the rows with the translation data
    row.appendChild(fromLang);
    row.appendChild(fromCell);
    row.appendChild(toLang);
    row.appendChild(toCell);
    row.appendChild(deleteCell)
});


//Second save icon - data will appear with the fromText first 
toSaveIcon.addEventListener("click", () => {
    let row = tbodyRef.insertRow();

    //define the rows
    let fromLang = row.insertCell();
    let fromCell = row.insertCell();
    let toLang = row.insertCell();
    let toCell = row.insertCell();
    let deleteCell = row.insertCell();

    //get desired data
    fromLang.innerHTML = countries[selectTag[1].value];
    fromCell.innerHTML = toText.value;
    toLang.innerHTML = countries[selectTag[0].value];
    toCell.innerHTML = fromText.value;
    deleteCell.innerHTML = '<span class="material-symbols-outlined" onclick="DeleteRow()"> delete_forever </span>'

    //append the rows with the translation data
    row.appendChild(fromLang);
    row.appendChild(fromCell);
    row.appendChild(toLang);
    row.appendChild(toCell);
    row.appendChild(deleteCell)
});


//delete a saved entry from the Save Phrases table
function DeleteRow(){
    let td = window.event.target.parentNode;
    let tr = td.parentNode;
    tr.parentNode.removeChild(tr)
}
