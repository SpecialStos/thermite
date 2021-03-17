fx_version 'bodacious'
game 'gta5'

name "thermite"
description "A thermite minigame for FiveM."
author "SpecialStos"
version "1.0.0"




client_scripts {
	'client/thermite.lua',
	'client/functions.lua',
	'config.lua'
}
server_script 'server/thermite.lua'

ui_page 'html/index.html'

files {
	'html/index.html',
	'html/css/style.css',
	'html/js/app.js',
	'html/img/phone.png',
	'html/sounds/failure.ogg',
	'html/sounds/hit.ogg',
	'html/sounds/success.ogg',
}


exports{
	'doFire',
	'doExplosion',
	'doMinigame'
}
