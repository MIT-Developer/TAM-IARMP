'use strict';

let isInternetExplorer = Boolean(window.ActiveXObject) || ('ActiveXObject' in window);

window.initializePassportSSO = function (event) {
    var tag = document.getElementsByTagName("tam-sso")[0];

    if (!tag) {
        console.log('TAM Single Sign On tag <tam-sso> was not found.');
        return false;
    }

    var appId = tag.getAttribute('app');
    if (!appId) {
        console.log('Application ID from attribute "app" was not found.');
        return false;
    }

    var passportDomain = tag.getAttribute('server');
    if (!passportDomain) {
        passportDomain = 'https://passport.toyota.astra.co.id';
    }

    var ssoUrl = passportDomain + '/auth/external/' + appId;
    var proxyUrl = passportDomain + '/auth/ie';
    //var tokenUrl = passportDomain + '/api/v1/token';

    if (isInternetExplorer) {
        console.warn('TAM SSO: Internet Explorer detected. This browser has broken window.postMessage implementation. Please upgrade to Firefox or Chrome. https://blogs.msdn.microsoft.com/ieinternals/2009/09/15/html5-implementation-issues-in-ie8-and-later/');
        var iframe = document.createElement('iframe');
        iframe.id = 'tam-sso-proxy';
        iframe.src = proxyUrl;
        iframe.style.display = 'none';
        document.body.appendChild(iframe);
    }

    window.ssoLogin = function () {
        var width = 640;
        var height = 480;
        var left = screen.width / 2 - width / 2;
        var top = screen.height / 2 - height / 2;
        var params = 'width=' + width + ',height=' + height + ',left=' + left + ',top=' + top;
        window.open(ssoUrl, 'tamsso', params);
    };

    window.addEventListener('message', function (event) {
        console.log(event);
        if (event.origin === passportDomain) {
            var message = event.data;
            if (message.Type === 'Success') {
                window.GrantSignOn(message.Content);
            }
        }
    });

    window.GrantSignOn = function (token) {
        tag.innerHTML = '<input type="hidden" id="TAMSignOnToken" name="TAMSignOnToken" value="' + token + '"/>';

        var formId = tag.getAttribute('auto-submit');
        if (!formId) return;
        var form = document.getElementById(formId);
        if (form) {
            form.submit();
        }
    };

    var buttonCss = "<style>button.tam-sso{color:#fff;background-color:#CC0400;border:1px solid #7F0200;padding:10px;font-size:16px;border-radius:4px;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif}button.tam-sso:hover{background-color:#BF0400;cursor:pointer}button.tam-sso img{vertical-align:middle;margin-right:8px}</style>";

    tag.innerHTML = '<button id="tam-sso-button" class="tam-sso" type="button"><img src="' + passportDomain + '/tam.png">Login using TAM Passport</button>' + buttonCss;

    var ssoButton = document.getElementById('tam-sso-button');
    ssoButton.addEventListener('click', window.ssoLogin);
};

document.addEventListener("DOMContentLoaded", window.initializePassportSSO);