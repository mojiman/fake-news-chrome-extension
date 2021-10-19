chrome.runtime.onMessage.addListener(function(response, sender, sendResponse){
    if(response === "grey"){
        chrome.browserAction.setIcon({
            path : "images/grey16.png"
          })
    }else if(response === "red"){
        chrome.browserAction.setIcon({
            path : "images/red16.png"
          })

    }else if (response === "yellow"){
        chrome.browserAction.setIcon({
            path : "images/yellow16.png"
          })
    }else if (response === "green"){
        chrome.browserAction.setIcon({
            path : "images/green16.png"
          })
    }else{
        chrome.tabs.create({ url: response });
    }
});