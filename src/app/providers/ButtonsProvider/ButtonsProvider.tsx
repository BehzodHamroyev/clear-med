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
    ],
  );

  return (
    <ButtonsContext.Provider value={defaultProps}>
      {children}
    </ButtonsContext.Provider>
  );
};

export default ButtonsProvider;
