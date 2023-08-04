/* ChatGPT = ChatGPT ist ein bahnbrechendes Sprachmodell von OpenAI, das eine neue Ära der Kommunikation zwischen Menschen 
und Maschinen einläutet.Das Modell wurde entwickelt, um menschenähnliche Gespräche auf der Grundlage von Texteingaben 
oder Sprachanfragen zu führen, und es hat sich als äußerst effektiv erwiesen, um eine breite Palette von Themen 
und Anforderungen abzudecken */

/* const chatInput = document.querySelector("chat-input")  */
/* const sendmessage = document.querySelector(".chatbox .outgoing .outgoingtext");   */

const chatInput = document.getElementById("textarea") 
const sendChatBtn = document.getElementById("outtextid"); /* P Tag, der hinzugefügt wird bei Klick auf den Send Button */
const chatbox = document.getElementById("chatboxid"); 
/* const chatToggler = document.getElementById("chattogglerid");  */
const chatToggler = document.querySelector(".chatbot-toggler"); 
const chatCloseBtn = document.querySelector(".chatbot-toggler");  
const incomingbot = document.querySelector(".incomingtext");  /* Text, der vom Bot geantwortet wird */
const incomingbot2 = document.querySelector(".incomingtext").textContent;
const incomingbot3 = document.getElementById("incomingtextid").innerText; 
/* const incomingbot4 = document.getElementById("incomingidtext").innerText;  */
/* console.log("incomingbot: ")
console.log(incomingbot) */ /* <p class="incomingtext" id="incomingtextid">Hi 👋<br>Hallo wie kann ich dir helfen?</p> */



/* const sendChatBtn = document.querySelector("send-btn");   */
/* const sendChatBtn = document.getElementById("send-btn");  */

const textparagraph = document.getElementById("textdemo"),

voiceList = document.querySelector("select"),
button = document.querySelector("button"),
buttontext = document.getElementById("buttonconvertid");
const rate = document.querySelector("#rate");
console.log("buttontext: ")
console.log(buttontext)

isSpeaking = true; 
let synth = speechSynthesis;

/* id="textarea" */
/* send-btn */
let userMessage;
const API_Key = "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"; /* aus https://platform.openai.com/account/api-keys entnommen*/
const inputInitHeight = chatInput.scrollHeight;

function createChatLiOutgo(message) { /* Outgoing Funktion = Funktion, für die Nachricht, die erscheint, wenn ich eine Frage abschicke */
    /* Erstellen Sie ein Chat-<li>-Element mit der übergebenen Nachricht und dem Klassennamen */
    const chatLi = document.createElement("li")
    chatLi.classList.add("outgoing"); /* outgoing = Klasse für meine Fragen, die ich dem Bot stelle */
    let chatContent = `<p class="outgoingtext"></p>`;
    /* let chatContent = `<p class="outgoingtext">${message}</p>`; */
    
    /* console.log("chatContent: ");
    console.log(chatContent) */  /* `<p class="outgoingtext"></p>` */
    chatLi.innerHTML = chatContent;
    /* console.log("chatLi: ")
    console.log(chatLi) */ /* <li class="outgoing"><p class="outgoingtext">Wie groß ist ein Blauwal?</p></li> */
    chatLi.querySelector("p").textContent = message; /* Sorgt dafür, dass meine Message angezeigt wird im Chat */
    /* console.log("message: ") 
    console.log(message) */ /* Wie groß ist ein Blauwal? */
    /* console.log("chatLi.querySelector: ")
    console.log(chatLi.querySelector("p").textContent) */ /* Wie groß ist ein Blauwal? */
    return chatLi;
}

