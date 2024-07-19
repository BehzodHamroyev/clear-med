import React, { useEffect } from 'react';

import { useSelector } from 'react-redux';

import cls from './PrintQueuePage.module.scss';
// eslint-disable-next-line ulbi-tv-plugin/path-checker
import {
  error,
  isLoading,
  getInfoProject,
  getAllDataProject,
} from '@/entities/FileUploader';
import { QueueUserDoctor } from '../../../DoctorPanels/QueueUserDoctor';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Loader } from '@/widgets/Loader';
import ErrorDialog from '../../../ErrorDialog/ErrorDialog';

const PrintQueuePage = () => {
  const dispatch = useAppDispatch();

  const infoProject = useSelector(getInfoProject);
  const infoProjectIsLoader = useSelector(isLoading);
  const infoProjectError = useSelector(error);

  useEffect(() => {
    dispatch(getAllDataProject({}));
  }, [dispatch]);

  return (
    <div>
      {infoProject && (
        <div className={cls.PrintQueuePage}>
          <p className={cls.PrintQueuePage__medName}>
            {infoProject?.[0]?.name}
          </p>

          <div className={cls.PrintQueuePage__queueBox}>
            <QueueUserDoctor ticketNumber="Mor2" roomNumber={12} />
          </div>

          <div className={cls.PrintQueuePage__medicName}>
            <p>Shifokor:</p>
            <p className={cls.medicNameFullName}>Akaxonov Akaxon Akaxonovich</p>
          </div>

          <p className={cls.PrintQueuePage__dateGetQueue}>02.10.2002 | 10:23</p>

          <p className={cls.PrintQueuePage__message}>Katta rahmat</p>
        </div>
      )}

      {infoProjectIsLoader && <Loader />}

      {infoProjectError && <ErrorDialog isErrorProps={!false} />}
    </div>
  );
};

export default PrintQueuePage;
