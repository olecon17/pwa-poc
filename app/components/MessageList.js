import React from 'react'
import Message from './Message'
import { openOffer, acceptOffer, declineOffer, fetchMessages } from '../actions/index'
import { connect } from 'react-redux';

const mapStateToProps = state => {
  let messages = state.get('messages')
  return {
    messages: messages
  }
}

const mapDispatchToProps = (dispatch) => ({
  openOffer: (e) => dispatch(openOffer(e)),
  acceptOffer: (e) => dispatch(acceptOffer(e)),
  declineOffer: (e) => dispatch(declineOffer(e)),

})
const messageList = (props) => {
  return (
  <div className="listWrapper">

        {
          props.messages.map(message => {
          return (
            <React.Fragment>
              <Message key={message.id} openOffer={props.openOffer} acceptOffer={props.acceptOffer} declineOffer={props.declineOffer} message={message}/>
            </React.Fragment>
          )
        })
        }

  </div>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(messageList)
