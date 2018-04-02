(function ($, Drupal) {

  //Reading page
  function split_item() {
    setTimeout(function () {
      split.destroy();
      w = $(window).width();
      if(w<768){
        split = Split(['#slpit-one', '#slpit-two'], {
          sizes: [50, 50],
          minSize: 20,
          direction: 'vertical',
          onDrag: function () {
            $(".split-item").getNiceScroll().resize();
            $('.player-fixed').css("max-width", $('.split-right').outerWidth());
          },
        });

      }else {
        split = Split(['#slpit-one', '#slpit-two'], {
          sizes: [50, 50],
          minSize: 20,
          onDrag: function () {
            $(".split-item").getNiceScroll().resize();
            $('.player-fixed').css("max-width", $('.split-right').outerWidth());
          },
        });
      }
    }, 500)
  }
  if ($('.api').length) {
    if (window.innerWidth <= 768) {
      var split = Split(['#slpit-one', '#slpit-two'], {
        sizes: [50, 50],
        minSize: 0,
        direction: 'vertical',
        onDrag: function () {
          $(".split-item").getNiceScroll().resize();
        },


      });

    } else {
      var split = Split(['#slpit-one', '#slpit-two'], {
        sizes: [50, 50],
        minSize: 0,
        onDrag: function () {
          $("#slpit-one").getNiceScroll().resize();
          $("#slpit-two").getNiceScroll().resize();
        },


      });

    }
    setTimeout(function () {
      $("#slpit-one").getNiceScroll().resize();
      $("#slpit-two").getNiceScroll().resize();
    }, 400);


  }
  if ($('.api').length) {
    $('.player-fixed').css("max-width", $('.split-right').outerWidth());
    $(window).bind('resize', function () {
      var width = window.innerWidth;
      var check = false;
      if (width <= 768) {
        check = true;

      } else {
        check = false;

      }
      if (check) {
        split.destroy();
        split = Split(['#slpit-one', '#slpit-two'], {
          sizes: [50, 50],
          minSize: 20,
          direction: 'vertical',
          onDrag: function () {
            $(".split-item").getNiceScroll().resize();
            $('.player-fixed').css("max-width", $('.split-right').outerWidth());

          },
        });

      } else {
        split.destroy();
        split = Split(['#slpit-one', '#slpit-two'], {
          sizes: [50, 50],
          minSize: 20,
          onDrag: function () {
            $(".split-item").getNiceScroll().resize();
            $('.player-fixed').css("max-width", $('.split-right').outerWidth());

          },
        });

      }
    }).trigger('resize');

  }
  //split
  $(".split-item").niceScroll({
    autohidemode: 'false'
  });

  $('.qp-items').niceScroll({
    autohidemode: 'true'
  });

  $('.rf-button-pallete').click(function () {

    if ($('.question-panel').is(':visible')) {
      $('.question-panel').removeClass("show");

    } else {
      $('.question-panel').addClass("show");
      $('.qp-items').getNiceScroll().resize();

    }

  });

  $('.show-test-menu').click(function () {
    $('.reading-header').toggleClass("show-test");


    if ($('.reading-header').hasClass("show-test")) {
      $(this).html(" <em></em>  Hide Test Info");
    } else {
      $(this).html(" <em></em>  Show Test Info");
    }
  });


  $( document ).ready(function() {
    if(findGetParameter('submit')){
      $('#modal-submit').modal('show');
    }
  });
  function findGetParameter(parameterName) {
    var result = null,
        tmp = [];
    location.search
        .substr(1)
        .split("&")
        .forEach(function (item) {
          tmp = item.split("=");
          if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
        });
    return result;
  }
  Drupal.behaviors.QuestionFront = {
        attach: function (context, settings) {

          //newsletter
          $('.our-test-item').matchHeight();
          $("form#subscriber-form").submit(function(e){
            $("form#subscriber-form button").attr('disabled',true);
            var mail = $(".subscriber").val();
            if(mail ==''){
              $(".error-message.newsletter-error").text('Email is required.');
              return false;
            }
            if(!validateEmail(mail)){
              $(" .error-message.newsletter-error").text('Email is invalid.');
              return false;
            }
            $.post('/subscriber/callback', { email: mail})

                .done(function (data) {
                  if (data == 'ok') {
                    $("#modal-subscribe").modal('show');
                    $("form#subscriber-form button").attr('disabled',false);
                    $(".subscriber").val('');

                  }
                });
            return false;
          });


          if ($('.api').length) {
          }
            $('.rate-widget-fivestar a').hover(function () {
                $(this).addClass('hover');
                $(this).prevAll().addClass("hover");
                $(this).prevAll().removeClass("hover-fa-star-o");
                $(this).nextAll().removeClass("hover");
                $(this).nextAll().addClass("hover-fa-star-o");
            });
            $('.rate-widget-fivestar').mouseleave(function () {
              $(this).find(".hover").removeClass("hover");
              $(this).find(".hover-fa-star-o").removeClass("hover-fa-star-o");
            });

            $(".progress-state").each(function () {
                var per = $(this).attr('data');
                $(this).css('width', per);
            });

            if(window.location.href.indexOf("#academic") > -1) {
                $("#tab-click-3").click();
            }
            if(window.location.href.indexOf("#general-training") > -1) {
                $("#tab-click-4").click();
            }
            $("ul.menu-main li a").each(function(){

              $(this).click(function(){
                var href = $(this).attr('href');
                if(href.indexOf("#general-training") > -1){
                  $("#tab-click-4").click();
                }
                if(href.indexOf("#academic") > -1){
                  $("#tab-click-3").click();
                }
              });

            });
          $("a.explanation-click").each(function () {
            $(this).click(function (e) {
              split_item();
              setTimeout(function () {
                split.destroy();
                w = $(window).width();
                if(w<768){
                  split = Split(['#slpit-one', '#slpit-two'], {
                    sizes: [50, 50],
                    minSize: 20,
                    direction: 'vertical',
                    onDrag: function () {
                      $(".split-item").getNiceScroll().resize();
                      $('.player-fixed').css("max-width", $('.split-right').outerWidth());
                    },
                  });

                }else {
                  split = Split(['#slpit-one', '#slpit-two'], {
                    sizes: [50, 50],
                    minSize: 20,
                    onDrag: function () {
                      $(".split-item").getNiceScroll().resize();
                      $('.player-fixed').css("max-width", $('.split-right').outerWidth());
                    },
                  });
                }
              }, 500)
            });
          });
            /**Preload**/
            $('#page-loader').delay(800).fadeOut(600, function () {
                $('body').fadeIn();

            });
          $("a.share-result").each(function(){
            $(this).click(function(e){
              e.preventDefault();
              $("input.share-result").select();
              document.execCommand("Copy");
            }) ;
          });


            //mathHeight
            $('.book-item').matchHeight();

            $('.nav-icon').click(function () {
                $(this).toggleClass('open');
                $('body').toggleClass("open-menu");
            });
            /**Menu**/


            $('.menu-res li.has-child a.has-child-link').on('click', function (event) {

                event.stopPropagation();
                var submenu = $(this).next();
                if ($(submenu).is(":visible")) {
                    $(submenu).slideUp();
                    $(this).removeClass("open-submenu-active");
                } else {
                    $(submenu).slideDown();
                    $(this).addClass("open-submenu-active");
                }
                return false;
            });

            $('.menu-res li.menu-item-has-children > a').on('click', function () {
                //  return false;
            });


            //listing page

            $('#qp-afix').affix({
                offset: {
                    top: 290,
                    bottom: function () {
                        return (this.bottom = $('.footer').outerHeight(true) + 100)
                    }
                }
            })

            //show-nodepad
            $('.btn-show-note').unbind().click(function (event) {
                event.preventDefault();
                var id = $(this).attr("data-target");
                if ($(this).hasClass("active")) {
                    $(id).slideUp();
                    $(this).removeClass("active");
                    $(this).html(" <strong></strong> Show Notepad");

                } else {
                    $(id).css('display', 'block');
                    $(id).slideDown();
                    $(this).addClass("active");
                    $(this).html(" <strong></strong> Hide Notepad");
                }
                if ($('.reading-box')[0]) {
                  split_item();
                }

            });

            //text-size
            $('.btn-textsize').click(function () {
              if($(this).hasClass('btn-textsize-big')){
                $(this).removeClass('btn-textsize-big');
                $('body').removeClass("text-big");
              }else {
                $(this).addClass('btn-textsize-big');
                $('body').addClass("text-big");
              }
            });


            //tips page


            var owl_tip = $('.owl-tip')
            $(owl_tip).owlCarousel({
                loop: true,
                margin: 0,
                nav: false,
                autoplay: true,
                autoplayTimeout: 8000,
                items: 1


            });

            //analytics page
            if ($('.datetimepicker').length) {
                $(function () {
                    $('.datetimepicker').datetimepicker({
                        format: 'DD/MM/YYYY'
                    });
                });
            }

            //show-performance
            $('.btn-show-performance').click(function () {


                if ($(this).parents(".item-score").find(".box-performance").is(":visible")) {
                    $(this).parents(".item-score").find(".box-performance").slideUp();
                    $(this).removeClass("active");

                } else {

                    $(this).parents(".item-score").find(".box-performance").slideDown();
                    $(this).addClass("active");
                }


            });
            //homepage
            var owl_say = $('.owl-say')
            $(owl_say).owlCarousel({
                loop: true,
                margin: 0,
                nav: false,
                autoplay: true,
                autoplayTimeout: 8000,
                responsive: {
                    0: {
                        items: 1,

                    },
                    768: {
                        items: 2,

                    },
                    1000: {
                        items: 3,

                    }
                }

            });
            $('.carousel').carousel({
                directionNav: false,
                buttonNav: 'bullets',
                slidesPerScroll: 5,
                top: 10,
                hMargin: 0.1,
                frontWidth: 500,
                autoplayInterval: 8000,
                description: true,
                pauseOnHover: true,
                descriptionContainer: '.description'
            });

            //set progesss
            var setProcess = function (id, number) {

                $(id).removeClass(function (index, className) {
                    return (className.match(/(^|\s)progress-\S+/g) || []).join(' ');
                });
                var newClass = "progress-" + number;
                $(id).addClass(newClass);

            };
            // setProcess("#progress-small", 75);
            // setProcess("#progress-big", 40);

            //show-re
            $('.btn-show-re').click(function () {
                $('body').addClass("show-review-explanation");
                $(".split-item").getNiceScroll().resize();
                $('.player-fixed').css("max-width", $('.split-right').outerWidth());
            });
            //close-re
            $('.close-rx').click(function () {
                $('body').removeClass("show-review-explanation");
            });

            //build-pofile
            $('.pb-choose span').click(function () {

                $('.pb-choose span').removeClass("active");
                $(this).addClass("active");
                $('.bo-im span').html($(this).text());
            });

            $('.step2-choose').click(function () {

                var current = $(this).next(".ts2-item-wrap");
                $('.ts2-item-wrap').not(current).slideUp();
                if ($(this).next(".ts2-item-wrap").is(":visible")) {

                } else {
                    $(this).next('.ts2-item-wrap').slideDown();
                }
                $('.step2-choose').removeClass("active");
                $(this).addClass("active");
            });



          function validateEmail(email) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email.toLowerCase());
          }

        }
    }
})(jQuery, Drupal);
