var context, Player, controller, loop, Blocks, game;

context = document.querySelector("canvas").getContext("2d");

context.canvas.height = 500;
context.canvas.width = 999;

//Blocks

Blocks = {
  height: 50,
  width: 200,
  x: 700,
  y: 350
};

//game

Player = {
  height: 50,
  width: 50,
  x: 500,
  y: 300,
  x_velocity: 0,
  y_velocity: 0
};

controller = {
  left: false,
  right: false,
  up: false,
  keyListener: function (event) {
    var key_state = event.type == "keydown" ? true : false;

    switch (event.keyCode) {
      case 37: // left key
        controller.left = key_state;
        break;
      case 38: // up key
        controller.up = key_state;
        break;
      case 39: // right key
        controller.right = key_state;
        break;
    }
  }
};

loop = function () {
  if (controller.up && Player.jumping == false) {
    Player.y_velocity -= 30;
    Player.jumping = true;
  }

  if (controller.left) {
    Player.x_velocity -= 0.5;
  }

  if (controller.right) {
    Player.x_velocity += 0.5;
  }

  Player.y_velocity += 1.5;
  Player.x += Player.x_velocity;
  Player.y += Player.y_velocity;
  Player.x_velocity *= 0.9;
  Player.y_velocity *= 0.9;

  //right block
  if (Player.y > 300 && Player.y < 303 && Player.x > 660 && Player.x < 900) {
    Player.jumping = false;
    Player.y = 300;
    Player.y_velocity = 0;
  }
  if (Player.y > 360 && Player.y < 450 && Player.x > 660 && Player.x < 900) {
    Player.jumping = false;
    Player.y = 450;
    Player.y_velocity = 0;
  }

  if (Player.y < 320 && Player.y > 300 && Player.x > 670 && Player.x < 900) {
    Player.jumping = false;
    Player.y = 300;
    Player.y_velocity = 0;
  }
  //end
  //Floor
  if (Player.y > 450 - 16 - 32) {
    Player.jumping = false;
    Player.y = 450 - 16 - 32;
    Player.y_velocity = 0;
  }
  context.fillStyle = "#38A2DF";
  context.fillRect(0, 0, 999, 500);
  //end of fllor
  context.fillStyle = "#ff0000";
  context.beginPath();
  context.rect(Player.x, Player.y, Player.width, Player.height);
  context.fill();
  context.strokeStyle = "#202830";
  context.lineWidth = 100;
  context.beginPath();
  context.moveTo(0, 500);
  context.lineTo(999, 500);
  context.stroke();

  //blocks
  context.fillStyle = "#363836";
  context.stroke();
  context.fillRect(Blocks.x, Blocks.y, Blocks.width, Blocks.height);

  //end of Blocks

  window.requestAnimationFrame(loop);
};

window.addEventListener("keydown", controller.keyListener);
window.addEventListener("keyup", controller.keyListener);
window.requestAnimationFrame(loop);
