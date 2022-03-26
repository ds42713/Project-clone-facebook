import { useContext, useRef, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import defaultImg from '../../assets/images/profileImg.png';
import { Modal } from 'bootstrap';
import Spinner from '../utils/Spinner';

function PostForm({ createPost }) {
    const [modal, setModal] = useState(null);
    const [title, setTitle] = useState('');
    const [img, setImg] = useState('');

    const modalEl = useRef();
    const imgInputEl = useRef();

    const { user } = useContext(AuthContext);

    const handleClickInput = () => {
        const modalObj = new Modal(modalEl.current);
        setModal(modalObj);
        modalObj.show();
    };

    const handleSubmitForm = async e => {
        e.preventDefault();
        await createPost(title, img);
        modal.hide();
        setImg('');
        setTitle('');
        imgInputEl.current.value = null;
    };

    return (
        <>
            <div className="card mb-3 p-3">
                <div className="position-relative d-flex align-items-center">
                    <img
                        src={user.profileImg ?? defaultImg}
                        width="50"
                        height="50"
                        className="rounded-circle me-2"
                        alt="user"
                    />
                    <input
                        type="text"
                        className="form-control rounded-pill d-inline"
                        placeholder="What's on your mind?"
                        onClick={handleClickInput}
                    />
                    <div
                        className="position-absolute"
                        style={{
                            top: '50%',
                            right: 13,
                            transform: 'translateY(-50%)'
                        }}
                    >
                        <i className="fa fa-camera text-muted"></i>
                    </div>
                </div>
            </div>

            <div className="modal" ref={modalEl}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Create Post</h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                onClick={() => {
                                    setImg('');
                                    setTitle('');
                                    imgInputEl.current.value = null;
                                }}
                            ></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmitForm}>
                                <div className="mb-5">
                                    <textarea
                                        className="form-control mb-3"
                                        rows="3"
                                        placeholder="What's on your mind?"
                                        value={title}
                                        onChange={e => setTitle(e.target.value)}
                                    />
                                    {img && (
                                        <img
                                            src={URL.createObjectURL(img)}
                                            className="img-fluid"
                                            alt="post-img"
                                        />
                                    )}
                                    <div className="input-group mt-3">
                                        <input
                                            type="file"
                                            className="form-control"
                                            ref={imgInputEl}
                                            onChange={e => {
                                                if (e.target.files[0]) setImg(e.target.files[0]);
                                            }}
                                        />
                                        <button
                                            className="btn btn-outline-danger"
                                            type="button"
                                            onClick={() => {
                                                imgInputEl.current.value = null;
                                                setImg('');
                                            }}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                                <div className="d-grid">
                                    <button className="btn btn-primary">Post</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PostForm;
