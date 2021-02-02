
import React, {useState} from 'react';
import axios from 'axios';

 
function RegistrationForm(props)  {
    const [state , setState] = useState({
        email : "",
        password : ""
    })
    const handleChange = (e) => {
        const {id , value} = e.target   
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    }
    
    const handleSubmitClick = (e) => {
            e.preventDefault();
            if(state.password && state.email === true) {
                sendDetailsToServer()    
            } else {
                alert("Ckeck your data");
            }
        }

        const sendDetailsToServer = () => {
            if(state.email.length && state.password.length) {
                props.showError(null);
                const payload={
                    "email":state.email,
                    "password":state.password,
                }
                axios.post("http://localhost/api/+'/email/password'", payload)
                    .then(function (response) {
                        if(response.status === 200){
                            setState(prevState => ({
                                ...prevState,
                                'successMessage' : ' successful. Redirecting to home page..'
                            }))
                            // redirectToHome();
                            props.showError(null)
                        } else{
                            props.showError("Some error ocurred");
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });    
            } else {
                props.showError('Please enter valid username and password')    
            }
            
        }


    return(
        <div className="d-flex p-2 bd-highlight ">
        <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
        <form>
            <div className="form-group text-left">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input type="email" 
                   className="form-control" 
                   id="email" 
                   aria-describedby="emailHelp" 
                   placeholder="Enter email"
                   value={state.email}
                   onChange={handleChange}
                  
            />
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div className="form-group text-left">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input type="password" 
                    className="form-control" 
                    id="password" 
                    placeholder="Password"
                    value={state.password}
                    onChange={handleChange}
                   
                />
            </div>
            
            <button 
                type="submit" 
                className="btn btn-primary text-align:center"
                onClick={handleSubmitClick}
            >
                Register
            </button>
        </form>
    </div>
    </div>
)
}



    export default RegistrationForm;
    