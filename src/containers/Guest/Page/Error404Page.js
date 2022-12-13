import {Link} from "react-router-dom";
import "./Error404Page.css"

function Error404Page() {
    return (
        <section className="page_404">
            <div className="container">
                <div className="row">
                    <div className="col-sm-12 ">
                        <div className="col-sm-10 col-sm-offset-1  text-center">
                            <div className="four_zero_four_bg">
                                <h1 className="text-center ">Lỗi 404 rồi !!!</h1>


                            </div>

                            <div className="contant_box_404">
                                <h3 className="h2">
                                    Có vẻ như bạn đang bị lạc
                                </h3>

                                <p>Trang bạn đang điều hướng đến không tồn tại!</p>

                                <Link to="/" className="link_404 btn">Về trang chủ</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Error404Page;