function getScrollDiv() {
  return document.querySelector("[auto-scroll-id]");
}

function clearCustomInterval(scrollDiv: Element | null = null) {
  if (scrollDiv) {
    clearInterval(Number(scrollDiv.getAttribute("auto-scroll-id")));
  } else {
    const tmp = document.createElement("div");
    document.body.appendChild(tmp);
    tmp.setAttribute("auto-scroll-id", "true");
  }
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
          const scrollDiv = getScrollDiv();
          clearCustomInterval(scrollDiv);

          const newInterval = setInterval(function () {
            window.scrollBy(0, 2);
          }, 15);

          setIntervalToDiv(scrollDiv, Number(newInterval));
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
          const scrollDiv = getScrollDiv();
          clearCustomInterval(scrollDiv);

          const newInterval = setInterval(function () {
            window.scrollBy(0, 800);
          }, 6000);

          setIntervalToDiv(scrollDiv, Number(newInterval));
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
          const scrollDiv = getScrollDiv();
          clearCustomInterval(scrollDiv);

          const newInterval = setInterval(function () {
            window.scrollBy(0, sv);
          }, st);

          setIntervalToDiv(scrollDiv, Number(newInterval));
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
          const isScrolling = getScrollDiv();
          if (isScrolling) {
            clearInterval(Number(isScrolling.getAttribute("auto-scroll-id")));
          }
        },
      });
    });
  })();
};
