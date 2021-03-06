function barbaReady() {
  Barba.Dispatcher.on('newPageReady', function(currentStatus, oldStatus, container, newPageRawHTML) {
    var js = container.querySelectorAll("script");
    for (i = 0; i < js.length; i++) {
      eval(js[i].innerHTML);
    }
  })

  var transition = Barba.BaseTransition.extend({
    start: function() {
      Promise.all([
        this.newContainerLoading,
        this.fadeOut()
      ]).then(
        this.fadeIn.bind(this)
      );
    },
    fadeOut: function() {
      return $(this.oldContainer).animate({ opacity: 0}).promise();
    },
    fadeIn: function() {

      $("html, body").animate({ scrollTop: $(this.newContainer).parent().offset().top }, 800);
      $(this.newContainer).parent().scrollTop(0);

      var _this = this;
      var $el = $(this.newContainer);

      $(this.oldContainer).hide();

      $el.css({
        visibility: 'visible',
        opacity: 0
      });

      switchMode(darkMode, false);

      renderKatex();

      $el.animate({ opacity: 1 }, 400, function() {
        _this.done();
      });
    }
  });

  Barba.Pjax.getTransition = function() {
    return transition;
  };

  Barba.Pjax.start();
}