function createChatLiIncome(message) { /* Incoming Funktion = Ist für die Thinking Nachricht des Bots zuständig  */
    /* Erstellen Sie ein Chat-<li>-Element mit der übergebenen Nachricht und dem Klassennamen */
    const chatLi = document.createElement("li")
    chatLi.classList.add("incoming");
    /* let chatContent = `<span class="material-symbols-outlined">smart_toy</span><p class="incomingtext">${message}</p>`; */
    let chatContent = `<span class="material-symbols-outlined">smart_toy</span><p class="incomingtext" id="incomingtextid">${message}</p>`;
    /* let chatparagraphtext = `<p class="incomingtext">${message}</p>`; */
    /* console.log("chatparagraphtext.length: ")
    console.log(chatparagraphtext.length) */ /* 46 */
   /*  console.log("chatparagraphtext: ")
    console.log(chatparagraphtext) */ /* <p class="incomingtext">Ich denke nach ...</p> */

    /* console.log("chatContent.length: ")
    console.log(chatContent.length) */ /* 102 */
    /* console.log("chatContent: ");
    console.log(chatContent) */ /* <span class="material-symbols-outlined">smart_toy</span><p class="incomingtext">Ich denke nach ...</p>  */
    /* <span class="material-symbols-outlined">smart_toy</span><p class="incomingtext">Ich denke nach ...</p> */
    
    chatLi.innerHTML = chatContent; /* "Ich denke nach" wird durch die Lösung vom Bot überschrieben */
    /* console.log("chatLi: ")
    console.log(chatLi) */ /* <li class="incoming"><span class="material-symbols-outlined">smart_toy</span><p class="incomingtext">Ich denke nach ...</p></li> */
    console.log("chatLi: ")
    console.log(chatLi) /* Gibt mir das ganze li Element Klasse mit span und p zurück*/
    /* console.log("chatLi.innerHTML: ")
    console.log(chatLi.innerHTML) */ /* Gibt mir das ganze li Element Klasse mit span und p zurück*/
    /* <span class="material-symbols-outlined">smart_toy</span><p class="incomingtext">Ich denke nach ...</p> */
    /* console.log("chatLi.innerHTML.length: ")
    console.log(chatLi.innerHTML.length) */ /* 122 */
    return chatLi;   
}

