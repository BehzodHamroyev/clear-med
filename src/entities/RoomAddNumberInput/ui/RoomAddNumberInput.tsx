import React, { useContext } from 'react';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';

import cls from './roomAddNumberInput.module.scss';

const RoomAddNumberInput = () => {
  const { isDataFormAddRoom, setIsDataFormAddRoom } =
    useContext(ButtonsContext);

  return (
    <div className={cls.RoomAddNumberInputWrapper}>
      <input
        required
        maxLength={4}
        minLength={1}
        type="number"
        placeholder="0"
        onChange={(e) =>
          setIsDataFormAddRoom({
            ...isDataFormAddRoom,
            RoomNumber: e.target.value,
          })
        }
        value={isDataFormAddRoom.RoomNumber}
        className={cls.RoomAddNumberInputWrapper__Input}
      />
    </div>
  );
};

export default RoomAddNumberInput;
