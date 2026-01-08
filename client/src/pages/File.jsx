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

function File() {
    const userCon = useContext(UserContext);
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [uploadSt, setUploadSt] = useState(0);

    useEffect(() => {
        if (userCon.user == 0) {
            navigate('/');
        } else {
            setUser(userCon.user.serverData);
        }
    }, []);

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
                console.log(res);
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
                    <button>
                        <CiLogout />
                        Logout
                    </button>
                </div>
            </div>

            <div className={mystyle.uploadBox}>
                {uploadSt ? (
                    <div> css loader </div>
                ) : (
                    <div>
                        <div className={mystyle.uploadicon}>
                            <LuUpload />
                        </div>
                        <div className={mystyle.uploadtitle}>Upload Files</div>
                        <div className={mystyle.uploadcontent}>
                            Drag and drop files here, or click to browse
                        </div>
                        <div className={mystyle.uploadin}>
                            <input
                                type="file"
                                name="file"
                                onChange={changefile}
                            />
                        </div>
                    </div>
                )}
            </div>

            {user.docNames && user.docNames.length == 0 ? (
                <div className={mystyle.filebox}>
                    <div className={mystyle.fileicon}>
                        <LuFolderOpen />
                    </div>
                    <div className={mystyle.emptycon}>
                        No files yet. Upload your first file to get started.
                    </div>
                </div>
            ) : (
                <div className={mystyle.filesShowbox}>
                    <div className={mystyle.filenum}>
                        {user.docNames && user.docNames.length} file
                    </div>
                    <div className={mystyle.cardbox}>
                        {user.docNames &&
                            user.docNames.map((element) => {
                                return (
                                    <div className={mystyle.card}>
                                        <div className={mystyle.fileiconbox}>
                                            <CiFileOn />
                                        </div>
                                        <div className={mystyle.cardCon}>
                                            {element}
                                        </div>
                                        <div className={mystyle.downiconbox}>
                                            <BsDownload />
                                        </div>
                                        <div className={mystyle.deleteiconbox}>
                                            <RiDeleteBin6Line />
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
