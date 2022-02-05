import gravity from './module/gravity';
import screenFull from './module/screenFull'
import eclipse from './module/eclipse'
import meshNeon from './module/meshNeon';
import animationSkill from './module/animationSkill';
import animationHome from './module/animationHome';
import animationAbout from './module/animationAbout';
import animationWork from './module/animationWork';
import animationContact from './module/animationContact';
import './main.scss';
import './styles/home.scss';
import './styles/about.scss';
import './styles/skill.scss';
import './styles/header.scss';
window.addEventListener('DOMContentLoaded', function(){
    meshNeon();
    screenFull()
    eclipse()
    gravity()
    animationSkill()
    animationHome()
    animationAbout()
    animationWork()
    animationContact();
})