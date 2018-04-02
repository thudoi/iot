/**
 * add custom plugin
 */
'use strict';
(function() {
CKEDITOR.plugins.add('token_insert', {
    icons: 'token_insert',
    hidpi: true, // %REMOVE_LINE_CORE%
    init: function( editor ) {
        editor.addCommand( 'TokenInsert', {
            exec: function( editor ) {
                editor.insertHtml( '{OPTION}' );
            }
        });
        if (editor.ui.addButton) {
            editor.ui.addButton('TokenInsert', {
                label: 'Token Insert',
                command: 'TokenInsert',
                icon: this.path + 'icons/token.png'
                // toolbar: 'mode,10'
            });
        }
    }
});
})();