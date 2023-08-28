import * as React from "react";
import styled from "@emotion/styled";
import { Button, Slider } from "@mui/joy";

const App = () => {
  const [scrollValue, setScrollValue] = React.useState(2);
  const [scrollTime, setScrollTime] = React.useState(15);

  React.useEffect(() => {
    chrome.storage.sync.get(["scrollValue", "scrollTime"], (result) => {
      if (result.scrollValue === undefined) {
        chrome.storage.sync.set({ scrollValue: 2 });
      } else {
        setScrollValue(Number(result.scrollValue));
      }
      if (result.scrollTime === undefined) {
        chrome.storage.sync.set({ scrollTime: 15 });
      } else {
        setScrollTime(Number(result.scrollTime));
      }
    });
  }, []);

  const onStart = () => {
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

  const onEnd = () => {
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

  return (
    <Container>
      <Title>Auto Scroller</Title>
      <div>한번에 얼마나 많이</div>
      <Slider
        key={scrollValue}
        defaultValue={scrollValue}
        onChange={(e, value) => {
          chrome.storage.sync.set({ scrollValue: value.toString() });
          setScrollValue(value as number);
        }}
        step={250}
        max={1004}
        marks
        min={2}
      />
      <div>얼마나 자주</div>
      <Slider
        key={scrollTime}
        defaultValue={scrollTime}
        onChange={(e, value) => {
          chrome.storage.sync.set({ scrollTime: value.toString() });
          setScrollTime(value as number);
        }}
        step={500}
        max={6000}
        marks
        min={15}
      />
      <Buttons>
        <Button onClick={onStart}>내려가기</Button>
        <Button onClick={onEnd}>멈추기</Button>
      </Buttons>
    </Container>
  );
};

const Container = styled.div`
  padding: 0.2rem 0.4rem;
  width: 10rem;
`;

const Title = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  text-align: center;
  margin: 0.1rem 0;
`;

const Buttons = styled.div`
  display: flex;
  gap: 0.4rem;
`;

export default App;
