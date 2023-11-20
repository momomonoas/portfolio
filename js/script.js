$(document).ready(function(){
    // fullpage 세팅
    // 기본 세팅
    const section = $('main > section'),
          pcNav = $('.header .nav'),
          mobileBtn = $('.mobile-btn'),
          mobileNav = $('.mobile-nav'),
          windowMask = $('.window-mask')
    let windowWidth = window.innerWidth
    let sectionSpeed = 500
    let sectionPos = []
    let sectionIndex = 0
    let scrolling = false
    let wheeling = true
    let state = 0
    // 반응형시 fullpage 세팅 끄기
    function wheelCheckFn(){
        if(windowWidth <= 960) {
            wheeling = false
        }else {
            wheeling = true
            mobileBtn.removeClass('active')
            mobileNav.removeClass('active') 
            windowMask.removeClass('active')
        }
    }
    wheelCheckFn()
    // section 위치 확인
    function resetSection(){
        $.each(section,function(idx, item){
            let tempY = $(this).offset().top
            tempY = Math.ceil(tempY)
            sectionPos[idx] = tempY
        })
    }
    resetSection()
    let sectionTotal = sectionPos.length
    // window scroll 시
    $(window).on('mousewheel DOMMouseScroll', function(e){
        let distance = e.originalEvent.wheelDelta
        if(wheeling != true){
            return
        }
        if(scrolling){
            return
        }
        scrolling = true
        if(distance < 0){
            sectionIndex++
            if(sectionIndex >= sectionTotal){
                sectionIndex = sectionTotal-1
            }
            if(sectionIndex == 1) {
                $('.skill').children().not('p').remove()
                skill('#after-effect', 0.95)
                skill('#premi', 0.90)
                skill('#cinema', 0.75)
                skill('#html', 0.95)
                skill('#css', 0.95)
                skill('#javascript', 0.90)
                state = 1;
            }
        }else {
            sectionIndex--
            if(sectionIndex <= 0){
                sectionIndex = 0
            }
            if(sectionIndex==1 && state == 0){
                skill('#after-effect', 0.95)
                skill('#premi', 0.90)
                skill('#cinema', 0.75)
                skill('#html', 0.95)
                skill('#css', 0.95)
                skill('#javascript', 0.90)
                state = 1
            }
        }
        gsap.to($('html'),sectionSpeed / 1000,{
            scrollTop: sectionPos[sectionIndex],
            onComplete: function(){
                scrolling = false
            }
        })
    })
    // window resize 시
    let resizeTimer
    $(window).resize(function(){
        window.clearTimeout(resizeTimer)
        resizeTimer = window.setTimeout(
            resizeFunction,100
        )
    })
    function resizeFunction(){
        wheelCheckFn()
        resetSection()
        if(wheeling){
            gsap.to($('html'), sectionSpeed / 1000, {
                scrollTop: sectionPos[sectionIndex],
                onComplete: function(){
                    scrolling=false
                }
            })
        }
    }

    // header 영역
    // logo 클릭 시
    $('.logo').click(function(e){
        e.preventDefault()
        moveSection(0)
    })
    // pc-nav 클릭 시
    const pcNavList = $('.header .nav a')
    $.each(pcNavList,function(idx,item){
        $(this).click(function(e){
            e.preventDefault()
            moveSection(idx)
            if(sectionIndex == 1) {
                $('.skill').children().not('p').remove()
                skill('#after-effect', 0.95)
                skill('#premi', 0.90)
                skill('#cinema', 0.75)
                skill('#html', 0.95)
                skill('#css', 0.95)
                skill('#javascript', 0.90)
                state = 1;
            }
        })
    })
    function moveSection(idx){
        sectionIndex = idx
        gsap.to($('html'), sectionSpeed / 1000, {
            scrollTop: sectionPos[sectionIndex],
            onComplete: function(){
                scrolling = false
            }
        })
    }
    // mobile-btn 클릭 시
    mobileBtn.click(function(){
        if(mobileBtn.hasClass('active')){
            mobileBtn.removeClass('active')
            mobileNav.removeClass('active') 
            windowMask.removeClass('active')
        }else {
            mobileBtn.addClass('active')
            mobileNav.addClass('active')
            windowMask.addClass('active')
        }
    })
    // mobile-nav 클릭 시 
    const mobileNavLi = $('.mobile-nav ul li a')
    $.each(mobileNavLi,function(idx,item){
        $(this).click(function(e){
            e.preventDefault()
            mobileBtn.removeClass('active')
            mobileNav.removeClass('active') 
            windowMask.removeClass('active')
            moveSection(idx)
        })
    })
    // window-mask 클릭 시
    windowMask.click(function(){
        mobileBtn.removeClass('active')
        mobileNav.removeClass('active') 
        windowMask.removeClass('active')
    })

    // about 영역
    // about-img 클릭시 자기소개 영상 재생
    // about-content skill progress 재생
    function skill(id, percent){
        var bar = new ProgressBar.Line(id, {
            color: '#CF90F3',
            easing: 'easeInOut',
            strokeWidth: 3,
            trailWidth: 3,
            duration: 2400,
            text: {
                style: {
                  color: '#fff',
                  position: 'absolute',
                  right: '-3rem',
                  top: '1.1rem',
                  padding: 0,
                  margin: 0,
                  transform: null
                },
                autoStyleContainer: false
              },
            step: function(state, bar){
                bar.setText(Math.round(bar.value()*100) + '%')
            }
        });
        bar.animate(percent)
    }
    function skill2(id, percent){
        var bar = new ProgressBar.Line(id, {
            color: '#CF90F3',
            easing: 'easeInOut',
            strokeWidth: 3,
            trailWidth: 3,
            duration: 2400,
            text: {
                style: {
                  color: '#fff',
                  position: 'absolute',
                  right: '0',
                  top: '0',
                  padding: 0,
                  margin: 0,
                  transform: null
                },
                autoStyleContainer: false
              },
            step: function(state, bar){
                bar.setText(Math.round(bar.value()*100) + '%')
            }
        });
        bar.animate(percent)
    }
    let aboutSkill = $('.mb-about-skill')
    let skillTitle = $('.mb-about-skill h4')
    let skillContent = $('.skill-content')
    let aboutEdu = $('.mb-about-edu')
    let eduTitle = $('.mb-about-edu h4')
    let eduContent = $('.edu-content')
    skillTitle.click(function(){
        if(aboutSkill.hasClass('active')){
            skillContent.slideUp()
            aboutSkill.removeClass('active')
            $('.skill').children().not('p').remove()
        }else {
            skillContent.slideDown()
            aboutSkill.addClass('active')
            skill2('#m-after-effect', 0.95)
            skill2('#m-premi', 0.90)
            skill2('#m-cinema', 0.75)
            skill2('#m-html', 0.95)
            skill2('#m-css', 0.95)
            skill2('#m-javascript', 0.90)
        }
    })
    eduTitle.click(function(){
        if(aboutEdu.hasClass('active')){
            eduContent.slideUp()
            aboutEdu.removeClass('active')
        }else {
            eduContent.slideDown()
            aboutEdu.addClass('active')
        }
    })
    

    // portfolio 영역
    // port-tab 영역
    let portTab = $('.port-tab div')
    let portContent = $('.port-content')
    let videoExp = $('.video-exp')
    let videoExpBtn = $('.video-exp .plus-button')
    let videoExpBox = $('.video-exp-box')
    let videoPlay = $('.video-play')
    let videoSlide = $('.video .swiper-slide')
    portTab.click(function(){
        // video 재생 초기화
        videoPlay.find('iframe').remove()
        videoExpBox.find('span').remove()
        videoExpBox.find('p').remove()
        videoSlide.removeClass('off')
        videoPlay.append(`
        <iframe src="https://www.youtube.com/embed/${$(videoSlide.eq(0)).data("video")}?rel=0&playinline=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        </div>
        `)
        videoExpBox.append(`
            <span><strong>${$(videoSlide.eq(0)).find('span strong').text()}</strong></span>
            <p>${$(videoSlide.eq(0)).find('p').text()}</p>
        `)
        $(videoSlide.eq(0)).addClass('off')
        // port-exp 초기화
        videoExpBtn.removeClass('active')
        videoExp.removeClass('active')
        // port-tab 초기화
        portTab.removeClass('active')
        portContent.removeClass('active')
        // 클릭된 port-tab 활성화
        $(this).addClass('active')
        let target = $(this).index()
        portContent.eq(target).addClass('active')
    })
    portTab.eq(0).trigger('click')
        // video 영역
    // video portfolio swiper 설정
    let videoSwiper = new Swiper('.video-swiper', {
        direction: 'horizontal',
        slidesPerView: 3,
        spaceBetween: 10,
        scrollbar: {
            el: '.swiper-scrollbar1',
            draggable: true
        },
    })
    // video swiper slide 클릭 시
    videoSlide.click(function(e){
        e.preventDefault()
        // swiper slide 설정 초기화
        videoPlay.find('iframe').remove()
        videoExpBox.find('span').remove()
        videoExpBox.find('p').remove()
        videoSlide.removeClass('off')
        // 클릭한 swiper slide 설정 넣기
        videoPlay.append(`
            <iframe src="https://www.youtube.com/embed/${$(this).data("video")}?rel=0&playinline=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            </div>
        `)
        videoExpBox.append(`
            <span><strong>${$(this).find('span strong').text()}</strong></span>
            <p>${$(this).find('p').text()}</p>
        `)
        $(this).addClass('off')
    })
    videoSlide.eq(0).trigger('click')
    // video-exp btn 클릭 시
    videoExpBtn.click(function(){
        if(videoExpBtn.hasClass('active')){
            videoExpBtn.removeClass('active')
            videoExp.removeClass('active')
        }else {
            videoExpBtn.addClass('active')
            videoExp.addClass('active')
        }
    })
        // web 영역
    // web portfolio swiper 설정
    let webSwiper = new Swiper('.web-swiper', {
        direction: 'horizontal',
        slidesPerView: 1,
        spaceBetween: 32,
        scrollbar: {
            el: '.swiper-scrollbar2',
            draggable: true
        },
    })
})
