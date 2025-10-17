<?php
if ( 'master' == getenv( 'PLATFORM_BRANCH' ) ) {
    define( 'ALGOLIA_INDEX_NAME_PREFIX', 'prod_platformsh-wp-starter_' );
} else {
    define( 'ALGOLIA_INDEX_NAME_PREFIX', 'platform_platformsh-wp-starter_' );
}