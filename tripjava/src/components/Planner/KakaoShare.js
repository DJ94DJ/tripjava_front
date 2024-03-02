import { useEffect } from 'react';
import '../../styles/style.scss';
const { Kakao } = window;

const KakaoShare = () => {
  const realUrl = `${process.env.REACT_APP_HOST}/planner`;
  const resultUrl = window.location.href;

  useEffect(() => {
    Kakao.cleanup();
    Kakao.init(process.env.REACT_APP_KAKAO_KEY);
    console.log(Kakao.isInitialized());
  }, []);

  const share = () => {
    Kakao.Share.createDefaultButton({
      container: '#kakaotalk-sharing-btn',
      objectType: 'feed',
      content: {
        title: '여행 일정 공유해요!',
        imageUrl:
          'https://image.newsis.com/2022/06/26/NISI20220626_0018959695_web.jpg',
        link: {
          mobileWebUrl: 'http://localhost:3000/planner',
          webUrl: 'http://localhost:3000/planner',
        },
      },
      buttons: [
        {
          title: '트립자바로 이동',
          link: {
            mobileWebUrl: realUrl,
            webUrl: realUrl,
          },
        },
      ],
    });
  };

  return (
    <div className="kakao_share">
      <h3 className="kakao_share">
        공유하기 &nbsp;
        <img
          src="https://developers.kakao.com/assets/img/about/logos/kakaolink/kakaolink_btn_medium.png"
          id="kakaotalk-sharing-btn"
          onClick={share}
          alt="카카오톡 공유하기"
          style={{ width: '30px', height: 'auto' }}
        />
      </h3>
    </div>
  );
};

export default KakaoShare;
