/**
 * Javascript functions for Imports.
 *
 * @package megaventory
 * @since 1.0.0
 *
 * Author URI: https://github.com/Megaventory/WooCommerce
 * Developer URI: https://megaventory.com/
 * Developer e-mail: support@megaventory.com
 * Copyright: © 2009-2019 WooCommerce.
 * License: GNU General Public License v3.0
 * License URI: https://www.gnu.org/licenses/gpl-3.0.html
 */

/**
 * Import javascript function.
 */
function ajaxImport(startingIndex, numberOfIndToProcess, successes, errors, call) {
	jQuery( '#loading' ).show();
	jQuery.ajax(
		{
			url: "admin-ajax.php", // or example_ajax_obj.ajaxurl if using on frontend.
			type: "POST",
			data: {
				'action': 'asyncImport',
				'startingIndex': startingIndex,
				'numberOfIndexesToProcess': numberOfIndToProcess,
				'successes': successes,
				'errors': errors,
				'call': call,
				'async-nonce': ajax_object.nonce
			},
			success: function (data) { // This outputs the result of the ajax request.
				var obj              = JSON.parse( data.data );
				var startingIndex    = obj.starting_index;
				var CurrentSyncCount = obj.current_sync_count_message;
				var successes        = obj.success_count;
				var errors           = obj.errors_count;
				var message          = obj.success_message;

				if (message.includes( 'continue' )) {
					jQuery( '#loading h1' ).html( CurrentSyncCount );
					ajaxImport( startingIndex, numberOfIndToProcess, successes, errors, call );// new ajax call.
				}
				if (message.includes( 'FinishedSuccessfully' )) {
					jQuery( '#loading h1' ).html( "Current Sync Count: 100%" );
					setTimeout( function () {jQuery( '#loading' ).hide();}, 2000 );
					location.reload();
				}
			},

			error: function (errorThrown) {
				alert( 'error on import' );
			}
		}
	);
}
