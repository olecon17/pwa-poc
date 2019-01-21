import React from 'react';
import { connect } from 'react-redux';
import Message from './Message';
import {
  openOffer,
  acceptOffer,
  declineOffer,
  fetchMessages,
} from '../actions/index';

const mapStateToProps = state => {
  const messages = state.get('messages');
  return {
    messages,
  };
};

const mapDispatchToProps = dispatch => ({
  openOffer: e => dispatch(openOffer(e)),
  acceptOffer: e => dispatch(acceptOffer(e)),
  declineOffer: e => dispatch(declineOffer(e)),
});
const messageList = props => (
  <div className="listWrapper">
    {props.messages.map(message => (
      <React.Fragment>
        <Message
          key={message.id}
          openOffer={props.openOffer}
          acceptOffer={props.acceptOffer}
          declineOffer={props.declineOffer}
          message={message}
        />
      </React.Fragment>
    ))}
  </div>
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(messageList);
