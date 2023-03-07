import React, { useState } from 'react';
import Router from "next/router";
import { useTypeStore } from '@/store/messages';
import { useMessageStore } from '@/store/messages';

const Menu = ({ chatPath }) => {
    const [menu, setMenu] = useState(false);
    const sendType = useTypeStore((state) => state.sendType)
    const [generate, setGenerate] = useState(false);
    const reset = useMessageStore((state) => state.reset);

    return (
        <>
            {/* Menu */}
            <div onClick={() => {
                setMenu(trueM => !trueM); setTimeout(() => {
                    document.getElementById('navbar')?.classList.add('zoom-in');
                }, 10)
            }} className={chatPath === true ? 'menu menu--chatPath' : 'menu'}>
                <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                    width="50px" height="50px" viewBox="0 0 512.000000 512.000000"
                    preserveAspectRatio="xMidYMid meet">
                    <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="#06b0f8" stroke="none">
                        <path d="M765 4033 c-164 -86 -166 -300 -3 -384 36 -18 85 -19 1795 -19 1690
                            0 1760 1 1798 19 164 76 166 298 3 382 -36 18 -85 19 -1800 19 -1586 -1 -1766
                            -2 -1793 -17z"/>
                        <path d="M765 2753 c-164 -86 -166 -300 -3 -384 36 -18 74 -19 1155 -19 1067
                            0 1120 1 1158 19 164 76 166 298 3 382 -36 18 -74 19 -1160 19 -1003 -1 -1126
                            -2 -1153 -17z"/>
                        <path d="M765 1474 c-164 -88 -166 -301 -2 -385 36 -19 61 -19 635 -17 l598 3
                            37 25 c21 14 50 43 65 64 24 35 27 49 27 116 0 67 -3 81 -27 116 -15 21 -44
                            50 -65 64 l-37 25 -600 2 c-533 2 -604 1 -631 -13z"/>
                    </g>
                </svg>
            </div>
            {
                menu === true &&
                <nav id="navbar">
                    <svg className="close-btn-nav" onClick={() => {
                        document.getElementById('navbar').classList.add('zoom-out');
                        setTimeout(() => {
                            setMenu(false);
                            setGenerate(false);
                        }, 500)
                    }} xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='#06b0f8'>
                        <path d='M.293.293a1 1 0 011.414 0L8 6.586 14.293.293a1 1 0 111.414 1.414L9.414 8l6.293 6.293a1 1 0 01-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 01-1.414-1.414L6.586 8 .293 1.707a1 1 0 010-1.414z' />
                    </svg>

                    <ul className="nav">
                        <li>
                            <a href='/'>Inicio</a>
                        </li>
                        <li>
                            <span onClick={() => setGenerate(trueV => !trueV)} style={{ cursor: 'pointer' }}>
                                Generar Recetas
                                {generate === false ?
                                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" className="ms-2 bi bi-caret-down-fill" viewBox="0 0 16 16">
                                        <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                                    </svg>
                                    :
                                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" className="ms-2 bi bi-caret-up-fill" viewBox="0 0 16 16">
                                        <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
                                    </svg>
                                }
                            </span>
                            {generate === true && chatPath === false ?
                                <div className="generate">
                                    <span className='generate__span d-block mt-4' onClick={() => { setMenu(false); setGenerate(false); setTimeout(() => { Router.push('/chat?ingredientes') }, 100); }} >📝 Recetas según ingredientes</span>
                                    <span className='generate__span d-block mt-3' onClick={() => { setMenu(false); setGenerate(false); setTimeout(() => { Router.push('/chat?recetas') }, 100); }} >🍽️ Consultar cualquier receta</span>
                                </div>
                                : generate === true && chatPath === true &&
                                <div className="generate">
                                    <a className='generate__span d-block mt-4' href='/chat?ingredientes' onClick={() => { setMenu(false); setGenerate(false); }} >📝 Recetas según ingredientes</a>
                                    <a className='generate__span d-block mt-3' href='/chat?recetas' onClick={() => { setMenu(false); setGenerate(false); }} >🍽️ Consultar cualquier receta</a>
                                </div>
                            }
                        </li>
                    </ul>
                </nav>

            }
        </>
    )
}
export default Menu;