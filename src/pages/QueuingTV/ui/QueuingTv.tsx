import React, { useContext } from 'react';

import { ButtonNavbar } from '@/entities/ButtonNavbar';
import { QueuingTvCard } from '@/entities/QueuingTvCard';
import {
  Ankle,
  Brain,
  Cell,
  Intestine,
  Temperature,
  Tooth,
} from '@/shared/assets/entities/QueuingTvCard';

import cls from './QueuingTv.module.scss';
import { QueuingTvCardPopap } from '@/shared/ui/QueuingTvCard/QueuingTvCardPopap';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';
import { QueuingTvCardPopapSecond } from '@/shared/ui/QueuingTvCard/QueuingTvCardPopapSecond';

const CardBody = [
  {
    id: 1,
    CardLeftTitle: 'Dermatolog',
    CardLeftRoomNumber: '15-xona',
    CardLeftDoctorName: 'Qosimova Nargiza',
    icon: <Tooth />,
  },
  {
    id: 2,
    CardLeftTitle: 'Pediatr',
    CardLeftRoomNumber: '12-xona',
    CardLeftDoctorName: '2 ta Shifokor',
    icon: <Ankle />,
  },
  {
    id: 3,
    CardLeftTitle: 'Xirurg',
    CardLeftRoomNumber: '32-xona',
    CardLeftDoctorName: 'Nurmatov Rustam',
    icon: <Brain />,
  },
  {
    id: 4,
    CardLeftTitle: 'Kardiolog',
    CardLeftRoomNumber: '4-xona',
    CardLeftDoctorName: 'Karimov Shuxrat',
    icon: <Intestine />,
  },
  {
    id: 5,
    CardLeftTitle: 'Nervopotolog',
    CardLeftRoomNumber: '8-xona',
    CardLeftDoctorName: 'Qosimova Nargiza',
    icon: <Cell />,
  },
  {
    id: 6,
    CardLeftTitle: 'Akusherolog',
    CardLeftRoomNumber: '19-xona',
    CardLeftDoctorName: '2 ta Shifokor',
    icon: <Temperature />,
  },
  {
    id: 7,
    CardLeftTitle: 'Dermatolog',
    CardLeftRoomNumber: '15-xona',
    CardLeftDoctorName: 'Qosimova Nargiza',
    icon: <Tooth />,
  },
  {
    id: 8,
    CardLeftTitle: 'Pediatr',
    CardLeftRoomNumber: '12-xona',
    CardLeftDoctorName: '2 ta Shifokor',
    icon: <Ankle />,
  },
  {
    id: 9,
    CardLeftTitle: 'Xirurg',
    CardLeftRoomNumber: '32-xona',
    CardLeftDoctorName: 'Nurmatov Rustam',
    icon: <Brain />,
  },
  {
    id: 10,
    CardLeftTitle: 'Kardiolog',
    CardLeftRoomNumber: '4-xona',
    CardLeftDoctorName: 'Karimov Shuxrat',
    icon: <Intestine />,
  },
  {
    id: 11,
    CardLeftTitle: 'Nervopotolog',
    CardLeftRoomNumber: '8-xona',
    CardLeftDoctorName: 'Qosimova Nargiza',
    icon: <Cell />,
  },
  {
    id: 12,
    CardLeftTitle: 'Akusherolog',
    CardLeftRoomNumber: '19-xona',
    CardLeftDoctorName: '2 ta Shifokor',
    icon: <Temperature />,
  },
  {
    id: 13,
    CardLeftTitle: 'Xirurg',
    CardLeftRoomNumber: '32-xona',
    CardLeftDoctorName: 'Nurmatov Rustam',
    icon: <Brain />,
  },
  {
    id: 14,
    CardLeftTitle: 'Kardiolog',
    CardLeftRoomNumber: '4-xona',
    CardLeftDoctorName: 'Karimov Shuxrat',
    icon: <Intestine />,
  },
  {
    id: 15,
    CardLeftTitle: 'Nervopotolog',
    CardLeftRoomNumber: '8-xona',
    CardLeftDoctorName: 'Qosimova Nargiza',
    icon: <Cell />,
  },
  {
    id: 16,
    CardLeftTitle: 'Akusherolog',
    CardLeftRoomNumber: '19-xona',
    CardLeftDoctorName: '2 ta Shifokor',
    icon: <Temperature />,
  },
];

const QueuingTv = () => {
  const {
    isOpenQueuingCardClicked,
    isQueuingCardClickedGetId,
    isOpenQueuingTvCardPopapSecond,
  } = useContext(ButtonsContext);

  const getObjectFind = CardBody.find(
    (item) => item.id === isQueuingCardClickedGetId,
  );

  console.log(getObjectFind);

  return (
    <div className={cls.QueuingTvWrapper}>
      <ButtonNavbar TableTitle="Bo‘limlar" ItemsLength={CardBody.length} />

      <div className={cls.RenderSectionCard}>
        {CardBody.map((item) => (
          <QueuingTvCard
            key={item.id}
            id={item.id}
            CardLeftTitle={item.CardLeftTitle}
            CardLeftRoomNumber={item.CardLeftRoomNumber}
            CardLeftDoctorName={item.CardLeftDoctorName}
            icon={item.icon}
          />
        ))}
      </div>

      {isOpenQueuingCardClicked ? (
        <QueuingTvCardPopap getObjectFind={getObjectFind} />
      ) : (
        ''
      )}

      {isOpenQueuingTvCardPopapSecond ? (
        <QueuingTvCardPopap getObjectFind={getObjectFind} />
      ) : (
        ''
      )}

      <QueuingTvCardPopapSecond />
    </div>
  );
};

export default QueuingTv;
