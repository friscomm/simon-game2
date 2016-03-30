$(document).ready(function() {

  //these variables are used for the random number generator function below
  var minNum = 1;
  var maxNum = 4;
  //this is used for the setTimer function
  var timeoutID;
  //these empty arrays will hold the moves made by the computer and the user
  var playerMoves = [];
  var compMoves = [];

  var playerTurn = ["off"];
  var compTurn = ["off"];

  //----------------------------------------------------------  

  //the following 4 functions change the background color of the buttons
  function change1() {
    $(".btn-green").css("background-color", "green");
  }

  function change2() {
    $(".btn-red").css("background-color", "#B80000");
  }

  function change3() {
    $(".btn-yellow").css("background-color", "#ffe44d");
  }

  function change4() {
    $(".btn-blue").css("background-color", "#3333cc");
  }

  //----------------------------------------------------------

  //this generates a random number between 1-4 that is then used to designate one of the buttons to click
  function randomLights() {
    playerTurn.unshift("off");
    
    //if there aren't any elements in the array, this will generate a random number and push it to the compMoves array
    if (compMoves.length == 0 && playerTurn[0] == "off") {
      $(".steps").html("Round" + "<br>" + 1);
      var randomNum = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
      $(".btn" + randomNum).click();
      compMoves.push(randomNum);
      setTimeout(function() {
        playerTurn.unshift("on");
      }, 400);

    }
    //if there ARE elements in the array, this will play those elements and then generate a random number and push that into the array as well
    else if (compMoves.length > 0 && playerTurn[0] == "off") {
      var range = compMoves.length;
      $(".steps").html("Round" + "<br>" + (compMoves.length+1));
      var randomNum = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
      var i = 0;
      //this sets the interval the buttons will light up at and iterates through the array at a set interval, this had to be done without a for loop, because the for loop iterates all at once, and can't easily be combined with timing events like setInterval or setTimeout
      var interval = setInterval(function() {

        if (i == compMoves.length && i < 19) {
          clearInterval(interval);
          setTimeout(function() {
            $(".btn" + randomNum).click();
            compMoves.push(randomNum);
            playerTurn.unshift("on");
          }, 400);

        } else if (i == compMoves.length && i == 19) {
          clearInterval(interval);
          setTimeout(function() {
            $(".btn" + randomNum).click();
            compMoves.push(randomNum);
          }, 400);
          setTimeout(function() {
            playerTurn.unshift("on");
            alert("Final round!");
          }, 600);
          
        } else if (i !== compMoves.length) {
          $(".btn" + compMoves[i]).click();
          i++;
        }
      }, 400);
      playerMoves.splice(0, playerMoves.length);
    }
  }

  //----------------------------------------------------------

  //the following four button functions will make a sound whenever the buttons are clicked and change the bankground color to give the appearance of the buttons lighting up

  //GREEN BUTTON CLICK
  $(".btn-green").click(function() {
    var compMovesString = JSON.stringify(compMoves);
    var playerMovesString = JSON.stringify(playerMoves);
    if (playerTurn[0] == "on") {
      if (compMoves.length == 0) {
        //this makes it beep
        var wav = 'https://s3.amazonaws.com/freecodecamp/simonSound1.mp3';
        var audio = new Audio(wav);
        audio.play();
        //this changes the color
        $(".btn-green").css("background-color", "#84e184");
        timeoutID = window.setTimeout(change1, 175);
      } else if (compMoves.length > 0 && compMoves.length < 20) {
        var wav = 'https://s3.amazonaws.com/freecodecamp/simonSound1.mp3';
        var audio = new Audio(wav);
        audio.play();
        $(".btn-green").css("background-color", "#84e184");
        timeoutID = window.setTimeout(change1, 175);
        playerMoves.push(1);

        if (playerMoves[playerMoves.length - 1] == compMoves[playerMoves.length - 1] && compMoves.length !== playerMoves.length) {

        } else if (playerMoves[playerMoves.length - 1] !== compMoves[playerMoves.length - 1] && compMoves.length !== playerMoves.length && $("#strict-btn").html() == "Strict Mode: Off") {
          var i = 0;
          setTimeout(function() {
            alert("Wrong answer! Try again!");
          }, 400);
          setTimeout(function() {
            playerTurn.unshift("off");
            var interval = setInterval(function() {
              if (i < compMoves.length) {
                $(".btn" + compMoves[i]).click();
                i++;
              }
              else if (i == compMoves.length) {
                clearInterval(interval);
              }
            }, 400);
          }, 800);
          setTimeout(function() {
            playerTurn.unshift("on");
          }, 800 + 401 * compMoves.length);
          playerMoves.splice(0, playerMoves.length);
        } else if (playerMoves[playerMoves.length - 1] !== compMoves[playerMoves.length - 1] && compMoves.length !== playerMoves.length && $("#strict-btn").html() == "Strict Mode: On") {
          setTimeout(function() {
          $(".btn-reset").click();
          }, 700);
        } else if (playerMoves[playerMoves.length - 1] == compMoves[playerMoves.length - 1] && compMoves.length == playerMoves.length) {
          setTimeout(function() {
            playerTurn.unshift("off");
          }, 350);
          setTimeout(function() {
            $(".btn-start").click();
          }, 600);
        }
      }
       else if (compMoves.length == 20) {
        var wav = 'https://s3.amazonaws.com/freecodecamp/simonSound1.mp3';
        var audio = new Audio(wav);
        audio.play();
        $(".btn-green").css("background-color", "#84e184");
        timeoutID = window.setTimeout(change1, 175);
        playerMoves.push(1);
        if (playerMoves[playerMoves.length - 1] == compMoves[playerMoves.length - 1] && compMoves.length !== playerMoves.length) {

        } else if (playerMoves[playerMoves.length - 1] !== compMoves[playerMoves.length - 1] && compMoves.length !== playerMoves.length && $("#strict-btn").html() == "Strict Mode: Off") {
          var i = 0;
          setTimeout(function() {
            alert("Wrong answer! Try again!");
          }, 400);
          setTimeout(function() {
            playerTurn.unshift("off");
            var interval = setInterval(function() {
              if (i < compMoves.length) {
                $(".btn" + compMoves[i]).click();
                i++;
              }
              else if (i == compMoves.length) {
                clearInterval(interval);
              }
            }, 400);
          }, 800);
          setTimeout(function() {
            playerTurn.unshift("on");
          }, 800 + 401 * compMoves.length);
          playerMoves.splice(0, playerMoves.length);
        }  else if (playerMoves[playerMoves.length - 1] !== compMoves[playerMoves.length - 1] && compMoves.length !== playerMoves.length && $("#strict-btn").html() == "Strict Mode: On") {
          setTimeout(function() {
          $(".btn-reset").click();
          }, 700);
        } else if (playerMoves[playerMoves.length - 1] == compMoves[playerMoves.length - 1] && compMoves.length == playerMoves.length) {
          setTimeout(function() {
            alert("You Win!");
            playerMoves.splice(0, playerMoves.length);
            compMoves.splice(0, compMoves.length);
            playerTurn.unshift("off");
            compTurn.unshift("off");
          }, 350);
        }  
       }
    } else if (playerTurn[0] == "off") {
      var wav = 'https://s3.amazonaws.com/freecodecamp/simonSound1.mp3';
      var audio = new Audio(wav);
      audio.play();
      $(".btn-green").css("background-color", "#84e184");
      timeoutID = window.setTimeout(change1, 175);
    }
  });

  //RED BUTTON CLICK
  $(".btn-red").click(function() {
    var compMovesString = JSON.stringify(compMoves);
    var playerMovesString = JSON.stringify(playerMoves);
    if (playerTurn[0] == "on") {
      if (compMoves.length == 0) {
        var wav = 'https://s3.amazonaws.com/freecodecamp/simonSound2.mp3';
        var audio = new Audio(wav);
        audio.play();
        $(".btn-red").css("background-color", "#de5454");
        timeoutID = window.setTimeout(change2, 175);
      } else if (compMoves.length > 0 && compMoves.length < 20) {
        var wav = 'https://s3.amazonaws.com/freecodecamp/simonSound2.mp3';
        var audio = new Audio(wav);
        audio.play();
        $(".btn-red").css("background-color", "#de5454");
        timeoutID = window.setTimeout(change2, 175);
        playerMoves.push(2);
       
        if (playerMoves[playerMoves.length - 1] == compMoves[playerMoves.length - 1] && compMoves.length !== playerMoves.length) {

        } else if (playerMoves[playerMoves.length - 1] !== compMoves[playerMoves.length - 1] && compMoves.length !== playerMoves.length && $("#strict-btn").html() == "Strict Mode: Off") {
          var i = 0;
          setTimeout(function() {
            alert("Wrong answer! Try again!");
          }, 400);
          setTimeout(function() {
            playerTurn.unshift("off");
            var interval = setInterval(function() {
              if (i < compMoves.length) {
                $(".btn" + compMoves[i]).click();
                i++;
              }
              else if (i == compMoves.length) {
                clearInterval(interval);
              }
            }, 400);
          }, 800);
           setTimeout(function() {
            playerTurn.unshift("on");
          }, 800 + 401 * compMoves.length);
          playerMoves.splice(0, playerMoves.length);
        }  else if (playerMoves[playerMoves.length - 1] !== compMoves[playerMoves.length - 1] && compMoves.length !== playerMoves.length && $("#strict-btn").html() == "Strict Mode: On") {
          setTimeout(function() {
          $(".btn-reset").click();
          }, 700);
        } else if (playerMoves[playerMoves.length - 1] == compMoves[playerMoves.length - 1] && compMoves.length == playerMoves.length) {
          setTimeout(function() {
            playerTurn.unshift("off");

          }, 350);

          setTimeout(function() {
            $(".btn-start").click();
          }, 500);

      
        }
      } else if (compMoves.length == 20) {
        var wav = 'https://s3.amazonaws.com/freecodecamp/simonSound2.mp3';
        var audio = new Audio(wav);
        audio.play();
        $(".btn-red").css("background-color", "#de5454");
        timeoutID = window.setTimeout(change2, 175);
        playerMoves.push(2);
        if (playerMoves[playerMoves.length - 1] == compMoves[playerMoves.length - 1] && compMoves.length !== playerMoves.length) {

        } else if (playerMoves[playerMoves.length - 1] !== compMoves[playerMoves.length - 1] && compMoves.length !== playerMoves.length && $("#strict-btn").html() == "Strict Mode: Off") {
          var i = 0;
          setTimeout(function() {
            alert("Wrong answer! Try again!");
          }, 400);
          setTimeout(function() {
            playerTurn.unshift("off");
            var interval = setInterval(function() {
              if (i < compMoves.length) {
                $(".btn" + compMoves[i]).click();
                i++;
              }
              else if (i == compMoves.length) {
                clearInterval(interval);
              }
            }, 400);
          }, 800);
          setTimeout(function() {
            playerTurn.unshift("on");
          }, 800 + 401 * compMoves.length);
          playerMoves.splice(0, playerMoves.length);
        }  else if (playerMoves[playerMoves.length - 1] !== compMoves[playerMoves.length - 1] && compMoves.length !== playerMoves.length && $("#strict-btn").html() == "Strict Mode: On") {
          setTimeout(function() {
          $(".btn-reset").click();
          }, 700);
        } else if (playerMoves[playerMoves.length - 1] == compMoves[playerMoves.length - 1] && compMoves.length == playerMoves.length) {
          setTimeout(function() {
            alert("You Win!");
            playerMoves.splice(0, playerMoves.length);
            compMoves.splice(0, compMoves.length);
            playerTurn.unshift("off");
            compTurn.unshift("off");
          }, 350);
        } 
      }
    } else if (playerTurn[0] == "off") {
      var wav = 'https://s3.amazonaws.com/freecodecamp/simonSound2.mp3';
      var audio = new Audio(wav);
      audio.play();
      $(".btn-red").css("background-color", "#de5454");
      timeoutID = window.setTimeout(change2, 175);
    }
  });

  //YELLOW BUTTON CLICK
  $(".btn-yellow").click(function() {
    var compMovesString = JSON.stringify(compMoves);
    var playerMovesString = JSON.stringify(playerMoves);
    if (playerTurn[0] == "on") {
      if (compMoves.length == 0) {
        var wav = 'https://s3.amazonaws.com/freecodecamp/simonSound3.mp3';
        var audio = new Audio(wav);
        audio.play();
        $(".btn-yellow").css("background-color", "#fff099");
        timeoutID = window.setTimeout(change3, 175);
      } else if (compMoves.length > 0 && compMoves.length < 20) {
        var wav = 'https://s3.amazonaws.com/freecodecamp/simonSound3.mp3';
        var audio = new Audio(wav);
        audio.play();
        $(".btn-yellow").css("background-color", "#fff099");
        timeoutID = window.setTimeout(change3, 175);
        playerMoves.push(3);
  
        if (playerMoves[playerMoves.length - 1] == compMoves[playerMoves.length - 1] && compMoves.length !== playerMoves.length) {

        } else if (playerMoves[playerMoves.length - 1] !== compMoves[playerMoves.length - 1] && compMoves.length !== playerMoves.length && $("#strict-btn").html() == "Strict Mode: Off") {
          var i = 0;
          setTimeout(function() {
            alert("Wrong answer! Try again!");
          }, 400);
          setTimeout(function() {
            playerTurn.unshift("off");
            var interval = setInterval(function() {
              if (i < compMoves.length) {
                $(".btn" + compMoves[i]).click();
                i++;
              }
              else if (i == compMoves.length) {
                clearInterval(interval);
              }
            }, 400);
          }, 800);
           setTimeout(function() {
            playerTurn.unshift("on");
          }, 800 + 401 * compMoves.length);
          playerMoves.splice(0, playerMoves.length);
        }  else if (playerMoves[playerMoves.length - 1] !== compMoves[playerMoves.length - 1] && compMoves.length !== playerMoves.length && $("#strict-btn").html() == "Strict Mode: On") {
          setTimeout(function() {
          $(".btn-reset").click();
          }, 700);
        } else if (playerMoves[playerMoves.length - 1] == compMoves[playerMoves.length - 1] && compMoves.length == playerMoves.length) {
          setTimeout(function() {
            playerTurn.unshift("off");

          }, 350);
          setTimeout(function() {
            $(".btn-start").click();
          }, 500);
    
        }
      } else if (compMoves.length == 20) {
        var wav = 'https://s3.amazonaws.com/freecodecamp/simonSound3.mp3';
        var audio = new Audio(wav);
        audio.play();
        $(".btn-yellow").css("background-color", "#fff099");
        timeoutID = window.setTimeout(change3, 175);
        playerMoves.push(3);
        if (playerMoves[playerMoves.length - 1] == compMoves[playerMoves.length - 1] && compMoves.length !== playerMoves.length) {

        } else if (playerMoves[playerMoves.length - 1] !== compMoves[playerMoves.length - 1] && compMoves.length !== playerMoves.length && $("#strict-btn").html() == "Strict Mode: Off") {
          var i = 0;
          setTimeout(function() {
            alert("Wrong answer! Try again!");
          }, 400);
          setTimeout(function() {
            playerTurn.unshift("off");
            var interval = setInterval(function() {
              if (i < compMoves.length) {
                $(".btn" + compMoves[i]).click();
                i++;
              }
              else if (i == compMoves.length) {
                clearInterval(interval);
              }
            }, 400);
          }, 800);
          setTimeout(function() {
            playerTurn.unshift("on");
          }, 800 + 401 * compMoves.length);
          playerMoves.splice(0, playerMoves.length);
        }  else if (playerMoves[playerMoves.length - 1] !== compMoves[playerMoves.length - 1] && compMoves.length !== playerMoves.length && $("#strict-btn").html() == "Strict Mode: On") {
          setTimeout(function() {
          $(".btn-reset").click();
          }, 700);
        } else if (playerMoves[playerMoves.length - 1] == compMoves[playerMoves.length - 1] && compMoves.length == playerMoves.length) {
          setTimeout(function() {
            alert("You Win!");
            playerMoves.splice(0, playerMoves.length);
            compMoves.splice(0, compMoves.length);
            playerTurn.unshift("off");
            compTurn.unshift("off");
          }, 350);
        }   
      }
    } else if (playerTurn[0] == "off") {
      var wav = 'https://s3.amazonaws.com/freecodecamp/simonSound3.mp3';
      var audio = new Audio(wav);
      audio.play();
      $(".btn-yellow").css("background-color", "#fff099");
      timeoutID = window.setTimeout(change3, 175);
    }
  });

  //BLUE BUTTON CLICK
  $(".btn-blue").click(function() {
    var compMovesString = JSON.stringify(compMoves);
    var playerMovesString = JSON.stringify(playerMoves);
    if (playerTurn[0] == "on") {
      if (compMoves.length == 0) {
        var wav = 'https://s3.amazonaws.com/freecodecamp/simonSound4.mp3';
        var audio = new Audio(wav);
        audio.play();
        $(".btn-blue").css("background-color", "#8080ff");
        timeoutID = window.setTimeout(change4, 175);
      } else if (compMoves.length > 0 && compMoves.length < 20) {
        var wav = 'https://s3.amazonaws.com/freecodecamp/simonSound4.mp3';
        var audio = new Audio(wav);
        audio.play();
        $(".btn-blue").css("background-color", "#8080ff");
        timeoutID = window.setTimeout(change4, 175);
        playerMoves.push(4);

        if (playerMoves[playerMoves.length - 1] == compMoves[playerMoves.length - 1] && compMoves.length !== playerMoves.length) {

        } else if (playerMoves[playerMoves.length - 1] !== compMoves[playerMoves.length - 1] && compMoves.length !== playerMoves.length && $("#strict-btn").html() == "Strict Mode: Off") {
          var i = 0;
          setTimeout(function() {
            alert("Wrong answer! Try again!");
          }, 400);
          setTimeout(function() {
            playerTurn.unshift("off");
            var interval = setInterval(function() {
              if (i < compMoves.length) {
                $(".btn" + compMoves[i]).click();
                i++;
              }
              else if (i == compMoves.length) {
                clearInterval(interval);
              }
            }, 400);
          }, 800);
           setTimeout(function() {
            playerTurn.unshift("on");
          }, 800 + 401 * compMoves.length);
          playerMoves.splice(0, playerMoves.length);
        }  else if (playerMoves[playerMoves.length - 1] !== compMoves[playerMoves.length - 1] && compMoves.length !== playerMoves.length && $("#strict-btn").html() == "Strict Mode: On") {
          setTimeout(function() {
          $(".btn-reset").click();
          }, 700);
        } else if (playerMoves[playerMoves.length - 1] == compMoves[playerMoves.length - 1] && compMoves.length == playerMoves.length) {
          setTimeout(function() {
            playerTurn.unshift("off");

          }, 350);

          setTimeout(function() {
            $(".btn-start").click();
          }, 500);

         
        }
      } else if (compMoves.length == 20) {
        var wav = 'https://s3.amazonaws.com/freecodecamp/simonSound4.mp3';
        var audio = new Audio(wav);
        audio.play();
        $(".btn-blue").css("background-color", "#8080ff");
        timeoutID = window.setTimeout(change4, 175);
        playerMoves.push(4);
        if (playerMoves[playerMoves.length - 1] == compMoves[playerMoves.length - 1] && compMoves.length !== playerMoves.length) {

        } else if (playerMoves[playerMoves.length - 1] !== compMoves[playerMoves.length - 1] && compMoves.length !== playerMoves.length && $("#strict-btn").html() == "Strict Mode: Off") {
          var i = 0;
          setTimeout(function() {
            alert("Wrong answer! Try again!");
          }, 400);
          setTimeout(function() {
            playerTurn.unshift("off");
            var interval = setInterval(function() {
              if (i < compMoves.length) {
                $(".btn" + compMoves[i]).click();
                i++;
              }
              else if (i == compMoves.length) {
                clearInterval(interval);
              }
            }, 400);
          }, 800);
          setTimeout(function() {
            playerTurn.unshift("on");
          }, 800 + 401 * compMoves.length);
          playerMoves.splice(0, playerMoves.length);
        }  else if (playerMoves[playerMoves.length - 1] !== compMoves[playerMoves.length - 1] && compMoves.length !== playerMoves.length && $("#strict-btn").html() == "Strict Mode: On") {
          setTimeout(function() {
          $(".btn-reset").click();
          }, 700);
        } else if (playerMoves[playerMoves.length - 1] == compMoves[playerMoves.length - 1] && compMoves.length == playerMoves.length) {
          setTimeout(function() {
            alert("You Win!");
            playerMoves.splice(0, playerMoves.length);
            compMoves.splice(0, compMoves.length);
            playerTurn.unshift("off");
            compTurn.unshift("off");
          }, 350);
        }  
      }
    } else if (playerTurn[0] == "off") {
      var wav = 'https://s3.amazonaws.com/freecodecamp/simonSound4.mp3';
      var audio = new Audio(wav);
      audio.play();
      $(".btn-blue").css("background-color", "#8080ff");
      timeoutID = window.setTimeout(change4, 175);
    }
  });

  //----------------------------------------------------------  

  //this makes the random sequence start, it activates when you click the start button
  $(".btn-start").click(function() {
    randomLights();
  });
  
  $(".btn-reset").click(function() {
    playerMoves.splice(0, playerMoves.length);
    compMoves.splice(0, compMoves.length);
    playerTurn.unshift("off");
    compTurn.unshift("off");
    $(".btn-start").click();
  });
  
  $("#strict-btn").click(function() {
    if ($("#strict-btn").html() == "Strict Mode: Off") {
      $("#strict-btn").html("Strict Mode: On");
    } else if ($("#strict-btn").html() == "Strict Mode: On") {
      $("#strict-btn").html("Strict Mode: Off");
    }
  });
});
