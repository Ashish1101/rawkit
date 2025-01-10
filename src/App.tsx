import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Products from './components/Products';
import Steps from './components/Steps';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import Admin from './components/Admin';


function App() {
  // Simple check for admin route
  const isAdmin = window.location.pathname === '/admin';

  if (isAdmin) {
    return <Admin />;
  }

  return (
    <div className="min-h-screen bg-sb-dark">
      <Header />
      <main>
        <Hero />
        <Products />
        <Steps />
        <Testimonials />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

export default App;