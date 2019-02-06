import { connect } from 'react-redux';
import React from 'react'
import MessageContainer from './MessageContainer';


const getIdsFromState = messages => {
  return messages.map(message => message.id)
}

const mapStateToProps = state => {
  return { ids: getIdsFromState(state.get('messages'))}
};

const mapDispatchToProps = () => ({});

const messageList = (props) => props.ids.map(id => <MessageContainer key={id} id ={id} />)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(messageList);
