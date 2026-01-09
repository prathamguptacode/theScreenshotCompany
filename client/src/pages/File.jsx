import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/userContext';
import { Form, useNavigate } from 'react-router-dom';
import mystyle from './File.module.css';
import { CiLogout } from 'react-icons/ci';
import { LuUpload } from 'react-icons/lu';
import { LuFolderOpen } from 'react-icons/lu';
import { CiFileOn } from 'react-icons/ci';
import { BsDownload } from 'react-icons/bs';
import { RiDeleteBin6Line } from 'react-icons/ri';
import api from '../api/axios';
import { toast } from 'sonner';
import { IoIosLogOut } from 'react-icons/io';
import { MdOutlineLogout } from 'react-icons/md';
import { FiUpload } from 'react-icons/fi';

function File() {
    const userCon = useContext(UserContext);
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [uploadSt, setUploadSt] = useState(0);
    const [uploadFile, setUploadFile] = useState([]);

    useEffect(() => {
        if (userCon.user == 0) {
            navigate('/'); // change this later this not not good
        } else {
            setUser(userCon.user.serverData);
        }
    }, []);

    useEffect(() => {
        setUploadFile([]);
        if (user.docNames) {
            const name = user.docNames;
            const url = user.documents;
            const len = name.length - 1;
            for (let index = len; index >= 0; index--) {
                setUploadFile((prev) => [
                    ...prev,
                    { name: name[index], url: url[index] },
                ]);
            }
        }
    }, [user]);

    console.log(uploadFile);

    async function changefile(e) {
        if (e.target.files) {
            console.log(e.target.files[0]);
            setUploadSt(1);
            const formData = new FormData();
            formData.append('file', e.target.files[0]);
            try {
                const res = await api.post('/upload', formData, {
                    headers: {
                        authorization: `bearer ${user.authToken}`,
                    },
                });
                const info = res.data.info;
                setUploadFile((prev) => [
                    { name: info.docName, url: info.documents },
                    ...prev,
                ]);
                toast.success('Files uploaded successfully', {
                    description: "You'll need your key to access your files.",
                });
            } catch (error) {
                if (error.response.status == 401) {
                    toast.error('Upload interrupted', {
                        description:
                            'Upload didn’t complete.Try again in a moment.',
                    });
                    navigate('/');
                } else {
                    toast.error('something went wrong, please try again later');
                }
            }
            setUploadSt(0);
        }
    }

    async function signout() {
        try {
            const res = api.get('/signout');
            toast.promise(res, {
                loading: 'Please wait a moment.',
                success: 'Logged out successfully',
                error: 'Something went wrong',
            });
            res.then(()=>{
                userCon.setUser(0);
                navigate('/');
            })
        } catch (error) {
            toast.error('Something went wrong');
        }
    }

    function delCard(name) {
        setUploadFile((prev) => prev.filter((e) => name !== e.name));
    }

    function handleDragOver(e) {
        e.preventDefault();
        e.target.classList.toggle(mystyle.onDrag);
    }

    async function handleDrop(e) {
        e.preventDefault();
        if (e.dataTransfer.files) {
            console.log(e.dataTransfer.files[0]);
            setUploadSt(1);
            const formData = new FormData();
            formData.append('file', e.dataTransfer.files[0]);
            try {
                const res = await api.post('/upload', formData, {
                    headers: {
                        authorization: `bearer ${user.authToken}`,
                    },
                });
                const info = res.data.info;
                setUploadFile((prev) => [
                    { name: info.docName, url: info.documents },
                    ...prev,
                ]);
                toast.success('Files uploaded successfully', {
                    description: "You'll need your key to access your files.",
                });
            } catch (error) {
                if (error.response.status == 401) {
                    toast.error('Upload interrupted', {
                        description:
                            'Upload didn’t complete.Try again in a moment.',
                    });
                    navigate('/');
                } else {
                    toast.error('something went wrong, please try again later');
                }
            }
            setUploadSt(0);
        }
    }

    return (
        <div>
            <div className={mystyle.filenav}>
                <div className={mystyle.userCan}>
                    <div className={mystyle.Title}>Your Storage</div>
                    <div className={mystyle.key}>Key: {user.key}</div>
                </div>
                <div className={mystyle.logbox}>
                    <button onClick={signout} className={mystyle.logbtn}>
                        <MdOutlineLogout className={mystyle.logicon} />
                        Logout
                    </button>
                </div>
            </div>

            <div
                className={mystyle.uploadBox}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
            >
                {uploadSt ? (
                    <div className={mystyle.loader}></div>
                ) : (
                    <>
                        <div className={mystyle.uploadicon}>
                            <LuUpload size={32} />
                        </div>
                        <div className={mystyle.uploadtitle}>Upload Files</div>
                        <div className={mystyle.uploadcontent}>
                            Drag and drop files here, or click to browse
                        </div>
                        <div className={mystyle.inbx}>
                            <label
                                htmlFor="inbxFile"
                                className={mystyle.inbxlabel}
                            >
                                <span>Choose File</span>
                                <FiUpload
                                    size={18}
                                    className={mystyle.inslabel}
                                />
                            </label>
                            <input
                                type="file"
                                name="file"
                                onChange={changefile}
                                className={mystyle.inbtn}
                                id="inbxFile"
                            />
                        </div>
                    </>
                )}
            </div>

            {uploadFile.length == 0 ? (
                <div className={mystyle.filebox}>
                    <div className={mystyle.fileicon}>
                        <LuFolderOpen size={32} color="hsl(204, 10%, 75%)" />
                    </div>
                    <div className={mystyle.emptycon}>
                        No files yet. Upload your first file to get started.
                    </div>
                </div>
            ) : (
                <div className={mystyle.filesShowbox}>
                    {uploadFile.length > 1 ? (
                        <div className={mystyle.filenum}>
                            {uploadFile.length} files
                        </div>
                    ) : (
                        <div className={mystyle.filenum}>
                            {uploadFile.length} file
                        </div>
                    )}
                    <div className={mystyle.cardbox}>
                        {uploadFile.map((element) => {
                            return (
                                <div className={mystyle.card}>
                                    <div className={mystyle.fileiconbox}>
                                        <CiFileOn />
                                    </div>
                                    <div className={mystyle.cardCon}>
                                        {element.name}
                                    </div>
                                    <div className={mystyle.downiconbox}>
                                        <button
                                            className={mystyle.downLoadiconbox}
                                            onClick={() => {
                                                const downUrl =
                                                    element.url.replace(
                                                        '/upload/',
                                                        '/upload/fl_attachment/'
                                                    );
                                                toast.success(
                                                    'Please wait, your download will start shortly…',
                                                    { duration: 1200 }
                                                );
                                                setTimeout(() => {
                                                    window.location.href =
                                                        downUrl;
                                                }, 300);
                                            }}
                                        >
                                            <BsDownload />
                                        </button>
                                    </div>
                                    <div className={mystyle.deleteiconbox}>
                                        <button
                                            className={mystyle.deletebtn}
                                            onClick={async () => {
                                                try {
                                                    const res = api.post(
                                                        '/del',
                                                        element,
                                                        {
                                                            headers: {
                                                                authorization: `bearer ${user.authToken}`,
                                                            },
                                                        }
                                                    );
                                                    toast.promise(res, {
                                                        loading:
                                                            'Please wait a moment.',
                                                        success:
                                                            'Image deleted successfully',
                                                        error: 'Something went wrong',
                                                        description:
                                                            'We’re removing the image now.',
                                                    });
                                                    delCard(element.name);
                                                } catch (error) {
                                                    toast.error(
                                                        'Something went wrong'
                                                    );
                                                }
                                            }}
                                        >
                                            <RiDeleteBin6Line
                                                className={mystyle.delicon}
                                            />
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}

export default File;
