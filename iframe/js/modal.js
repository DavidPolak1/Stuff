/*
 @licstart  The following is the entire license notice for the
    JavaScript code in this page.

 Copyright (C) 2014 Center for Rights in Action
 Copyright (C) 2014 Jeff Lyon

 The JavaScript code in this page is free software: you can
 redistribute it and/or modify it under the terms of the GNU
 General Public License (GNU GPL) as published by the Free Software
 Foundation, either version 3 of the License, or (at your option)
 any later version. The code is distributed WITHOUT ANY WARRANTY;
 without even the implied warranty of MERCHANTABILITY or FITNESS
 FOR A PARTICULAR PURPOSE. See the GNU GPL for more details.

 As additional permission under GNU GPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 @licend  The above is the entire license notice
    for the JavaScript code in this page.
*/
var animations = {
    modal: {
        options: {
            url: 'https://www.battleforthenet.com/internetvote'
        },

        init: function(options) {
            for (var k in options) this.options[k] = options[k];
            return this;
        },
        start: function() {
            var overlay = document.getElementById('overlay');
            var close   = document.querySelector('a.close');
            var button  = document.querySelector('.footer a');

            overlay.style.display = 'table';
            setTimeout(function() {
                overlay.className += ' visible';
            }.bind(this), 50);
            
            close.addEventListener('click', function(e) {
                e.preventDefault();
                overlay.className = overlay.className.replace('visible', '');
                trackLeaderboardStat({
                    stat: 'close_widget',
                    data: null,
                    callback: function() {}
                });
                setTimeout(function() {
                    sendMessage('stop');
                }, 750);
            }, false);

            button.addEventListener('click', function(e) {
                e.preventDefault();
                window.open(animations.modal.options.url);
                trackLeaderboardStat({
                    stat: 'click',
                    data: animations.modal.options.url,
                    callback: function() {}
                });
            }, false);
        }
    }
}

var loc = window.location.href;

if (loc.indexOf('EMBED') != -1) {

    document.getElementById('modal').className = 'embedded';
    animations.modal.start(); 
} 