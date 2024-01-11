import { createContext } from 'react';

export interface ButtonsClickedProps {
  calendarBeginValue: string;
  setCalendarBeginValue: (props: string) => void;

  calendarEndValue: string;
  setCalendarEndValue: (props: string) => void;
  departmentGetId: string;
  setDepartmentGetId: (prop: string) => void;

  isSubmitLoginForm: boolean;
  setIsSubmitLoginForm: (prop: boolean) => void;

  departmentListChanged: string;
  setDepartmentListChanged: (prop: string) => void;

  isProfileWho: string;
  setIsProfileWho: (prop: string) => void;

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

  isOpenDoctorAddCard: boolean;
  setIsOpenDoctorAddCard: (prop: boolean) => void;

  isOpenDoctorEditCard: boolean;
  setIsOpenDoctorEditCard: (prop: boolean) => void;

  isOpenQueuingCardClicked: boolean;
  setIsOpenQueuingCardClicked: (prop: boolean) => void;

  isQueuingCardClickedGetId: number;
  setIsQueuingCardClickedGetId: (prop: number) => void;

  isOpenQueuingTvCardPopapSecond: boolean;
  setIsOpenQueuingTvCardPopapSecond: (prop: boolean) => void;

  isOpenDepartmentAddCardIcon: boolean;
  setIsOpenDepartmentAddCardIcon: (prop: boolean) => void;

  isOpenDepartmentAddCardIconIndex: number;
  setIsOpenDepartmentAddCardIconIndex: (prop: number) => void;

  isOpenBurgerNavbar: boolean;
  setIsOpenBurgerNavbar: (prop: boolean) => void;

  formData: { PhoneNumber: string; UserPassword: string };
  setFormData: (prop: { PhoneNumber: string; UserPassword: string }) => void;
}

export const ButtonsContext = createContext<ButtonsClickedProps>({
  calendarBeginValue: '',
  setCalendarBeginValue: () => {},
  calendarEndValue: '',
  setCalendarEndValue: () => {},
  departmentGetId: '',
  setDepartmentGetId: () => {},

  isSubmitLoginForm: false,
  setIsSubmitLoginForm: () => {},

  isProfileWho: '',
  setIsProfileWho: () => {},

  isCloseCalendar: false,
  setIsCloseCalendar: () => {},

  isCloseCalendar2: false,
  setIsCloseCalendar2: () => {},

  departmentListChanged: '',
  setDepartmentListChanged: () => {},

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

  isOpenDoctorAddCard: false,
  setIsOpenDoctorAddCard: () => {},

  isOpenDoctorEditCard: false,
  setIsOpenDoctorEditCard: () => {},

  isOpenQueuingCardClicked: false,
  setIsOpenQueuingCardClicked: () => {},

  isQueuingCardClickedGetId: 1,
  setIsQueuingCardClickedGetId: () => {},

  isOpenQueuingTvCardPopapSecond: false,
  setIsOpenQueuingTvCardPopapSecond: () => {},

  isOpenDepartmentAddCardIcon: false,
  setIsOpenDepartmentAddCardIcon: () => {},

  isOpenDepartmentAddCardIconIndex: 1,
  setIsOpenDepartmentAddCardIconIndex: () => {},

  isOpenBurgerNavbar: true,
  setIsOpenBurgerNavbar: () => {},

  formData: { PhoneNumber: '', UserPassword: '' },
  setFormData: () => {},
});
