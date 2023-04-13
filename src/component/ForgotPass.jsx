import React, { useState } from "react";
import { Button, Typography,TextField, FormControl,  Paper , Grid, Alert } from "@mui/material"
import "../styles/form.css"
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const PasswordReset  = () => {
    const [step, setStep] = useState(0);
    const [email, setEmail] = useState("");
    const [newpass, setNewPass] = useState("");
    const [pass, setPass] = useState("");

     const navigate = useNavigate()

    const HandleSteps = (e) => {
        e.preventDefault();

        if (step === 0) {
            if (email === "" || !(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email))) Alert("Please Fill Your Correct Email")
            else setStep(cur => cur + 1)
        }
        else if (step === 1) {
            if (newpass === "" || pass.length < 5) Alert("Please Fill Proper Password")
            if (pass === "" || pass.length < 5) Alert("Please Fill Proper Password")
            if (newpass !== pass) Alert("Password is not matched")
            else setStep(cur => cur + 1)

        } else {
            setStep(cur => cur + 1)
        }
    }
    const renderNextButton = () => {
        if (step === 0) {
            return (
                <Button onClick={HandleSteps} type="button">Confirm</Button>
            )
        }
          else if (step === 1) {
            return (
                <Button onClick={HandleSteps} type="button">Reset Password</Button>
            )
        } else if (step === 2) {
            return (
                  <Button onClick={() => navigate('/resumemakerui/login')} type="button">Back to Login</Button>
            )}
        else {
            return (
                undefined
            )
        }
    }
    const handelBack = (e) => {
        e.preventDefault();
        setStep(cur => cur - 1)
    }


    const renderBackButton = () => {
        if (step === 0) {
            return (
                <Button onClick={() => navigate('/resumemakerui/login')} type="button">Back to Login</Button>
            )
     }
            else if (step === 1) {
             return (
                 <Button onClick={handelBack} type="button">Change Registered Email ID</Button>
             )}
             else if (step === -1) {
                return (
                    undefined
                )}
             else {
             return (
                 <Button onClick={handelBack} type="button">Back</Button>
             )
         }
     }

    return (

        <>
          <div className="container">
            <div className="imgmain">
            
            </div>

                <div className="main">
                    <FormControl className="formcontrol">
                        {step === 0 && (
                            <div  >
                                <Typography variant="h4" gutterBottom>
                                Forgot your Password?
                                </Typography>
                                <h6>Enter your Registered Email ID to Reset Password</h6>

                                <TextField type="email" name="email" label="Email" fullWidth
                                    placeholder="Enter your Registered Email ID" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                        )}



                        {step === 1 && (
                            <div style={{ display: "flex" , flexDirection:"column"}}>
                                <Typography variant="h4" gutterBottom >Reset Password</Typography>
                           <div className="textmar">
                           <TextField type="password" name="newpass" fullWidth
                                    label="New PassWord"
                                    placeholder="Enter your New PassWord"
                                    value={newpass} onChange={(e) => setNewPass(e.target.value)} />
                           </div>
                           <div className="textmar">
                           <TextField type="text"
                                    fullWidth
                                    name="pass"
                                    value={pass}
                                    label="Confirm PassWord"
                                    placeholder="Confirm Your PassWord"
                                    onChange={(e) => setPass(e.target.value)} />
                           </div>
                               

                               
                            </div>
                        )}



                        {step === 2 && (
                            <div>
                                <Typography className="head">Congratulations!</Typography>
                                <Typography fontSize='xl'>PassWord Changed Sucessfully :)</Typography>
                            </div>
                        )}

                    
                        <div className="butt">
                            {renderNextButton()}
                            {renderBackButton()}    
                        </div>
                    </FormControl>
                </div>

</ div>
        </>
    

    );
};

export default PasswordReset ;