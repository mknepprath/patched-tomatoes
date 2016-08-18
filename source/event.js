var criticStats = $('#scoreStats').find('div.superPageFontColor').clone()
var criticScore = criticStats[0].innerText.replace('Average Rating:','').replace('/10','').trim()
// var criticTitle = $('.scoreTitle')
// var criticTooltip = $('.scoreTitle > span')
// console.log(criticTooltip)
$('span.meter-value > span').html(criticScore*10)
$('div.progress-bar').css({ width: criticScore*10 + '%' });

if (criticScore >= 6) {
  $('span.meter-tomato').removeClass('rotten')
  $('span.meter-tomato').addClass('fresh')
  $('div.progress-bar').removeClass('rotten')
  $('div.progress-bar').addClass('fresh')
} else {
  $('span.meter-tomato').removeClass('fresh')
  $('span.meter-tomato').addClass('rotten')
  $('div.progress-bar').removeClass('fresh')
  $('div.progress-bar').addClass('rotten')
}

var audienceStats = $('.audience-info').find('div').clone()
var audienceScore = audienceStats[0].innerText.replace('Average Rating:','').replace('/5','').trim()
$('div.meter-value > span').html(audienceScore*10 + '%')
