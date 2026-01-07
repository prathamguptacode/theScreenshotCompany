import React, { useRef, useState } from 'react';
import mystyle from './Home.module.css';
import { LuKey } from 'react-icons/lu';
import { FaArrowRight } from 'react-icons/fa';
import { BsStars } from 'react-icons/bs';

function Home() {
    const [sign, setSign] = useState(false);
    const key = useRef();

    function handleGen() {
        const length = Math.floor(Math.random() * (12 - 6 + 1)) + 6;
        const characters = 'abcdefghijklm$nopqrstuvwxyz';
        let result = '';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(
                Math.floor(Math.random() * charactersLength)
            );
        }
        key.current.value = result;
    }

    return (
        <div>
            <div className={mystyle.titleparent}>
                <div className={mystyle.logobox}>
                    <LuKey color="#0079CE" size={36} />
                </div>
                <div className={mystyle.logoTitle}>Keyless Cloud</div>
                <div className={mystyle.logoContent}>
                    Access your files anywhere with just a key. No sign-up
                    required.
                </div>
            </div>

            <div className={mystyle.formdata}>
                <div className={mystyle.message}>Enter Your Access Key</div>
                <input
                    type="text"
                    placeholder="paste-your-key-here"
                    className={mystyle.keyInput}
                    ref={key}
                />
                <div className={mystyle.btnbox}>
                    <button className={mystyle.accessBtn}>
                        Access Storage
                        <FaArrowRight size={12} className={mystyle.btnarrow} />
                    </button>
                </div>
                <div className={mystyle.linebox}>
                    <div className={mystyle.line}></div>
                    <div className={mystyle.orcan}>OR</div>
                    <div className={mystyle.line}></div>
                </div>
                <div className={mystyle.genbtnbox} onClick={handleGen}>
                    <button className={mystyle.genbtn}>
                        <BsStars className={mystyle.aistars} />
                        Generate Random key
                    </button>
                </div>
                <div className={mystyle.signcan}>
                    <input
                        type="checkbox"
                        onChange={(e) => setSign(e.currentTarget.checked)}
                        style={{ cursor: 'pointer' }}
                    />
                    keep you signed-in on this device
                </div>
                <div className={mystyle.mainMessage}>
                    Save your key securely. You'll need it to access your files
                    from any device.
                </div>
            </div>
        </div>
    );
}

export default Home;
