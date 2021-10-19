document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("check-news").addEventListener("click", checkFakeNews)
    document.getElementById("report-news").addEventListener("click", reportFakeNews)

    function checkFakeNews(){
        chrome.tabs.query({currentWindow: true, active: true},
            function(tabs) {
                chrome.tabs.sendMessage(tabs[0].id, "check")
            })
    }

    function reportFakeNews(){
        chrome.tabs.query({currentWindow: true, active: true},
            function(tabs) {
                chrome.tabs.create({ url: 'index.html#' + tabs[0].url })
            })
    }

})

