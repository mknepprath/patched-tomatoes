// Search script tags for the script that sets global RottenTomatoes variable.
const scripts = document.querySelectorAll("script");
const initRTScriptElement = [...scripts].find(script => {
  return script.innerHTML.includes("/* -- Data -- */");
});

if (initRTScriptElement !== null) {
  // Run the code that adds RottenTomatoes data to `this`.
  // TODO: I don't know why this isn't already happening, but running it here lets
  //       me access the data. _shrug_
  eval(initRTScriptElement.innerHTML);

  const scoreInfo = this.RottenTomatoes.context.scoreInfo;

  console.log(scoreInfo);

  // Tomatometer title
  const tomatometerTitleElement = document.querySelector(
    ".mop-ratings-wrap__info .mop-ratings-wrap__title"
  );
  tomatometerTitleElement.innerHTML = "Critic Average";

  // Tomatometer score
  const tomatometerScoreElement = document.querySelector(
    ".mop-ratings-wrap__info .mop-ratings-wrap__percentage"
  );
  if (tomatometerScoreElement !== null) {
    const criticAverageScore = scoreInfo.tomatometerAllCritics.avgScore;
    tomatometerScoreElement.innerHTML = `${(criticAverageScore * 10)
      .toFixed(1)
      .replace(".0", "")}%`;
  }

  // Tomatometer icon
  const tomatometerIconElement = document.querySelector(
    ".mop-ratings-wrap__info .mop-ratings-wrap__icon"
  );
  if (
    tomatometerIconElement !== null &&
    scoreInfo.tomatometerAllCritics.avgScore >= 6
  ) {
    tomatometerIconElement.classList.remove("rotten");
    tomatometerIconElement.classList.add("fresh");
  } else {
    tomatometerIconElement.classList.remove("fresh");
    tomatometerIconElement.classList.add("rotten");
  }

  // Audience title
  const audienceTitleElement = document.querySelector(".audience-score__title");
  audienceTitleElement.innerHTML = "Audience Average";

  // Audience score
  const audienceScoreElement = document.querySelector(
    ".audience-score .mop-ratings-wrap__percentage"
  );

  if (audienceScoreElement !== null) {
    const audienceAverageScore = scoreInfo.audienceAll.averageRating;
    audienceScoreElement.innerHTML = `${(audienceAverageScore * 20)
      .toFixed(1)
      .replace(".0", "")}%`;
  }

  // Audience icon
  const audienceIconElement = document.querySelector(
    ".audience-score .mop-ratings-wrap__icon"
  );
  if (
    audienceIconElement !== null &&
    Number(scoreInfo.audienceAll.averageRating) >= 2.5
  ) {
    audienceIconElement.classList.remove("spilled");
    audienceIconElement.classList.add("upright");
  } else {
    audienceIconElement.classList.remove("upright");
    audienceIconElement.classList.add("spilled");
  }
}
