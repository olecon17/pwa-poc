/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { connect } from 'react-redux';
import MessageList from '../../components/MessageList';
import MessagesHeader from '../../components/MessagesHeader/index';
import { fetchMessages } from '../../actions/index';

/* eslint-disable react/prefer-stateless-function */

const mapStateToProps = state => {
  const messagesState = state.get('messages');

  return {
    messages: messagesState,
  };
};

const mapDispatchToProps = dispatch => ({
  fetchMessages: () => dispatch(fetchMessages()),
});

const messageList = props => (
  <div className="container-fluid">
    <div className="content">
      <MessagesHeader onRefreshClick={props.fetchMessages} />
      <MessageList messages={props.messages} />
    </div>
  </div>
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(messageList);
