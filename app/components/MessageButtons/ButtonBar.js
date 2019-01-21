import React from 'react'



const ButtonBar = (props) =>

    <div className="button_bar row justify-content-around no-gutters">
      <button className="btn btn-success col-1"><i className="far fa-check-circle"></i></button>
      <div className='spacer'></div>
      <button className="btn btn-danger col-1"><i className="fas fa-ban"></i></button>
    </div>



export default ButtonBar;
