import { createContext } from 'react';

export interface ButtonsClickedProps {
  isCloseCalendar: boolean;
  setIsCloseCalendar: (prop: boolean) => void;

  isCloseCalendar2: boolean;
  setIsCloseCalendar2: (prop: boolean) => void;

  isOpenThemeOrLanguage: boolean;
  setIsOpenThemeOrLanguage: (prop: boolean) => void;

  isOpenDepartmentAddCard: boolean;
  setIsOpenDepartmentAddCard: (prop: boolean) => void;

  isOpenDepartmentEditCard: boolean;
  setIsOpenDepartmentEditCard: (prop: boolean) => void;

  isOpenRoomAddCard: boolean;
  setIsOpenRoomAddCard: (prop: boolean) => void;

  isOpenRoomEditCard: boolean;
  setIsOpenRoomEditCard: (prop: boolean) => void;
}

export const ButtonsContext = createContext<ButtonsClickedProps>({
  isCloseCalendar: false,
  setIsCloseCalendar: () => {},
  isCloseCalendar2: false,
  setIsCloseCalendar2: () => {},

  isOpenThemeOrLanguage: true,
  setIsOpenThemeOrLanguage: () => {},

  isOpenDepartmentAddCard: false,
  setIsOpenDepartmentAddCard: () => {},

  isOpenDepartmentEditCard: false,
  setIsOpenDepartmentEditCard: () => {},

  isOpenRoomAddCard: false,
  setIsOpenRoomAddCard: () => {},

  isOpenRoomEditCard: false,
  setIsOpenRoomEditCard: () => {},
});
