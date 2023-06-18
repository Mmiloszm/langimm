import { Difficulty } from "@/types/Difficulties";

export const initialDifficulties: Difficulty[] = [
  {
    shortcut: "A1",
    value: 0.001,
    name: "nowicjusz",
    active: false,
  },
  {
    shortcut: "A2",
    value: 0.2,
    name: "podstawowy",
    active: false,
  },
  {
    shortcut: "B1",
    value: 0.4,
    name: "średniozaawansowany",
    active: false,
  },
  {
    shortcut: "B2",
    value: 0.6,
    name: "zaawansowany",
    active: false,
  },
  {
    shortcut: "C1",
    value: 0.8,
    name: "bardzo zaawansowany",
    active: false,
  },
  {
    shortcut: "C2",
    value: 1,
    name: "biegły",
    active: false,
  },
];
