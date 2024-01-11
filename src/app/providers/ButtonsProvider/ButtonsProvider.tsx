import React, { ReactNode, useMemo, useState } from 'react';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';

interface ButtonsProviderProps {
  initialButton?: string;
  children: ReactNode;
}

const ButtonsProvider = (props: ButtonsProviderProps) => {
  const { initialButton, children } = props;

  const [calendarBeginValue, setCalendarBeginValue] = useState('');
  const [calendarEndValue, setCalendarEndValue] = useState('');

  const [isProfileWho, setIsProfileWho] = useState('');

  const [isCloseCalendar, setIsCloseCalendar] = useState(false);

  const [isCloseCalendar2, setIsCloseCalendar2] = useState(false);

  const [isOpenThemeOrLanguage, setIsOpenThemeOrLanguage] = useState(true);

  const [isOpenDepartmentAddCard, setIsOpenDepartmentAddCard] = useState(false);

  const [isOpenDepartmentEditCard, setIsOpenDepartmentEditCard] =
    useState(false);

  const [isOpenRoomAddCard, setIsOpenRoomAddCard] = useState(false);

  const [isOpenRoomEditCard, setIsOpenRoomEditCard] = useState(false);

  const [isOpenDoctorAddCard, setIsOpenDoctorAddCard] = useState(false);

  const [isOpenDoctorEditCard, setIsOpenDoctorEditCard] = useState(false);

  const [isOpenQueuingCardClicked, setIsOpenQueuingCardClicked] =
    useState(false);

  const [isQueuingCardClickedGetId, setIsQueuingCardClickedGetId] = useState(1);

  const [isOpenQueuingTvCardPopapSecond, setIsOpenQueuingTvCardPopapSecond] =
    useState(false);

  const [isOpenDepartmentAddCardIcon, setIsOpenDepartmentAddCardIcon] =
    useState(false);

  const [isOpenBurgerNavbar, setIsOpenBurgerNavbar] = useState(true);

  const [isSubmitLoginForm, setIsSubmitLoginForm] = useState<boolean>(false);

  const [departmentListChanged, setDepartmentListChanged] =
    useState<string>('');

  const [departmentGetId, setDepartmentGetId] = useState<string>('');

  const [formData, setFormData] = useState({
    PhoneNumber: '',
    UserPassword: '',
  });

  const [
    isOpenDepartmentAddCardIconIndex,
    setIsOpenDepartmentAddCardIconIndex,
  ] = useState(1);

  const defaultProps = useMemo(
    () => ({
      formData,
      setFormData,
      isProfileWho,
      setIsProfileWho,
      isCloseCalendar,
      departmentListChanged,
      setDepartmentListChanged,
      setIsCloseCalendar,
      isCloseCalendar2,
      setIsCloseCalendar2,
      isOpenThemeOrLanguage,
      setIsOpenThemeOrLanguage,
      isOpenDepartmentAddCard,
      setIsOpenDepartmentAddCard,
      isOpenDepartmentEditCard,
      setIsOpenDepartmentEditCard,
      isOpenRoomEditCard,
      setIsOpenRoomEditCard,
      isOpenRoomAddCard,
      setIsOpenRoomAddCard,
      isOpenDoctorAddCard,
      setIsOpenDoctorAddCard,
      isOpenDoctorEditCard,
      setIsOpenDoctorEditCard,
      isOpenQueuingCardClicked,
      setIsOpenQueuingCardClicked,
      isQueuingCardClickedGetId,
      setIsQueuingCardClickedGetId,
      isOpenQueuingTvCardPopapSecond,
      setIsOpenQueuingTvCardPopapSecond,
      isOpenDepartmentAddCardIcon,
      setIsOpenDepartmentAddCardIcon,
      isOpenDepartmentAddCardIconIndex,
      setIsOpenDepartmentAddCardIconIndex,
      isOpenBurgerNavbar,
      setIsOpenBurgerNavbar,
      isSubmitLoginForm,
      setIsSubmitLoginForm,
      calendarBeginValue,
      setCalendarBeginValue,
      calendarEndValue,
      setCalendarEndValue,
      departmentGetId,
      setDepartmentGetId,
    }),
    [
      formData,
      setFormData,
      isProfileWho,
      setIsProfileWho,
      isCloseCalendar,
      setIsCloseCalendar,
      departmentListChanged,
      setDepartmentListChanged,
      isCloseCalendar2,
      setIsCloseCalendar2,
      isOpenThemeOrLanguage,
      setIsOpenThemeOrLanguage,
      isOpenDepartmentAddCard,
      setIsOpenDepartmentAddCard,
      isOpenDepartmentEditCard,
      setIsOpenDepartmentEditCard,
      isOpenRoomEditCard,
      setIsOpenRoomEditCard,
      isOpenRoomAddCard,
      setIsOpenRoomAddCard,
      isOpenDoctorAddCard,
      setIsOpenDoctorAddCard,
      isOpenDoctorEditCard,
      setIsOpenDoctorEditCard,
      isOpenQueuingCardClicked,
      setIsOpenQueuingCardClicked,
      isQueuingCardClickedGetId,
      setIsQueuingCardClickedGetId,
      isOpenQueuingTvCardPopapSecond,
      setIsOpenQueuingTvCardPopapSecond,
      isOpenDepartmentAddCardIcon,
      setIsOpenDepartmentAddCardIcon,
      isOpenDepartmentAddCardIconIndex,
      setIsOpenDepartmentAddCardIconIndex,
      isOpenBurgerNavbar,
      setIsOpenBurgerNavbar,
      isSubmitLoginForm,
      setIsSubmitLoginForm,
      calendarBeginValue,
      setCalendarBeginValue,
      calendarEndValue,
      setCalendarEndValue,
      departmentGetId,
      setDepartmentGetId,
    ],
  );

  return (
    <ButtonsContext.Provider value={defaultProps}>
      {children}
    </ButtonsContext.Provider>
  );
};

export default ButtonsProvider;
