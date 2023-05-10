import React, { useState } from "react";
import { Button, Typography,TextField, FormControl,  Paper , Grid, Alert } from "@mui/material"
import "../styles/form.css"
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { checkEmail, resetPassword } from "../services/resumemaker-services";
import {
    setMultiNotificationData,
    setMultiNotificationVariant,
  } from "../reduxToolkit/Notification/notificationSlice";
import { useDispatch } from "react-redux";
import { axiosMethod } from "../services/helper";

const PasswordReset  = () => {

    const activeStatus = localStorage.getItem("activeStatus")
    const emailres = localStorage.getItem("email")
    let activeStatusRes = false;
    if(activeStatus === "N"){
        activeStatusRes = true;
    }

    const dispatch = useDispatch();
    const [step, setStep] = useState( activeStatusRes ? 1 : 0);
    const [email, setEmail] = useState(activeStatusRes ? emailres : "");
    const [newpass, setNewPass] = useState("");
    const [pass, setPass] = useState("");

     const navigate = useNavigate()

    const HandleSteps = async (e) => {  
        e.preventDefault();
        const res = await checkEmail({
            email: email,
            header: {
                "Content-Type": "application/json",
              },
          });

        if (step === 0) {

            if (email === "" || !(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email))) toast("Please Fill Your Correct Email")
            else if(res.code === "200" ){
                setStep(cur => cur + 1)
            }else{
   
               dispatch(setMultiNotificationVariant("error"));
                const errorArray = [
                  {
                    propertyValue: res?.message || "Something went wrong",
                  },
                ];
                dispatch(setMultiNotificationData(errorArray));
              
            }
             
        }
        else if (step === 1) {
            if (newpass === "" || pass.length < 5) toast("Please Fill Proper Password")
            if (pass === "" || pass.length < 5) toast("Please Fill Proper Password")
            if (newpass !== pass) toast("Password is not matched")
            else {
                
                const data = {
                    email: email,
                    password: pass
                }
            
                const res = await resetPassword(JSON.stringify(data),{
                    headers: {
                        'Content-Type': 'application/json',
                      }
                })
              
                if(res?.code==="200")
                {
                    setStep(cur => cur + 1)
                }

            }

        } else {
            setStep(cur => cur + 1)
        }
    }
    const renderNextButton = () => {
        if (step === 0) {
            return (
                <Button style={{ fontWeight: 'bold', color: 'navy', textTransform: 'none'}} onClick={HandleSteps} type="button">Confirm</Button>
            )
        }
          else if (step === 1) {
            return (
                <Button style={{ fontWeight: 'bold', color: 'navy', textTransform: 'none'}} onClick={HandleSteps} type="button">Reset Password</Button>
            )
        } else if (step === 2) {
            return (
                  <Button style={{ fontWeight: 'bold', color: 'navy', textTransform: 'none'}} onClick={() => navigate('/resumemakerui/login')} type="button">Back to Login</Button>
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
                <Button style={{ fontWeight: 'bold', color: 'navy', textTransform: 'none'}} onClick={() => navigate('/resumemakerui/login')} type="button">Back to Login</Button>
            )
     }
            else if (step === 1) {
             return (
                 <Button style={{ fontWeight: 'bold', color: 'navy', textTransform: 'none'}} onClick={handelBack} type="button">Change Registered Email Id</Button>
             )}
             else if (step === -1) {
                return (
                    undefined
                )}
             else {
             return (
                 <Button style={{ fontWeight: 'bold', color: 'navy', textTransform: 'none'}} onClick={handelBack} type="button">Back</Button>
             )
         }
     }

    return (

        <>
          <div className="containerforgot">
            <div className="imgmain">
            
            </div>

                <div className="mainResume">
                    <FormControl className="formcontrol">
                        {step === 0 && (
                            <div  >
                                <Typography variant="h4" gutterBottom>
                                Forgot your password?
                                </Typography>
                                <h4> </h4>
                                {/* <h4>Enter your Registered Email ID to Reset Password</h4> */}

                                <TextField type="email" name="email" label="Email" fullWidth
                                    placeholder="Enter your Registered Email ID" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                        )}



                        {step === 1 && (
                            <div style={{ display: "flex" , flexDirection:"column"}}>
                                {activeStatusRes ?  <Typography variant="h4" gutterBottom >Set Password</Typography>
                                 : 
                                <Typography variant="h4" gutterBottom >Reset Password</Typography>}
                          
                           <div className="textmar">
                           <TextField type="password" name="newpass" fullWidth
                                    label="New Password"
                                    placeholder="Enter your New Password"
                                    value={newpass} onChange={(e) => setNewPass(e.target.value)} />
                           </div>
                           <div className="textmar">
                           <TextField type="password"
                                    fullWidth
                                    name="pass"
                                    value={pass}
                                    label="Confirm Password"
                                    placeholder="Confirm Your Password"
                                    onChange={(e) => setPass(e.target.value)} />
                           </div>   
                            </div>
                        )}



                        {step === 2 && (
                            <div>
                                <Typography className="head">Congratulations! Password Changed Sucessfully.</Typography>
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

export default PasswordReset;