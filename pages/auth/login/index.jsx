import React, { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useFormik } from 'formik';
import { MdLogin } from 'react-icons/md';

import { AuthContext } from 'context/AuthContext';
import Input from '@/components/atoms/Input';
import AuthLayout from '@/components/templates/AuthLayout';
import AuthButton from '@/components/atoms/AuthButton';

const validate = (values) => {
  const errors = {};

  if (!values.password) {
    errors.password = 'Wajib diisi';
  } else if (!values.account) {
    errors.account = 'Wajib diisi';
  }

  return errors;
};

const Login = () => {
  const { userLogin, loginStatus } = useContext(AuthContext);

  const formik = useFormik({
    initialValues: {
      account: '',
      password: '',
    },
    validate,
    onSubmit: (values) => {
      let temp = { password: values.password };
      if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.account)) {
        temp = { ...temp, email: values.account };
      } else if (isNaN(values.account)) {
        temp = { ...temp, username: values.account };
      } else {
        temp = { ...temp, handphone: values.account };
      }
      userLogin(temp);
      console.log('halo');
    },
  });
  return (
    <AuthLayout formImage login={true} formLabel='Masuk'>
      <div className='flex items-center flex-col mb-2'>
        <p>
          Belum punya akun ?{' '}
          <Link href='/register'>
            <a className='text-blue-400'>Daftar</a>
          </Link>
        </p>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <Input
          id='account'
          name='account'
          type='text'
          label='Username/Email/No. Handphone'
          handleChange={formik.handleChange}
          value={formik.values.account}
          placeholder='Username/Email/No. Handphone'
          errors={formik.errors.account}
        />
        <Input
          id='password'
          name='password'
          type='password'
          label='Password'
          handleChange={formik.handleChange}
          value={formik.values.password}
          placeholder='Masukkan password'
          errors={formik.errors.password}
        />
        <div className='flex justify-between items-center'>
          <div className='py-4'>
            <label className='inline-flex items-center'>
              <input
                className='text-indigo-500 w-6 h-6 mr-2 focus:ring-indigo-400 focus:ring-opacity-25 border border-gray-300 rounded'
                type='checkbox'
              />
              Ingat saya
            </label>
          </div>
          <p>
            <Link href='/forgot-password'>
              <a className='text-blue-400'>Lupa Password ?</a>
            </Link>
          </p>
        </div>
        <div className='items-center mt-4'>
          <AuthButton icon={<MdLogin />}>Masuk</AuthButton>
          {/* <p className="pt-4 ">
            Belum punya akun ?{" "}
            <Link href="/register">
              <a className="text-green-400">Daftar</a>
            </Link>
          </p> */}
        </div>
      </form>
    </AuthLayout>
  );
};

export default Login;
