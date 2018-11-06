frontend-nanodegree-arcade-game
===============================

Students should use this [rubric](https://review.udacity.com/#!/projects/2696458597/rubric) for self-checking their submission. Make sure the functions you write are **object-oriented** - either class functions (like Player and Enemy) or class prototype functions such as Enemy.prototype.checkCollisions, and that the keyword 'this' is used appropriately within your class and class prototype functions to refer to the object the function is called upon. Also be sure that the **readme.md** file is updated with your instructions on both how to 1. Run and 2. Play your arcade game.

For detailed instructions on how to get started, check out this [guide](https://docs.google.com/document/d/1v01aScPjSWCCWQLIpFqvg3-vXLH2e8_SZQKC8jNO0Dc/pub?embedded=true).

================================

# Classic Arcade Game Clone #
Cross the road to the river to win the game.

## Installation ##
* Download zip file and unzip it.
* Open index.html in your browser to run the game.

## How to play ##
* Use arrow keys to move the player.
* Go to the bottom right of the canvas and tap spacebar to choose the characters.
* Reach to the river to win the game.
* Click replay to play again.

## Rule ##
* At the beginning, player has life score of 8.
* Player has to go to the river to win the game, but to get the high prize, he have to collect gem as much as possible.
* There are infinity of gems. The point of each color are different, 3 for green gem, 2 for blue gem, and 1 for orange gem. When the player reach the river, the point will be calculated accordingly.
* If player has point less than 16, he will get bronze medal. If he has at least 16 points, he will get silver medal. If he has more than 20 points, he will get gold medal.
* When player clash the bug, his position will be reset to the beginning, and his life score will decrease by 1. If life score equal to 0, the game is over.

## Dependency ##
* Font-Awesome
* Google Font

## Author ##
* Wassakorn Sarakul

Note
* This project is part of frontend-nanodegree.
