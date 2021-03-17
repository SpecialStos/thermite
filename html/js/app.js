$(document).ready(function(){

  var audioPlayer = null;

  function loadGame() {
    var button = document.createElement('button');
    button.textContent = 'Start Game';
    var main = document.getElementById('main');
    main.appendChild(button);
    button.addEventListener('click', function startIt(e) {
      
    });
  }

  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }



  function playMinigame(DropAmount,letterSet,speed,intervalSet) {
    var main = document.getElementById('main');
    main.textContent = '';
    var LETTERS = [];

    switch(letterSet){
      case 1:
        LETTERS = ['q','w','e']
        break;
      case 2:
        LETTERS = ['q','w','e','a','s']
        break;
      case 3:
        LETTERS = ['q','w','e','j','k','l']
        break;
      case 4:
        LETTERS = ['q','w','e','j','k','l', 'm', 'n']
        break;
      case 5:
        LETTERS = ['q','w','e','j','k','l', 'm', 'n', 'o', 'r']
        break;
      default:
        LETTERS = ['q','w','e','j','k','l', 'm', 'n', 'o', 'r']
        
    }

    var letterAnimations = {'q':[],'w':[],'e':[],'j':[],'k':[],'l':[],'a':[],'s':[], 'm':[], 'n':[], 'o':[], 'r':[]};

    var gameStarted = true;
    var timer = intervalSet;
    var DURATION = 10000;
    var main = document.getElementById('main');
    var score = 0
    var rate = speed;
    var RATE_INTERVAL = .05;
    var misses = 0;
    var currentAmount = DropAmount;

    function letterCreator() {
      var idx = Math.floor(Math.random() * LETTERS.length);
      var y = getRandomIntInclusive(1,3);
      var x = ""
      if(y == 1){x = "2.73vw"}
      else if(y == 2){x = "7.23vw"}
      else if(y == 3){x = "11.63vw"}

      var container = document.createElement('div');
      var letter = document.createElement('span');
      var letterText = document.createElement('b');
      letterText.textContent = LETTERS[idx];
      letter.appendChild(letterText);
      container.appendChild(letter);
      main.appendChild(container);
      var animation = container.animate([
        {transform: 'translate3d('+x+',-2.5vh,0)'},
        {transform: 'translate3d('+x+',46.5vh,0)'}
      ], {
        duration: DURATION,
        easing: 'linear',
        fill: 'both'
      });
      
      letterAnimations[LETTERS[idx]].splice(0, 0, {animation: animation, element: container});
      animation.playbackRate = rate;

      animation.onfinish = function(e) {
        var target = container;
        var char = target.textContent;
                                        
        letterAnimations[char].pop();
        target.classList.add('missed');
        handleMisses();
      }
    }
    
    function handleMisses() {
      misses++;
      var missedMarker = document.querySelector('.misses:not(.missed)');
      if (missedMarker) {
        missedMarker.classList.add('missed');
      } else {
        gameOver();
      }
    }
    
    this.gameOver = function() {
      gameStarted = false;
      clearInterval(cleanupInterval);
      getAllAnimations().forEach(function(anim) {
        anim.pause();
      });
      cleanup();
    }

    function gameOver() {
      playSound("failure",0.5)
      $.post('http://thermite/failure', JSON.stringify({}));
      gameStarted = false;
      clearInterval(cleanupInterval);
      getAllAnimations().forEach(function(anim) {
        anim.pause();
      });
      cleanup();
    }

    var cleanupInterval = setInterval(function() {
      timer = timer * 4 / 5;
      cleanup();
    }, 20000);
    function cleanup() {
      [].slice.call(main.querySelectorAll('.missed')).forEach(function(missed) {
        main.removeChild(missed);
      });

      [].slice.call(document.querySelectorAll('.misses')).forEach(function(missed) {
        missed.classList.remove('missed');
      });
    }
    
    function getAllAnimations() {
      if (document.getAnimations) {
        return document.getAnimations();
      } else if (document.timeline && document.timeline.getAnimations) {
        return document.timeline.getAnimations();
      }
      return [];
    }
    function onPress(e) {
      var char = e.key;
      if (char.length === 1) {
        char = char.toLowerCase();
        if (letterAnimations[char] && letterAnimations[char].length) {
          var last_element = letterAnimations[char][letterAnimations[char].length - 1];
          if(last_element.animation.currentTime > 8000.34 && last_element.animation.currentTime < 9387.2)
          {
            var popped = letterAnimations[char].pop();
            currentAmount--;
            popped.animation.pause();
            playSound("hit",0.35)
            var target = popped.element.querySelector('b');
            var degs = [(Math.random() * 1000)-500,(Math.random() * 1000)-500,(Math.random() * 2000)-1000];
            target.animate(
            [
              {transform: 'scale(1) rotateX(0deg) rotateY(0deg) rotateZ(0deg)',opacity:1},
              {transform: 'scale(0) rotateX('+degs[0]+'deg) rotateY('+degs[1]+'deg) rotateZ('+degs[2]+'deg)', opacity: 0}
            ], 
            {
              duration: Math.random() * 500 + 850,
              easing: 'ease-out',
              fill: 'both'
            });
            
          } 
        }
      }
    }
    
    document.body.addEventListener('keypress', onPress);

    var soundSet = false
    function setupNextLetter() {
      if (gameStarted && currentAmount != 0) {
        letterCreator();
        setTimeout(function() {
          setupNextLetter();
        }, timer);
      }

      if(currentAmount == 0 && !soundSet)
      {
        soundSet = true
        playSound("success",0.9)
        $.post('http://thermite/complete', JSON.stringify({}));
      }
    }
    setupNextLetter();
  }


  function polyfillKey() {
    if (!('KeyboardEvent' in window) ||
          'key' in KeyboardEvent.prototype) {
      return false;
    }
    
    console.log('polyfilling KeyboardEvent.prototype.key')
    var keys = {};
    var letter = '';
    for (var i = 65; i < 91; ++i) {
      letter = String.fromCharCode(i);
      keys[i] = letter.toUpperCase();
    }
    for (var i = 97; i < 123; ++i) {
      letter = String.fromCharCode(i);
      keys[i] = letter.toLowerCase();
    }
    var proto = {
      get: function (x) {
        var key = keys[this.which || this.keyCode];
        console.log(key);
        return key;
      }
    };
    Object.defineProperty(KeyboardEvent.prototype, 'key', proto);
  }



  var gameObject = null

  function openContainer()
  {
    $(".phone-container").css("display", "block");
  }

  function closeContainer()
  {
     $(".phone-container").css("display", "none");
    gameObject.gameStarted = false;
    gameObject.misses = 0;
    gameObject.gameOver()
    gameObject = null
  }

  function playSound(file,volume)
  {
    if (audioPlayer != null) {
      audioPlayer.pause();
    }

    audioPlayer = new Audio("./sounds/" + file + ".ogg");
    audioPlayer.volume = volume;
    audioPlayer.play();

  }


  window.addEventListener('message', function(event){
    var item = event.data;
    if(item.openPhone === true) {
      openContainer();
    }

    if(item.openSection == "playMinigame") {
      gameObject = new playMinigame(item.amount,item.letterSet,item.speed,item.interval);
    }

    if(item.openPhone === false) {
      closeContainer();
    }
  });


  document.onkeyup = function (data) {
      if (data.which == 27 ) {
        $.post('http://thermite/close', JSON.stringify({}));
      }
    };


});
