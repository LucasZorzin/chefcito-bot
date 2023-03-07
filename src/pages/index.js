import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Select from '../components/modals/select/Select.jsx';
import Loader from '@/components/Loader.jsx';
import Typed from 'react-typed';
import Menu from '@/components/Nav.jsx';
import Footer from '@/components/Footer.jsx';

export default function Home() {
  const [modalSelect, setModalSelect] = useState(false);
  const { asPath } = useRouter();


  useEffect(() => {
    console.error = () => { }; console.warn = () => { }; setTimeout(() => { console.clear(); }, 700);
    if (typeof window !== "undefined" && asPath == '/') {
      const body = document.getElementsByTagName('body')[0];
      body.style.background = "linear-gradient(to bottom, rgb(250, 254, 255), rgb(175, 241, 253))";
    }
  }, []);

  return (
    <>
      <Head>
        <title>Chefcito Bot - Recetas de Comidas con Inteligencia Artificial</title>
        <meta name="description" content="Chefcito Bot es una aplicación que integra inteligencia artificial para obtener recetas según ingredientes ingresados. ¡Rápido, fácil y 100% gratis! ¡Descubre la próxima receta para tu comida con Chefcito Bot!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content="Chefcito, bot, inteligencia artificial, recetas, comidas, ingredientes, OpenAI, chatgpt" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <Loader />

      {/* Background */}
      <canvas className="orb-canvas"></canvas>

      <Menu chatPath={false} />

      {/* Container */}
      <div className='container-center mt-3 mt-lg-0'>
        <div className="container-home row">
          <div className="container-home__data col-12 col-lg-7">
            <h1 className="container-home__data-title text-gradient">CHEFCITO BOT</h1>
            <p className="container-home__data-description">
              Genera recetas de comidas con
              <strong>Inteligencia Artificial</strong>.
              <br />
              Sólo dile a Chefcito los ingredientes que tienes y este hará el trabajo por ti.
              <br />
              Rápido, intuitivo y 100% gratis.
            </p>

            <div className="container-btn">
              <button onClick={() => setModalSelect(true)} className="container-btn__btn">
                GENERAR RECETAS
              </button>
            </div>

          </div>
          <div className='col-12 col-lg-5 mt-4 container-home__chefcito'>
            <img src={'/img/chefcito.webp'} alt='chefcito logo' />
            <div className='chat-bubble-container'>
              <img src={'/img/chat.webp'} alt='chat bubble' />
              <div className="chat-bubble-typed">
                <Typed
                  strings={['¡Hola! Soy Chefcito y estoy para ayudarte.']}
                  typeSpeed={40}
                  backSpeed={65}
                  startDelay={1000}
                />
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* MODAL */}
      <Select show={modalSelect} onHide={() => setModalSelect(false)} />

      <Footer/>

      <script type="module" src="./js/Background.js"></script>
    </>
  )
}
