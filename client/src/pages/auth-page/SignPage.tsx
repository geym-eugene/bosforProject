import SignInForm from "@/features/auth/signin/ui/SignInForm";
import SignUpForm from "@/features/auth/signup/ui/SignUpForm";
import React, { useState } from "react";

function SignPage() {
  const [logReg, setLogReg] = useState(false);
  const logRegHandler = () => setLogReg((prev) => !prev);
  return <>{logReg ? <SignUpForm logRegHandler = {logRegHandler}/> : <SignInForm logRegHandler = {logRegHandler}/>}</>;
}

export default SignPage;
