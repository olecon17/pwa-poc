import { connect } from 'react-redux'
import Message from './Message'
import { acceptOffer, declineOffer } from '../actions/index'

const getMessageById = (messages, id) => {
  return messages.find(message => message.id == id)
}

const mapStateToProps = (state, ownProps) => {
  return { message: getMessageById(state.get('messages'), ownProps.id) }
}

const mapDispatchToProps = (dispatch) => ({
  acceptOffer: (message) => dispatch(acceptOffer(message)),
  declineOffer: (message) => dispatch(declineOffer(message)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Message)
