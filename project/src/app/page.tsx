import React from 'react'
import Navbar from '../../components/admin/Navbar'
import Header from "../../components/user/Header";
import Footer from '../../components/user/Footer';

export default function page() {
  return (
    <div>
      <Header></Header>
      <Navbar></Navbar>
      <Footer></Footer>
    </div>
  )
}
