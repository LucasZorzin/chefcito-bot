import { TypingEffect } from '@/components/TypingEffect.jsx';

export function Message({ ia, message }) {
    const text = message.ingredients === undefined ? message : message.ingredients;
    const textElement = ia ? <TypingEffect text={text} /> : text

    return (
        <>
            {
                ia ?
                    <li className="clearfix clearfix--delay-last">
                        <div className="message-data">
                            <img src="/img/chefcito-profile.webp" alt="avatar" />
                            <span className="message-data-time">Chefcito</span>
                        </div>
                        <div className="message my-message message--chat">
                            {textElement}
                        </div>
                    </li>
                    :
                    <li className="clearfix clearfix--delay">
                        <div className="message-data text-right">
                            <span className="message-data-time">Yo</span>
                            <img style={{ filter: 'grayscale(1)' }} src="/img/profile-me.webp" alt="avatar" />
                        </div>
                        <div className="message other-message float-right">
                            <div style={{ marginLeft: '0' }} className="generate">
                                <span className="p-0">{textElement}</span>
                            </div>
                        </div>
                    </li>
            }
        </>
        // <div>
        //     <article className='flex gap-4 p-6 m-auto max-w-3xl'>
        //         <h3>{ia ? 'IA' : 'YO'}</h3>

        //         <div className='min-h-[20px] flex flex-1 flex-col items-start gap-4 whitespace-pre-wrap'>
        //             <div className='prose-invert w-full break-words'>
        //                 <p>{textElement}</p>
        //             </div>
        //         </div>
        //     </article>
        // </div>
    )
}