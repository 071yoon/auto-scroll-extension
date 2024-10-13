import * as React from "react";
import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { Button, Option, Input, Select, Slider } from "@mui/joy";
import { on10Sec, onEnd, onNatural, onStart } from "./scrollFunctions";
import { languageDictionary, Language } from "./language";

export default function App() {
  const [scrollValue, setScrollValue] = useState(2);
  const [scrollTime, setScrollTime] = useState(15);
  const [language, setLanguage] = useState<Language>("en");

  // update storage and state at once
  const updateValues = (scrollValue: number, scrollTime: number) => {
    chrome.storage.sync.set({ scrollValue: scrollValue.toString() });
    chrome.storage.sync.set({ scrollTime: scrollTime.toString() });
    setScrollValue(scrollValue);
    setScrollTime(scrollTime);
  };

  const handleLanguageChange = (
    e: React.SyntheticEvent | null,
    newValue: Language | null
  ) => {
    setLanguage(newValue || "en");
    chrome.storage.sync.set({ language: newValue });
  };

  // set state from storage if have one
  useEffect(() => {
    chrome.storage.sync.get(
      ["scrollValue", "scrollTime", "language"],
      (result) => {
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

        if (result.language === undefined) {
          chrome.storage.sync.set({ language: "en" });
        } else {
          setLanguage(result.language);
        }
      }
    );
  }, []);

  return (
    <Container>
      <Title>Auto Scroller</Title>
      <LanguageContainer>
        language:
        <Select value={language} onChange={handleLanguageChange} size="sm">
          <Option value="ko">Korean</Option>
          <Option value="en">English</Option>
        </Select>
      </LanguageContainer>
      <Buttons>
        <Button
          onClick={() => {
            onNatural();
            updateValues(2, 15);
          }}
          size="sm"
        >
          {languageDictionary[language].natural}
        </Button>
        <Button
          onClick={() => {
            on10Sec();
            updateValues(800, 6000);
          }}
          size="sm"
        >
          {languageDictionary[language].interval}
        </Button>
      </Buttons>
      <div>{languageDictionary[language].much}</div>
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
          size="sm"
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
      <div>{languageDictionary[language].sequence}</div>
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
          size="sm"
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
        <Button onClick={() => onStart(scrollValue, scrollTime)} size="sm">
          {languageDictionary[language].down}
        </Button>
        <Button onClick={onEnd} size="sm">
          {languageDictionary[language].stop}
        </Button>
      </Buttons>
    </Container>
  );
}

const Container = styled.div`
  padding: 0.2rem 0.4rem;
  width: 15rem;
`;

const LanguageContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  justify-content: flex-end;
  margin: 0.4rem 0;
`;

const Title = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  text-align: center;
  margin: 0.1rem 0;
`;

const Buttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin: 0 0 0.4rem 0;
`;
