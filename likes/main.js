SC.initialize({
	client_id: "40b6a9b2565ec8715f13d902fb9c516d",
	redirect_uri: "danielisgr8.github.io/likes/callback.html"
});
SC.stream('/tracks/293').then(function(player){
  player.play();
});