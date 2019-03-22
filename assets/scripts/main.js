document.addEventListener("DOMContentLoaded", function (e) {

  //hover effect for panels
  var cols = document.getElementsByClassName('col');
  console.log(cols);
  Array.from(cols).forEach(function (col) {
    col.addEventListener('mouseover', function (e) {

      
      if (e.target.classList.contains('col')) {
        anime.remove([e.target.querySelector('h3'), e.target.querySelector('p'), 
        e.target.querySelector('button')]);

        anime({
          targets: [e.target.querySelector('h3'), e.target.querySelector('p')],
          translateY: -70,
          duration: 200,
          easing: 'easeInOutSine'
        })

        anime({
          targets: e.target.querySelector('button'),
          translateY: -70,
          opacity: 1,
          duration: 300,
          easing: 'easeInOutSine'
        })
      }


    })

    col.addEventListener('mouseleave', function (e) {
      
      console.log(e.target.tagName);
     

      if (e.target.classList.contains('col') || e.target.tagName ==="DIV") {
        anime.remove([e.target.querySelector('h3'), e.target.querySelector('p'), 
        e.target.querySelector('button')])
        anime({
          targets: [e.target.querySelector('h3'), e.target.querySelector('p')],
          translateY: 0,
          duration: 200,
          easing: 'easeInOutSine'
        });

        anime({
          targets: e.target.querySelector('button'),
          translateY: 0,
          opacity: 0,
          duration: 200,
          easing: 'easeInOutSine'
        });
      }

    })
  })

  //click events for buttons
  var buttons = document.querySelectorAll('button');
  buttons.forEach(function (button) {
    button.addEventListener('click', function (e) {
      if (e.target.id === "appointment") {
         var formWindow = document.getElementsByClassName('form-window');
        // formWindow.innerHTML = "<div class="+"'close'>X</div>"+
        // "<div class="+ "'form-content'"+"></div>";
        
        $('.form-content').load('/views/partials/appointment-form.ejs')
        formWindow[0].style.visibility = "initial";
      }
      else {
        console.log("don't show");
      }
    })
  })
  
//close button
var closeBtn = document.querySelector('.close');
closeBtn.onclick = function(){

  $('.form-window')[0].style.visibility = "hidden";

}

});




  // console.log('hover');
        // anime({
        //     targets: [target[0],target[1]],
        //     translateY: 0,
        //     easing: 'linear',
        //     duration: 1000
        // })