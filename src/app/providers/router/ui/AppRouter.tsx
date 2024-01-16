import React, { memo, Suspense, useCallback, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import {
  routeConfigForAdmin,
  routeConfigForDoctor,
  routeConfigForReception,
} from '../config/routeConfig';
import { AppRoutesProps } from '@/shared/types/router';

import { store } from '@/shared/lib/context/LoginContext';

const AppRouter = () => {
  const [currentRole, setCurrentRole] = useState<string>('');

  useEffect(() => {
    setCurrentRole(store?.user?.role);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store?.user?.role]);

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
          : '',
      ).map(renderWithWrapper)}

      {/* {Object.values(routeConfigForDoctor).map(renderWithWrapper)} */}
    </Routes>
  );
};

export default memo(AppRouter);
