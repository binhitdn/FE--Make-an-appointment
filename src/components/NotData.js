import "./NotData.scss"
function NotData(props) {
   
  return (
    <div className="not-data"
   

    >
        <div className="background-image"
        style={{
            backgroundImage: `url("https://www.vinmec.com/static/img/image-doctor-qna.dd79fe239b92.png")`,
            

        }}
        >
        </div>
        <p> {props.data}</p>
    </div>
    );
}
export default NotData;