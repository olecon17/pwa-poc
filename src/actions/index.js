export const openSidebar = () => ({
  type: 'OPEN_SIDEBAR',
});

export const closeSidebar = () => ({
  type: 'CLOSE_SIDEBAR',
});

export const fetchMessages = () => ({
  type: 'FETCH_MESSAGES',
});

export const postNewMessage = () => ({
  type: 'ADD_MESSAGE',
});

export const addPendingAction = () => ({
  type: 'ADD_PENDING_ACTION'
})

export const setMessages = messages => ({
  type: 'SET_MESSAGES',
  messages,
});

export const acceptOffer = (msg) => ({
  type: 'ACCEPT_OFFER',
  msg
});

export const declineOffer = (msg) => ({
  type: 'DECLINE_OFFER',
  msg
});

export const startLoading = () => ({
  type: 'START_LOADING'
})

export const stopLoading = () => ({
  type: 'STOP_LOADING'
})
