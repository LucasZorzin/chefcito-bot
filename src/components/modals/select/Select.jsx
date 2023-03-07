import React, { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import { useTypeStore } from "@/store/messages";
import Router from "next/router";

const Select = (props) => {
    const sendType = useTypeStore((state) => state.sendType);
    const type = useTypeStore((state) => state.type)
    const [generate, setGenerate] = useState(false);

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter" />
            </Modal.Header>
            <Modal.Body>

                <section className="smartphone mt-3">
                    <div className="smartphone__header">
                        <img src="/img/chefcito-profile.webp" alt="chefcito imagen de perfil"/>
                        <h3>Chefcito</h3>
                    </div>
                    <div className="chat">
                        <div className="chat-history">
                            <ul className="m-b-0">
                                <li className="clearfix clearfix--delay">
                                    <div className="message-data">
                                        <img src="/img/chefcito-profile.webp" alt="avatar" />
                                        <span className="message-data-time">Chefcito</span>
                                    </div>
                                    <div className="message my-message">
                                        ¡Hola! Selecciona cuál opción quieres utilizar para que pueda ayudarte:
                                        <br />
                                        <span className="mt-2 p-0 message__span" onClick={() => { sendType({ type: 'ingredients' }); setGenerate(true); setTimeout(() => { Router.push('/chat?ingredientes') }, 3700); }} >📝 Recetas según ingredientes</span>
                                        <br />
                                        <span className="mt-1 p-0 message__span" onClick={() => { sendType({ type: 'chat' }); setGenerate(true); setTimeout(() => { Router.push('/chat?recetas') }, 3700); }} >🍽️ Consultar cualquier receta</span>
                                    </div>
                                </li>
                                {
                                    generate === true ?
                                        <>
                                            <li className="clearfix clearfix--delay">
                                                <div className="message-data text-right">
                                                    <span className="message-data-time">Yo</span>
                                                    <img style={{ filter: 'grayscale(1)' }} src="/img/profile-me.webp" alt="avatar" />
                                                </div>
                                                <div className="message other-message float-right">
                                                    {type?.type === 'ingredients' ?
                                                        <div style={{ marginLeft: '0' }} className="generate">
                                                            <span className="p-0">📝 Recetas según ingredientes</span>
                                                        </div>
                                                        :
                                                        <div style={{ marginLeft: '0' }} className="generate">
                                                            <span className="p-0">🍽️ Consultar cualquier receta</span>
                                                        </div>
                                                    }
                                                </div>
                                            </li>

                                            <li className="clearfix clearfix--delay-last">
                                                <div className="message-data">
                                                    <img src="/img/chefcito-profile.webp" alt="avatar" />
                                                    <span className="message-data-time">Chefcito</span>
                                                </div>
                                                <div className="message my-message">
                                                    ¡Entendido! Te redirigiré al chat para poder ayudarte😊
                                                </div>
                                            </li>
                                        </>
                                        :
                                        null
                                }

                            </ul>
                        </div>
                    </div>

                </section>

            </Modal.Body>
        </Modal>
    );
};

export default Select;
