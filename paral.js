if ( jQuery('.page-hero').length ) {
  var disappearPos =  jQuery(window).height() - jQuery('.page-hero').offset().top;
  var imgWindowHeight= jQuery('.page-hero').height();
  var imageHeight = 500;
  var originalPercentage = 0;

  var getBackgroundImageSize = function(el) {
      var imageUrl = jQuery(el).css('background-image').match(/^url\(["']?(.+?)["']?\)$/);
      var dfd = new jQuery.Deferred();

      if (imageUrl) {
          var image = new Image();
          image.onload = dfd.resolve;
          image.onerror = dfd.reject;
          image.src = imageUrl[1];
      } else {
          dfd.reject();
      }

      return dfd.then(function() {
          return { width: this.width, height: this.height };
      });
  };

  jQuery(window).scroll(function() {
      if (jQuery(window).width() > 1024) {
          getBackgroundImageSize(jQuery('.page-hero'))
              .then(function(size) {
                  scaledheight = (jQuery('.page-hero').width() / size.width) * size.height;
                  console.log(scaledheight);
                  if (scaledheight > 500) {

                    if (originalPercentage == 0) {
                        originalPercentage = jQuery('.page-hero').css('background-position-y');
                    }
                    var currWinPos = jQuery(window).scrollTop();
                    if (currWinPos < disappearPos ) {
                         // if imageWindow still on sight
                         var newPos = currWinPos - Math.round(currWinPos / 5); /* your computation here */
                         jQuery('.page-hero').css('background-position-y', 'calc('+originalPercentage+' + '+newPos+'px)');
                  }
               }
          })
      }
  });
}
