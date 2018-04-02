/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */


(function () {
    CKEDITOR.plugins.add('templates', {
        requires: 'dialog',
        // jscs:disable maximumLineLength
        lang: 'af,ar,bg,bn,bs,ca,cs,cy,da,de,de-ch,el,en,en-au,en-ca,en-gb,eo,es,et,eu,fa,fi,fo,fr,fr-ca,gl,gu,he,hi,hr,hu,id,is,it,ja,ka,km,ko,ku,lt,lv,mk,mn,ms,nb,nl,no,pl,pt,pt-br,ro,ru,si,sk,sl,sq,sr,sr-latn,sv,th,tr,tt,ug,uk,vi,zh,zh-cn', // %REMOVE_LINE_CORE%
        // jscs:enable maximumLineLength
        icons: 'templates,templates-rtl', // %REMOVE_LINE_CORE%
        hidpi: true, // %REMOVE_LINE_CORE%
        init: function (editor) {
            //CKEDITOR.dialog.add( 'templates', CKEDITOR.getUrl( this.path + 'dialogs/templates.js' ) );
            CKEDITOR.dialog.addIframe('templates', 'templates', '/libraries/templates/form.html', 800, 408, editor, function () {
            });

            editor.addCommand('templates', new CKEDITOR.dialogCommand('templates'));

            editor.ui.addButton && editor.ui.addButton('Templates', {
                label: editor.lang.templates.button,
                command: 'templates',
                toolbar: 'doctools,10'
            });


        }
    });

    CKEDITOR.dialog.addIframe = function (name, title, src, minWidth, minHeight, editor, onContentLoad, userDefinition) {
        var element = {
            type: 'iframe',
            src: src,
            width: '100%',
            height: '100%',
            id: 'iot_token'
        };

        if (typeof onContentLoad == 'function')
            element.onContentLoad = onContentLoad;
        else {
            element.onContentLoad = function () {

                var element = this.getElement(), childWindow = element.$.contentWindow;

                // If the inner frame has defined a "onDialogEvent" function, setup listeners
                if (childWindow.onDialogEvent) {
                    var dialog = this.getDialog(), notifyEvent = function (e) {
                        return childWindow.onDialogEvent(e);
                    };

                    dialog.on('ok', notifyEvent);
                    dialog.on('cancel', notifyEvent);
                    dialog.on('resize', notifyEvent);

                    // Clear listeners
                    dialog.on('hide', function (e) {
                        dialog.removeListener('ok', notifyEvent);
                        dialog.removeListener('cancel', notifyEvent);
                        dialog.removeListener('resize', notifyEvent);

                        e.removeListener();
                    });

                    // Notify child iframe of load:
                    childWindow.onDialogEvent({
                        name: 'load', sender: this, editor: dialog._.editor
                    });
                }
            };
        }

        var definition = {
            title: title,
            minWidth: minWidth,
            minHeight: minHeight,
            contents: [{
                id: 'iframe',
                label: title,
                expand: true,
                elements: [element],
                style: 'width:' + element.width + ';height:' + element.height
            }],

            onOk: function () {
                var token = '';
                jQuery('iframe[src="/libraries/templates/form.html"]').each(function () {
                    var iframe = jQuery(this).contents();
                    var qnumber = iframe.find('#qnumber').val();
                    var alias = iframe.find('#alias').val();
                    var cas = iframe.find('#cas').prop('checked');
                    var pre = iframe.find('#prefix').val();
                    var an = [];
                    var ca = '';
                    var prefix = '';
                    iframe.find('.answer-form').each(function () {
                        if (jQuery(this).val()) {
                            an.push(jQuery(this).val());
                        }
                    });
                    if (cas == true) {
                        ca = 'C';
                    }
                    var al = '';
                    if (alias != '') {
                        al = '@' + alias;
                    }
                    if (pre != '') {
                        prefix = pre;
                    }
                    var answer = an.join('|');
                    if (qnumber != '') {
                        token = '[' + prefix + qnumber + ca + ':' + answer + al + ']';
                    }
                    //    console.log(an);
                    //editor.insertHtml(token);

                });
                this._.editor.insertHtml(token);

            }
        };

        for (var i in userDefinition)
            definition[i] = userDefinition[i];

        this.add(name, function () {
            return definition;
        });
    };

    (function () {
            /**
             * An iframe element.
             *
             * @class CKEDITOR.ui.dialog.iframeElement
             * @extends CKEDITOR.ui.dialog.uiElement
             * @constructor
             * @private
             * @param {CKEDITOR.dialog} dialog Parent dialog object.
             * @param {CKEDITOR.dialog.definition.uiElement} elementDefinition
             * The element definition. Accepted fields:
             *
             * * `src` (Required) The src field of the iframe.
             * * `width` (Required) The iframe's width.
             * * `height` (Required) The iframe's height.
             * * `onContentLoad` (Optional) A function to be executed
             *     after the iframe's contents has finished loading.
             *
             * @param {Array} htmlList List of HTML code to output to.
             */
            var iframeElement = function (dialog, elementDefinition, htmlList) {
                if (arguments.length < 3)
                    return;

                var _ = ( this._ || ( this._ = {} ) ),
                    contentLoad = elementDefinition.onContentLoad && CKEDITOR.tools.bind(elementDefinition.onContentLoad, this),
                    cssWidth = CKEDITOR.tools.cssLength(elementDefinition.width),
                    cssHeight = CKEDITOR.tools.cssLength(elementDefinition.height);
                _.frameId = CKEDITOR.tools.getNextId() + '_iframe';

                // IE BUG: Parent container does not resize to contain the iframe automatically.
                dialog.on('load', function () {
                    var iframe = CKEDITOR.document.getById(_.frameId),
                        parentContainer = iframe.getParent();

                    parentContainer.setStyles({
                        width: cssWidth,
                        height: cssHeight
                    });
                });

                var attributes = {
                    src: '%2',
                    id: _.frameId,
                    frameborder: 0,
                    allowtransparency: true
                };
                var myHtml = [];

                if (typeof elementDefinition.onContentLoad == 'function')
                    attributes.onload = 'CKEDITOR.tools.callFunction(%1);';

                CKEDITOR.ui.dialog.uiElement.call(this, dialog, elementDefinition, myHtml, 'iframe', {
                    width: cssWidth,
                    height: cssHeight
                }, attributes, '');

                // Put a placeholder for the first time.
                htmlList.push('<div style="width:' + cssWidth + ';height:' + cssHeight + ';" id="' + this.domId + '"></div>');

                // Iframe elements should be refreshed whenever it is shown.
                myHtml = myHtml.join('');
                dialog.on('show', function () {
                    var iframe = CKEDITOR.document.getById(_.frameId),
                        parentContainer = iframe.getParent(),
                        callIndex = CKEDITOR.tools.addFunction(contentLoad),
                        html = myHtml.replace('%1', callIndex).replace('%2', CKEDITOR.tools.htmlEncode(elementDefinition.src));
                    parentContainer.setHtml(html);
                    //document.getElementById(dialog.getButton('ok').domId).click();

                });
            };

            iframeElement.prototype = new CKEDITOR.ui.dialog.uiElement();

            CKEDITOR.dialog.addUIElement('iframe', {
                build: function (dialog, elementDefinition, output) {
                    return new iframeElement(dialog, elementDefinition, output);
                }
            });
        })();


    var templates = {},
        loadedTemplatesFiles = {};

    CKEDITOR.addTemplates = function (name, definition) {
        templates[name] = definition;
    };

    CKEDITOR.getTemplates = function (name) {
        return templates[name];
    };

    CKEDITOR.loadTemplates = function (templateFiles, callback) {
        // Holds the templates files to be loaded.
        var toLoad = [];

        // Look for pending template files to get loaded.
        for (var i = 0, count = templateFiles.length; i < count; i++) {
            if (!loadedTemplatesFiles[templateFiles[i]]) {
                toLoad.push(templateFiles[i]);
                loadedTemplatesFiles[templateFiles[i]] = 1;
            }
        }

        if (toLoad.length)
            CKEDITOR.scriptLoader.load(toLoad, callback);
        else
            setTimeout(callback, 0);
    };
})();


/**
 * The templates definition set to use. It accepts a list of names separated by
 * comma. It must match definitions loaded with the {@link #templates_files} setting.
 *
 *        config.templates = 'my_templates';
 *
 * @cfg {String} [templates='default']
 * @member CKEDITOR.config
 */

/**
 * The list of templates definition files to load.
 *
 *        config.templates_files = [
 *            '/editor_templates/site_default.js',
 *            'http://www.example.com/user_templates.js
 *        ];
 *
 * @cfg
 * @member CKEDITOR.config
 */
CKEDITOR.config.templates_files = [
    CKEDITOR.getUrl('plugins/templates/templates/default.js')
];

/**
 * Whether the "Replace actual contents" checkbox is checked by default in the
 * Templates dialog.
 *
 *        config.templates_replaceContent = false;
 *
 * @cfg
 * @member CKEDITOR.config
 */
CKEDITOR.config.templates_replaceContent = true;

