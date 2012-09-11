!function ($) {
  // constructor
  var Gallery = function (element, options) {
    this.$element = element
    $carousel = $('.carousel', element)
    this.options = options

    $carousel.carousel(options)

    var $items = $('.carousel .item', this.$element)
    $carousel.on('slid', function(e) {
      var index = $('.item.active', this.$element).index('.item', this.$element)
      $('.thumbnail', element).removeClass('active')
      $('.thumbnail[data-item=' + index + ']', element).addClass('active')
    })

    $('.thumbnail', element).live('click', function(e) {
      var target = $(this).data('item')
      $carousel.carousel(parseInt(target))
      e.preventDefault()
    })

    $('.carousel-control', element).live('click', function(e) {
      var to = $(this).data('slide')
      $carousel.carousel(to)
      e.preventDefault()
    })
  }

  Gallery.prototype = {
  }

  // plugin definition
  $.fn.gallery = function(option) {
    return this.each(function() {
      var $this = $(this)
        , data = $this.data('gallery')
        , options = $.extend({}, $.fn.gallery.defaults, typeof option == 'object' && option)
      
      if (!data) {
        $this.data('gallery', (data = new Gallery(this, options)))
        $('.thumbnail', $this).each(function(i, element) {
          $(element).attr('data-item', i)
        })
      }
    })
  }

  $.fn.gallery.defaults = {
  }

}(window.jQuery)
