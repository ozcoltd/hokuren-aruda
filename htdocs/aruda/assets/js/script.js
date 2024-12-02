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
});