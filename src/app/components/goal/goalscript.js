function getPercentageOfAmountAchievedToCircularBar(amountAchieved, amountGoal) {
  let circularProgress = document.querySelector('circular-progress');
  let progressValue = document.querySelector('progress-value');
  let progressStartValue = 0,
    progressEndValue = Math.floor(((amountAchieved)/(amountGoal)) * 100),
    speed = 100;

  let progress = setInterval(() => {
    progressStartValue++;

    progressValue.textContent = `${progressStartValue}%`
    circularProgress.style.background = `conic-gradient(#7d2ae8 ${progressStartValue * 3.6}deg, #ededed 0deg)`

    if(progressStartValue === progressEndValue){
      clearInterval(progress);
    }
  }, speed);
  return progressEndValue;

}

//getPercentageOfAmountAchievedToCircularBar();
