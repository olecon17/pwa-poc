import React from 'react';
import { connect } from 'react-redux';
import Header from '../Header/index';
import Sidebar from '../Sidebar/index';
import Backdrop from '../Backdrop/index';
import { openSidebar, closeSidebar } from '../../../actions/index';

const mapStateToProps = state => {
  const displayState = state.get('display');

  return {
    sidebarOpen: displayState.sidebarOpen,
  };
};

const mapDispatchToProps = dispatch => ({
  openSidebar: () => dispatch(openSidebar()),
  closeSidebar: () => dispatch(closeSidebar()),
});

const navigationContainer = props => {
  const backdrop = props.sidebarOpen ? (
    <Backdrop
      sidebarOpen={props.sidebarOpen}
      clickBackdrop={props.closeSidebar}
    />
  ) : null;

  return (
    <div className="navWrapper">
      <Header clickHamburger={props.openSidebar} />
      <Sidebar sidebarOpen={props.sidebarOpen} />
      {backdrop}
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(navigationContainer);
