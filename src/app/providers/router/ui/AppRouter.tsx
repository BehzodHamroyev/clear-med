import React, { memo, Suspense, useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import {
  routeConfigForAdmin,
  routeConfigForDoctor,
  routeConfigForMonitor,
  routeConfigForReception,
} from '../config/routeConfig';
import { AppRoutesProps } from '@/shared/types/router';
import { getAuthUserData } from '@/features/Auth/model/selector/authUserSelector';

const AppRouter = () => {
  const [currentRole, setCurrentRole] = useState<string>('');

  const authUserData = useSelector(getAuthUserData);

  useEffect(() => {
    if (authUserData) {
      setCurrentRole(authUserData.role);
    }
  }, [authUserData]);

  const renderWithWrapper = useCallback((route: AppRoutesProps) => {
    const element = (
      <Suspense fallback={<div>...</div>}>{route.element}</Suspense>
    );

    return <Route key={route.path} path={route.path} element={element} />;
  }, []);

  return (
    <Routes>
      {Object.values(
        currentRole === 'admin'
          ? routeConfigForAdmin
          : currentRole === 'doctor'
            ? routeConfigForDoctor
            : currentRole === 'reception'
              ? routeConfigForReception
              : currentRole === 'monitor'
                ? routeConfigForMonitor
                : '',
      )?.map(renderWithWrapper)}
    </Routes>
  );
};

export default memo(AppRouter);
