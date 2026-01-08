import React, { useEffect, useRef, useState } from 'react';
import mystyle from './Home.module.css';
import { LuKey } from 'react-icons/lu';
import { FaArrowRight } from 'react-icons/fa';
import { BsStars } from 'react-icons/bs';
import { toast } from 'sonner';
import api from '../api/axios.jsx';
import { MdError } from "react-icons/md";

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

    async function handleClick() {
        const val = key.current.value;
        if (!key.current.value) {
            toast.error('Missing key 🔑', {
                description: 'We couldn’t proceed without an access key.',
                // icon: <MdError color='red' size={100} />
            });
            key.current.classList.add(mystyle.inputError);
            key.current.classList.add(mystyle.shake);
        } else {
            key.current.classList.remove(mystyle.inputError);
            key.current.classList.remove(mystyle.shake);

            const body = {
                key: val,
                signCan: sign,
            };
            const res = await api.post('/user', body);
            console.log(res);
        }
    }

    useEffect(() => {
        console.clear();
        console.log(
            '%cSTOP!',
            `
  color: #ef4444;
  font-size: 32px;
  font-weight: 800;
  `
        );
        console.log(
            '%cIf someone asked you to paste code here, it is probably a scam.\n' +
                'Doing so can give attackers access to your account or data.',
            `
  color: #f8e871ff;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.6;
  `
        );
        console.log(
            '%cIf you understand what you’re doing, carry on.\nOtherwise — close this tab.',
            `
  color: #9ca3af;
  font-size: 14px;
  `
        );

        (async () => {
            const res = await api.get('/');
            const style = 'font-size: 28px; font-weight: 700;';
            console.log(`%c${res.data.message}`, style);
            const stylePg = 'font-size: 20px; font-weight: 500;';
            console.log(
                `%cthis company is made by Pratham Gupta with love`,
                stylePg
            );

            console.log(res);
            const resApi = await api.post('/user');
            console.log(resApi);
        })();
    }, []);

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
                    <button className={mystyle.accessBtn} onClick={handleClick}>
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
