var C = require('../Constants');
module.exports = {
  players: [],
  projectileList: {projectiles: [], removeNumber: 0},
  newPlayer : function () {
    var object = {};
    object.width = C.startingWidth;
    object.X_pos = this.getRandomInt(C.dimensions.minX, C.dimensions.maxX);
    object.Y_pos = this.getRandomInt(C.dimensions.minY, C.dimensions.maxY) - object.width;
    object.X_Vel = 0;
    object.Y_Vel = 0;
    return object;
  },
  updateProjectiles: function(projectileList){
  var projectiles = projectileList.projectiles;
    for (var i in projectiles) {
      if (projectiles[i].progress == undefined) {
        projectiles[i].progress = 0;
        var X_OriginalDistance = projectiles[i].coordinates.x - projectiles[i].X_origin;
        var Y_OriginalDistance = projectiles[i].coordinates.y - projectiles[i].Y_origin;
        var hypotenuse = Math.sqrt(Math.pow(X_OriginalDistance, 2) + Math.pow(Y_OriginalDistance, 2));
        projectiles[i].x_distance = X_OriginalDistance * (600 / hypotenuse);
        projectiles[i].y_distance = Y_OriginalDistance * (600 / hypotenuse);
      } else if (projectiles[i].progress >= 300) {
        projectiles.splice(0, 1);
        projectileList.removeNumber++;
      } else {
          if (projectiles[i].Y_pos < C.dimensions.minY + 1) {
            projectiles[i].Y_origin = projectiles[i].y_distance;
            projectiles[i].y_distance = projectiles[i].y_distance * projectiles[i].progress / 300 - projectiles[i].y_distance;
          }
          //} else if (object.Y_pos > yMaxBarrier){
          //  object.Y_pos = yMaxBarrier;
          //}
          //
          //if (object.X_pos >= C.dimensions.minX && object.X_pos <= xyMaxBarrier){
          //  object.X_pos -= player.X_Vel * c.speedMultiplier;
          //} else if (object.X_pos < c.dimensions.minX){
          //  object.X_pos = c.dimensions.minX;
          //} else if (object.X_pos > xyMaxBarrier){
          //  object.X_pos = xyMaxBarrier;
          //}
        projectiles[i].progress = projectiles[i].progress + C.speedMultiplier;
        projectiles[i].X_pos = projectiles[i].X_origin + projectiles[i].x_distance * projectiles[i].progress / 300;
        projectiles[i].Y_pos = projectiles[i].Y_origin + projectiles[i].y_distance * projectiles[i].progress / 300;
      }
      projectileList.projectiles = projectiles;
    }
    return projectileList;
  },
  getRandomInt : function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
};
