import React from 'react';
import styled from 'styled-components';
import ButtonBar from './MessageButtons/ButtonBar';

const CardDiv = styled.div.attrs({})`
  border: 1px solid #282c34;
  background-color: lavender;
`;

export default props => {
  const messageClasses = props.message.open ? 'message open' : 'message';
  return (
    <CardDiv className={messageClasses}>
      <h2>{props.message.subject}</h2>
      <h4>From: {props.message.college}</h4>
      <p>{props.message.text}</p>
      <ButtonBar message={props.message} accepted={props.message.accepted} rejected={props.message.rejected} acceptClick={props.acceptOffer} declineClick={props.declineOffer} />
    </CardDiv>
  );
};
