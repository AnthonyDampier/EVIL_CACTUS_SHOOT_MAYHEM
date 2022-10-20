console.log("Howdy Cowfolk");

var healthPoints = 100;
/*var shootSound;*/

function updateHealthPoints(points) {

	healthPoints = points;
	var healthBar = document.querySelector("#healthBar");
	healthBar.style.width = points + "%";

	if(healthPoints < 1) {
		alert("Game over!");
		window.location.reload();
	}

}


function livingEnemies() {
	return document.querySelectorAll(".enemy:not(.dead)");
}

function explosions() {
	return document.querySelectorAll(".explosion");
}


function iShoot(enemy) {
	enemy.classList.add("dead");

	if(!livingEnemies().length) {
		alert("You win!");
		window.location.reload();
	}

}


function enemyAttacksMe(enemy, explosion) {

	if(healthPoints > 0) {

		enemy.classList.add("showing");

		setTimeout(()=> {
			enemyShootsMe(enemy, explosion);
		}, 4000);

		setTimeout(()=> {
			enemy.classList.remove("showing");
			explosion.classList.remove("showing");
		}, 5000);
		
	}


}


function enemyShootsMe(enemy, explosion) {

	if(!enemy.classList.contains("dead")) {
		explosion.classList.add("showing");
		enemy.classList.add("exploded");
		updateHealthPoints(healthPoints - 20);

		setTimeout(()=> {
			enemy.classList.remove("shooting");
		}, 10);

	}

}


function randomEnemyAttacks() {

	var randomEnemyNo = Math.random() * livingEnemies().length;
	randomEnemyNo = Math.floor(randomEnemyNo);
	var enemy = livingEnemies()[randomEnemyNo];
	var explosion = explosions()[randomEnemyNo];

	var randomDelay = Math.random() * 2000 + 1000;

	setTimeout( ()=> {
		enemyAttacksMe(enemy, explosion);
		randomEnemyAttacks();
	}, randomDelay);
}