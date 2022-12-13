import moment from "moment";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { handleAuth } from "../../../../Auth";
import { handGetAllCommentHandbook, handGetAllReplyCommentHandbook, handGetHandbookById, handleAddCommentHandbook, handleAddReplyCommentHandbook, handUpdateViewHandbook } from "../../../../services/handbookService";
import "./scss/HandBookDetail.scss"

function HandBookDetail() {
    const id = window.location.pathname.split("/")[2]
    const [title, setTitle] = useState("");
    const [photo, setPhoto] = useState("");
    const [description, setDescription] = useState("");
    const [contentHTML, setContentHTML] = useState("");
    const [contentMarkdown, setContentMarkdown] = useState("");
    const [view, setView] = useState(0);
    const [like, setLike] = useState(0);
    const [poster, setPoster] = useState("");
    const [datePoster, setDatePoster] = useState("");
    const [dateUpdate, setDateUpdate] = useState("");
    const [loading, setLoading] = useState(false);
    const [contentCm, setContentCm] = useState("");
    const [listComment, setListComment] = useState([]);
    const [listCommentView, setListCommentView] = useState([]);
    const [listReplyComment, setListReplyComment] = useState();
    const [boxReplyValue, setBoxReplyValue] = useState([]);
    
    

    

    useEffect(() => {
        let getHandbook = async () => {
            let result = await handGetHandbookById(id);
            console.log('result: ', result);
            setTitle(result.data.title);
            setPhoto(result.data.image);
            setDescription(result.data.description);
            setContentHTML(result.data.contentHTML);
            setContentMarkdown(result.data.contentMarkdown);
            
            setLike(result.data.like);
            setPoster(result.data.poster);
            setView(result.data.view);
            setDatePoster(moment(result.data.createdAt).format("hh:mm:ss DD/MM/YYYY"));
            setDateUpdate(moment(result.data.updatedAt).format("hh:mm:ss DD/MM/YYYY"));
            handleGetListComment();
            setListCommentView(3);
            
            
            
        }
        getHandbook();
        
        
       

    }, []);

    let updateView = async() => {
        let res = await handUpdateViewHandbook(window.location.pathname.split("/")[2]);
        

    }
    useEffect(() => {
        updateView();
    },[])
    
    useEffect(() => {
        console.log('view: ', view);
    }, [view])
    let handleGetListComment = async () => {
        let list = await handGetAllCommentHandbook(id);
        console.log('list: ', list);
        let listComment2 = list.data.map(
            (item) => {
                return {
                    ...item,
                    commentBox: false,
                    replyList: []
                }
            }
        )
            setListComment(listComment2);
    }

   
    
    useEffect(() => {
        let handUpdateViewHandbook = async () => {
            let result = await handUpdateViewHandbook("10");
            console.log('results: ', result);
        }
        handUpdateViewHandbook();
    }, []);


    let handleAddComment = async () => {
        let res = await handleAddCommentHandbook({
            content: contentCm,
            handbookId: id,
            userId: handleAuth().id
        })
        console.log('res: ', res);
        setContentCm("");
        handleGetListComment();
       
        
    }
    let handGetAllReplyCommentHandbooks = async (id) => {
   

        
         
        
        
    }
    let handleViewCommentReply =async(id,index) => {
        let reply = await handGetAllReplyCommentHandbook(id);
        setListReplyComment(reply.data);
        setListComment(
            listComment.map((item2, index2) => {
                
                if(index2 === index) {
                    
                    handGetAllReplyCommentHandbooks(id);
                   

                    
                    return {
                        ...item2,
                        replyList: reply.data,
                        commentBox: !item2.commentBox,
                        

                         
                    }
                }
                return item2;
            })
            
        )
    }
    let handleReplyComment = async(id,index) => {
        let data = {
            content: boxReplyValue[id],
            userId: handleAuth().id,
            commentId: id
        }
        let res = await handleAddReplyCommentHandbook(data);
        console.log('res: ', res);
        setLoading(!loading);
        
        let reply = await handGetAllReplyCommentHandbook(id);
        setListReplyComment(reply.data);
       
    }
    useEffect(() => {
        console.log('boxReplyValue: ', boxReplyValue);
    }, [boxReplyValue])


  
    
    
    return (
        <div className="hand-book-detail">
            <div className="hand-book-detail__content">
                <div className="hand-book-detail__content__title">
                    <h4 className="title">{title}</h4>
                </div>
                <div className="hand-book-detail__content__note">
                    <p><i class="fa-solid fa-user-pen"></i>Tác giả: {poster}</p>
                    <p><i class="fa-solid fa-eye"></i>Lượt xem: {view}</p>
                    <p><i class="fa-solid fa-plus"></i>Ngày đăng: {datePoster} </p>
                <div className="hand-book-detail__content__description">
                    <p className="description">{description}</p>
                </div>
                </div>
                <div className="hand-book-detail__content__content">
                    <div className="hand-book-detail__content__content__background"
                    style={{backgroundImage: `url(${photo})`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat", height: "500px"}}
                    >
                    </div>
                <div dangerouslySetInnerHTML={{ __html: contentHTML }} 
                
                        // style={
                        //     styleDescription
                        // }
                        ></div>
                </div>
                <div className="hand-book-detail__content__footer">
                    {/* <div className="hand-book-detail__content__footer__like">
                        <i class="fa-solid fa-heart"></i>
                        <p>{like}</p>
                    </div> */}
                    {
                        handleAuth().id ? <div className="hand-book-detail__content__footer__comment">         
                        <textarea name="" id="" cols="30" rows="5" placeholder="Hãy nhập bình luận"　className="hand-book-detail__content__footer__comment_textarea"
                        onChange={(e) => setContentCm(e.target.value)}
                        value={contentCm}

                        ></textarea>
                        <div className="hand-book-detail__content__footer__comment__button">
                            <button
                            onClick={handleAddComment}
                            >Gửi</button>
                        </div>
                    </div> : <div className="hand-book-detail__content__footer__comment__login">
                        <p>Bạn cần 
                            <Link to="/login"> đăng nhập </Link>
                             để bình luận</p>
                    </div>
                    }
                    <div className="hand-book-detail__content__footer__comment__list">
                        {
                            listComment && listComment.slice(0, listCommentView).map((item, index) => {
                                return (
                                    <div className="hand-book-detail__content__footer__comment__list__item">
                                    <div className="hand-book-detail__content__footer__comment__list__item__header">
                                            <div className="hand-book-detail__content__footer__comment__list__item__avatar"
                                                style={{backgroundImage: `url('https://kiemtientuweb.com/ckfinder/userfiles/images/avatar-fb/avatar-fb-1.jpg')`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat", height: "50px", width: "50px"}}
                                                >       
                                            </div>
                                            <div className="hand-book-detail__content__footer__comment__list__item__name">
                                                {
                                                    item.userData2.lastName + " " + item.userData2.firstName
                                                }
                                            </div>
                                            <div className="hand-book-detail__content__footer__comment__list__item__date">
                                                {
                                                    moment(item.createdAt).fromNow()
                                                }
                                            </div>
                                    </div>
                                    <div className="hand-book-detail__content__footer__comment__list__item__content">
                                       {
                                             item.content
                                       }
                                    </div>
                                    <div className="hand-book-detail__content__footer__comment__list__item__footer">
                                        <div className="hand-book-detail__content__footer__comment__list__item__footer__like">
                                            <i class="fa-solid fa-heart"></i>
                                            <p>
                                               {
                                                Math.floor(Math.random() * 100)
                                               }
                                            </p>
                                        </div>
                                        <div className="hand-book-detail__content__footer__comment__list__item__footer__comment"
                                        onClick={() => {
                                            handleViewCommentReply(item.id,index)
                                        }}
                                        
                                        >
                                            <i class="fa-solid fa-comment"></i>
                                            <p>{
                                                Math.floor(Math.random() * 100)
                                                }</p>
                                        </div>
                                    </div>
                                    {
                                        // item.commentBox &&
                                        //         <div className="hand-book-detail__content__footer__comment__list__item__reply">
                                        //             <div className="hand-book-detail__content__footer__comment__list__item__reply__list">
                                                        
                                        //                 {
                                        //                     item.replyList && item.replyList.map((item2, index2) => {
                                        //                        return (
                                        //                         <div className="hand-book-detail__content__footer__comment__list__item__reply__list__item">
                                        //                         <div className="hand-book-detail__content__footer__comment__list__item__reply__list__item__header">

                                        //                             <div className="hand-book-detail__content__footer__comment__list__item__reply__list__item__avatar"
                                        //                                 style={{backgroundImage: `url('https://kiemtientuweb.com/ckfinder/userfiles/images/avatar-fb/avatar-fb-1.jpg')`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat", height: "50px", width: "50px"}}
                                        //                                 >
                                        //                             </div>
                                        //                             <div className="hand-book-detail__content__footer__comment__list__item__reply__list__item__name">
                                        //                                 {
                                        //                                     item2.userData3.lastName + " " + item2.userData3.firstName
                                        //                                 }
                                        //                             </div>
                                        //                             <div className="hand-book-detail__content__footer__comment__list__item__reply__list__item__date">
                                        //                                 {
                                        //                                     moment(item2.createdAt).fromNow()
                                        //                                 }
                                        //                             </div>
                                        //                         </div>
                                        //                         <div className="hand-book-detail__content__footer__comment__list__item__reply__list__item__content">
                                        //                             {
                                        //                                 item2.content
                                        //                             }
                                        //                         </div>
                                        //                         {/* <div className="hand-book-detail__content__footer__comment__list__item__reply__list__item__footer">
                                        //                             <div className="hand-book-detail__content__footer__comment__list__item__reply__list__item__footer__like">
                                        //                                 <i class="fa-solid fa-heart"></i>
                                        //                                 <p>
                                        //                                     {
                                        //                                         Math.floor(Math.random() * 100)
                                        //                                     }
                                        //                                 </p>
                                        //                             </div>
                                        //                             <div className="hand-book-detail__content__footer__comment__list__item__reply__list__item__footer__comment">
                                        //                                 <i class="fa-solid fa-comment"></i>
                                        //                                 <p>
                                        //                                     {
                                        //                                         Math.floor(Math.random() * 100)
                                        //                                     }
                                        //                                 </p>
                                        //                             </div>
                                        //                         </div> */}
                                        //                     </div>
                                        //                         )
                                        //                     })
                                        //                 }
                                        //             </div>
                                                   

                                        //             <div className="hand-book-detail__content__footer__comment__list__item__reply__box">
                                        //     <input type="text" placeholder="Nhập bình luận" 
                                        //     value={
                                        //         "@ " + item.userData2.lastName + " " + item.userData2.firstName+ ": " +
                                        //         boxReplyValue[index]?boxReplyValue[index]:""
                                        //     }
                                            
                                        //     onChange={(e) => {
                                        //         setBoxReplyValue([
                                        //             ...boxReplyValue.slice(0, index),
                                        //             e.target.value,

                                                    
                                        //             ...boxReplyValue.slice(index + 1)
                                                    
                                                    
                                                    
                                        //         ])
                                        //     }}
                                        //     />
                                        //     <input type="submit" value="Gửi" className="btn "
                                        //     onClick={() => {
                                        //         handleReplyComment(item.id,index)
                                        //     }}
                                        //     />

                                        //             </div>
                                        //         </div>
                                    
                               
                                            
                                    }
                                    
                                    
                                </div>
                                )
                            })
                        }
                        {
                            listComment.length == 0 && <div className="hand-book-detail__content__footer__comment__list__item">
                            <div className="hand-book-detail__content__footer__comment__list__item__header">
                                    Khong co binh luan nao
                            </div>
                            </div>

                            
                                    

                        }
                    </div>
                    <div 
                    onClick={() => {
                        let number = listCommentView + 3;
                        if(number > listComment.length) {
                            number = listComment.length;
                        } else {
                            number = listCommentView + 3;
                        }
                        setListCommentView(number);
                    }}
                    >
                        {

                            listCommentView < listComment.length && <div className="hand-book-detail__content__footer__comment__list__view"
                            style={{cursor: "pointer", padding: "10px", color: "blue",fontWeight: "bold"}}
                            >
                            Xem thêm
                        </div>

                        }
                        {
                            listCommentView >= listComment.length && <div className="hand-book-detail__content__footer__comment__list__view"
                            style={{cursor: "pointer", padding: "10px", fontWeight: "bold"}}
                            >
                            Hết bình luận
                        </div>
                        }
                    </div>
                </div>
                    
            </div>
        

            
        </div>
        
    );
}
export default HandBookDetail;