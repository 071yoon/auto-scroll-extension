// TODO: make scroll functions reuseable
// now it can't be reusable since func: () won't get functions
function getScrollDiv() {
  const scrollDiv = document.querySelector("[auto-scroll-id]");
  if (scrollDiv) {
    return scrollDiv;
  }
  const tmp = document.createElement("div");
  document.body.appendChild(tmp);
  tmp.setAttribute("auto-scroll-id", "true");
  return tmp;
}

function clearCustomInterval(scrollDiv: Element | null) {
  if (scrollDiv) {
    return clearInterval(Number(scrollDiv.getAttribute("auto-scroll-id")));
  }
  return null;
}

function setIntervalToDiv(scrollDiv: Element | null, newInterval: number) {
  if (!scrollDiv) return;
  return scrollDiv.setAttribute("auto-scroll-id", String(newInterval));
}

export const onNatural = () => {
  (function () {
    let queryOptions = { active: true, lastFocusedWindow: true };
    chrome.tabs.query(queryOptions, ([tab]) => {
      if (chrome.runtime.lastError) console.error(chrome.runtime.lastError);

      // @ts-ignore
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => {
          let scrollDiv = document.querySelector("[auto-scroll-id]");
          if (!scrollDiv) {
            scrollDiv = document.createElement("div");
            document.body.appendChild(scrollDiv);
            scrollDiv.setAttribute("auto-scroll-id", "true");
          }
          clearInterval(Number(scrollDiv.getAttribute("auto-scroll-id")));

          const newInterval = setInterval(function () {
            window.scrollBy(0, 2);
          }, 15);

          scrollDiv.setAttribute("auto-scroll-id", String(newInterval));
        },
        args: [],
      });
    });
  })();
};

export const on10Sec = () => {
  (function () {
    let queryOptions = { active: true, lastFocusedWindow: true };
    chrome.tabs.query(queryOptions, ([tab]) => {
      if (chrome.runtime.lastError) console.error(chrome.runtime.lastError);

      // @ts-ignore
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => {
          let scrollDiv = document.querySelector("[auto-scroll-id]");
          if (!scrollDiv) {
            scrollDiv = document.createElement("div");
            document.body.appendChild(scrollDiv);
            scrollDiv.setAttribute("auto-scroll-id", "true");
          }
          clearInterval(Number(scrollDiv.getAttribute("auto-scroll-id")));

          const newInterval = setInterval(function () {
            window.scrollBy(0, 800);
          }, 6000);

          scrollDiv.setAttribute("auto-scroll-id", String(newInterval));
        },
        args: [],
      });
    });
  })();
};

export const onStart = (scrollValue: number, scrollTime: number) => {
  (function () {
    let queryOptions = { active: true, lastFocusedWindow: true };
    chrome.tabs.query(queryOptions, ([tab]) => {
      if (chrome.runtime.lastError) console.error(chrome.runtime.lastError);

      // @ts-ignore
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: (sv: number, st: number) => {
          let scrollDiv = document.querySelector("[auto-scroll-id]");
          if (!scrollDiv) {
            scrollDiv = document.createElement("div");
            document.body.appendChild(scrollDiv);
            scrollDiv.setAttribute("auto-scroll-id", "true");
          }
          clearInterval(Number(scrollDiv.getAttribute("auto-scroll-id")));

          const newInterval = setInterval(function () {
            window.scrollBy(0, sv);
          }, st);

          scrollDiv.setAttribute("auto-scroll-id", String(newInterval));
        },
        args: [scrollValue, scrollTime],
      });
    });
  })();
};

export const onEnd = () => {
  (function () {
    let queryOptions = { active: true, lastFocusedWindow: true };
    chrome.tabs.query(queryOptions, ([tab]) => {
      if (chrome.runtime.lastError) console.error(chrome.runtime.lastError);

      // @ts-ignore
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => {
          let scrollDiv = document.querySelector("[auto-scroll-id]");
          if (!scrollDiv) {
            scrollDiv = document.createElement("div");
            document.body.appendChild(scrollDiv);
            scrollDiv.setAttribute("auto-scroll-id", "true");
          }
          clearInterval(Number(scrollDiv.getAttribute("auto-scroll-id")));
        },
      });
    });
  })();
};
