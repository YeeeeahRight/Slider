const tips = [
	"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent tincidunt, odio non consequat interdum, ipsum justo auctor quam, non dignissim felis nulla at risus.",
    "Phasellus mattis massa quam, ac rutrum lectus cursus id. In faucibus justo sapien, id dapibus massa sollicitudin nec.",
    "Pellentesque feugiat nunc vel velit auctor, eu facilisis mi condimentum. Cras elit eros, porttitor at interdum tristique, aliquam sed arcu.",
	"Donec massa eros, auctor in finibus id, facilisis et lorem. In eu faucibus nisl. Cras vitae pellentesque ligula."
];

let tipsContainer = document.getElementById("slider_container");
let tipsArr, dotsArr;
let tipIndex = 0;

let isTipsHidden = false;
if (localStorage.getItem("isHidden") !== null) {
    isTipsHidden = localStorage.getItem("isHidden") === "true";
}

if (!isTipsHidden) {
    setTimeout(function () {
        tipsContainer.style.display = "flex";
    }, 5000);
    initSliderSections();
    if (localStorage.getItem("tipIndex") !== null) {
        tipIndex = localStorage.getItem("tipIndex");
    }
    showTip();
    initSliderListeners();
}

function initSliderSections() {
    let tipsContent = document.getElementById("content");
    let dotsSection = document.getElementById("dots");
    for (let i = 0; i < tips.length; i++) {
        tipsContent.insertAdjacentHTML('afterbegin', '<div class="slider_tip_data">' + tips[i] + '</div>');
        dotsSection.insertAdjacentHTML('afterbegin', '<span class="dot" onclick="setTip(' + (tips.length - 1 - i) + ')"></span>');
    }
    tipsArr = document.getElementsByClassName("slider_tip_data");
    dotsArr = document.getElementsByClassName("dot");
}

function showTip() {
    for (let i = 0; i < tipsArr.length; i++) {
        tipsArr[i].style.display = "none";
        dotsArr[i].className = dotsArr[i].className.replace("active", "");
    }
    tipsArr[tipIndex].style.display = "block";
    dotsArr[tipIndex].className += " active";
    localStorage.setItem("tipIndex", tipIndex.toString());
}

function initSliderListeners() {
    document.getElementById("slider_next_tip").onclick = function() {
        setTip(tipIndex + 1);
    }
    document.getElementById("slider_prev_tip").onclick = function() {
        setTip(tipIndex - 1);
    }

    document.getElementById("slider_closer").onclick = function () {
        tipsContainer.style.display = "none";
    }

    let disabler = document.getElementById("slider_disabler");
    disabler.onclick = function () {
        localStorage.setItem("isHidden", disabler.checked.toString());
    }
    addEventListener("keydown", handleSliderEvent);
}

function setTip(newTipIndex) {
    tipIndex = newTipIndex;
    let maxTipIndex = tipsArr.length - 1;
    if (tipIndex > maxTipIndex) {
        tipIndex = maxTipIndex;
    } else if (tipIndex < 0) {
        tipIndex = 0;
    }
    showTip();
}

function handleSliderEvent(e) {
    switch (e.key) {
        case "ArrowLeft":
            document.getElementById("slider_prev_tip").click();
            break;
        case "ArrowRight":
            document.getElementById("slider_next_tip").click();
            break;
        case "Escape":
            document.getElementById("slider_closer").click();
            break;
    }
}