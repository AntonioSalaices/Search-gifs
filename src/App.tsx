import React, { BaseSyntheticEvent, useEffect, useState, lazy } from 'react';
import { Events } from '@Constans/eventConstants';
import { ThemeProvider } from 'context/ThemeContext.tsx';

import { setTranslationsByUserPreferences } from './i18n';
import i18n from './i18n/i18n';
import AppRoutes from 'AppRoutes';
import Spinner from '@Components/basics/Spinner';
import { PURPLE } from '@Utils/colors';
import { renderContent } from '@Hocs/withLoadingLogic/withLoadingLogic';

const ErrorBoundary = lazy(() => import('@Components/composed/ErrorBoundary/ErrorBoundary'));

const App = (): React.ReactElement => {
  const [isLoaded, setIsLoaded] = useState<boolean>(true);

  useEffect(() => {
    const loadTranslationsInitially = () => {
      setIsLoaded(false);
      setTranslationsByUserPreferences(i18n, navigator.language, setIsLoaded);
    };
    loadTranslationsInitially();
  }, []);

  const handleLanguageChanges = (event: Partial<BaseSyntheticEvent>) => {
    setIsLoaded(false);
    const locale: string = event?.currentTarget?.clientInformation?.languages[0];
    setTranslationsByUserPreferences(i18n, locale, setIsLoaded);
  };

  useEffect(() => {
    window.addEventListener(Events.LANGUAGE, handleLanguageChanges);

    return () => {
      window.removeEventListener(Events.LANGUAGE, handleLanguageChanges);
    };
  }, []);

  return (
    <ThemeProvider>
      <ErrorBoundary>{isLoaded ? <AppRoutes /> : renderContent(<Spinner singleColor={PURPLE} />)}</ErrorBoundary>
    </ThemeProvider>
  );
};

export default App;
