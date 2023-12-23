import React, { ReactNode, useMemo, useState } from 'react';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';

interface ButtonsProviderProps {
  initialButton?: string;
  children: ReactNode;
}

const ButtonsProvider = (props: ButtonsProviderProps) => {
  const { initialButton, children } = props;

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

  const [
    isOpenDepartmentAddCardIconIndex,
    setIsOpenDepartmentAddCardIconIndex,
  ] = useState(1);

  const defaultProps = useMemo(
    () => ({
      isCloseCalendar,
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
    }),
    [
      isCloseCalendar,
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
    ],
  );

  return (
    <ButtonsContext.Provider value={defaultProps}>
      {children}
    </ButtonsContext.Provider>
  );
};

export default ButtonsProvider;
