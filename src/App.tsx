import * as React from "react";
import styled from "@emotion/styled";
import { Button, Slider } from "@mui/joy";

const App = () => {
  const [scrollValue, setScrollValue] = React.useState(2);
  const [scrollTime, setScrollTime] = React.useState(15);

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
          args: [],
        });
      });
    })();
  };

  return (
    <Container>
      <Title>Auto Scroller</Title>
      <div>한번에 얼마나 많이</div>
      <Slider
        defaultValue={scrollValue}
        onChange={(e, value) => setScrollValue(value as number)}
        step={250}
        max={1004}
        marks
        min={2}
      />
      <div>얼마나 자주</div>
      <Slider
        defaultValue={scrollTime}
        onChange={(e, value) => setScrollTime(value as number)}
        step={500}
        max={6000}
        marks
        min={15}
      />
      <Button onClick={onStart}>내려가기</Button>
      <Button onClick={onEnd}>멈추기</Button>
    </Container>
  );
};

const Container = styled.div`
  padding: 1rem;
  width: 10rem;
`;

const Title = styled.div`
  font-size: 0.4rem;
  font-weight: bold;
  text-align: center;
  margin: 0.1rem 0;
`;

export default App;
