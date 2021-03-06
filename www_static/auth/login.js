/*!
 * wwwhisper - web access control.
 */
(function () {
  'use strict';
  var stub = new wwwhisper.Stub();

  /**
   * Sends an assertion from a BrowserID sign-in window to the
   * authentication back-end. Reloads the page if login succeeded.
   */
  function login(email) {
    $('.entered-email').text(email);
    stub.ajax('POST', '/wwwhisper/auth/api/send-token/',
              {
                'email' : email,
                'path': window.location.pathname
              },
              function() {
                $('#intro').addClass('hide');
                $('#login-form').addClass('hide');
                $('#token-send-success').removeClass('hide');
              },
              function(errorMessage, errorStatus) {
                $('#token-send-error-message').text(errorMessage);
                $('#token-send-error').removeClass('hide');
              });
  }

  $('#login-required').removeClass('hide');
  $('#login-form').removeClass('hide');

  $('#login-form').submit(function() {
    var email = $.trim($('#email').val());
    $('#token-send-error').addClass('hide');
    if (email.length !== 0) {
      login(email);
    }
    return false;
  });

}());
