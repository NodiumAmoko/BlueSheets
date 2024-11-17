/*
Ce fichier JavaScript a été écrit par AntoineJT
(c) Copyright, 2018, AntoineJT 
*/

if(window.addEventListener){
    window.addEventListener('load', hidewebhost, false);
}else{
    window.attachEvent('onload', hidewebhost);
}

function hidewebhost(){
	document.querySelector('img[alt="www.000webhost.com"]').hide();
}