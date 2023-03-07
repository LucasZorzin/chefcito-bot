import React, { useRef, useEffect, useState } from 'react';
import Head from 'next/head';
import Router, { useRouter } from 'next/router';
import { Message } from '@/components/Message.jsx';
import { useMessageStore } from '@/store/messages';
import { useTypeStore } from '@/store/messages';
import Link from 'next/link';
import Menu from '@/components/Nav';
import crypto from 'crypto';

export default function Chat() {
    const { asPath } = useRouter();

    const textAreaRef = useRef();

    const sendPrompt = useMessageStore((state) => state.sendPrompt);
    const reset = useMessageStore((state) => state.reset);
    const messages = useMessageStore((state) => state.messages);
    const sendType = useTypeStore((state) => state.sendType)
    const type = useTypeStore((state) => state.type)

    const [ingredients, setIngredients] = useState({});
    const [selectFood, setSelectFood] = useState();
    const [submitCount, setSubmitCount] = useState(0);
    const [generate, setGenerate] = useState(false);
    const [submitCountVolver, setSubmitCountVolver] = useState(false);
    const [typeState, setTypeState] = useState('');

    const handleChange = () => {
        setIngredients(submitCount === 0 && type.type === 'ingredients' ? { ingredients: textAreaRef?.current?.value } : submitCount > 0 && type.type === 'ingredients' ? { ingredients: String(selectFood) } : { ingredients: textAreaRef?.current?.value });
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    }

    // words not allowed:
    const encrypted = '632d3d5db99d0d2b99c55c2e90b4e86a1ff32055806a07d69981db00c7b4ff84de9a7541599dae837d33a0a986fcc834f7466adf3c36fecec15ac4d793051684e5c013d9892ee75932589f8efc2376e732772ad7ddcc65564433dfcfbf6ff5b721ad9e6d85c7b16e5c76e39000e085be0aa1e6431fe6d8ad488b44f9a8a12c6569194aca22f7c49cee8d12a877797217cd1fa5563a166d5d6ec4824575848e096590bff9566b2f4e22c22caf892a597c88bef3545a46e9375b6dc2df31044fe5ffc6f652576639e21d51c846b568a055f40e759c2035e172d00133d7c9c0831a039a241ced2b96cfc44bf3c61b6d4e5b95466c940961797a7391e0305b16b1335a51832cc58bf55303edf8877ca67ac39a560473b53c787c890776a23abdf0536e475dae8271bd4ccf7ac0b5b1dea9aabaf1af56388647f82c5f1c71c9539126c760f4ee98b650361dca43c80d8489da6ed48bc58a87bfc3c5f65c1495ed6596a6b887ca935c76d4116e1270e42c58aa8e61172d7337d7dbb2d69e06f9b7fa2be45a5c0e855942071f3bc28002c60aaea6321ddf36ffe03c76b60585f6610e956efe53358f9ec77183cc996e875095b73c00c5d1c9843e587ade6f737c98884d869649bf2e7fe1716da1ce0aa1433e367655a6e68621df6be873cc9743166a9b1bc459a62dddd224ff14a27082fd2a4830113d95f3ca30040a88646393ad41a088771cf3fb4d35af238e4e2f5b61a21961762c2cd3aa214a58722d9e3bbbbee149730da595e66a1c6d4a83cd2b0960265f492fcd128f1b1b47d7057a391d1c7199d1ad9b42b1022703b80da1baba1877eea660829d29467a652e78d8217a7f734927fb8e22d3ba062676756550b780e60db3df10ec7d6aeb73c7a33e212419badb8d5610307a0ec766ec33d7d48eb9f2c0e9cb43efb8f5168b6ae033e998070cc87d2832f7688a2e894c8eb459118c432ba64a213665232ae986e58ccf8d3153ad7fc9c57c0f9d8d7c156d8784049debdf391237e800363553795264beb40b8a';
    const decipher = crypto.createDecipher('aes-256-cbc', 'chefcito_palabras_no_permitidas');
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    const palabrasNoPermitidas = JSON.parse(decrypted);

    const handleSubmit = (e) => {
        e?.preventDefault();
        const expReg = new RegExp(palabrasNoPermitidas.join("|"), "i");
        const contienePalabraNoPermitida = expReg.test(ingredients?.ingredients);
        if (contienePalabraNoPermitida) {
            alert("Contiene una palabra no permitida.");
        } else {
            setSubmitCount(submitCount + 1);
            if (submitCount === 0 && type.type === 'ingredients') {
                textAreaRef.current.value = '';
            }
            else if (submitCount >= 0 && type.type === 'chat') {
                textAreaRef.current.value = '';
            }
            sendPrompt({ prompt: [{ ingredients, qty: submitCount === 0 ? 0 : submitCount, type: type.type !== undefined ? type.type : 'chat' }] });
        }
    }

    useEffect(() => {
        typeof window !== "undefined" ? document.getElementsByTagName('body')[0].style.background = "#f5f5f5" : null;
        switch (asPath?.split("?")[1]) {
            case 'ingredientes':
                sendType({ type: 'ingredients' });
                break;
            case 'recetas':
                sendType({ type: 'chat' });
                break;
            default:
                break;
        }
        if (messages.length === 0) {
            setIngredients({});
            setSelectFood(undefined);
            setSubmitCount(0);
            setGenerate(false);
            setSubmitCountVolver(false);
            setTypeState('');
        }
    }, [messages, asPath]);

    return (
        <>
            <Head>
                <title>Chefcito Bot - Recetas de Comidas con Inteligencia Artificial</title>
                <meta name="description" content="Chefcito Bot es una aplicación que integra inteligencia artificial para obtener recetas según ingredientes ingresados. ¡Rápido, fácil y 100% gratis! ¡Descubre la próxima receta para tu comida con Chefcito Bot!" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="keywords" content="Chefcito, bot, inteligencia artificial, recetas, comidas, ingredientes, OpenAI, chatgpt" />
                <link rel="icon" href="/favicon.png" />
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
            </Head>
            <a className='back' href='/'>
                <svg className='me-2' width="6" height="10" viewBox="0 0 6 10" fill="white" xmlns="http://www.w3.org/2000/svg"><path d="M0.226826 4.13752L4.28564 0.214945C4.48139 0.025762 4.79343 0.0310873 4.98259 0.226839L5.4401 0.700232C5.62896 0.89565 5.62401 1.20706 5.42904 1.39638L2.2121 4.51999L5.32058 7.75154C5.50898 7.9474 5.50329 8.2588 5.30788 8.44766L4.83448 8.90516C4.63873 9.09434 4.32669 9.08902 4.13753 8.89327L0.214931 4.8345C0.0257689 4.63874 0.0310943 4.32671 0.226826 4.13752Z"></path></svg>
                VOLVER
            </a>

            <Menu chatPath={true} />

            {type?.type !== undefined ?
                <section>
                    <div style={submitCount >= 1 ? { marginBottom: '250px' } : null} className="smartphone smartphone--chat">
                        <div className="smartphone__header">
                            <img src="/img/chefcito-profile.webp" />
                            <h3 onClick={() => console.log(ingredients.ingredients)}>Chefcito</h3>
                        </div>
                        <div className="chat chat--chat">
                            <div className="chat-history">
                                <ul className="m-b-0">
                                    <li className="clearfix clearfix--delay">
                                        <div className="message-data">
                                            <img src="/img/chefcito-profile.webp" alt="avatar" />
                                            <span className="message-data-time">Chefcito</span>
                                        </div>
                                        <div className="message my-message">
                                            {type?.type === 'chat' ? "¡Hola! Dime que comida o bebida deseas realizar e intentaré darte una muy rica receta😉" : "¡Hola! Dime que ingredientes quieres utilizar y te daré 6 ideas de comidas que puedes realizar. Si te gusta alguna idea te daré la receta😉"}
                                        </div>
                                    </li>
                                    {messages.map((entry) => (
                                        <Message key={entry.id} count={submitCount} {...entry} />
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {type.type !== undefined &&
                            <form onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
                                {type.type === 'ingredients' ?
                                    <div className={submitCount === 0 ? 'send-chat d-flex' : 'send-chat d-inline'}>
                                        {
                                            submitCount === 0 ?
                                                <textarea
                                                    style={{ width: '100%' }}
                                                    onChange={handleChange}
                                                    ref={textAreaRef}
                                                    rows={1}
                                                    tabIndex={0}
                                                    autoFocus
                                                    placeholder={submitCount === 0 ? 'Ej: Pollo y queso' : ''}
                                                    defaultValue=''
                                                />
                                                :
                                                (submitCount === 1 || submitCountVolver === true) && messages[1]?.message?.length > 0 ?
                                                    <>
                                                        <div className='select-food-chat'>
                                                            <select style={selectFood !== undefined ? { display: 'none' } : { display: 'initial' }} disabled={selectFood !== undefined ? true : false} onChange={(e) => { e?.preventDefault(); if (e.target.value !== 0) { setSelectFood(e.target.value); setSubmitCount(submitCount + 1); setSubmitCountVolver(false); setIngredients({ ingredients: String(e.target.value) }); sendPrompt({ prompt: [{ ingredients: { ingredients: String(e.target.value) }, qty: submitCount === 0 ? 0 : submitCount, type: type.type !== undefined ? type.type : 'chat' }] }) } }}>
                                                                <option className='disabled' style={{ opacity: '0.5' }} value={0}>Seleccionar idea de receta</option>
                                                                <option value={1}>Receta n° 1</option>
                                                                <option value={2}>Receta n° 2</option>
                                                                <option value={3}>Receta n° 3</option>
                                                                <option value={4}>Receta n° 4</option>
                                                                <option value={5}>Receta n° 5</option>
                                                                <option value={6}>Receta n° 6</option>
                                                            </select>

                                                            {submitCount === 1 &&
                                                                <button className='mt-4' type='button' onClick={() => {
                                                                    setSubmitCount(0); setSubmitCountVolver(true);
                                                                    reset()
                                                                }}>Ingresar otros ingredientes</button>}

                                                        </div>
                                                    </>
                                                    :
                                                    null
                                        }
                                        {submitCount === 0 ?
                                            <button disabled={textAreaRef?.current?.value === '' ? true : false} type='submit'>
                                                <img src='/img/send.webp' alt='enviar' />
                                            </button>
                                            :
                                            submitCount >= 1 && messages[1]?.message?.length > 0 && selectFood !== undefined && messages[3]?.message?.length > 0
                                                ?
                                                <>
                                                    <button className='btn-chat mt-4' onClick={() => { setSelectFood(undefined); setSubmitCount(1); setSubmitCountVolver(false) }}>Ver otra de las recetas mencionadas</button>
                                                    <button className='btn-chat mt-4' onClick={() => { setSubmitCount(0); setSubmitCountVolver(false); setSelectFood(undefined); reset(); }} type='button'>Ingresar otros ingredientes</button>
                                                </>
                                                :
                                                null}
                                    </div>
                                    : type.type === 'chat' &&
                                    <div className='send-chat d-inline'>
                                        {
                                            submitCount > 0 && messages[1]?.message?.length > 0
                                                ?
                                                <>
                                                    <div className='d-flex'>
                                                        <textarea
                                                            style={submitCount === 0 ? { width: '100%' } : { width: '100%' }}
                                                            onChange={handleChange}
                                                            ref={textAreaRef}
                                                            rows={1}
                                                            autoFocus
                                                            tabIndex={0}
                                                            placeholder={submitCount === 0 ? 'Ej: Quiero la receta de un flan casero' : '¿Tienes una duda? Pregúntale'}
                                                            defaultValue=''
                                                        />
                                                        <button disabled={textAreaRef?.current?.value === '' ? true : false} type='submit'>
                                                            <img src='/img/send.webp' alt='enviar' />
                                                        </button>
                                                    </div>

                                                    <button className='other-food mt-4' onClick={() => { setSubmitCount(0); setSubmitCountVolver(false); setSelectFood(undefined); reset(); }} type='button'>Consultar la receta de otra comida</button>
                                                </>

                                                :
                                                submitCount === 0 &&
                                                <div className='d-flex'>
                                                    <textarea
                                                        style={submitCount === 0 ? { width: '100%' } : { width: '30%' }}
                                                        onChange={handleChange}
                                                        ref={textAreaRef}
                                                        rows={1}
                                                        autoFocus
                                                        tabIndex={0}
                                                        placeholder={submitCount === 0 ? 'Ej: Quiero la receta de un flan' : '¿Tienes una duda acerca de la receta? Pregúntale'}
                                                        defaultValue=''
                                                    />
                                                    <button disabled={textAreaRef?.current?.value === '' ? true : false} type='submit'>
                                                        <img src='/img/send.webp' alt='enviar' />
                                                    </button>
                                                </div>
                                        }

                                    </div>
                                }
                            </form>
                        }
                    </div>
                </section>
                :
                <>
                    {/* Seleccionar el tipo de chat */}
                    <section style={type.type !== undefined ? { marginBottom: '150px' } : { marginBottom: '0 !important' }} className="smartphone smartphone--chat">
                        <div className="smartphone__header">
                            <img src="/img/chefcito-profile.webp" />
                            <h3>Chefcito</h3>
                        </div>
                        <div className="chat chat--chat">
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
                                            <span className="mt-2 p-0 message__span" onClick={() => { setTypeState('ingredients'); setGenerate(true); setTimeout(() => { Router.push('/chat?ingredientes') }, 3700); }} >📝 Recetas según ingredientes</span>
                                            <br />
                                            <span className="mt-1 p-0 message__span" onClick={() => { setTypeState('chat'); setGenerate(true); setTimeout(() => { Router.push('/chat?recetas') }, 3700); }} >🍽️ Consultar cualquier receta</span>
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
                                                        {typeState === 'ingredients' ?
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
                                                        ¡Entendido! Te redirigiré a un nuevo chat para poder ayudarte😊
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
                </>
            }
        </>
    )
}