(function($){
  "use strict";
  /*
  *  Add eventracker for facebook subscription
  */

  $( document ).ready(function() {
      var ans = $(".answer").length;
      ans = ans + 1;
      $(".add-more").click(function(){
        $(".answer-warapper").append('<div data="'+ans+'" class="anser answer-'+ans+' form-group"><label for="answer-'+ans+'">Answer '+ans+'</label><input id="answer-'+ans+'" class="form-control answer-form" value="" type="text" /></div>');
        ans = ans + 1;
      });

      $("#qnumber").focus();

  });

})(jQuery);