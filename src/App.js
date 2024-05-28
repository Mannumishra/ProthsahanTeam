import logo from './logo.svg';
import './App.css';
import toast, { Toaster } from 'react-hot-toast';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './Components/navbar/Navbar';
import Banare from './Components/Banare/Banare';
import CreateBanare from './Components/Banare/CreateBanare';
import UpdateBanare from './Components/Banare/UpdateBanare';
import Home from './Components/Home/Home';
import Footer from './Components/Footer/Footer';
import BestSeller from './Components/BestSeller/BestSeller';
import BestSellerCreate from './Components/BestSeller/BestSellerCreate';
import UpdateBestSeller from './Components/BestSeller/UpdateBestSeller';
import Testimonial from './Components/Testimonial/Testimonial';
import CreateTestimonial from './Components/Testimonial/CreateTestimonial';
import UpdateTestimonial from './Components/Testimonial/UpdateTestimonial';
import Contact from './Components/Contact/Contact';
import Marque from './Components/Marque/Marque';
import CreateMarque from './Components/Marque/CreateMarque';
import UpdateMarque from './Components/Marque/UpdateMarque';
import Newsletter from './Components/Newsletter/Newsletter';
import Product from './Components/Product/Product';
// import CreateProduct from './Components/Product/CreateProduct';
import UpdateProduct from './Components/Product/UpdateProduct';
import Checkout from './Components/Checkout/Checkout';
import UpdateCheckout from './Components/Checkout/UpdateCheckout';
import Category from './Components/Category/Category';
import CreateCategory from './Components/Category/CreateCategory';
import UpdateCategory from './Components/Category/UpdateCategory';
import Login from './Components/Login/Login';


function App() {
  const logincheck = sessionStorage.getItem("login")
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/home' element={<Home />} />
          <Route path='/view-registration' element={<Banare />} />
          <Route path='/view-enquiry' element={<CreateBanare />} />
          <Route path='/updatebanare/:_id' element={<UpdateBanare />} />

          <Route path='/marquee' element={<Marque />} />
          <Route path='/createmarquee' element={<CreateMarque />} />
          <Route path='/updatemarquee/:_id' element={<UpdateMarque />} />

          <Route path='/bestseller' element={<BestSeller />} />
          <Route path='/createbestseller' element={<BestSellerCreate />} />
          <Route path='/updatebestseller/:_id' element={<UpdateBestSeller />} />

          <Route path='/testimonial' element={<Testimonial />} />
          <Route path='/createtestimonial' element={<CreateTestimonial />} />
          <Route path='/updatetestimonial/:_id' element={<UpdateTestimonial />} />

          <Route path='/newsletter' element={<Newsletter />} />

          <Route path='/contact' element={<Contact />} />

          <Route path='/product' element={<Product />} />
          {/* <Route path='/createproduct' element={<CreateProduct />} /> */}
          <Route path='/updateproduct/:_id' element={<UpdateProduct />} />

          <Route path='/upload-news-events' element={<Checkout />} />
          <Route path='/updatecheckout/:_id' element={<UpdateCheckout />} />

          <Route path='/category' element ={<Category />} />
          <Route path='/createcategory' element={<CreateCategory />} />
          <Route path='/updatecategory/:_id' element={<UpdateCategory />} />

          <Route path='/' element={<Login />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      <Footer />
      </BrowserRouter>
      <Toaster />
    </>
  );
}

export default App;
