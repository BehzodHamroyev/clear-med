import React from 'react';
import { useTranslation } from 'react-i18next';

const AboutPage = () => {
  const { t } = useTranslation('about');

  return <div data-testid="AboutPage">About1</div>;
};

export default AboutPage;
