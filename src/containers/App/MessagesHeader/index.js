import React from 'react';
import styled from 'styled-components';
import MessagesRefeshButton from './MessagesRefreshButton';
import AddMessageButton from './AddMessageButton';

const MessagesHeader = styled.div.attrs({
  className: 'message_header row m-1',
})`
  display: flex;
  height: 100%;
  align-items: center;
`;

export default props => (
  <MessagesHeader>
    <h3 className="mb-1">College Messages</h3>
    <div className="spacer" />
    <AddMessageButton onAddClick={props.onAddMessageClick} />
    <MessagesRefeshButton onRefreshClick={props.onRefreshClick} />
  </MessagesHeader>
);
