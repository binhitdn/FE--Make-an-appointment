import FBReactions from "../../../components/FBReactions";
import "./scss/Community.scss"
function Community() {
    let posters = 
        {
            id: 1,
            name: "Nguyễn Văn A",
            avatar: "https://i.pinimg.com/564x/0d/0d/0d/0d0d0d0d0d0d0d0d0d0d0d0d0d0d0d0d.jpg",
            time: "12/07/2021",
            title: "Tôi đang cần tìm một bác sĩ chuyên khoa nào đó",
        }
    let comments = [
        {
            id: 1,
            comenter: "Nguyễn Văn B",
            avatar: "https://i.pinimg.com/564x/0d/0d/0d/0d0d0d0d0d0d0d0d0d0d0d0d0d0d0d0d.jpg",
            time: "12/07/2021",
            content: "Tôi cũng đang cần tìm một bác sĩ chuyên khoa nào đó",
        },
        {
            id: 2,
            comenter: "Nguyễn Văn C",
            avatar: "https://i.pinimg.com/564x/0d/0d/0d/0d0d0d0d0d0d0d0d0d0d0d0d0d0d0d0d.jpg",
            time: "12/07/2021",
            content: "Tôi cũng đang cần tìm một bác sĩ chuyên khoa nào đó",
        },
    ]
    let emotions = [
        {
            id: 1,
            name: "Like",
            emotionId: 1,
        },
        {
            id: 2,
            name: "Love",
            emotionId: 2,
        },
        {
            id: 3,
            name: "Haha",
            emotionId: 3,
        },
    ]
    
    return (
        <div>
            <h1>Community</h1>
            <div className="community-container">
                <div className="community-list-poster">
                    <div className="community-poster">
                        <div className="community-poster__header">
                            <div className="community-poster__header__avatar">
                                <img src="https://static2.yan.vn/YanNews/2167221/202102/facebook-cap-nhat-avatar-doi-voi-tai-khoan-khong-su-dung-anh-dai-dien-e4abd14d.jpg" alt="" />
                            </div>
                            <div className="community-poster__header__name">
                                <p>
                                    {posters.name}
                                </p>
                            </div>
                        </div>
                        <div className="community-poster__body">
                            <div className="community-poster__body__content">
                                <p>
                                    {posters.title}
                                </p>
                            </div>
                        </div>
                        <div className="community-poster__footer">
                            <div className="community-poster__footer__interact">
                            <div className="community-poster__footer__like">
                                   {emotions.length} người đã bày tỏ cảm xúc
                                        
                                            
                                            

                            </div>
                            <div className="community-poster__footer__comment">
                                <i className="fas fa-comment"></i>
                                <span>
                                    {comments.length} Bình luận
                                </span>
                            </div>
                            </div>
                            <div className="community-poster__footer__comment__2">
                                <div className="community-poster__footer__comment__2__emotions">
                                    <FBReactions emotions={emotions} />
                                </div>
                                <div className="community-poster__footer__comment__2__comment">
                                    <i className="fas fa-comment"></i>
                                </div>
                            </div>
                            <div className="community-poster__footer__comment">
                                <div className="community-poster__footer__comment__reply">
                                    <input type="text" placeholder="Viết bình luận..." />
                                </div>
                                <div className="community-poster__footer__comment__comment">
                                    <div className="community-poster__footer__comment__comment__item">
                                        <div className="community-poster__footer__comment__comment__item__header">
                                        <div className="community-poster__header__avatar">
                                            <img src="https://static2.yan.vn/YanNews/2167221/202102/facebook-cap-nhat-avatar-doi-voi-tai-khoan-khong-su-dung-anh-dai-dien-e4abd14d.jpg" alt="" />
                                        </div>
                                        <div className="community-poster__header__name">
                                <p>Nguyễn Văn A</p>
                            </div>
                                        </div>
                            
                                            
                                        
                                    </div>
                                    <div className="community-poster__footer__comment__comment__item__body">
                                        <p>Chúc mừng bạn đã khỏi bệnh</p>
                                    </div>

                                        
                                            

                                </div>
                            </div>
                        </div>

                
                    

                    </div>
            </div>
            </div>
        </div>
    )
}
export default Community;