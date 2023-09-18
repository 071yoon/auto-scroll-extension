// This file is injected as a content script
// console.log("Hello from content script!");

// will fix later
// @ts-ignore
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  // If the received message has the expected format...
  // console.log("recved msg", msg);
  // if (msg.msg === "scroll") {
  //   console.log("recved!!!");
  //   // Call the specified callback, passing
  //   // the web-page's DOM content as argument
  //   sendResponse();
  // }
});
