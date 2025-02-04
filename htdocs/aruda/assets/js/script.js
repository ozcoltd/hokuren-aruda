$(function(){
    //more ブロック
    $('.js-more-block').each(function(){
        var $jsMoreBtn = $(this).find('.js-more-btn');
        var h = $(this).height();
        $jsMoreBtn.on('click',function(e){
            e.preventDefault();
            if($(this).hasClass('js-top-info')){
                if($(this).parent('.js-more-block').hasClass('is-open')){
                    $(this).html('詳細を見る<span><img src="/aruda/assets/images/common/ico_add_g.svg" alt=""></span>');
                    $(this).parent('.js-more-block').removeClass('is-open').height(h);
                } else {
                    h = $(this).parent('.js-more-block').height();
                    $(this).html('詳細を閉じる<span></span>');
                    $(this).parent('.js-more-block').addClass('is-open').height($(this).parent('.js-more-block').find('.c-more-block__contents').height() +$(this).height());
                }
            } else {
                $(this).hide();
                $(this).parent('.js-more-block').addClass('is-open').height($(this).parent('.js-more-block').find('.c-more-block__contents').height());
            }
        });
    });


    //tab
    $('.js-tab').each(function(){
        var $this = $(this);
        $(this).find('.js-tab-trigger').on('click',function(e){
            e.preventDefault();
            if($(this).hasClass('is-current')) { return; }
            $this.find('.js-tab-trigger').removeClass('is-current');
            $(this).addClass('is-current');
            var index = $this.find('.js-tab-trigger').index($(this));
            //カレント表示の変更
            $this.find('.js-tab-list').attr("data-current", index);
            //カレントコンテンツ表示の変更
            $this.find('.js-tab-contents').removeClass('is-current').hide();
            $this.find('.js-tab-contents').eq(index).fadeIn().addClass('is-current');
        });
    });
    //menu
    let scrollPosition = 0;
    $('.js-menu-trigger').on('click',function(e){
        e.preventDefault();
        scrollPosition = $(window).scrollTop();
        $('body').addClass('is-fixed');
        $('body').css({top: `-${scrollPosition}px`});
        $('.js-menu-modal').fadeIn();
    });
    $('.js-menu-close-trigger').on('click',function(e){
        e.preventDefault();
        $('body').removeClass('is-fixed');
        $('body').css({top: ''});
        $(window).scrollTop(scrollPosition);
        $('.js-menu-modal').fadeOut();
    });
    //会員証モーダル
    $('.js-membership-trigger').on('click',function(e){
        e.preventDefault();
        scrollPosition = $(window).scrollTop();
        $('body').addClass('is-fixed');
        $('body').css({top: `-${scrollPosition}px`});
        $('.js-membership-modal').fadeIn();
    });
    $('.js-membership-close-trigger').on('click',function(e){
        e.preventDefault();
        $('body').removeClass('is-fixed');
        $('body').css({top: ''});
        $(window).scrollTop(scrollPosition);
        $('.js-membership-modal').fadeOut();
    });

    //selectの色変更
    const selects = document.getElementsByTagName("select");

    // 各select要素にイベントリスナーを追加
    Array.from(selects).forEach((select) => {
      select.addEventListener("change", () => {
        if (select.value === "") {
          select.style.color = "#A0A0A0"; // 値が空の場合の文字色
        } else {
          select.style.color = "#4B4B4B"; // 値がある場合の文字色
        }
      });
  
      // 初期状態の文字色を設定
      if (select.value === "") {
        select.style.color = "#A0A0A0";
      } else {
        select.style.color = "#4B4B4B";
      }
    });

    //区分
    $('.js-kubun').each(function(){
        const $this = $(this);
        $(this).find('input').on('change',function(){
            var index = $this.find('input').index($(this));
            $('.js-kubun-item').removeClass('is-active');
            $this.find('.js-kubun-item').eq(index).addClass('is-active');
        });
    });
    $('.js-interlocking-select').each(function(){
        const $this = $(this);
        $this.find('.js-parent-select').on('change',function(){
            if($(this).val()) {
                $this.find('.js-child-select').prop('disabled',false)
            } else {
                $this.find('.js-child-select').val('');
                $this.find('.js-child-select').prop('disabled',true)
            }
        });
    });
    //アコーディオン
    $('.js-accordion').each(function(){
        var $this = $(this);
        var $check = $this.find('.js-accordion-contents').find('.js-check');


        $(this).find('.js-accordion-btn').on('click',function(e){
            e.preventDefault();

            //チェックボックの場合
            if($(e.target).hasClass('js-accordion-check')) {
                if(
                    ($(this).hasClass('is-open') && $this.find('.js-accordion-check').hasClass('is-all'))
                    ||  ($(this).hasClass('is-open') && $this.find('.js-accordion-check').hasClass('is-check'))
                ) {
                    //アコーディオンが開いてて、チェックがついてる場合
                    $this.find('.js-accordion-check').removeClass('is-all');
                    $this.find('.js-accordion-check').removeClass('is-check');
                    $check.each(function(){
                        $(this).removeClass('is-all');
                        $(this).find('input').prop('checked',false);
                    });
                    $('.js-active-map[data-map="#' + $this.attr('id') + '"]').removeClass('is-active');
                    //console.log('全部外す');

                } else if(!$(this).hasClass('is-open') && !$this.find('.js-accordion-check').hasClass('is-all')) {
                    //アコーディオンが閉じてて、全選択チェックがついてない場合
                    $this.find('.js-accordion-check').addClass('is-all');
                    $check.each(function(){
                        $(this).addClass('is-all');
                        $(this).find('input').prop('checked',true);
                    });
                    $('.js-active-map[data-map="#' + $this.attr('id') + '"]').addClass('is-active');
                    //console.log('全部チェック');
                } else if(!$(this).hasClass('is-open') && $this.find('.js-accordion-check').hasClass('is-all')) {
                    //アコーディオンが閉じてて、全選択チェックがついてる場合
                    $this.find('.js-accordion-check').removeClass('is-all');
                    $this.find('.js-accordion-check').removeClass('is-check');
                    $check.each(function(){
                        $(this).removeClass('is-all');
                        $(this).find('input').prop('checked',false);
                    });
                    $('.js-active-map[data-map="#' + $this.attr('id') + '"]').removeClass('is-active');
                    //console.log('全部外す');
                    return;
                }
            }

            $(this).toggleClass('is-open');
            $this.find('.js-accordion-contents').slideToggle();
        });
        //チェックボックス
        $(this).find('.js-check').on('change',function(){
            $(this).toggleClass('is-all');
            var allCheckboxes = $this.find('.js-accordion-contents').find('.js-check input');
            var checkedCheckboxes = $this.find('.js-accordion-contents').find('.js-check input:checked');
            if(checkedCheckboxes.length > 0) {
                if (allCheckboxes.length === checkedCheckboxes.length) {
                    //全てにチェックがついてる場合
                    $this.find('.js-accordion-check').removeClass('is-check');
                    $this.find('.js-accordion-check').addClass('is-all');
                } else {
                    //1つ以上チェックがついてる場合
                    $this.find('.js-accordion-check').removeClass('is-all');
                    $this.find('.js-accordion-check').addClass('is-check');
                }
            } else {
                //チェックがついてない場合
                $this.find('.js-accordion-check').removeClass('is-all');
                $this.find('.js-accordion-check').removeClass('is-check');
                //console.log('外れた');
                $('.js-active-map[data-map="#' + $this.attr('id') + '"]').removeClass('is-active');
            }
        });
    });
    //map
    //全部外す
    $('.js-form-map').each(function(){
        var $this = $(this);

        $this.find('.js-map').on('click',function(e){
            e.preventDefault();
            var target = $(this).attr('href');
            console.log(target);

            $this.find('.js-active-map[data-map="' + target + '"]').addClass('is-active');
            $(target).find('.js-accordion-check').addClass('is-all');
            $(target).find('.js-accordion-contents').find('.js-check').each(function(){
                $(this).addClass('is-all');
                $(this).find('input').prop('checked',true);
            });
            $(target).find('.js-accordion-btn').addClass('is-open');
            $(target).find('.js-accordion-contents').slideDown();
        });

        $this.find('.js-map').hover(
            function () {
                $this.find('.js-active-map').removeClass('is-hover');
                var target = $(this).attr('href'); 
                $this.find('.js-active-map[data-map="' + target + '"]').addClass('is-hover');
            },
            function () {
                $this.find('.js-active-map').removeClass('is-hover');
            }
          );


        $this.find('.js-all-remove').on('click',function(e){
            e.preventDefault();
            $this.find('.js-active-map').removeClass('is-active');
            $this.find('.js-accordio').find('input').prop('checked',false);
            $this.find('.js-accordion-btn').removeClass('is-open');
            $this.find('.js-accordion-check').removeClass('is-all');
            $this.find('.js-accordion-check').removeClass('is-check');
            $this.find('.js-accordion-contents').hide();
            $this.find('.js-check').removeClass('is-all');
            

        });

    });
    //検索結果表示切替
    $('.js-display-toggle').on('click',function(e){
        e.preventDefault();
        if($(this).hasClass('is-active')) { return; }
        $('.js-display-toggle').removeClass('is-active');
        $(this).addClass('is-active');
        $('.js-display-contents').find('> div').removeClass('is-active');
        $($(this).attr('href')).addClass('is-active');
    });

    //中古詳細カルーセル
    if($('.js-carousel').length > 0){
        $('.js-carousel').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 5000,
            arrows: true,
            dots: true,
            infinite: true,
            swipe: true
        });
    }
    //ページトップ
    $('.js-pagetop').on('click',function(e){
        e.preventDefault();
        $('html, body').animate({ scrollTop: 0 }, 500);
    });

    //アンカー
    $('.js-anc').on('click', function (e) {
        e.preventDefault(); // デフォルトの動作を無効化
        const target = $($(this).attr('href')); // スクロール先のターゲット要素
        if (target.length) {
          $('html, body').animate(
            {
              scrollTop: target.offset().top - 20, // ターゲット要素の位置までスクロール
            },
            500, // アニメーションの速度 (ミリ秒)
            'swing' // イージング
          );
        }
      });
    //sort
    $('.js-sort').each(function(){
        var $this = $(this);
        $this.find('.js-sort-trigger').on('click',function(e){
            e.preventDefault();
            if($(this).hasClass('is-current')) { return; }
            $this.find('.js-sort-trigger').removeClass('is-current');
            $(this).addClass('is-current');
            var index = $this.find('.js-sort-trigger').index($(this));
            //カレント表示の変更
            $this.find('.js-sort-list').attr("data-current", index);
        });
    });

});