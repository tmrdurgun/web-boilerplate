$(document).ready(function () {
    /* App global functions */


    /* Responsive Helper */
    var responsiveHelper = function(viewport_size, callback, elseCallback){
        (function($, viewport){

            if(viewport.is(viewport_size)) {
                callback();
            }else{
                if (elseCallback) {
                    elseCallback();    
                }
            }

        })(jQuery, ResponsiveBootstrapToolkit);
    }

    /* Fix element position */
    var fixPosition = function (el, distance, classname) {
        $(window).scroll(function () {
            var win_height = $(this).scrollTop();

            if (win_height > distance) {
                el.addClass(classname);
            } else {
                el.removeClass(classname);
            }
        })
    }

    /* inline type lightbox
        container:  .inline-lightbox-item
        trigger link: .inline-lightbox-open-link
        lightbox content: .inline-lightbox-open-link > next node
    */
    if ($('.inline-lightbox-item').length){
        var inlineLightBox = function(){
            var trigger = $('.inline-lightbox-item').children(".inline-lightbox-open-link");

            trigger.each(function(){
                var content_src = $(this).next().html();

                $(this).magnificPopup({
                    items: {
                        src: content_src,
                        type: 'inline'
                    }
                });
            });
        
        }

        inlineLightBox();    
    }

    /* image type lightbox */
    if ($(".image-lightbox-item").length) {

        $('.image-lightbox-item').magnificPopup({
            type: 'image',
            gallery: {
                enabled: true
            }
        });
    }

    /* iframe type lightbox */
    if ($(".iframe-lightbox-item").length) {

        $('.iframe-lightbox-item').magnificPopup({
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160
        });
    }

    /* Main menu */
    $(".main-menu li").click(function(){
        var main_menu = $(this);
        var main_menu_dropdown = $(this).children("ul");

        main_menu_dropdown.toggleClass("hide show");
        main_menu_dropdown.toggleClass("hidden visible");

        $("body").mouseup(function(e){
            if(!main_menu.is(e.target) && !main_menu_dropdown.is(e.target) && main_menu_dropdown.hasClass("show")){

                $(".main-menu li ul").removeClass("show").addClass("hide");
                $(".main-menu li ul").removeClass("visible").addClass("hidden");
            }
        });        
    });

    $(".fake-anchor").click(function(){
        var url = $(this).attr("data-href");
        location.href = url;
    });

    /* Main menu mobile */
    responsiveHelper("<=md", function(){
            var main_menu = $(".main-menu");
            var mobile_menu = $(".mobile-menu");
            var language = $(".language");
            
            main_menu.appendTo(mobile_menu);
            language.appendTo(mobile_menu);
            main_menu.toggleClass("main-menu main-menu-mobile");

            $("#logo").prependTo($("#main-header > .container > .row"));

            $(".mobile-menu-btn,.mobile-menu-behind").click(function () {
                $(".mobile-menu").toggleClass("menu-slideRight");
                $(".mobile-menu-behind").toggleClass("menu-slideRight");
                $(".mobile-menu-btn").toggleClass("rotate90");
                $(".hamburger").toggleClass("is-active");
            });

            $(".section").removeClass("paddingLeftRight-40");
        }
    );

    /* header fix position reach 120px from top */
    fixPosition($("body .main-container #main-header"), 1, "fixed-default-forced");

    if ($(".form").length) {
        jQuery('.form').find('input, textarea').on('keyup blur focus', function (e) {
  
          var $this = $(this),
              label = $this.prev('label');

              if (e.type === 'keyup') {
                    if ($this.val() === '') {
                  label.removeClass('active highlight');
                } else {
                  label.addClass('active highlight');
                }
            } else if (e.type === 'blur') {
                if( $this.val() === '' ) {
                    label.removeClass('active highlight'); 
                    } else {
                    label.removeClass('highlight');   
                    }   
            } else if (e.type === 'focus') {
              
              if( $this.val() === '' ) {
                    label.removeClass('highlight'); 
                    } 
              else if( $this.val() !== '' ) {
                    label.addClass('highlight');
                    }
            }

        });
    }

    if ($("#registerLoginFormView").length) {
        $('.tab a').on('click', function (e) {
  
          e.preventDefault();
          
          $(this).parent().addClass('active');
          $(this).parent().siblings().removeClass('active');
          
          target = $(this).attr('href');

          $('.tab-content > div').not(target).hide();
          
          $(target).fadeIn(600);
          
        });
    }

    /* Tab */
    if($(".tab").length){ 

        $(".tab a.tablinks").click(function() {
            $(this).addClass("active");
            $(".tab a.tablinks").not(this).removeClass("active");

            var tab_to_show = $(this).attr("data-tab-link");

            $(tab_to_show).removeClass("hide").addClass("show");
            $(".tabcontent").not(tab_to_show).removeClass("show");
            $(".tabcontent").not(tab_to_show).addClass("hide");
        });

        if ($("#payment-type-form").length){
            var active_payment = $(".tab a.tablinks.active").attr("data-tab-link");
            $("#payment-type").val(active_payment.substr(1));

            $(".tab a.tablinks").click(function(){
                var selected_payment = $(this).attr("data-tab-link");
                $("#payment-type").val(selected_payment.substr(1));
            });
        }
    }
    /* Tab */

    /* form validation */
    jQuery.validator.addMethod('customphone', function (value, element) {
        return this.optional(element) || /^\d{4}\d{3}\d{4}$/.test(value);
    }, "Lütfen geçerli bir telefon numarası giriniz (05xx)");

    /*jQuery.validator.addClassRules({
        phone: { customphone: true }
    });*/

    /* input mask */
    $(".phone").mask("0599 999 99 99");

    /* form submits */
    if ($(".form").length) {
        $(".validate").validate();
    }

    /* Payment select */
    if ($(".go-success-btn").length) {
        $(".go-success-btn").click(function(){
            var selected_payment = $("#payment-type").val();

            //console.log(selected_payment);
        });
    }

    // Sliderpro Limitleme
    var sliderProLimiter = function (el, limit) {
        el.each(function () {

            var count = $(this).find(".sp-slides > .slide-list > div").length;
            var slicesCount = limit;
            var d = Math.ceil(count / slicesCount);

            for (var i = 0; i < d; i++) {

                $(this).find(".sp-slides").append('<div class="sp-slide"></div>');

                for (var c = 0; c < slicesCount; c++) {

                    $(this).find(".slide-list > div").eq(0).appendTo($(this).find(".sp-slide:eq(" + i + ")"))
                }
            }

            $(this).find(".slide-list").remove();

        });
    }

    /* HelpSlider */

    $("#helpPageSlider").sliderPro({
        width: '100%',
        height: 280,
        arrows: true,
        fadeArrows: false,
        buttons: false,
        loop: false,
        autoplay: false
    });

    var secondSlide = $("#helpPageSlider .sp-slides").children(".sp-slide").eq(1);
    var secondSlideItem = secondSlide.children(".col-lg-4").eq(1);

    $("#helpPageSlider .sp-slide").each(function(){
        var childCount = $(this).children().length;

        if(childCount < 3){
            secondSlideItem.clone().appendTo($(this));
        }
    });

});

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function CompleteBtn(data){
      $.post('/user-checkout', data, function (response) {
        console.log(response);
        if (response.success) {
            window.location = '/tamamlandi?order=' + response.webOrder._id;
        } else if (response.code === 422) {
            $('#loggedPasswordView').addClass('has-error');
        }
    });
}

function GetCheckoutData(productId,customerEmail,productCategory,purchasedWithAccount,quantity,password){
var data =  {
                product:productId,
                username:customerEmail,
                password:password,
                productCategory:productCategory,
                purchasedWithAccount:purchasedWithAccount,
                quantity:quantity
            };
            return data;
}