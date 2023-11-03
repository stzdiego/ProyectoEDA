class Score {
  constructor(name, totalPoints, firstSpotPoints, totalLastShotSpots) {
    this.name = name;
    this.totalPoints = totalPoints;
    this.firstSpotPoints = firstSpotPoints;
    this.totalLastShotSpots = totalLastShotSpots;
  }

  compare(score) {
    if (this.totalPoints != score.totalPoints) {
      return this.totalPoints - score.totalPoints;
    } else if (this.firstSpotPoints != score.firstSpotPoints) {
      return this.firstSpotPoints - score.firstSpotPoints;
    } else if (this.totalLastShotSpots != score.totalLastShotSpots) {
      return this.totalLastShotSpots - score.totalLastShotSpots;
    } else {
      return this.name.localeCompare(score.name);
    }
  }

  toString() {
    return this.name + " " + this.totalPoints + " " + this.firstSpotPoints + " " + this.totalLastShotSpots;
  }
}

module.exports = { Score };