export const openSidebar = () => ({
  type: "OPEN_SIDEBAR"
})

export const closeSidebar = () => ({
  type: "CLOSE_SIDEBAR"
})

export const fetchMessages = () => ({
  type: "FETCH_MESSAGES"
})

export const setMessages = (messages) => ({
  type: "SET_MESSAGES",
  messages: messages
})

export const openOffer = (event, key) => ({
  type: "OPEN_OFFER",
  event: event,
  key: key
})

export const acceptOffer = (event, key) => ({
  type: "ACCEPT_OFFER",
  event: event,
  key: key
})

export const declineOffer = (event, key) => ({
  type: "DECLINE_OFFER",
  event: event,
  key: key
})
