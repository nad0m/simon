$(document).ready(function() {
    var power = false;
    var currentSeq;
    var audio;
    var value;
    var i = 0;
    var sequence = [];
    var dummySequence;
    var correct=true;
    var strict=false;
  
  function runSequence() {
      $(".keys").addClass("not-active");
      setTimeout(function() {
        switch (sequence[i]) {
          case 0:
            greenButton();
            break;
          case 1:
            redButton();
            break;
          case 2:
            yellowButton();
            break;
          case 3:
            blueButton();
            break;
        }      
        i++;
        $(".screen").text("Memorize.");
        if (i < sequence.length) {       
          runSequence();      
        }
        else if (correct===false){
          $(".keys").removeClass("not-active");
          $(".screen").text("Try again.");
          setTimeout(function(){$(".screen").text("Moves: "+dummySequence.length);},1000);
        }
        if (i>=sequence.length && correct===true){
          gameStart();
          
      }
        
      }, 800)
      
      
      
    }
    function gameStart() {
      currentSeq = Math.random();
      setTimeout(function(){
      if (currentSeq <= 0.25) {
        greenButton();
        sequence.push(0);
  
      } else if (currentSeq <= 0.50 && currentSeq > 0.25) {
        redButton();
        sequence.push(1);
  
      } else if (currentSeq <= 0.75 && currentSeq > 0.50) {
        yellowButton();
        sequence.push(2);
  
      } else if (currentSeq <= 1 && currentSeq > 0.75) {
        blueButton();
        sequence.push(3);
  
      }
      $(".keys").removeClass("not-active");
      console.log(sequence);    
      dummySequence=sequence.slice();
      setTimeout(function(){$(".screen").text("Moves: "+dummySequence.length);},800);
  
    },800);
    }
    
  
    
    
    function greenButton() {
      audio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
      $(".t-l").css("background-color", "lime");
      audio.play();
      setTimeout(function() {
        $(".t-l").css("background-color", "#00a74a");
      }, 500);
  
    }
  
    function redButton() {
      audio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
      $(".t-r").css("background-color", "red");
      audio.play();
      setTimeout(function() {
        $(".t-r").css("background-color", "#9f0f17");
      }, 500);
  
    }
  
    function yellowButton() {
      audio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
      $(".b-l").css("background-color", "yellow");
      audio.play();
      setTimeout(function() {
        $(".b-l").css("background-color", "#cca707");
      }, 500);
  
    }
  
    function blueButton() {
      audio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');
      $(".b-r").css("background-color", "blue");
      audio.play();
      setTimeout(function() {
        $(".b-r").css("background-color", "#094a8f");
      }, 500);
  
    }
    
    function check(num){
      if (num != dummySequence.shift()){
        if(strict===true){
          sequence=[];
          dummySequence=sequence.slice();
          $(".screen").text("Start over.");
        }
        else{
        dummySequence=sequence.slice();
        correct=false;      
        i=0;
        $(".keys").addClass("not-active");
        
        
        $(".screen").text("Incorrect!");
        
        setTimeout(function(){runSequence();
                             },1200);
        }
      }  
      else{
        $(".screen").text("Moves: "+dummySequence.length);
      }
      console.log(sequence);
      if(dummySequence.length==0){
        $(".keys").addClass("not-active");
        i=0; 
        correct=true;
        setTimeout(function(){runSequence();},1200);
                 
      }
      
  
    }
    
    function reset(){
      sequence = [];
      currentSeq=-1;
      i=0;
      
      $(".keys").addClass("not-active");
      $(".screen").text("- -");
      
      
    }
  
        $(".t-l").click(function() {
          greenButton();
          check(0);
  
        });
      $(".t-r").click(function() {
          redButton();
          check(1);
        });
      $(".b-l").click(function() {
          yellowButton();
          check(2);
        });
      $(".b-r").click(function() {
          blueButton();
          check(3);
        });
  
    
    $(".start").click(function() {
      if (!power) {
        $(".start").addClass("light");
        power = true;
        gameStart();
  
      } else {
        $(".start").removeClass("light");
        reset();
        power = false;
        return;
  
      }
    });
    
    $(".strict").click(function() {
      if(strict===false){
        $(".strict").addClass("light2");
        strict=true;
      }
      else{
        $(".strict").removeClass("light2");
        strict=false;
      }
    });
  
  });