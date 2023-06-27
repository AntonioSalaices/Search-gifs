import React from 'react';
import { Spinner, Message, Container, List } from '@Components/Core';

import { PropsFrom } from '@Utils/types';
import { PURPLE } from '@Utils/colors';

export const renderContent = (children: React.ReactElement) => {
  return (
    <Container>
      <div className="row justify-center">{children}</div>
    </Container>
  );
};

export default function withLoadingLogic<P extends Record<string, any>>(WrappedComponent: React.FC<P>) {
  return (props: P & PropsFrom<typeof List>) => {
    if (props.isLoading) return renderContent(<Spinner singleColor={PURPLE} size={50} />);
    if (props.isShownNoFoundMessage) return renderContent(<Message tx="noFound.message" />);

    return <WrappedComponent {...(props as P)} />;
  };
}
