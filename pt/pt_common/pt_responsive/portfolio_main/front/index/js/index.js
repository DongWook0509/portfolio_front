$(function(){
   
    var $menu = $('#top_menu ul li'),
        $contents = $('#contents > div');


    /*
    $menu를 클릭하면 해당 요소에만 클래스명 on 추가 되도록
    */

    $menu.click(function(ev){
        
        /*
          $menu.removeClass('on');
          $(this).addClass('on');
        */
       ev.preventDefault();
       //siblings (발동조건 : 형제자매 )
       $(this).addClass('on').siblings().removeClass('on');

       //인덱스번호로 요소를 선택하기 위해서 
       var idx = $(this).index();

       //인덱스 번호와 동등한 요소를 찾겠습니다.
       //지금 상태에서 화면에서 얼만큼 떨어져 있는지 알수 있어야 합니다.
       //그리고 바로 선택자.offset().top

       var section = $contents.eq(idx)
       console.log("section : " + section);
       
       //선택자를 찾았으니 offset().top을 사용합니다.
       var sectionDistance = section.offset().top;
       console.log("sectionDistance : " + sectionDistance);

       //메뉴를 클릭을 하면 스크롤양이 만들어져서 이동을 하게끔 홥니다.
       //A.scrollTop() 스크롤양을 확인이 아니라 스크롤의 양을 줘야함
       //$('html').stop().animate({속성 : 값 });
       //스크롤의 양이란 속성이 있다.

       //주의점 : body라고 하면 안먹습니다. 
       $('html, body').stop().animate({scrollTop : sectionDistance});
    });

       //스크롤의 양의 거리와 유저가 최소한 이 스크롤 보다 많이 했던 양을 비교해서 (개검사)
       //넌 section2 의 스크롤보다 많이 했네? 그럼 active를 줘서 메뉴바를 bold로 처리
       //저를 볼 타이밍보다 사용자가 많이 스크롤 했어요! 손을 들어줘야함

       //파라미터값에 idx를 물고 들어올 수 있습니다.
       // 0, 1, 2, 순으로 idx 

       /*윈도우 스크롤이 생기면 
            $contents 마다 할일 
                각각의 화면상단에서의 거리 sectionDistance 보다 
                스크롤양이 많은지 적은지 
                많다는 조건이 참이면
                    각요소마다 순변 변수명을 idx에 저장
                    그 순번에 해당하는 메뉴에만 클래스명 on 추가 */
    $(window).scroll(function(){
        $contents.each(function(){
            if($(this).offset().top <= $(window).scrollTop() + 100){ 
                var idx = $(this).index();
                $menu.removeClass('on');
                $menu.eq(idx).addClass('on');
            }
        });
    });

    $.getJSON('https://api.openweathermap.org/data/2.5/weather?id=1835848&appid=6720d033f8dcf818e5ab322f3818cc13&units=metric', function(data){
        //data로 할일 (전체 데이터를 data로 받았습니다.)
        //alert(data.list[0].main.temp_min);
        /* --아까시간 기준
        var $minTemp = data.list[0].main.temp_min;
        var $maxTemp = data.list[0].main.temp_max;
        var $cTemp = data.list[0].main.temp;
        var $cCata = data.list[0].dt_txt;
        var $wIcon = data.list[0].weather[0].icon;
        alert($wIcon);
        */

        var $minTemp = data.main.temp_min;
        var $maxTemp = data.main.temp_max;
        var $cTemp = data.main.temp;
        //현재시각 계싼하기 
        var $now = new Date($.now());
        var $cData = $now.getFullYear() +'/'+ ($now.getMonth()+1) +'/'+ $now.getDate() +'/' + $now.getHours() + ':' + $now.getMinutes();
        //var $cData = data.dt;
        var $wIcon = data.weather[0].icon;

        //A.appendTo(B) B요소의 내용의 뒤에 A를 추가 
        //A.append(B) A요소의 내용의 뒤에 B를 추가 
        //A.prependTo(A) B요소의 내용의 앞에 A를 추가
        //A.prependTo(B) A요소의 내용의 앞에 B를 추가
        $('.ctemp').append($cTemp + '도');
        $('.clowtemp').append($minTemp + '도');
        $('.chightemp').append($maxTemp + '도');
        $('.title_weather').prepend($cData);
        $('.cicon').append('<img src ="https://openweathermap.org/img/wn/' + $wIcon + '@2x.png">');
        //<img src ="https://openweathermap.org/img/wn/10d@2x.png" alt="날씨"> 

        //unix의 시간입니다.
        // Date.now(); == $.now
        //alert(Date.now()); //1693831011356 
        //alert($.now()); //1693831011356 

        //new Date(Date.now());
        //new Date($.now())

        //new Date(Date.now()) == new Date($.now())
        //alert(new Date(Date.now())); //Mon Sep 04 2023 21:38:53 GMT+0900 (한국 표준시)
        var $now = new Date($.now());

        var mixer = mixitup('.mix-wrapper', {
            "animation": {
                "duration": 398,
                "nudge": true,
                "reverseOut": false,
                "effects": "fade scale(0.16) translateX(59%) translateZ(-100px) rotateX(87deg)"
              }
        });//mixitup
    
        /* //filter 버전
            $('#filter-select').change(function(){
                //값이 바뀌면 할일 
                let value = $(this).val(); 
                console.log(value);
                mixer.filter(value);
            });
    
            //sort 버전
            $('#sort-select').change(function(){
                //값이 바뀌면 할일 
                let value = $(this).val(); 
                console.log(value);
                mixer.sort(value);
            });
         */
    })


    progressText = $('.js_text');
    progressRate = progressText.attr('data-rate');
    progressText1 = $('.jq_text');
    progressRate1 = progressText1.attr('data-rate');
    progressText2 = $('.pt_text');
    progressRate2 = progressText2.attr('data-rate');
    progressText3 = $('.ai_text');
    progressRate3 = progressText3.attr('data-rate');

    $({rate:0}).animate({rate:progressRate, rate1:progressRate1 , rate2:progressRate2 , rate3:progressRate3}, {
        duration: 6500, //1.5s
        //중간중간 마다 할일 progress
        //0에서 24s 로 바뀌는 그때그때마다의 할일 
        progress:function(){
           var now = this.rate;
           var now1 = this.rate1;
           var now2 = this.rate2;
           var now3 = this.rate3;
           progressText.text(Math.ceil(now) + '%');
           progressText1.text(Math.ceil(now1) + '%');
           progressText2.text(Math.ceil(now2) + '%');
           progressText3.text(Math.ceil(now3) + '%');
        }
      });

       
   
      var $services = $('.services_bottom');
      var $serviceExecuted = false;

      $(window).scroll(function(){

          var $currentSct = $(this).scrollTop();
          var $offset = 900;

          //(2) service-item 나타나기
          
          var  $serviceThreshold = $services.offset().top - $offset;

          if(!$serviceExecuted){ //이 조건이 참이라서 한번 실행이 됬으면
              if($currentSct > $serviceThreshold){
                  $services.addClass('active');
                  $serviceExecuted = true; //다시금, 혹여나 할려고 해도 true로 바뀌기 때문에 이 조건이 참이 안되기 떄문에 못함
              }
          }
      });
    
 
    var $button = $('.mix.design a'),
    $designButton = $('.design_box a'),
    $target = $('#lightbox-overlay'),
    $targetImg =  $target.find('img');

    /*
    (1) $button 클릭하면 
    클릭된 그 요소의 속성중에서 속성명 data-lightbox의 값을 변수명 newImg에 저장 

    (2) #lightbox-overlay에 클래스명 visible 추가

    (3) #lightbox-overlay img 요소의 src 속성의 값을 newImg 변경
    */

    $button.click(function(ev){
        ev.preventDefault();
        var newImg = $(this).find('img').attr('data-lightbox');
        console.log(newImg); //images/image-3.jpeg

        $target.addClass('visible');

        $targetImg.attr('src', newImg);
    });

    $designButton.click(function(ev){
        ev.preventDefault();
        var newImg = $(this).find('img').attr('data-lightbox');
        console.log(newImg); //images/image-3.jpeg

        $target.addClass('visible');

        $targetImg.attr('src', newImg);
    });
    
    $target.click(function(){
        $(this).removeClass('visible');
    });

    //top 버튼 jQuery
    $(window).scroll(function(){
        if($(this).scrollTop()>=2000){
            $('.go_top').fadeIn();
        }else{
            $('.go_top').fadeOut();
        }
    });

    $('.go_top').click(function(e){
        e.preventDefault();
        $('html, body').stop().animate({scrollTop:0}, 500);
    });




});