'use client';
import axios from 'axios';
import {AiFillGithub} from 'react-icons/ai'
import {FcGoogle} from 'react-icons/fc'
import {toast} from 'react-hot-toast'
import { useCallback, useState } from 'react';

import {
    FieldValues,
    SubmitHandler,
    useForm
} from 'react-hook-form'
import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/Input';
import Button from '../Button';
import { signIn } from 'next-auth/react';
const RegisterModal = () => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isLoading, setIsLoading] = useState(false);
    const {
        register,
        handleSubmit,
        formState : {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues : {
            name : '',
            email : '',
            passworld : ''
        }
    });
    const onSubmit : SubmitHandler<FieldValues> = (data) =>  {
        setIsLoading(true);
        axios.post('/api/register', data)
        .then(()=>{
            registerModal.onClose();
            loginModal.onOpen();
        })
        .catch((error)=>{
            toast.error('Something went wrong')
        })
        .finally(()=>{
            setIsLoading(false);
        })
    }

    const toggle = useCallback(()=>{
        registerModal.onClose();
        loginModal.onOpen();
    },[loginModal, registerModal]);

    const bodyContent = (
         <div className='flex flex-col gap-4'>
            <Heading 
                title="Welcome to Airbnb"
                subtitle="Create an account!"
            />
            <Input
                id="email"
                label="Email"
                register={register}
                errors={errors}
                required
            />
            <Input
                id="name"
                label="Name"
                register={register}
                errors={errors}
                required
            />
            <Input
                id="password"
                label="Password"
                type="password"
                register={register}
                errors={errors}
                required
            />
         </div>
    )

    const footerContent = (
        <div className='flex flex-col gap-4 mt-3'>
            <hr />
            <Button
                outline
                label="Continue with Google"
                icon={FcGoogle}
                onClick={()=>{}}
            />
            <Button
                outline
                label="Continue with Github"
                icon={AiFillGithub}
                onClick={()=>{}}
            />
            <div className='
                text-neutral-500
                text-center
                mt-4
                font-light
            '>
                <div className='
                    flex
                    flex-row
                    items-center
                    justify-center
                    gap-2
                '>
                    <span>Already have an account?</span>
                    <span
                        onClick={toggle}
                        className='
                            text-neutral-800
                            cursor-pointer
                            hover:underline
                    '>Log in</span>
                </div>
            </div>
        </div>
    )
    return ( 
        <Modal
            disabled={isLoading}
            isOpen={registerModal.isOpen}
            title="Register"
            actionLabel='Continue'
            onClose={registerModal.onClose }
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
     );
}
 
export default RegisterModal;