"use strict";

$('.js-audio').each(function (index, el) {
    initAudioPlayer($(this), index);
});
// $('.audio__slider').roundSlider({
//     radius: 50,
//     value: 0,
//     startAngle: 90,
//     width: 5,
//     handleSize: '+6',
//     handleShape: 'round',
//     sliderType: 'min-range'
// });
$('.audio__slider').on('drag, change', function (e) {
    var $this = $(this);
    var $elem = $this.closest('.js-audio');
    updateAudio(e, $elem);
    $this.addClass('active');
});
function updateAudio(e, $elem) {
    console.log(e.handle.value);
    var value = e.handle.value;
    // var thisPlayer = el.find('.js-audio'),
    var play = $elem.find('.play-pause'),
        circle = $elem.find('#seekbar'),
        getCircle = circle.get(0),
        totalLength = getCircle.getTotalLength(),
        //currentTime = $elem.find('audio')[0].currentTime,
        maxduration = $elem.find('audio')[0].duration;
    var y = value * maxduration / 100;
    $elem.find('audio')[0].currentTime = y;
}
function initAudioPlayer(player) {
    var audio = player.find('audio'),
        play = player.find('.play-pause'),
        circle = player.find('#seekbar'),
        getCircle = circle.get(0),
        totalLength = getCircle.getTotalLength();
    circle.attr({
        'stroke-dasharray': totalLength,
        'stroke-dashoffset': totalLength
    });

    const closes = document.querySelectorAll('.close');

    closes.forEach(el => el.addEventListener('click', event => {
        audio[0].pause();
    }));

    play.on('click', function () {
        if (audio[0].paused) {
            $('audio').each(function (index, el) {
                $('audio')[index].pause();
            });
            $('.js-audio').removeClass('playing');
            audio[0].play();
            player.removeClass('paused');
            player.addClass('playing');
        } else {
            audio[0].pause();
            player.removeClass('playing');
            player.addClass('paused');
        }
    });
    audio.on('timeupdate', function () {
        var currentTime = audio[0].currentTime,
            maxduration = audio[0].duration,
            calc = totalLength - currentTime / maxduration * totalLength;
        circle.attr('stroke-dashoffset', calc);
        var value = Math.floor(currentTime / maxduration * 100);
        var slider = audio.closest('.js-audio').find('.audio__slider');
        // $(slider).roundSlider('setValue', value);
    });
    audio.on('ended', function () {
        player.removeClass('playing');
        circle.attr('stroke-dashoffset', totalLength);
    });
}


document.addEventListener("DOMContentLoaded", () => {
    const butterflySection = document.getElementById("butterflySection");
    const popover = document.getElementById("popover");
    let isPaused = false;
  
    // Function to create a butterfly element
    const createButterfly = () => {
      const butterfly = document.createElement("div");
      butterfly.className = "butterfly";
      butterfly.style.top = Math.random() * (window.innerHeight - 40) + "px";
      butterfly.style.left = Math.random() * (window.innerWidth - 50) + "px";
      butterfly.addEventListener("click", (event) => showPopover(event, butterfly));
      butterflySection.appendChild(butterfly);
      return butterfly;
    };
  
    // Function to show the popover when clicking on a butterfly
    const showPopover = (event, butterfly) => {
      event.stopPropagation(); // Prevents the click event from reaching the window and closing the popover
      if (!isPaused) {
        const { top, left } = butterfly.getBoundingClientRect();
        popover.style.top = top - 60 + "px";
        popover.style.left = left + 60 + "px";
        popover.style.display = "block";
        butterfly.style.transform = "scale(1.2)";
        pauseButterflies();
        document.addEventListener("click", hidePopover);
      }
    };
  
    // Function to hide the popover and reset butterfly size
    const hidePopover = () => {
      popover.style.display = "none";
      resumeButterflies();
      document.removeEventListener("click", hidePopover);
    };
  
    // Function to pause all butterflies
    const pauseButterflies = () => {
      isPaused = true;
    };
  
    // Function to resume all butterflies
    const resumeButterflies = () => {
      isPaused = false;
    };
  
    // Function to update butterfly positions using requestAnimationFrame
    const updateButterflies = () => {
      if (!isPaused) {
        document.querySelectorAll(".butterfly").forEach(butterfly => {
          const deltaX = (Math.random() - 0.5) * 4;
          const deltaY = (Math.random() - 0.5) * 4;
  
          let newTop = parseFloat(butterfly.style.top) + deltaY;
          let newLeft = parseFloat(butterfly.style.left) + deltaX;
  
          // Ensure butterflies stay within the window bounds
          newTop = Math.min(window.innerHeight - 40, Math.max(0, newTop));
          newLeft = Math.min(window.innerWidth - 50, Math.max(0, newLeft));
  
          butterfly.style.top = newTop + "px";
          butterfly.style.left = newLeft + "px";
        });
      }
  
      requestAnimationFrame(updateButterflies);
    };
  
    // Create initial butterflies after a short delay to ensure DOM readiness
    setTimeout(() => {
      for (let i = 0; i < 8; i++) {
        createButterfly();
      }
    }, 500);
  
    // Start updating butterfly positions
    updateButterflies();
  });
  

