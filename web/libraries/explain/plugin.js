/*
 *  The "markdown" plugin. It's indented to enhance the
 *  "sourcearea" editing mode, convert to markdown mode and highlight syntax.
 * Licensed under the MIT license
 * CodeMirror Plugin: http://codemirror.net/ (MIT License)
 * Markdown Parser:
 * HTML to Markdown Parser: 
 */
'use strict';
(function() {
    CKEDITOR.plugins.add('explain', {
        // lang: 'en,zh', // %REMOVE_LINE_CORE%
        requires: 'dialog',
        icons: 'explain',
        hidpi: true, // %REMOVE_LINE_CORE%
        init: function(editor) {
            // Source mode in inline editors is only available through the "sourcedialog" plugin.
            editor.addCommand('explain', new CKEDITOR.dialogCommand('explain'));
            //editor.addCommand('markdown', markdown.commands.markdown);

            if (editor.ui.addButton) {
                editor.ui.addButton('Explain', {
                    label: 'Explain',
                    command: 'explain'
                    // toolbar: 'mode,10'
                });
            }

        }

    });
    CKEDITOR.dialog.add( 'explain', function( editor ) {
        return {
            title: 'Explain Token',
            minWidth: 400, //window minimum width
            minHeight: 100,//window minimum height
            //now we need to define the content of the page
            contents: [
                {
                    id: 'tab-basic',//identify the tab with a unique ID
                    elements: [
                        //define a text input field
                        {
                            type: 'text',
                            id: 'explain_number', //use to identify this field and get value during processing
                            label: 'Explain Number',
                            validate: CKEDITOR.dialog.validate.notEmpty( "Explain Number required." )
                        },
                    ]
                },

            ],
            onOk: function() {
                var dialog = this;
                //specify the tab and the field.
                var explain_number = dialog.getValueOf('tab-basic','explain_number');
                //console.log(editor.getSelection().getSelectedText());
                // Set text to element
                editor.insertHtml('{EXPLAIN_'+explain_number+'}');

                // editor.insertHtml('<span class="explainq'+mark_number+' explain">'+select+'</span>');
            }
        };
    });

    // CKEDITOR.replace( 'editor', {
    //     on: {
    //         instanceReady: function() {
    //             this.document.appendStyleSheet( '/libraries/markdown/css/markdown.css' );
    //         }
    //     }
    // } );


})();



