


chrome.runtime.onMessage.addListener(gotMessage);
    

var sendUrl = location.href;
var get_url = 'https://flask-fakenews.herokuapp.com/getscore/' + '?url=' + sendUrl;
console.log("get score")  
console.log(get_url)
fetch(get_url)
.then(r =>  r.json()
.then(data => ({status: r.status, body: data})))
.then(obj => {

        var score = parseFloat(obj.body.Result)

        console.log(score)
        
        if (score === 0 || score === NaN){

            chrome.runtime.sendMessage("grey");

        } else if (score <= 1.66){

            chrome.runtime.sendMessage("red");

        } else if (score <= 2.32){

            chrome.runtime.sendMessage("yellow");

        } else {

            chrome.runtime.sendMessage("green");
        }
    })

function gotMessage(request, sender, sendResponse){
    
    console.log(request)


    if (request === "check"){

        cuteToast({
            type: "info", // or 'info', 'error', 'warning'
            message: "This process could take sometime",
            timer: 15000
          })

        var h1s = document.getElementsByTagName("h1");
        var h2s = document.getElementsByTagName("h2");

        if (h1s.length > 0){
            var headline = h1s[0].innerHTML;
        } else if (h2s.length > 0){
            var headline = h2s[0].innerHTML;
        } else {
            var headline = "";
        }
        
        console.log(headline)

        const api_url = 'https://flask-fakenews.herokuapp.com/';

        sendText = {
            "Title" : headline,
            "Url" : sendUrl
        }

        

        fetch(api_url, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(sendText),
            headers:{
                'Content-Type': 'application/json'
              } 
        })
        .then(r =>  r.json()
        .then(data => ({status: r.status, body: data})))
        .then(obj => {
            if (obj.body.Result === "real"){
                cuteAlert({
                    type: "success",
                    title: "This is a Real news",
                    message: " ",
                    buttonText: "Source"
                  }).then(() => {
                    chrome.runtime.sendMessage(obj.body.Url);
                  })
            }
            else if (obj.body.Result === "mid"){
                cuteAlert({
                    type: "warning",
                    title: "This is an Unsure news",
                    message: " ",
                    buttonText: "Okay"
                  })
                
            } else if (obj.body.Result === "fake"){
                cuteAlert({
                    type: "error",
                    title: "This is a fake news",
                    message: " ",
                    buttonText: "Source"
                  }).then(() => {
                    chrome.runtime.sendMessage(obj.body.Url);
                  })
            }
        })
            
        
        
    } 
}


