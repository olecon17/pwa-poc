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
import MessageList from '../../../components/MessageList';
import MessagesHeader from '../MessagesHeader/index';
import LoadSpinner from '../LoadSpinner/index';
import { fetchMessages, postNewMessage } from '../../../actions/index';

/* eslint-disable react/prefer-stateless-function */

const mapStateToProps = state => {
  const messagesState = state.get('messages');
  const displayState = state.get('display');

  return {
    messages: messagesState,
    loading: displayState.loading,
  };
};

const mapDispatchToProps = dispatch => ({
  fetchMessages: () => dispatch(fetchMessages()),
  onAddMessageClick: () => dispatch(postNewMessage()),
});

class MessagePage extends React.Component {
  componentWillMount() {
    this.props.fetchMessages();
  }

  render() {
    const messageDisplayComponent = this.props.loading ? (
      <LoadSpinner />
    ) : (
      <MessageList messages={this.props.messages} />
    );
    return (
      <div className="container-fluid">
        <div className="content">
          <MessagesHeader
            onRefreshClick={this.props.fetchMessages}
            onAddMessageClick={this.props.onAddMessageClick}
          />
          {messageDisplayComponent}
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MessagePage);
