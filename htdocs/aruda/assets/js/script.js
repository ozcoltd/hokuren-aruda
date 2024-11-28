$(function(){
    //more ブロック
    var $jsMoreBtn = $('.js-more-btn');
    $jsMoreBtn.on('click',function(e){
        e.preventDefault();
        $(this).parent('.js-more-block').height('100%');
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

});