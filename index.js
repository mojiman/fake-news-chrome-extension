document.getElementById("myUrl").defaultValue = document.location.hash.slice(1);

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("submitBtn").addEventListener("click", uploadFakeNews)

    function uploadFakeNews(){
        var url = document.getElementById("myUrl").value
        var reason = document.getElementById("myReason").value
        


        const api_url = 'https://flask-fakenews.herokuapp.com/upload/';


        sendText = {
            "Url" : url,
            "Reason" : reason
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
            cuteAlert({
                type: "success",
                title: "Reported Successfully",
                message: " ",
                buttonText: "OK"
              }).then(() => {
                chrome.tabs.getCurrent(function(tab) {
                    chrome.tabs.remove(tab.id, function() { });
                });
              })
            
        })
    }


});
