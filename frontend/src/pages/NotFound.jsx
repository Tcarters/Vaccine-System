import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';
import {Grid } from '@mui/material'

import '../App.scss';

import fourOhFour from '../assets/images/fourOhFour.svg'
import astrodude from '../assets/images/astrodude.png'
import bgImage from '../assets/images/lucas.jpg'
const NotFound = () => {
  return (

    <>
         <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                style={{ minHeight: '100vh' }}
                // bgcolor='green'

                sx ={{ backgroundImage:  `url(${bgImage})`,
            }}
            > 
                    <Grid container xs={12} 
                          bgcolor='' 
                          alignContent='center' 
                          alignItems='center'
                        >
                        
                        <NotFoundClass />
                    </Grid>

        </Grid>

    </>
  )
}

export default NotFound


class NotFoundClass extends Component {

  constructor(props){
    super(props);
    this.state = {
      pageLoaded: false,
      fourOhFourLoaded: false,
      astrotop: '0px',
      astroright: '0px'
    }
  }
  componentDidMount(){
    this.setState({
      pageLoaded: true
    });
  }
  onMouseMove(e){
    this.setState({
      astrotop: e.clientY/8 + 'px',
      astroright: e.clientX/8 + 'px'
    })
  }
  render() {
    return (
        
        
   
                
                
                   <div className="flex main-wrap justifyCenter">
                    <div className="main-container flex justifyCenter">
                    <CSSTransition
                        in={this.state.pageLoaded}
                        timeout={600}
                        classNames="fourOhFour"
                        onEntered={() => {
                        this.setState({
                            fourOhFourLoaded: true,
                            astrotop: '10px',
                            astroright: '30px'
                        });
                        }}
                        unmountOnExit
                    >
                        {state => (
                        <div className="fourOhFour flex justifyCenter" onMouseMove={(e) => {this.onMouseMove(e)}} onMouseOut={() => {this.setState({astrotop: '10px',astroright: '30px'})}}>
                            <img src={fourOhFour}/>
                            <img src={astrodude} className="astrodude" style={{"paddingTop": this.state.astrotop, "paddingRight": this.state.astroright}}/>
                        </div>
                        )}
                    </CSSTransition>
                    <CSSTransition
                        in={this.state.fourOhFourLoaded}
                        timeout={600}
                        classNames="error-text"
                        unmountOnExit
                    >
                        {state => (
                        <div className="error-text flex justifyCenter">
                            <h3>Oops… Looks like you got lost</h3>
                            <a href="/">GO BACK HOME </a>
                        </div>
                        )}
                    </CSSTransition>
                 </div>
                
        
     </div>
    )
  }
}

// export default NotFoundClass;