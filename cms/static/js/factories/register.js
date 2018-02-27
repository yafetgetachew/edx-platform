define(['jquery', 'jquery.cookie'], function($) {
    'use strict';
    return function(options) {
        var $registerForm = $('form#register_form');

        $('form :input')
            .focus(function() {
                $('label[for="' + this.id + '"]').addClass('is-focused');
            })
            .blur(function() {
                $('label').removeClass('is-focused');
            });

        $registerForm.submit(function(event) {
            event.preventDefault();
            var submit_data = $('#register_form').serialize();

            $.ajax({
                url: '/create_account',
                type: 'POST',
                dataType: 'json',
                headers: {'X-CSRFToken': $.cookie('csrftoken')},
                notifyOnError: false,
                data: submit_data,
                success: function(json) {
                    if (json.redirect_url) {
                        location.href = json.redirect_url;
                    } else {
                        location.href = '/course/';
                    }
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    var json = $.parseJSON(jqXHR.responseText);
                    $('body').show();
                    $('#register_error').html(json.value).stop().addClass('is-shown');
                }
            });
        });

        $('input#password').blur(function() {
            var $formErrors = $('#password_error'),
                data = {
                    password: $('#password').val()
                };

            // Uninitialize the errors on blur
            $formErrors.empty();
            $formErrors.addClass('hidden');

            $.ajax({
                url: '/api/user/v1/validation/registration',
                type: 'POST',
                dataType: 'json',
                data: data,
                success: function(json) {
                    _.each(json.validation_decisions, function(value, key) {
                        if (key === 'password' && value) {
                            $formErrors.html(value);
                            $formErrors.removeClass('hidden');
                        }
                    });
                }
            });
        });

        if (options.autoSubmitRegForm) {
            $('body').hide();
            $registerForm.submit();
        }
    };
});
