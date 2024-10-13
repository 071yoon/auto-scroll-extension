export const languageDictionary = {
  en: {
    title: "Auto Scroller",
    natural: "Naturally",
    interval: "Every 10 seconds",
    much: "How much to scroll",
    sequence: "Scroll Interval",
    down: "Scroll Down",
    stop: "Stop",
  },
  ko: {
    title: "Auto Scroller",
    natural: "자연스럽게",
    interval: "10초에 한번씩",
    much: "얼마나 스크롤할지",
    sequence: "스크롤 간격",
    down: "내려가기",
    stop: "멈추기",
  },
};

export type Language = keyof typeof languageDictionary;
