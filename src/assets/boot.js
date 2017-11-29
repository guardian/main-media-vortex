define([], function() {
    'use strict';

    return {
        boot: function(el, context, config, mediator) {
            var html = '<style>' + 
            '.immersive-main-media__headline-container, .article__header-info, .content__wrapper--standfirst, .standfirst--mobile {' + 
            '       display: none;' +
            '}' +
            '.tonal--tone-feature .tonal__main .drop-cap, .tonal--tone-feature .tonal__main .element-pullquote cite, p.has__dropcap:first-letter {' +
            '   color: #4bc6df !important;' +
            '}' +
            '.content--immersive-article .in-body-link--immersive {' +
                'color: #222;' +
                'border-bottom-color: #4bc6df;' +
            '}' +
            'h2 + .section-rule {' +
                'margin-top: 24px !important;' + 
            '}' +
            '</style>';

            el.innerHTML = html;
        }
    };
});
