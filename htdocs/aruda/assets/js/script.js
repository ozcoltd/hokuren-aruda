$(function(){
    //more ブロック
    var $jsMoreBtn = $('.js-more-btn');
    $jsMoreBtn.on('click',function(e){
        e.preventDefault();
        $(this).parent('.js-more-block').height('100%').addClass('is-open');
        $(this).hide();
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

                } else if(!$(this).hasClass('is-open') && !$this.find('.js-accordion-check').hasClass('is-all')) {
                    //アコーディオンが閉じてて、全選択チェックがついてない場合
                    $this.find('.js-accordion-check').addClass('is-all');
                    $check.each(function(){
                        $(this).addClass('is-all');
                        $(this).find('input').prop('checked',true);
                    });
                } else if(!$(this).hasClass('is-open') && $this.find('.js-accordion-check').hasClass('is-all')) {
                    //アコーディオンが閉じてて、全選択チェックがついてる場合
                    $this.find('.js-accordion-check').removeClass('is-all');
                    $this.find('.js-accordion-check').removeClass('is-check');
                    $check.each(function(){
                        $(this).removeClass('is-all');
                        $(this).find('input').prop('checked',false);
                    });
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
            }
        });
    });
    //map
    $('.js-map').on('click',function(e){
        e.preventDefault();
        var target = $(this).attr('href');        
        $(target).find('.js-accordion-check').addClass('is-all');
        $(target).find('.js-accordion-contents').find('.js-check').each(function(){
            $(this).addClass('is-all');
            $(this).find('input').prop('checked',true);
        });
        $(target).find('.js-accordion-btn').addClass('is-open');
        $(target).find('.js-accordion-contents').slideDown();
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
});