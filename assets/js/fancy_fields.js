// initialize the components
RegisterStartup(function () {
  FancyFields_init();
});

function FancyFields_init() {
  $('*[character-count]').each(function (index, field) {
    var ff = new FancyFields_CharacterCount($(field));
  });
  //$('head').append('<link rel="stylesheet" href="/includes/extensions/fancy_fields/css/fancy_fields.css">');
}

function FancyFields_CharacterCount(field) {
  var self = this;
  self.field = field

  function __init() {
    if (self.field.attr('character-count') == 'true') {
      // this field has already been initialized
      return;
    }
    self.maxOpacity = 1;
    self.minOpacity = 0.4;
    self.opacityDelay = 50;
    self.maxCharacters = self.field.attr('character-count');
    self.warningThreshold = Math.ceil(self.maxCharacters / 2 * 0.10);
    self.field.attr('character-count', 'true');
    self.field.addClass('fancy-fields-character-count-field');

    // prepare counter
    self.counter = $('<span>' + self.maxCharacters + ' characters remaining</span>').attr({
      'class': 'badge pull-right fancy-fields-character-count',
    }).css('margin-left', '0px');
    self.field.before(self.counter);
    // hide counter at first
    self.counter.hide();

    // event binding
    self.field.bind('change', function () {
      self.count();
    }).bind('keyup', function () {
      $(this).change();
    });
    self.field.hover(
      function () {
        if (self.counter.is(':visible')) {
          self.fadein();
        }
      },
      function () {
        if (self.counter.is(':visible')) {
          self.fadeout();
        }
      }
    );
    self.field.bind('focus', function () {
      self.fadein();
    });
    self.field.bind('blur', function () {
      self.counter.hide();
    });
  }

  self.fadein = function () {
    self.counter.css('display', 'inline-block');
    self.counter.fadeTo(self.opacityDelay, self.maxOpacity);
  }

  self.fadeout = function () {
    self.counter.fadeTo(self.opacityDelay, self.minOpacity);
  }

  self.count = function () {
    var len = self.field.val().length;
    var available = self.maxCharacters - len
    self.counter.text(available);
    // update style
    if (available < 0) {
      self.counter.removeClass('badge-warning');
      self.counter.addClass('badge-danger');
    } else if (available <= self.warningThreshold) {
      self.counter.removeClass('badge-danger');
      self.counter.addClass('badge-warning');
    } else {
      self.counter.removeClass('badge-danger badge-warning');
      if (available == self.maxCharacters) {
        self.counter.text(self.maxCharacters + ' characters remaining');
      }
    }
  }
  __init();
}