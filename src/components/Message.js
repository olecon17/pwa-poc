import React from 'react';
import styled from 'styled-components';
import ButtonBar from './MessageButtons/ButtonBar';

const Card = styled.div.attrs({})`
  border: 1px solid #282c34;
  background-color: ;
`;

export default props => {
  const messageClasses = props.message.open ? 'message open' : 'message';
  return (
    <Card className={messageClasses} onClick={props.openOffer}>
      <h2>{props.message.subject}</h2>
      <h4>From: {props.message.college}</h4>
      <p>{props.message.text}</p>
      <ButtonBar />
    </Card>
  );
};
