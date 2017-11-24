define(
    ['underscore',
      'js/views/baseview',
      'edx-ui-toolkit/js/utils/html-utils',
      'text!templates/previous-transcripts-video-upload.underscore'
    ],

    function(_, BaseView, HtmlUtils, previousTranscriptsVideoUploadTemplate) {
        'use strict';

        var PreviousTranscriptsVideoUploadView =  BaseView.extend({
            tagName: 'tr',
            className: 'is-hidden',

            events: {
                'click .js-add-transcript': 'addTranscript'
            },
            initialize: function (options) {
                this.template = HtmlUtils.template(previousTranscriptsVideoUploadTemplate);
                this.itemViews = this.collection.map(function(model) {
                    return new TranscriptView({
                        model: model
                    });
                });
            },

            render: function () {
                HtmlUtils.setHtml(
                    this.$el,
                    this.template({transcripts: this.collection.toJSON()})
                );

                var $transcriptContent = this.$el.find('.js-transcript-content');
                _.each(this.itemViews, function(view) {
                    $transcriptContent.append(view.render().$el);
                });

                return this;
            },

            addTranscript: function (event) {
                event.preventDefault();
            }
        });

        var TranscriptView =  BaseView.extend({
            tagName: 'div',

            initialize: function (options) {
                this.template = HtmlUtils.template("<%- name %> (<%- language %>)<br />");
            },

            render: function () {
                HtmlUtils.setHtml(
                    this.$el,
                    this.template(this.model.attributes)
                );
                return this;
            }
        });

        return PreviousTranscriptsVideoUploadView;
    }
);