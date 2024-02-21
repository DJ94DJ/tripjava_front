import { useEffect } from "react";

const { Kakao } = window;

const KakaoShare = () => {
  
  const realUrl = "http://localhost:3000/planner";
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
        title: '여헹 일정 공유해요!',
        imageUrl:
          'https://mud-kage.kakao.com/dn/NTmhS/btqfEUdFAUf/FjKzkZsnoeE4o19klTOVI1/openlink_640x640s.jpg',
        link: {
          mobileWebUrl: 'https://developers.kakao.com',
          webUrl: 'https://developers.kakao.com',
        },
      },
      buttons: [
        {
          title: '트립자바로 이동',
          link: {
            mobileWebUrl: realUrl,
            webUrl: realUrl,
          },
        }
      ],
    });
  }

  return (
    <div className="kakao_share"> 공유하기
        <img 
          src="https://developers.kakao.com/assets/img/about/logos/kakaolink/kakaolink_btn_medium.png" 
          id="kakaotalk-sharing-btn" 
          onClick={share} 
          alt="카카오톡 공유하기" 
        />
    </div>
  )
  
}

export default KakaoShare;
