import * as React from "react";
import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { Button, Input, Slider } from "@mui/joy";
import { on10Sec, onEnd, onNatural, onStart } from "./scrollFunctions";

export default function App() {
  const [scrollValue, setScrollValue] = useState(2);
  const [scrollTime, setScrollTime] = useState(15);

  // update storage and state at once
  const updateValues = (scrollValue: number, scrollTime: number) => {
    chrome.storage.sync.set({ scrollValue: scrollValue.toString() });
    chrome.storage.sync.set({ scrollTime: scrollTime.toString() });
    setScrollValue(scrollValue);
    setScrollTime(scrollTime);
  };

  // set state from storage if have one
  useEffect(() => {
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

  return (
    <Container>
      <Title>Auto Scroller</Title>
      <Buttons>
        <Button
          onClick={() => {
            onNatural();
            updateValues(2, 15);
          }}
        >
          자연스럽게
        </Button>
        <Button
          onClick={() => {
            on10Sec();
            updateValues(800, 6000);
          }}
        >
          10초에 한번씩
        </Button>
      </Buttons>
      <div>한번에 얼마나 많이</div>
      <div style={{ display: "flex" }}>
        <Slider
          key={scrollValue}
          defaultValue={scrollValue}
          onChange={(e, value) => {
            chrome.storage.sync.set({ scrollValue: value.toString() });
            setScrollValue(value as number);
          }}
          max={1004}
          marks
          min={0.5}
        />
        <Input
          size={"sm"}
          sx={{ width: "5rem" }}
          value={scrollValue}
          onChange={(event) => {
            chrome.storage.sync.set({
              scrollValue: event.target.value.toString(),
            });
            setScrollValue(event.target.value as unknown as number);
          }}
        />
      </div>
      <div>얼마나 자주</div>
      <div style={{ display: "flex" }}>
        <Slider
          key={scrollTime}
          defaultValue={scrollTime}
          onChange={(e, value) => {
            chrome.storage.sync.set({ scrollTime: value.toString() });
            setScrollTime(value as number);
          }}
          max={6000}
          marks
          min={15}
        />
        <Input
          size={"sm"}
          sx={{ width: "5rem" }}
          value={scrollTime}
          onChange={(event) => {
            chrome.storage.sync.set({
              scrollTime: event.target.value.toString(),
            });
            setScrollTime(event.target.value as unknown as number);
          }}
        />
      </div>
      <Buttons>
        <Button onClick={() => onStart(scrollValue, scrollTime)}>
          내려가기
        </Button>
        <Button onClick={onEnd}>멈추기</Button>
      </Buttons>
    </Container>
  );
}

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
