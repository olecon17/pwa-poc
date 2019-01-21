import React from 'react'
import { connect } from 'react-redux'
import Header from '../../components/Header/index'
import Sidebar from '../../components/Sidebar/index'
import Backdrop from '../../components/Backdrop/index'
import { openSidebar, closeSidebar } from '../../actions/index'

const mapStateToProps = state => {

  let displayState = state.get('display')

  return {
    sidebarOpen: displayState.sidebarOpen
  }
}

const mapDispatchToProps = (dispatch) => ({
  openSidebar: () => dispatch(openSidebar()),
  closeSidebar: () => dispatch(closeSidebar())
})



const navigationContainer = (props) => {

  let backdrop = props.sidebarOpen ? <Backdrop sidebarOpen={props.sidebarOpen} clickBackdrop={props.closeSidebar} /> : null;

  return (
    <div className="navWrapper">
      <Header clickHamburger={props.openSidebar} />
      <Sidebar sidebarOpen = {props.sidebarOpen}/>
      {backdrop}
    </div>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(navigationContainer)
