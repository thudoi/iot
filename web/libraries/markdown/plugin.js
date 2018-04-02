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
    CKEDITOR.plugins.add('markdown', {
        // lang: 'en,zh', // %REMOVE_LINE_CORE%
        requires: 'dialog',
        icons: 'markdown',
        hidpi: true, // %REMOVE_LINE_CORE%
        init: function(editor) {
            // Source mode in inline editors is only available through the "sourcedialog" plugin.
            editor.addCommand('markdown', new CKEDITOR.dialogCommand('markdown'));
            //editor.addCommand('markdown', markdown.commands.markdown);

            if (editor.ui.addButton) {
                editor.ui.addButton('Markdown', {
                    label: 'Markdown',
                    command: 'markdown'
                    // toolbar: 'mode,10'
                });
            }
            editor.addContentsCss('.explain{background-color:#e6e6fa;border-bottom:solid 3px orchid}.explain:before{background-color:orchid;color:#fff;padding:0 5px}.explainqe:before{content:"Example"}.explainq1:before{content:"Q1"}.explainq2:before{content:"Q2"}.explainq3:before{content:"Q3"}.explainq4:before{content:"Q4"}.explainq5:before{content:"Q5"}.explainq6:before{content:"Q6"}.explainq7:before{content:"Q7"}.explainq8:before{content:"Q8"}.explainq9:before{content:"Q9"}.explainq10:before{content:"Q10"}.explainq11:before{content:"Q11"}.explainq12:before{content:"Q12"}.explainq13:before{content:"Q13"}.explainq14:before{content:"Q14"}.explainq15:before{content:"Q15"}.explainq16:before{content:"Q16"}.explainq17:before{content:"Q17"}.explainq18:before{content:"Q18"}.explainq19:before{content:"Q19"}.explainq20:before{content:"Q20"}.explainq21:before{content:"Q21"}.explainq22:before{content:"Q22"}.explainq23:before{content:"Q23"}.explainq24:before{content:"Q24"}.explainq25:before{content:"Q25"}.explainq26:before{content:"Q26"}.explainq27:before{content:"Q27"}.explainq28:before{content:"Q28"}.explainq29:before{content:"Q29"}.explainq30:before{content:"Q30"}.explainq31:before{content:"Q31"}.explainq32:before{content:"Q32"}.explainq33:before{content:"Q33"}.explainq34:before{content:"Q34"}.explainq35:before{content:"Q35"}.explainq36:before{content:"Q36"}.explainq37:before{content:"Q37"}.explainq38:before{content:"Q38"}.explainq39:before{content:"Q39"}.explainq40:before{content:"Q40"}.explainq41:before{content:"Q41"}.explainq42:before{content:"Q42"}.explainq43:before{content:"Q43"}.explainq44:before{content:"Q44"}.explainq45:before{content:"Q45"}.explainq46:before{content:"Q46"}.explainq47:before{content:"Q47"}.explainq48:before{content:"Q48"}.explainq49:before{content:"Q49"}.explainq50:before{content:"Q50"}');

        }

    });
    CKEDITOR.dialog.add( 'markdown', function( editor ) {
        return {
            title: 'Markdown',
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
                            id: 'markdown_text', //use to identify this field and get value during processing
                            label: 'Question Number',
                            validate: CKEDITOR.dialog.validate.notEmpty( "Question Number required." )
                        },
                    ]
                },

            ],
            onOk: function() {
                var dialog = this;
                //specify the tab and the field.
                var mark_number = dialog.getValueOf('tab-basic','markdown_text');
                //console.log(editor.getSelection().getSelectedText());
                var select = editor.getSelection().getSelectedText();
                var newElement = new CKEDITOR.dom.element("span");              // Make Paragraff
                newElement.setAttributes({class: 'explainq'+mark_number+' explain'})                 // Set Attributes
                newElement.setText(select);
                // Set text to element
                editor.insertElement(newElement);

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



