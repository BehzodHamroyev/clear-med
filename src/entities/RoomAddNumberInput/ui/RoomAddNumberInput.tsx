import React from 'react';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';

import cls from './roomAddNumberInput.module.scss';

const RoomAddNumberInput = () => {
  /* useContext */
  const { isDataFormAddRoom, setIsDataFormAddRoom } =
    React.useContext(ButtonsContext);

  /* UI */
  return (
    <div className={cls.RoomAddNumberInputWrapper}>
      <input
        required
        type="number"
        placeholder="0"
        onChange={(e) =>
          Number(e.target.value) > 0
            ? setIsDataFormAddRoom({
                ...isDataFormAddRoom,
                RoomNumber: e.target.value,
              })
            : ''
        }
        value={isDataFormAddRoom.RoomNumber}
        className={cls.RoomAddNumberInputWrapper__Input}
      />
    </div>
  );
};

export default RoomAddNumberInput;
