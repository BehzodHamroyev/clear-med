import React, { memo, Suspense, useCallback } from 'react';
import { Route, Routes } from 'react-router-dom';
import {
  //   routeConfigForAdmin,
  routeConfigForDoctor,
  //   routeConfigForReception,
} from '../config/routeConfig';
import { AppRoutesProps } from '@/shared/types/router';

const AppRouter = () => {
  const renderWithWrapper = useCallback((route: AppRoutesProps) => {
    const element = (
      <Suspense fallback={<div>...</div>}>{route.element}</Suspense>
    );

    return <Route key={route.path} path={route.path} element={element} />;
  }, []);

  return (
    <Routes>
      {Object.values(routeConfigForDoctor).map(renderWithWrapper)}
    </Routes>
  );
};

export default memo(AppRouter);
