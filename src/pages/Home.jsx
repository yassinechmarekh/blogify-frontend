import React from 'react';
// Components
import Categories from '@/components/Sections/Home/Categories';
import Hero from '@/components/Sections/Home/Hero';
import Main from '@/components/Sections/Home/main';

function Home() {
  return (
    <>
      <Hero/>
      <Categories/>
      <Main/>
    </>
  )
}

export default Home;