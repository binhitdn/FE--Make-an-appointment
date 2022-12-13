import React from 'react';
import classNames from 'classnames';
import './Slider.scss'
function Slider2(props) {
    this.IMAGE_PARTS = 4;
      
    //   this.changeTO = null;
    //   this.AUTOCHANGE_TIME = 4000;
    //   activeSlide: -1,
    //   prevSlide: -1, 
    //   sliderReady: false ,
    //   slides: [
    //    {
    //      title: {
    //        vi: 'Chào mừng bạn đến với CareHappy',
    //        en: 'Welcome to CareHappy',
    //        ja: 'ケアハッピーへようこそ'
    //        },      

    //      content: {
    //        vi: 'Hệ thống chăm sóc sức khỏe toàn diện',
    //        en: 'Comprehensive health care system',
    //        ja: '総合的な健康ケアシステム'
    //      },
    //      img: 'https://cdn.nbtv.vn/upload/news/6_2020/5_07595828062020.jpg',

    //    },
    //    {
    //      title: {
    //        vi: 'Gói Tầm soát Suy giãn tĩnh mạch (BN56)',
    //        en: 'Package Screening Aortic Stenosis (BN56)',
    //        ja: '腸管狭窄症（BN56）のスクリーニングパッケージ'
    //      },
    //      content: {
    //        vi: 'Hỗ trợ điều trị dứt điểm 1 - 2 liệu trình',
    //        en: 'Supports 1 - 2 treatment sessions',
    //        ja: '1〜2回の治療セッションをサポート'
    //      },
    //      img: 'https://cdn.bookingcare.vn/fo/2022/05/24/103240-3e235e22fe933fcd6682.jpg',
    //    },
    //    {
    //      title: {
    //        vi: 'Ưu đãi 50% phí khám với bác sĩ tại Phòng khám Mediplus',
    //        en: '50% discount on consultation fees with doctors at Mediplus Clinic',
    //        ja: 'メディプラスクリニックの医師との相談料の50％割引'
    //      },
    //      content: {
    //        vi: 'Giảm 50% phí khám ban đầu với các chuyên khoa Cơ xương khớp, Tim mạch và Tiêu hóa',
    //        en: '50% discount on initial consultation fees for Orthopedics, Cardiology and Gastroenterology',
    //        ja: '骨・関節科、心臓血管科、消化器科の初回相談料の50％割引'
    //      },
    //      img: 'https://cdn.bookingcare.vn/fo/2022/10/20/144100-152409-uu-dai-di-kham-mediplus.jpg',

    //    },
    //    {
    //      title:  {
    //        vi: 'Ngập tràn ưu đãi tháng 10 tại Phòng khám Da liễu thẩm mỹ F-Skin',
    //        en: 'Endless promotions in October at F-Skin Dermatology and Aesthetic Clinic',
    //        ja: '10月のF-Skin皮膚科美容クリニックの無限のプロモーション'
    //      },
    //      content: {
    //        vi: 'Siêu ưu đãi khám sức khỏe tháng 10 tại Hệ thống Y tế Thu Cúc TCI',
    //        en: 'Super health check-up promotions in October at Thu Cuc TCI Healthcare System',
    //        ja: '10月のThu Cuc TCI医療システムのスーパーヘルスチェックアッププロモーション'
    //      },
    //      img: 'https://cdn.bookingcare.vn/fo/2022/10/21/140432-fskin.png',
    //    }
    //  ],
    //  lang: localStorage.getItem('language')
    //  };
    const [activeSlide, setActiveSlide] = React.useState(-1);
    const [prevSlide, setPrevSlide] = React.useState(-1);
    const [sliderReady, setSliderReady] = React.useState(false);
    const [slides, setSlides] = React.useState([
        {
          title: {
            vi: 'Chào mừng bạn đến với CareHappy',
            en: 'Welcome to CareHappy',
            ja: 'ケアハッピーへようこそ'
            },      
 
          content: {
            vi: 'Hệ thống chăm sóc sức khỏe toàn diện',
            en: 'Comprehensive health care system',
            ja: '総合的な健康ケアシステム'
          },
          img: 'https://cdn.nbtv.vn/upload/news/6_2020/5_07595828062020.jpg',
 
        },
        {
          title: {
            vi: 'Gói Tầm soát Suy giãn tĩnh mạch (BN56)',
            en: 'Package Screening Aortic Stenosis (BN56)',
            ja: '腸管狭窄症（BN56）のスクリーニングパッケージ'
          },
          content: {
            vi: 'Hỗ trợ điều trị dứt điểm 1 - 2 liệu trình',
            en: 'Supports 1 - 2 treatment sessions',
            ja: '1〜2回の治療セッションをサポート'
          },
          img: 'https://cdn.bookingcare.vn/fo/2022/05/24/103240-3e235e22fe933fcd6682.jpg',
        },
        {
          title: {
            vi: 'Ưu đãi 50% phí khám với bác sĩ tại Phòng khám Mediplus',
            en: '50% discount on consultation fees with doctors at Mediplus Clinic',
            ja: 'メディプラスクリニックの医師との相談料の50％割引'
          },
          content: {
            vi: 'Giảm 50% phí khám ban đầu với các chuyên khoa Cơ xương khớp, Tim mạch và Tiêu hóa',
            en: '50% discount on initial consultation fees for Orthopedics, Cardiology and Gastroenterology',
            ja: '骨・関節科、心臓血管科、消化器科の初回相談料の50％割引'
          },
          img: 'https://cdn.bookingcare.vn/fo/2022/10/20/144100-152409-uu-dai-di-kham-mediplus.jpg',
 
        },
        {
          title:  {
            vi: 'Ngập tràn ưu đãi tháng 10 tại Phòng khám Da liễu thẩm mỹ F-Skin',
            en: 'Endless promotions in October at F-Skin Dermatology and Aesthetic Clinic',
            ja: '10月のF-Skin皮膚科美容クリニックの無限のプロモーション'
          },
          content: {
            vi: 'Siêu ưu đãi khám sức khỏe tháng 10 tại Hệ thống Y tế Thu Cúc TCI',
            en: 'Super health check-up promotions in October at Thu Cuc TCI Healthcare System',
            ja: '10月のThu Cuc TCI医療システムのスーパーヘルスチェックアッププロモーション'
          },
          img: 'https://cdn.bookingcare.vn/fo/2022/10/21/140432-fskin.png',
        }
      ]
    );
        


}
export default Slider2;