/* Die GPT-Modelle von OpenAI wurden darauf trainiert, natürliche Sprache und Code zu verstehen. 
GPTs stellen als Reaktion auf ihre Eingaben Textausgaben bereit */
function generateResponse(incomingChatLi) {
    const API_URL = "https://api.openai.com/v1/chat/completions";
    /* API_URL = Erstellt eine Modellantwort für die angegebene Chat-Konversation. */
    const messageElement = incomingChatLi.querySelector("p");
    console.log("messageElement: ");
    console.log(messageElement); 
    /* Erst steht es so drinnen: <p class="incomingtext" id="incomingtextid">Ich denke nach ...</p> */
    /* Daraus entsteht dann das: <p class="incomingtext" id="incomingtextid">Leonardo da Vinci malte die Mona Lisa.</p> */

    /* console.log("API_URL: ");
    console.log(API_URL) */ /* https://api.openai.com/v1/chat/completions */
    
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_Key}` 
            /* Bearer Authorization = Die Bearer-Authentifizierung (auch Token-Authentifizierung genannt) ist ein Mechanismus 
            zur Autorisierung von Clients, indem bei jeder HTTP-Anfrage, die wir an den Server stellen, 
            ein Sicherheitstoken gesendet wird. Der Name „Bearer Authentication“ kann als „dem Träger dieses Tokens 
            Zugriff gewähren“ verstanden werden */
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo", /* ID des zu verwendenden Modells */
            messages: [{"role": "user", "content": userMessage}] /* Eine Liste der Nachrichten, aus denen die Konversation bisher bestand. */
            /* role = Die Rolle des Nachrichtenautors. Einer von system, user, assistant, oder function */
        })
    }

    /* console.log("requestOptions: ")
    console.log(requestOptions) */ /* {method: 'POST', headers: {…}, body: '{"model":"gpt-3.5-turbo","messages":[{"role":"user","content":"hallo"}]}'} */

    /* POST-Anfrage an API senden, Antwort erhalten und die Antwort als Absatztext festlegen */
    fetch(API_URL, requestOptions).then(res => res.json()).then(data => {
        console.log("data: ")
        console.log(data) /* {id: 'chatcmpl-7eGqlm5RHRlbbr2Z8R2UZclP0ZTGt', object: 'chat.completion', created: 1689832247, model: 'gpt-3.5-turbo-0613', choices: Array(1), …} */
        messageElement.textContent = data.choices[0].message.content.trim(); /* Thinking wird überschreieben mit der Antwort vom Bot */
        /* textToSpeech(messageElement.textContent); */ /* Spricht mir die Antwort aus */
        /* console.log("messageElement.textContent: ")
        console.log(messageElement.textContent) */  /* Antwort, die vom Bot zurückkommt auf meine Frage als Text*/
        /* console.log("messageElement: ")
        console.log(messageElement) */ /* <p class="incomingtext">...(Antwort vom Bot)</p> */
        /* console.log("data.choices[0].message: ") 
        console.log(data.choices[0].message)  *//* {role: 'assistant', content: 'Hallo! Wie kann ich Ihnen helfen?'} */
        /* console.log("data.choices[0]: ")
        console.log(data.choices[0]) */ /* {index: 0, message: {…}, finish_reason: 'stop'} */
    }).catch(() => {
        console.log("Fehlermeldung!")
        messageElement.classList.add("error");
        messageElement.textContent = "Oops! Etwas ist schief gelaufen. Bitte probiere es nochmal!"
    }).finally(() => /* finally = Methode der PromiseInstanzen plant eine Funktion, die aufgerufen wird, wenn das Versprechen erfüllt ist */
        chatbox.scrollTo(0, chatbox.scrollHeight)
    );
}

function sendinput() { /* Send Button Funktion */
    userMessage = chatInput.value.trim();
    /* console.log(userMessage); */
    if (!userMessage) return;
    chatInput.value = "";
    chatInput.style.height = `${inputInitHeight}px`;
    /*  Die Nachricht des Benutzers an die Chatbox anhängen mit appendChild */
    chatbox.appendChild(createChatLiOutgo(userMessage));
    chatbox.scrollTo(0, chatbox.scrollHeight); /* scrollto = scrollt zu einem bestimmten Koordinatensatz im Dokument */
    /* console.log("chatbox.scrollHeight: ")
    console.log(chatbox.scrollHeight) */ /* 555 */
    /* Syntax: scrollTo(x-coord, y-coord) */
    /* x-coord = x-coord ist das Pixel entlang der horizontalen Achse des Dokuments, das oben links angezeigt werden soll */
    /* y-coord = coord ist das Pixel entlang der vertikalen Achse des Dokuments, das oben links angezeigt werden soll. */

    setTimeout(() => {
        /* Die Meldung „Thinking...“ anzeigen, während auf die Antwort gewartet wird */
        const incomingChatLi = createChatLiIncome("Ich denke nach ...");
        const chatParagaph = document.createElement("p");
        chatParagaph.classList.add("incomingtext");
        /* console.log("chatParagaph: ")
        console.log(chatParagaph) */ /* <p class="incomingtext"></p>*/
        /* chatParagaph.innerHTML = "Thinking"; */
        console.log("chatParagaph: ");
        console.log(chatParagaph);

        chatbox.appendChild(incomingChatLi);
        /* chatbox.appendChild(createChatLiIncome("Thinking ...")); */
        /* chatbox.appendChild(createChatLi("Thinking", "incomingtext")); */
        chatbox.scrollTo(0, chatbox.scrollHeight);
        generateResponse(incomingChatLi);
        console.log("incomingChatLi: ");
        console.log(incomingChatLi);
    }, 600); /* 0,6 sec -> Die setTimeout()Methode ruft nach einigen Millisekunden eine Funktion auf (1 Sekunde = 1000 Millisekunden)*/
}
/* textToSpeech(sendinput);  */

function show_chatbot() { /* Toggle Button (Sobald man auf den Kommentar oder X Button drückt, passiert etwas) */
    /* document.body.classList.toggle("show_chatbot"); */
    /* chatToggler2.body.classList.toggle("show_chatbot"); */
    /* document.body.classList.remove("show-chatbot"); */  
    document.body.classList.toggle("show-chatbot");  
    /* document.body.classList.remove("show-chatbot");  */
    /* document.getElementById("formrowouter").style.display = "flex";   */
    const selectelement = document.getElementById("formrowouter");
    const closesymbol = document.getElementById("closespanid");
    const commentsmybol = document.getElementById("commentspanid");
    if (selectelement.style.display === "block") { /* Hier überprüft man, ob die Option Leiste vorhanden ist oder unsichtbar ist */
      selectelement.style.display = "none";
    } else {
      selectelement.style.display = "block";
    }

    /* if(commentsmybol.style.opacity === 1) {
      closesymbol.style.opacity = 0 
    }
    else if(commentsmybol.style.opacity === 0){
      closesymbol.style.opacity = 0 
    } */
}

function inputfield() {
    chatInput.style.height = `${inputInitHeight}px`;
    /* console.log("`${inputInitHeight}px`: ")
    console.log(`${inputInitHeight}px`) */ /* Immer bei 55px am Anfang */
    chatInput.style.height = `${chatInput.scrollHeight}px`;
    /* console.log("`${chatInput.scrollHeight}px`: ")
    console.log(`${chatInput.scrollHeight}px`)  *//* Höhe wächst -> 55px, 126px, 150px, 174px, 198px, 222px ... */
}

/* Wenn die Eingabetaste ohne Umschalttaste und das Fenster gedrückt wird
Breite ist größer als 800 Pixel, bearbeite den Chat */
function inputkeybutton(event) {
    if(event.key == "Enter") {
        console.log("Enter wurde gedrückt!")
        /* event.preventDefault(); */
        sendinput();
    }
} 

chatInput.addEventListener("keydown", inputkeybutton);

/* const handleChat = () => {
    userMessage = chatInput.value.trim();

}

sendChatBtn.addEventListener("click", handleChat);  */

function voices() {
    for(let voice of synth.getVoices()) {
      /* getVoices = Gibt alle verfügbaren Stimmen des Systems zurück */
      /* console.log("voice: ")
      console.log(voice) */
      /* SpeechSynthesisVoice {voiceURI: 'Microsoft Hedda - German (Germany)', name: 'Microsoft Hedda - German (Germany)', lang: 'de-DE', 
      localService: true, default: true} usw.*/
  
      /* console.log("voice.lang: ")
      console.log(voice.lang) */ /* So bekomme ich alle Sprache der verfügbaren Stimmen des Systems */
      /* let selected = voice.name === "Google US English" ? "selected" : ""; */
      let selected = voice.name === "Microsoft Stefan - German" ? "selected" : "";
      let option = `<option value="${voice.name}" ${selected}>${voice.name} (${voice.lang})</option>`;
      voiceList.insertAdjacentHTML("beforeend", option);
      /* beforeend = Fügt den HTML-Code als letztes Kind des ausgewählten Elements ein */
    }
  }
  
  synth.addEventListener("voiceschanged", voices)
  /* voiceschanged = tritt auf, wenn sich die verfügbaren Sprachsynthese-Stimmen ändern. Dies kann passieren, 
  wenn neue Stimmen hinzugefügt wurden oder vorhandene Stimmen entfernt wurden. */
  
  function textToSpeech(text) {
    let utternance = new SpeechSynthesisUtterance(text); /* APi dafür ist Web Speech API */
    /* SpeechSynthesisUtterance = SpeechSynthesisUtterance" repräsentiert eine Sprachanforderung (Text in Sprache umzuwandeln). 
    Sie enthält den Inhalt, den der Sprachdienst vorlesen soll, sowie Informationen darüber, wie es vorgelesen werden soll 
    (z.B. Sprache, Tonhöhe und Lautstärke). */
    utternance.rate = rate.value; 
    for(let voice of synth.getVoices()) {
      /* getVoices = Gibt alle verfügbaren Stimmen des Systems zurück */
      if(voice.name === voiceList.value) {
        utternance.voice = voice;
        /* if-Bedingung = Wenn der verfügbare Gerätestimmenname dem vom Benutzer ausgewählten Stimmennamen entspricht, 
        dann setze die Sprachstimme auf die vom Benutzer ausgewählte Stimme */
      }
    }
    synth.speak(utternance)
    /*  speechSynthesis.speak() = Hier wird der Text des SpeechSynthesisUtterance abgespielt, und die Sprachausgabe erfolgt 
    über die Audio-Ausgabegeräte des Geräts.*/
  }
  
 
  function speechmemo() {
    console.log("speechmemo wurde geklickt!");
    const incomindlist = document.getElementsByClassName("incoming")
   /*  const incomingclass = `<span class="material-symbols-outlined">smart_toy</span><p class="incomingtext" id="incomingtextid">${message}</p>`; */
    console.log("incomindlist: ")
    console.log(incomindlist) 
    /* HTMLCollection(2) [li.incoming, li.incoming] 0: li.incoming 1: li.incoming length: 2 [[Prototype]]: HTMLCollection */

    const incomingitem = incomindlist[incomindlist.length-1]
    console.log("incomingitem: ")
    console.log(incomingitem) 
    /* <li class="incoming"><span class="material-symbols-outlined">smart_toy</span><p class="incomingtext" id="incomingtextid">...</p></li> */

    const textspeech = incomingitem.childNodes[1].innerHTML
    /* console.log("textspeech: ")
    console.log(textspeech) */

    if(textspeech!== ""){
      if(!synth.speaking) {
        /* /* SpeechSynthesisUtterance = SpeechSynthesisUtterance" repräsentiert eine Sprachanforderung (Text in Sprache umzuwandeln) */
        /* const utterThis = new SpeechSynthesisUtterance(textspeech);
        const utterThis2 = new SpeechSynthesisUtterance(incomingitem.childNodes[1].text);
        const utterThis3 = new SpeechSynthesisUtterance(incomingitem.childNodes[1].textContent); */

        /* console.log(utterThis) */
        /* SpeechSynthesisUtterance {text: 'Der größte Tiger der Welt war vermutlich der sogen…Regel etwas kleiner ist als 
        der Sibirische Tiger.', lang: '', voice: null, volume: 1, rate: 1, …} */

        /* console.log(utterThis2) */
        /* SpeechSynthesisUtterance {text: '', lang: '', voice: null, volume: 1, rate: 1, …} */

        /* console.log(utterThis3) */
        /* SpeechSynthesisUtterance {text: 'Der größte Tiger der Welt war vermutlich der sogen…Regel etwas kleiner ist als 
        der Sibirische Tiger.', lang: '', voice: null, volume: 1, rate: 1, …} */

        /* utterThis.addEventListener("error", () => {
          console.error("SpeechSynthesisUtterance error");
        }); */ 
        /* error = Das errorEreignis wird für ein WindowObjekt ausgelöst, wenn eine Ressource nicht geladen werden konnte  */ 
        
        /* utterThis.rate = rate.value; */
        /* rate = rateEigenschaft der SpeechSynthesisUtteranceSchnittstelle ruft die Geschwindigkeit ab, mit der die Äußerung 
        gesprochen wird und legt sie fest */
        /* console.log(utterThis.rate) */ /* 1.899999976158142 

        /*console.log(rate.value) /* 1.9 */

        /* synth.speak(utterThis);  */
        textToSpeech(textspeech);
      }

      /* if (synth.speaking) {
        synth.cancel(); 
      } */ /* Methode der SpeechSynthesis Schnittstelle entfernt alle Äußerungen aus der Äußerungswarteschlange. 
      Wenn gerade eine Äußerung gesprochen wird, wird das Sprechen sofort beendet*/
      
      if(textspeech.length > 80) { /* textarea.value.length = Anzahl der Zeichen */
        console.log("textspeech.length: ")
        console.log(textspeech.length)
        if(isSpeaking) {
          console.log("pause")
          synth.resume();
          isSpeaking = false;
          buttontext.innerText = "Pause";
        }else {
          /* button.innerText = "Resume"; */
          console.log("resume")
          synth.pause();
          isSpeaking = true;
          buttontext.innerText = "Wiedergabe";
          synth.cancel(); 
        }
        setInterval(() => {
          if (!synth.speaking && !isSpeaking) {
            isSpeaking = true;
            buttontext.innerText = "Sprachausgabe";
          }
        });
      }
    }
  }
  
  
  
