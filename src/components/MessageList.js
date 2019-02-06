import { connect } from 'react-redux';
import React from 'react';
import MessageContainer from './MessageContainer';

const getIdsFromState = messages => messages.map(message => message.id);

const mapStateToProps = state => ({
  ids: getIdsFromState(state.get('messages')),
});

const mapDispatchToProps = () => ({});

const messageList = props =>
  props.ids.map(id => <MessageContainer key={id} id={id} />);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(messageList);
