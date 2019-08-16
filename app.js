'use strict';


function getUsername(username) {
    fetch('https://api.github.com/users/'+ username + '/repos?type=all')
      .then(response => response.json())
      .then(responseJson => displayRepos(responseJson))
      .catch(error => alert('Something Went Wrong'));
  }

function displayRepos(responseJson) {
    console.log(responseJson);
    if (responseJson.message === 'Not Found'){
        alert('Username not found. Please try again.')
    } else if (responseJson.length === 0) {
        $('.js-list-results').append(`<h2>No repositories found for this user</h2>`)
    } else {
        for(var i = 0; i < responseJson.length; i++){
            $('.js-list-results').append(`
            <li><span class='bold'>${responseJson[i].name}</span> - <a class='link' href='${responseJson[i].html_url}'>View on Github</li>
            `)
        }
    }
  }

function watchForm() {
    $('form').submit(event => {
      event.preventDefault();
      $('.js-list-results').empty();
      let username = $('#js-user-search').val();
      getUsername(username);
    });
  }
  
  $(function() {
    watchForm();
  });