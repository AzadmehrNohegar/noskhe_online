import { useState } from "react";
import { AuthForgetPassCredentials } from "./partials/credentials";
import { AuthForgetPassVerification } from "./partials/verification";

function AuthForgetPass() {
  const [state, setState] = useState(true);

  return (
    <div className="flex items-center h-lvh relative">
      <div className="absolute left-1/2 -translate-x-1/2 top-4 lg:hidden">
        <img src="/logo.png" width={58} height={58} alt="logo" />
      </div>

      <div className="w-full lg:w-8/12 flex items-center justify-center bg-misc-light-bg h-full p-5">
        {state ? (
          <AuthForgetPassCredentials setNextStep={() => setState(false)} />
        ) : (
          <AuthForgetPassVerification />
        )}
      </div>
      <div className="w-4/12 h-full hidden lg:block gap-6">
        <img
          src="/images/banner-2.png"
          className="w-full h-full rounded-1.5lg"
          alt="login bg"
        />
      </div>
    </div>
  );
}

export default AuthForgetPass;
