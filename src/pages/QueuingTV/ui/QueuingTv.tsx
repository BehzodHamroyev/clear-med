import React, { useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';

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
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';
import { QueuingTvCardPopapSecond } from '@/shared/ui/QueuingTvCard/QueuingTvCardPopapSecond';
import {
  getDeparmentListData,
  getDeparmentListError,
  getDeparmentListIsLoading,
} from '../model/selectors/departmentListSelector';
import { fetchDepartmentList } from '../model/services/fetchDepartmentList';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Loader } from '@/widgets/Loader';
import ErrorDialog from '@/shared/ui/ErrorDialog/ErrorDialog';

import { iconsCardDepartments } from '@/shared/ui/GetIconForDepartment/model/helper/source';

const CardBody = [
  {
    id: '1',
    CardLeftTitle: 'Dermatolog',
    CardLeftRoomNumber: '15-xona',
    CardLeftDoctorName: 'Qosimova Nargiza',
    icon: <Tooth />,
  },
  {
    id: '2',
    CardLeftTitle: 'Pediatr',
    CardLeftRoomNumber: '12-xona',
    CardLeftDoctorName: '2 ta Shifokor',
    icon: <Ankle />,
  },
  {
    id: '3',
    CardLeftTitle: 'Xirurg',
    CardLeftRoomNumber: '32-xona',
    CardLeftDoctorName: 'Nurmatov Rustam',
    icon: <Brain />,
  },
  {
    id: '4',
    CardLeftTitle: 'Kardiolog',
    CardLeftRoomNumber: '4-xona',
    CardLeftDoctorName: 'Karimov Shuxrat',
    icon: <Intestine />,
  },
  {
    id: '5',
    CardLeftTitle: 'Nervopotolog',
    CardLeftRoomNumber: '8-xona',
    CardLeftDoctorName: 'Qosimova Nargiza',
    icon: <Cell />,
  },
  {
    id: '6',
    CardLeftTitle: 'Akusherolog',
    CardLeftRoomNumber: '19-xona',
    CardLeftDoctorName: '2 ta Shifokor',
    icon: <Temperature />,
  },
  {
    id: '7',
    CardLeftTitle: 'Dermatolog',
    CardLeftRoomNumber: '15-xona',
    CardLeftDoctorName: 'Qosimova Nargiza',
    icon: <Tooth />,
  },
  {
    id: '8',
    CardLeftTitle: 'Pediatr',
    CardLeftRoomNumber: '12-xona',
    CardLeftDoctorName: '2 ta Shifokor',
    icon: <Ankle />,
  },
  {
    id: '9',
    CardLeftTitle: 'Xirurg',
    CardLeftRoomNumber: '32-xona',
    CardLeftDoctorName: 'Nurmatov Rustam',
    icon: <Brain />,
  },
  {
    id: '10',
    CardLeftTitle: 'Kardiolog',
    CardLeftRoomNumber: '4-xona',
    CardLeftDoctorName: 'Karimov Shuxrat',
    icon: <Intestine />,
  },
  {
    id: '11',
    CardLeftTitle: 'Nervopotolog',
    CardLeftRoomNumber: '8-xona',
    CardLeftDoctorName: 'Qosimova Nargiza',
    icon: <Cell />,
  },
  {
    id: '12',
    CardLeftTitle: 'Akusherolog',
    CardLeftRoomNumber: '19-xona',
    CardLeftDoctorName: '2 ta Shifokor',
    icon: <Temperature />,
  },
  {
    id: '13',
    CardLeftTitle: 'Xirurg',
    CardLeftRoomNumber: '32-xona',
    CardLeftDoctorName: 'Nurmatov Rustam',
    icon: <Brain />,
  },
  {
    id: '14',
    CardLeftTitle: 'Kardiolog',
    CardLeftRoomNumber: '4-xona',
    CardLeftDoctorName: 'Karimov Shuxrat',
    icon: <Intestine />,
  },
  {
    id: '15',
    CardLeftTitle: 'Nervopotolog',
    CardLeftRoomNumber: '8-xona',
    CardLeftDoctorName: 'Qosimova Nargiza',
    icon: <Cell />,
  },
  {
    id: '16',
    CardLeftTitle: 'Akusherolog',
    CardLeftRoomNumber: '19-xona',
    CardLeftDoctorName: '2 ta Shifokor',
    icon: <Temperature />,
  },
];

const QueuingTv = () => {
  const dispatch = useAppDispatch();

  const {
    isOpenQueuingCardClicked,
    isOpenQueuingTvCardPopapSecond,
    isQueuingCardClickedGetId,
  } = useContext(ButtonsContext);

  const deparmentList = useSelector(getDeparmentListData);
  const deparmentListIsLoading = useSelector(getDeparmentListIsLoading);
  const deparmentListError = useSelector(getDeparmentListError);

  useEffect(() => {
    dispatch(fetchDepartmentList({ limit: 'all' }));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (deparmentList) {
    console.log(deparmentList);
  }

  return (
    <div className={cls.QueuingTvWrapper}>
      <ButtonNavbar TableTitle="Xonalar" ItemsLength={deparmentList?.length} />

      <div className={cls.RenderSectionCard}>
        {deparmentList?.map((item) => (
          <QueuingTvCard
            key={item.id}
            id={item.id}
            CardLeftTitle={item.department_id.name}
            CardLeftRoomNumber={item.name}
            CardLeftDoctorName={item.doctor_id.name}
            // @ts-ignore
            Icon={iconsCardDepartments[item.department_id.image].icon}
          />
        ))}
      </div>

      {isOpenQueuingTvCardPopapSecond ? <QueuingTvCardPopapSecond /> : ''}

      {deparmentListIsLoading && <Loader />}

      {deparmentListError && <ErrorDialog isErrorProps={!false} />}
    </div>
  );
};

export default QueuingTv;
