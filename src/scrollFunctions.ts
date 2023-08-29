export const onNatural = () => {
  (function () {
    let queryOptions = { active: true, lastFocusedWindow: true };
    chrome.tabs.query(queryOptions, ([tab]) => {
      if (chrome.runtime.lastError) console.error(chrome.runtime.lastError);

      // @ts-ignore
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => {
          const isScrolling = document.querySelector("[auto-scroll-id]");
          if (isScrolling) {
            clearInterval(Number(isScrolling.getAttribute("auto-scroll-id")));
          } else {
            const tmp = document.createElement("div");
            document.body.appendChild(tmp);
            tmp.setAttribute("auto-scroll-id", "true");
          }
          const newInterval = setInterval(function () {
            window.scrollBy(0, 2);
          }, 15);
          document
            .querySelector("[auto-scroll-id]")
            ?.setAttribute("auto-scroll-id", String(newInterval));
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
          const isScrolling = document.querySelector("[auto-scroll-id]");
          if (isScrolling) {
            clearInterval(Number(isScrolling.getAttribute("auto-scroll-id")));
          } else {
            const tmp = document.createElement("div");
            document.body.appendChild(tmp);
            tmp.setAttribute("auto-scroll-id", "true");
          }
          const newInterval = setInterval(function () {
            window.scrollBy(0, 800);
          }, 6000);
          document
            .querySelector("[auto-scroll-id]")
            ?.setAttribute("auto-scroll-id", String(newInterval));
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
          const isScrolling = document.querySelector("[auto-scroll-id]");
          if (isScrolling) {
            clearInterval(Number(isScrolling.getAttribute("auto-scroll-id")));
          } else {
            const tmp = document.createElement("div");
            document.body.appendChild(tmp);
            tmp.setAttribute("auto-scroll-id", "true");
          }
          const newInterval = setInterval(function () {
            window.scrollBy(0, sv);
          }, st);
          document
            .querySelector("[auto-scroll-id]")
            ?.setAttribute("auto-scroll-id", String(newInterval));
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
          const isScrolling = document.querySelector("[auto-scroll-id]");
          if (isScrolling) {
            clearInterval(Number(isScrolling.getAttribute("auto-scroll-id")));
          }
        },
      });
    });
  })();
};
