import { Button, Input } from '@material-tailwind/react'
import React from 'react'
import { InformationCircleIcon, EyeIcon, EyeSlashIcon, PhoneIcon } from '@heroicons/react/24/outline';
const LoginForm = ({ password, setPassword, email, setEmail, showPassword, setShowPassword, handleLogin }) => {
  return (
    <div className='bg-primary h-[100vh] flex justify-center items-center  py-8 px-12' >
      <div className='w-[80%] h-[60%] border-[3px] border-[#fff] rounded-lg py-5 px-5 bg-[#fff] text-secondary '>
        <div className='flex justify-center flex-col item-center mb-[10px] w-[100%]'>
          <h1 className='font-[GilroyBold] text-[1.5rem] text-center'>Different Clothing</h1>
          <h3 className='font-[GilroyBold] text-[1.5rem] text-center' >Login using Email and Password</h3>
        </div>
        <div className='my-4' >
          <label className='font-[GilroyBold]' htmlFor="">Email</label>
          <Input value={email} onChange={(e) => setEmail(e.target.value)} label='Email' />
        </div>
        <div className="relative flex w-full flex-col ">
          <label className='font-[GilroyBold]' htmlFor="">Password</label>
          <Input

            label="Password"
            value={password}

            onChange={(e) => { setPassword(e.target.value) }}
            type={showPassword ? "text" : "password"}
            className="pr-20"
            containerProps={{
              className: "min-w-0",
            }}
          />
          <button


            disabled={!password}
            onClick={() => setShowPassword(!showPassword)}
            className="!absolute  right-2 top-9"
          >
            {showPassword ? <EyeIcon className='w-[15px]  text-blue-500' /> : <EyeSlashIcon className='w-[15px] text-blue-500' />}
          </button>

        </div>
        <div>
          <Button onClick={handleLogin} className='w-full mt-4' >Login</Button>
        </div>
      </div>
    </div>
  )
}

export default LoginForm