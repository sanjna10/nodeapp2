import React, {PureComponent} from 'react';
import swal from 'sweetalert';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useHistory,
    withRouter 
  } from "react-router-dom";
  
class Signin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            otpVerified:false,
            user:null
          }
    }
    redirectToAfterSignin = () => {
        const { history } = this.props;
        if(history) history.push('/aftersignin');
        window.location.reload();
    }    
    onSubmitSignIn =()=>{
        
        
        if(this.state.otpVerified){
            alert("Hello! "+this.state.user.name);
            this.redirectToAfterSignin()

        }
        else{
            fetch('http://localhost:2500/login',{
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: document.getElementById("email-address").value,
                password: document.getElementById("password").value
            })
        })
        .then(response => response.json())
        .then(user => {
            if(user.email){
                alert("Hello! "+user.name);
                //swal("Welcome!", user.name, "success");
                localStorage.setItem('usermail', user.email)
                this.setState({
                    user:user
                })

                //console.log(user);
                console.log(localStorage.getItem('usermail'))
                this.redirectToAfterSignin()
                //this.props.loadUser(user);
            }
            else{
                //alert("Invalid credentials")
                swal("Failed!","Invalid credentials","error")
            }
        })

        }
        

    }
    disppass=()=>{
        document.getElementById('pass').className="hide";
        document.getElementById('otpsign').className="show";
        document.getElementById('chotp').className="hide";
        document.getElementById('verify').className="hide";

    }

    disppass1=()=>{
        document.getElementById('pass').className="show";
        document.getElementById('otpsign').className="hide";
    }

    onGetotp= (btnPassport) =>{
    

        var numbers_check = /^[0-9]+$/;
        var phonenumber=document.getElementById("phone").value;
    
    
        if(!(phonenumber.match(numbers_check) )){
          return swal("Failed!","Invalid phone number","error")
      }
    
      if(phonenumber.length!=10){
        return swal("Failed!","Invalid phone number","error")
      }
    
        document.getElementById('chotp').className="show";
        document.getElementById('verify').className="show";
        
    
      
    
        fetch('http://localhost:2500/getotpindb',{
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                  phonenumber:phonenumber
                })
            })
            .then(response => response.json())
            .then(resp => {
              console.log(resp)
                if(resp.status){
                    this.setState({
                        user:resp.teacher
                    })
                    swal("Success!", "OTP sent", "success");
    
                    //this.props.loadUser(user);
                }
                else{
                    swal("Failed!","Invalid credentials","error")
                }
            })
    
      }
    
    
      onClickVerify=() =>{
        var chotp= document.getElementById("chotp").value;
        var numbers_check = /^[0-9]+$/;
        if(!(chotp.match(numbers_check) )){
          return alert("OTP can only be numbers"+chotp)
        }
        if(chotp.length!=4){
          return alert("Re-enter OTP, OTP is 4 digits")
        }
    
        fetch('http://localhost:2500/verifyotp',{
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                  chotp:chotp
                })
            })
            .then(response => response.json())
            .then(resp => {
              console.log(resp)
                if(resp.status){
                  if(resp.status==="Success"){
                    //alert();
                    swal("Success!","OTP successfully verified", "success");
                    
                    this.setState({
                        otpVerified:true,
                        
                    })
                    this.onSubmitSignIn()

    
                  }
                  else{
               
                    swal("Failed!","OTP mismatch","error")
                  }
                  
                    
    
                    //this.props.loadUser(user);
                }
                else{
                    swal("Failed!","Didn't receive OTP try again","error")

                }
            })
    
        
      }
    render() {
        const { onRouteChange } = this.props;
        return (
            
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center" >
            <main className=" pa4 black-80">
            <div className="measure" style={{marginTop:'10%'}}>
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="f1 fw6 ph0 mh0 center">Sign In</legend>
                <div className="lh-copy mt3">
                    <p className="f6 link dim black db pointer underline" onClick={this.disppass1}>Sign in using password</p>
                    <p className="f6 link dim black db pointer underline" onClick={this.disppass}>Sign in using OTP</p>
                </div>
                <div id='pass'>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                        <input
                        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                        type="email"
                        name="email-address"
                        id="email-address"
                        onChange={this.onEmailChange}
                        />
                    </div>
                    <div className="mv3">
                        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                        <input
                        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                        type="password"
                        name="password"
                        id="password"
                        onChange={this.onPasswordChange}
                        />
                    </div>
                </div>
                <div id='otpsign' className='hide'>
                    <div className="mv3">
                    <label className="db fw6 lh-copy f6" htmlFor="password">Phone number (10 digit number without country code)</label>
                    <input
                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                    type="tel"
                    name="phone"
                    id="phone"
                    onChange={this.onPhoneChange}
                    />
                    </div>
                        <div class="verif">
                        <input
                            onClick={this.onGetotp}
                            className="f6 link dim br1 ba ph3 pv2 mb2 dib dark-blue bg-transparent"
                            type="button"
                            value="Get OTP"
                        />
                        </div>
                    
                    <div class=" center ">
                        <div class="flex">
                            <div class="fl w-75 pa1">
                            <input className="hide" type="text" id="chotp"  placeholder="Enter OTP here" />
                            </div>
                            <div class="fl w-25 pa1">
                            <input
                            id="verify"    
                            onClick={this.onClickVerify}
                            className="hide b pv2 input-reset ba b--black bg-transparent grow pointer f6 "
                            type="button"
                            value="Verify"
                            />
                            </div>
                        </div>
                    </div>
                </div>
                    <div className="lh-copy mt3">
                        <Link to="forgotpass">
                        
                            <p className="f6 link dim black db pointer underline" >Forgot password</p>
                        </Link>
                    </div>
                </fieldset>

                <div className="">
                <input
                    onClick={this.onSubmitSignIn}
                    className="f6 link dim br3 ph3 pv2 mb2 dib white bg-dark-blue b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                    type="submit"
                    value="Sign in"
                />
                </div>
                {/* <div className="lh-copy mt3">
                <p  onClick={() => onRouteChange('register')} className="f6 link dim black db pointer">Register</p>
                </div> */}
            </div>
            </main>
        </article>
        );


    }    
}

export default Signin;