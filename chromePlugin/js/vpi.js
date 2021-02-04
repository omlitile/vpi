window.addEventListener("message", function (e) {
    if ('webpackOk' !== e.data.type) {
        // send to background.js
        chrome.runtime.sendMessage(e.data);
    }
    return true;
}, false);

// listen background message
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    let {reqHeaders, reqData, respHeaders, respData} = request;
    let respObj = JSON.parse(respData);
    if(respObj.isTestCase && respObj.index != undefined){
        let tableId = respObj.index;
        document.getElementById(tableId).innerText = respObj.testCaseStatus;
    }else{
        if (reqHeaders) {
            let headerStr = '';
            Object.keys(reqHeaders).forEach(key => headerStr = headerStr + key + ': ' + reqHeaders[key] + '\r\n');
            document.getElementById('req-headers').innerText = headerStr;
        }
        document.getElementById('resp-headers').innerText = respHeaders;
        document.getElementById('req-data').innerText = reqData;
        document.getElementById('resp-data').innerText = respData;
    }
    sendResponse();
    return true;
});

window.onload = () => {
    let vpiPluginSign = document.getElementById('vpi-plugin-loaded');
    if (vpiPluginSign) {
        vpiPluginSign.innerHTML = 'loaded';
    }
};