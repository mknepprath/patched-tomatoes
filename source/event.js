// Search script tags for the script that sets global RottenTomatoes variable.
// The script currently contains a code comment we're searching based on...
// Might be smarter to search, instead, for `root.RottenTomatoes`.
const scripts = document.querySelectorAll("script");
const initRTScriptElement = [...scripts].find(script => {
  return script.innerHTML.includes("/* -- Data -- */");
});

if (initRTScriptElement !== null) {
  // Run the code that adds RottenTomatoes data to `this`.
  // TODO: I don't know why this isn't already happening, but running it here lets
  //       me access the data. _shrug_
  eval(initRTScriptElement.innerHTML);

  const {
    audienceAll,
    tomatometerAllCritics
  } = this.RottenTomatoes.context.scoreInfo;

  // Update Tomatometer title
  const tomatometerTitleElement = document.querySelector(
    ".mop-ratings-wrap__info .mop-ratings-wrap__title"
  );
  tomatometerTitleElement.innerHTML = "Critic Average";

  // Update Tomatometer score
  const tomatometerScoreElement = document.querySelector(
    ".mop-ratings-wrap__info .mop-ratings-wrap__percentage"
  );
  if (tomatometerScoreElement !== null) {
    const criticAverageScore = tomatometerAllCritics.avgScore;
    tomatometerScoreElement.innerHTML = `${(criticAverageScore * 10)
      .toFixed(1)
      .replace(".0", "")}%`;
  }

  // Update Tomatometer icon
  const tomatometerIconElement = document.querySelector(
    ".mop-ratings-wrap__info .mop-ratings-wrap__icon"
  );
  // - If the icon exists, update it based on the average score.
  if (tomatometerIconElement !== null && tomatometerAllCritics.avgScore >= 6) {
    tomatometerIconElement.classList.remove("rotten");
    tomatometerIconElement.classList.add("fresh");
  } else {
    tomatometerIconElement.classList.remove("fresh");
    tomatometerIconElement.classList.add("rotten");
  }

  // Update audience title
  const audienceTitleElement = document.querySelector(".audience-score__title");
  audienceTitleElement.innerHTML = "Audience Average";

  // Update audience score
  const audienceScoreElement = document.querySelector(
    ".audience-score .mop-ratings-wrap__percentage"
  );
  if (audienceScoreElement !== null) {
    const audienceAverageScore = audienceAll.averageRating;
    audienceScoreElement.innerHTML = `${(audienceAverageScore * 20)
      .toFixed(1)
      .replace(".0", "")}%`;
  }

  // Update audience icon
  const audienceIconElement = document.querySelector(
    ".audience-score .mop-ratings-wrap__icon"
  );
  // - If the icon exists, update it based on the average score.
  if (audienceIconElement !== null && Number(audienceAll.averageRating) >= 3) {
    audienceIconElement.classList.remove("spilled");
    audienceIconElement.classList.add("upright");
  } else {
    audienceIconElement.classList.remove("upright");
    audienceIconElement.classList.add("spilled");
  }
}
