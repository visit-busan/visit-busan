class FooterService {
    static #instance = null;
    static getInstance() {
        if (this.#instance == null) {
            this.#instance = new FooterService();
        }
        return this.#instance;
    }

    loadFooter() {
        const footerTop = document.querySelector(".footer-top");
        const footerContainer = document.querySelector(".footer-container");
        const principal = PrincipalApi.getInstance().getPrincipal();
        footerTop.innerHTML = `
        <div class="footer-top-inner">
        <p class="footer-top-title">
          <img src="/static/image/sns1.png" alt="" /> VISIT BUSAN SOCIAL MEDIA
        </p>
        <div class="footer-top-social">
          <a href="#"><img src="/static/image/sns2.png" alt="" /></a>
          <a href="#"><img src="/static/image/sns3.png" alt="" /></a>
          <a href="#"><img src="/static/image/sns4.png" alt="" /></a>
          <a href="#"><img src="/static/image/sns5.png" alt="" /></a>
        </div>
        <div class="footer-top-menu">
          <ul>
            <li class="gotobusan">
              <h3>부산에가면</h3>
              <ul>
                <li>명소</li>
                <li>음식</li>
                <li>숙박</li>
                <li>쇼핑</li>
                <li>축제</li>
                <li>내주변</li>
              </ul>
            </li>

            <li class="chuchun">
              <h3>추천여행</h3>
              <ul>
                <li>일정여행</li>
                <li>테마여행</li>
                <li>미식투어</li>
                <li>해양/체험</li>
                <li>부산여행</li>
                <li>심리테스트</li>
              </ul>
            </li>

            <li class="ready">
              <h3>여행준비</h3>
              <ul>
                <li>여행큐레이션</li>
                <li>가이드북&지도</li>
                <li>문화관광해설자</li>
                <li>뉴스레터</li>
                <li>관광안내소</li>
              </ul>
            </li>

            <li class="data">
              <h3>유용한정보</h3>
              <ul>
                <li>공지</li>
                <li>이벤트&설문</li>
                <li>공연&행사</li>
                <li>부산여행상품</li>
                <li>부산여행영상</li>
                <li>부산여행사진</li>
                <li>여행공유</li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
        `;
        
        
        
        footerContainer.innerHTML = `
        <div class="footer-left footer-content">
        <h1 class="footer-title">제공</h1>
        <img src="/static/image/logo.png" class="footer-logo" />
        <div class="footer-contract">
          <b><a class="a-point" href="">개인정보처리방침</a></b>
          <b><a href="">저작권보호정책</a></b>
          <b><a href="">약관</a></b>
          <b><a href="">행정서비스현황</a></b>
          <b><a href="">뷰어다운로드</a></b>
        </div>
        <h2>Copyright Busan Metropolitan City. All rights reserved.</h2>
      </div>
      <div class="footer-center footer-content">
        <h1 class="footer-title">관광 문의</h1>
        <h2>
          <b class="footer-number"><img src="/static/image/footer3.png" alt="" /></b>
        </h2>
        <img src="/static/image/WAQC.png" alt="" class="qualify" />
      </div>
      <div class="footer-right footer-content">
        <h1 class="footer-title">민원 대표 전화</h1>
        <h2><b class="footer-number">051-120</b></h2>
        <p class="footer-text">평일 08:30 - 18:30</p>
        <p class="footer-text">※야간/공휴일 등 근무시간외는 당직실로 전환.</p>
        <div class="buttons">
          <div>
            <a href="https://www.busandabom.net/index.nm" class="footer-box">부산문화포탈 다봄<img
                src="/static/image/footer4.png" alt="" /></a>
            <br />
            <a href="https://www.visitbusan.net/index.do?menuCd=DOM_000000202012000000#" class="footer-box box2">여행 상담
              <img src="/static/image/footer4.png" alt="" /></a>
          </div>

        </div>
      </div>
        `;
       
    }
}
