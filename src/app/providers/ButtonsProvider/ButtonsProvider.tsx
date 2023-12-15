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

  const defaultProps = useMemo(
    () => ({
      isCloseCalendar,
      setIsCloseCalendar,
      isCloseCalendar2,
      setIsCloseCalendar2,
    }),
    [
      isCloseCalendar,
      setIsCloseCalendar,
      isCloseCalendar2,
      setIsCloseCalendar2,
    ],
  );

  return (
    <ButtonsContext.Provider value={defaultProps}>
      {children}
    </ButtonsContext.Provider>
  );
};

export default ButtonsProvider;
