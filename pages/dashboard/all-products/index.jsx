import React, { Fragment, useEffect, useContext, useState } from 'react';
import Cookies from 'js-cookie';

import AddProducts from '@/components/organisms/AddProducts';
import DashboardLayout from '@/components/templates/DashboardLayout';

import { AuthContext } from 'context/AuthContext';
import { ProductContext } from '@/context/ProductContext';
import AllProducts from '@/components/organisms/AllProducts';
import callAPI from '@/config/api';
import toast from 'react-hot-toast';

const AllProductPage = ({ data }) => {
  const { addProduct } = useContext(ProductContext);
  const { userLogout, setLoginStatus } = useContext(AuthContext);

  const handleLogout = () => {
    toast.promise(userLogout(), {
      loading: 'Mohon tunggu...',
      success: 'Berhasil Logout !',
      error: <b>Mohon maaf, telah terjadi kesalahan. Mohon coba lagi.</b>,
    });
    setLoginStatus(false);
  };
  return (
    <DashboardLayout handleLogout={handleLogout}>
      <AllProducts data={data} />
    </DashboardLayout>
  );
};

export const getServerSideProps = async (context) => {
  const req = context.req;
  const token = req.headers.cookie
    .split(';')
    .find((c) => c.trim().startsWith('token='))
    .split('=')[1];
  const { data } = await callAPI({
    path: '/api/store',
    method: 'GET',
    token,
  });

  return {
    props: {
      data: data,
    },
  };
};

export default AllProductPage;
