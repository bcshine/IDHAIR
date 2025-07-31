// 문서가 완전히 로드된 후 실행됩니다
document.addEventListener('DOMContentLoaded', function() {
    // 히어로 슬라이더 기능 구현 (3장의 이미지를 자동 슬라이딩하는 캐러셀)
    const slides = document.querySelectorAll('.slide'); // 모든 슬라이드
    const prevArrow = document.querySelector('.prev-arrow'); // 이전 버튼 (좌우 끝, 세로 중앙)
    const nextArrow = document.querySelector('.next-arrow'); // 다음 버튼 (좌우 끝, 세로 중앙)
    const indicators = document.querySelectorAll('.indicator'); // 인디케이터 점
    let currentSlide = 0; // 현재 슬라이드 인덱스
    let slideInterval; // 자동 슬라이드 간격 변수
    
    // 슬라이드 변경 함수
    function changeSlide(index) {
        // 현재 활성화된 슬라이드와 인디케이터에서 active 클래스 제거
        slides[currentSlide].classList.remove('active');
        indicators[currentSlide].classList.remove('active');
        
        // 새로운 슬라이드 인덱스 설정
        currentSlide = index;
        
        // 인덱스가 범위를 벗어나면 조정
        if (currentSlide < 0) {
            currentSlide = slides.length - 1;
        } else if (currentSlide >= slides.length) {
            currentSlide = 0;
        }
        
        // 새로운 슬라이드와 인디케이터에 active 클래스 추가
        slides[currentSlide].classList.add('active');
        indicators[currentSlide].classList.add('active');
    }
    
    // 자동 슬라이드 시작 함수 (자동으로 다음 슬라이드로 이동)
    function startSlideInterval() {
        // 5초마다 다음 슬라이드로 변경
        slideInterval = setInterval(() => {
            changeSlide(currentSlide + 1);
        }, 5000);
    }
    
    // 자동 슬라이드 정지 함수
    function stopSlideInterval() {
        clearInterval(slideInterval);
    }
    
    // 이전 버튼 클릭 이벤트 (좌우 끝에 배치된 화살표)
    prevArrow.addEventListener('click', () => {
        stopSlideInterval(); // 자동 슬라이드 정지
        changeSlide(currentSlide - 1); // 이전 슬라이드로 변경
        startSlideInterval(); // 자동 슬라이드 다시 시작
    });
    
    // 다음 버튼 클릭 이벤트 (좌우 끝에 배치된 화살표)
    nextArrow.addEventListener('click', () => {
        stopSlideInterval(); // 자동 슬라이드 정지
        changeSlide(currentSlide + 1); // 다음 슬라이드로 변경
        startSlideInterval(); // 자동 슬라이드 다시 시작
    });
    
    // 각 인디케이터에 클릭 이벤트 추가
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            stopSlideInterval(); // 자동 슬라이드 정지
            changeSlide(index); // 해당 인덱스의 슬라이드로 변경
            startSlideInterval(); // 자동 슬라이드 다시 시작
        });
    });
    
    // 슬라이더에 마우스를 올렸을 때 자동 슬라이드 정지
    document.querySelector('.slider-container').addEventListener('mouseenter', () => {
        stopSlideInterval();
    });
    
    // 슬라이더에서 마우스가 벗어났을 때 자동 슬라이드 다시 시작
    document.querySelector('.slider-container').addEventListener('mouseleave', () => {
        startSlideInterval();
    });
    
    // 자동 슬라이드 시작
    startSlideInterval();
    
    // 디자이너 섹션 - 간단한 더보기 토글 기능
    
    // 모든 토글 버튼에 클릭 이벤트 리스너를 추가합니다
    document.querySelectorAll('.toggle-btn').forEach((button) => {
        button.addEventListener('click', (event) => {
            // 현재 버튼의 부모 디자이너 정보 요소를 찾습니다
            const designerInfo = event.target.closest('.designer-info');
            // 숨겨진 텍스트 요소를 찾습니다
            const fullText = designerInfo.querySelector('.full-text');
            
            // 현재 텍스트가 보이는지 확인합니다
            if (fullText.style.display === 'none' || fullText.style.display === '') {
                // 숨겨진 텍스트를 보여줍니다
                fullText.style.display = 'block';
                // 버튼 텍스트를 '간단히보기'로 변경합니다
                button.textContent = '간단히보기';
            } else {
                // 텍스트를 숨깁니다
                fullText.style.display = 'none';
                // 버튼 텍스트를 '더보기'로 변경합니다
                button.textContent = '더보기';
            }
        });
    });
    
    // 브랜드 히스토리 섹션 - 더보기/간단히보기 토글 기능
    
    // 브랜드 히스토리 토글 버튼에 클릭 이벤트 리스너를 추가합니다
    document.querySelector('.history-toggle-btn').addEventListener('click', (event) => {
        // 숨겨진 브랜드 가치 내용 요소를 찾습니다
        const fullValues = document.querySelector('.full-values');
        // 현재 버튼을 변수로 저장합니다
        const button = event.target;
        
        // 현재 내용이 보이는지 확인합니다
        if (fullValues.style.display === 'none' || fullValues.style.display === '') {
            // 숨겨진 내용을 보여줍니다
            fullValues.style.display = 'block';
            // 버튼 텍스트를 '간단히보기'로 변경합니다
            button.textContent = '간단히보기';
        } else {
            // 내용을 숨깁니다
            fullValues.style.display = 'none';
            // 버튼 텍스트를 '더보기'로 변경합니다
            button.textContent = '더보기';
        }
    });
    
    // 필요한 요소들을 가져옵니다
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn'); // 모바일 메뉴 버튼
    const headerNav = document.querySelector('.header-nav'); // 네비게이션 메뉴
    const navLinks = document.querySelectorAll('.nav-menu li a'); // 모든 메뉴 링크
    
    // 모바일 메뉴 버튼 클릭 이벤트
    mobileMenuBtn.addEventListener('click', function() {
        // 버튼과 메뉴에 active 클래스를 토글합니다 (추가/제거)
        this.classList.toggle('active');
        headerNav.classList.toggle('active');
    });
    
    // 각 메뉴 링크에 클릭 이벤트를 추가합니다
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            // 모바일 화면에서 메뉴 링크 클릭 시 메뉴를 닫습니다
            if (window.innerWidth <= 768) {
                mobileMenuBtn.classList.remove('active');
                headerNav.classList.remove('active');
            }
        });
    });
    
    // 화면 크기가 변경될 때 이벤트
    window.addEventListener('resize', function() {
        // 화면 너비가 768px보다 크면 모바일 메뉴를 초기화합니다
        if (window.innerWidth > 768) {
            mobileMenuBtn.classList.remove('active');
            headerNav.classList.remove('active');
        }
    });
});