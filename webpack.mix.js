const { mix } = require('laravel-mix');

const src_path = 'src/';
const dest_path = 'www';
const dest_path_assets = dest_path + '/assets';

mix.options({
    processCssUrls: false, // Don't attempt to copy files referenced in the SASS files
    publicPath: dest_path, // Place mix-manifest.json in there
});

mix.js(src_path + 'js/app.js', dest_path_assets);
mix.sass(src_path + 'sass/app.scss', dest_path_assets);
mix.copy('node_modules/font-awesome/fonts', dest_path_assets);
