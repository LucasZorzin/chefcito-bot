import Link from 'next/link';
import Head from "next/head";

export default function Custom404() {
  return (
    <>
      <Head>
        <title>Página no encontrada - Chefcito Bot</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <div className="container-404">
        <div className="carousel-featured">
          <h4 className="text-center">Error 404</h4>
          <h4 className="text-center mb-2 mb-sm-5 bold">No se ha podido encontrar esa página.</h4>
          <div className="sheep-container">
            <div className="sheep">
              <span className="top">
                <div className="body"></div>
                <div className="head">
                  <div className="eye one"></div>
                  <div className="eye two"></div>
                  <div className="ear one"></div>
                  <div className="ear two"></div>
                </div>
              </span>
              <div className="legs">
                <div className="leg"></div>
                <div className="leg"></div>
                <div className="leg"></div>
                <div className="leg"></div>
              </div>
            </div>
          </div>
          <br />
          <a href='/'>
            <button className="col-12 mt-5 btn btn-info">
              Ir a página de inicio
            </button>
          </a>
        </div>
      </div>
    </>
  );
}