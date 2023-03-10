class HeaderService {
  static #instance = null;
  static getInstance() {
    if (this.#instance == null) {
      this.#instance = new HeaderService();
    }
    return this.#instance;
  }

  Categoryload() {
    let responseData = null;
    $.ajax({
      async: false,
      type: "get",
      url: "/api/post/categories",
      dataType: "json",
      success: response => {
        responseData = response.data;
      },
      error: error => {

      }
    })
    const category = document.querySelector(".category");
    responseData.forEach(data => {
      category.innerHTML +=
        `
      <li><a href="http://localhost:8000/search?categoryId=${data.categoryId}" style="text-align: left;">${data.categoryName}</a></li>
      `;
    });
  }

  loadHeader() {
    const headerContainer = document.querySelector(".header-container");
    const principal = PrincipalApi.getInstance().getPrincipal();
    headerContainer.innerHTML = `
        <h1 class="brand-logo">
        <a href="http://localhost:8000"><img src="/static/image/logo.png" alt="" /></a>
      </h1>
      <div class="menu-container">
        <ul class="all-menu">
          <li class="sub-menu">
            <a href="http://localhost:8000">HOME</a>
          </li>
          <li class="sub-menu">
            <a href="#">부산에가면<i class="fa fa-angle-down"></i></a>
            <ul class="category">
              
            </ul>
          </li>
          <li class="sub-menu">
            <a href="#">추천여행<i class="fa fa-angle-down"></i></a>
            <ul>
              <li>
                <a href="https://www.visitbusan.net/index.do?menuCd=DOM_000000202012000000">일정여행</a>
              </li>
              <li>
                <a href="https://www.visitbusan.net/index.do?menuCd=DOM_000000202002000000">테마여행</a>
              </li>
              <li>
                <a href="https://www.visitbusan.net/index.do?menuCd=DOM_000000202003000000">미식투어</a>
              </li>
              <li>
                <a href="https://www.visitbusan.net/index.do?menuCd=DOM_000000202008000000">해양·체험</a>
              </li>
              <li>
                <a href="https://www.visitbusan.net/index.do?menuCd=DOM_000000202011000000">부산여행 심리 테스트</a>
              </li>
            </ul>
          </li>
          <li class="sub-menu">
            <a href="#">여행준비<i class="fa fa-angle-down"></i></a>
            <ul>
              <li>
                <a
                  href="https://www.visitbusan.net/board/list.do?boardId=BBS_0000007&menuCd=DOM_000000203001000000&contentsSid=61">여행큐레이션</a>
              </li>
              <li>
                <a
                  href="https://www.visitbusan.net/board/list.do?boardId=BBS_0000007&menuCd=DOM_000000203001000000&contentsSid=61">가이드북&지도</a>
              </li>
              <li>
                <a href="https://www.visitbusan.net/index.do?menuCd=DOM_000000203013000000">문화관광해설사</a>
              </li>
              <li>
                <a href="https://www.visitbusan.net/index.do?menuCd=DOM_000000203014000000">여행준비정보</a>
              </li>
              <li>
                <a href="https://www.visitbusan.net/index.do?menuCd=DOM_000000203015000000">뉴스레터</a>
              </li>
              <li>
                <a href="https://www.visitbusan.net/index.do?menuCd=DOM_000000203016000000">관광안내소</a>
              </li>
            </ul>
          </li>
          <li class="sub-menu">
            <a href="#">유용한정보<i class="fa fa-angle-down"></i></a>
            <ul>
              <li>
                <a
                  href="https://www.visitbusan.net/board/list.do?boardId=BBS_0000001&menuCd=DOM_000000204001000000&contentsSid=71">공지</a>
              </li>
              <li>
                <a href="https://www.visitbusan.net/index.do?menuCd=DOM_000000204002000000">이벤트&설문</a>
              </li>
              <li>
                <a
                  href="https://www.visitbusan.net/schedule/list.do?boardId=BBS_0000009&menuCd=DOM_000000204012000000&contentsSid=447">공연&행사</a>
              </li>
              <li>
                <a href="https://www.visitbusan.net/index.do?menuCd=DOM_000000204005000000">부산여행상품</a>
              </li>
              <li>
                <a href="https://www.visitbusan.net/index.do?menuCd=DOM_000000204021000000">부산관광브랜드</a>
              </li>
              <li>
                <a
                  href="https://www.visitbusan.net/board/list.do?boardId=BBS_0000008&menuCd=DOM_000000204008000000&contentsSid=78">부산여행영상</a>
              </li>
              <li>
                <a href="https://www.visitbusan.net/index.do?menuCd=DOM_000000204009000000">부산여행사진</a>
              </li>
              <li>
                <a href="https://www.visitbusan.net/index.do?menuCd=DOM_000000204007000000">여행공유</a>
              </li>
            </ul>
          </li>
        </ul>
      </div>

      <ul class="account-container">
        ${principal == null
        ? `
            <li><a href="/">검색하기</a></li>   
            <li><a href="/account/login" style="color: #2172dd">로그인</a></li>
            <li><a href="/account/register/terms">회원가입</a></li>
            ` : `
            <li><a href="/">검색하기</a></li>
            <li><a href="/mypage">${principal.userMst.name}님</a></li>
            <li><a href="/logout">로그아웃</a></li>
            `}
      </ul>

      <select style="margin-left: 8px; width: 100px; border:1px solid #dbdbdb">
        <option value="">Language</option>
        <option value="/kr/index.do">한국어</option>
        <option value="/en/index.do">English</option>
        <option value="/zhs/index.do">中文(简体)</option>
        <option value="/zht/index.do">中文(繁體)</option>
        <option value="/ja/index.do">日本語</option>
      </select>

        `;

    $(".menu-container li").hover(
      function () {
        $("ul", this).stop().slideDown(200);
      },
      function () {
        $("ul", this).stop().slideUp(200);
      }
    );
  }
}
