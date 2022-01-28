import gravity from './module/gravity';
import screenFull from './module/screenFull'
import eclipse from './module/eclipse'
import trailsNeon from './module/trailsNeon';
import animationSkill from './module/animationSkill';
import animationHome from './module/animationHome';
import animationAbout from './module/animationAbout';
import animationWork from './module/animationWork';
import animationContact from './module/animationContact';
import './style.scss';
window.addEventListener('DOMContentLoaded', function(){
    gravity(false)
    screenFull()
    eclipse()
    animationSkill()
    animationHome()
    animationAbout()
    animationWork()
    animationContact()
    trailsNeon()
})