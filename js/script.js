const fromText = document.querySelector(".from-text");
toText = document.querySelector(".to-text");
selectTag = document.querySelectorAll("select");
translateBtn = document.querySelector(".translate-button");
clearBtn = document.querySelector(".clear-button");
exchangeIcon = document.getElementById("swap");
icons = document.querySelectorAll(".icons")

//change select tag to contain country information
selectTag.forEach((tag, id) => {
    for (const country_code in countries) {
        let selected;
        //set default from language to english and default to language to spanish
        if(id == 0 && country_code == "en-GB") {
            selected = "selected";
        } else if(id == 1 && country_code == "es-ES"){
            selected = "selected";
        }
        let option = `<option value="${country_code}" ${selected}>${countries[country_code]}</option>`;
        //adding options tag inside select tag
        tag.insertAdjacentHTML("beforeend", option); 
    }
});

//add event listener on translate button - connect to translator API
translateBtn.addEventListener("click", () => {
    let text = fromText.value,
    translateFrom = selectTag[0].value,
    translateTo = selectTag[1].value;
    let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
    //fetch api response and return it with a parsing object into js, and in another then method recieve the object
    fetch(apiUrl).then(res => res.json()).then(data => {
        toText.value = data.responseData.translatedText;
    });
});


//add event listener on clear button - reset the fromText and toText back to blank ''
clearBtn.addEventListener("click",()=>{
    fromText.value = '';
    toText.value = '';
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
    selectTag[1].value = tempLang;
});


//add event listener to the volume - plays translated text as a sound aloud
icons.forEach(icon => {
    icon.addEventListener("click", ({target}) => {
        let utterance;
        if(target.id == "from-volume"){
            utternace = new SpeechSynthesisUtterance(fromText.value);   //select text to speak
            utternace.lang = selectTag[0].value;                        //seelct language for speech
        } else if (target.id == "to-volume"){
            utternace = new SpeechSynthesisUtterance(toText.value);
            utternace.lang = selectTag[1].value;
        }
        SpeechSynthesis.speak(utterance);
    });
});
