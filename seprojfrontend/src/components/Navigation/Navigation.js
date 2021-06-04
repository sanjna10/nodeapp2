import React from 'react';
import { Link } from 'react-router-dom';
//import {browserHistory} from "react-router";


class Navigation extends React.Component{

  constructor(){
    super();
    this.state={isSignedIn:this.isSignedInfunc()}
  }
  redirectToAfterSignout = () => {
    //const { history } = this.props;
    //browserHistory.push("/aftersignin");
    //if(history) history.push('/aftersignin');
    window.location.replace('/');
}
  //var isSignedIn=0;
  isSignedInfunc=()=>{
    if(localStorage.getItem('usermail')){
      return 1
    }
    return 0
  }
  signout=()=>{
    localStorage.clear()
    document.getElementById('signinstat').className="hide";
    this.redirectToAfterSignout()
  }
   
  signin=()=>{
    //document.getElementById('signinstat').className="show";
    //if(localStorage.getItem('usermail')){
      //this.isSignedIn=1
      console.log(this.isSignedIn)
      document.getElementById('signinstat').className="show";
      //return true;
    //}
    //return false;
  }

  
  
  componentDidMount(){
    var a=this.isSignedInfunc()

    this.setState({a})
    this.state.isSignedIn=localStorage.getItem('usermail');
    if(this.state.isSignedIn)
      this.signin();

  
  }

  render(){
      

      return (
        // <nav style={{display: 'flex', justifyContent: 'flex-start',marginInlineStart:'33%'}}>
          
        //   <h3 onClick={() => onRouteChange('home')} className='f3 link  black underline pa3 pointer left '>Room Occupancy Chart Generator App</h3>
        // </nav>
        <header className="bg-black-60 w-100 ph3 pv3  ph4-m ph5-l" >
          <nav className="f6 fw6 ttu tracked ">
          <Link to="/">
          <a
            className="link dim white dib mr3"
            href="#"
            title="Home"
          >
          
            Room Occupancy Chart Generator App
          </a>
          
          </Link>
          
          <div id='signinstat' className="hide">
            <a
              className="link dim white dib mr3"
              href="#"
              title="signout"
              onClick={this.signout}
              
              
            >Sign Out</a>
          
          </div>
          

          </nav>
        </header>
        
      );

  }

  
}



export default Navigation;