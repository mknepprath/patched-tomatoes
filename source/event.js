// get critic vars (TODO: check if an average rating is available)
if ($('#scoreStats').length) {
  var criticStats = $('#scoreStats').find('div.superPageFontColor').clone()
  var criticScore = criticStats[0].innerText.replace('Average Rating:','').replace('/10','').trim()
  var oldCriticScore = $('span.meter-value > span').html()
  var criticTooltip = $('.tmeterpanel > .scoreTitle > span')

  // update critic section (TODO: add back tooltip with explanation of score)
  $('.tmeterpanel > .scoreTitle').html('FIXED TOMATOMETER ')
  // $('.tmeterpanel > .scoreTitle').append(criticTooltip)
  $('span.meter-value > span').html(criticScore*10)
  $('div.progress-bar').css({ width: criticScore*10 + '%' })
  $('#scoreStats').prepend("<div class='superPageFontColor'><span class='subtle superPageFontColor'>Tomatometer: </span>" + oldCriticScore + "%</div>")
  // hides 'all critics | top critics' options
  $('.critics-score').parent().hide()

  // update fresh/rotten icon and progress bar color
  // films that are 'certified fresh' will stay that way regardless
  if (!$('span.meter-tomato').hasClass('certified_fresh')) {
    if (criticScore >= 6) {
      $('span.meter-tomato').removeClass('rotten').addClass('fresh')
      $('div.progress-bar').removeClass('rotten').addClass('fresh')
    } else {
      $('span.meter-tomato').removeClass('fresh').addClass('rotten')
      $('div.progress-bar').removeClass('fresh').addClass('rotten')
    }
  }
}

// get audience vars
var audienceStats = $('.audience-info').find('div').clone()
if (audienceStats[0].innerText.indexOf('Average Rating:') >= 0) {
  var audienceScore = audienceStats[0].innerText.replace('Average Rating:','').replace('/5','').trim()
  var oldAudienceScore = $('div.meter-value > span').html()

  // update audience section
  $('.audiencepanel > .scoreTitle').html('FIXED AUDIENCE SCORE ')
  $('div.meter-value > span').html(audienceScore*20 + '%')
  $('.audience-info').prepend("<div class='superPageFontColor'><span class='subtle superPageFontColor'>Audience Score: </span>" + oldAudienceScore + "</div>")
}
