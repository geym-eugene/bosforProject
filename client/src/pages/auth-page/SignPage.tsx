import SignInForm from "@/features/auth/signin/ui/SignInForm";
import SignUpForm from "@/features/auth/signup/ui/SignUpForm";
import React, { useState } from "react";

function SignPage() {
  const [logReg, setLogReg] = useState(true);
  const logRegHandler = () => setLogReg((prev) => !prev);
  return <>{logReg ? <SignUpForm logReg={logReg} logRegHandler = {logRegHandler}/> : <SignInForm logReg={logReg}  logRegHandler = {logRegHandler}/>}</>;
}

export default SignPage;
