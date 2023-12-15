import { createContext } from 'react';

export interface ButtonsClickedProps {
  isCloseCalendar: boolean;
  setIsCloseCalendar: (prop: boolean) => void;

  isCloseCalendar2: boolean;
  setIsCloseCalendar2: (prop: boolean) => void;
}

export const ButtonsContext = createContext<ButtonsClickedProps>({
  isCloseCalendar: false,
  setIsCloseCalendar: () => {},
  isCloseCalendar2: false,
  setIsCloseCalendar2: () => {},
});
