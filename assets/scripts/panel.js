window.onload = function () {
    //alert();
    $('.dropdown-trigger').dropdown();
    let searchBox = document.querySelector('#search-box');
    let list = document.querySelector('#list');
    let cards = list.querySelectorAll('.appointment-card');

    function addEvents() {
        console.log('add Events fired')
        Array.from(cards).forEach(card => {
            card.addEventListener('click', function (e) {
                e.preventDefault();
                e.stopImmediatePropagation();

                console.log('card: ', e.target);
                if (e.target.nodeName === "A") {
                    let id = e.target.parentElement.parentElement.parentElement.parentElement.getAttribute('id');

                    $.ajax({
                        type: 'POST',
                        url: '/checkAppointmentStatus',
                        data: { id: id, status: e.target.innerText },
                        success: function (data) {
                            let card = document.getElementById(id);
                            if (data ==='checked'){
                                card.classList.add('checked');
                            }
                            else if(data ==='cancelled'){
                                card.classList.add('cancelled')
                            }
                        },
                        error: function () {

                        }
                    })
                }
            })
        })
    }

    searchBox.addEventListener('keyup', function (e) {
        e.stopPropagation();
        e.preventDefault();

        //Loop through Cards
        Array.from(cards).forEach(card => {
            let nhisID = card.querySelector('.nhis').innerHTML;
            let result = checkCardID(searchBox.value, nhisID);

            if (result) {
                card.classList.remove('hide');
            }
            else if (!result) {
                card.classList.add('hide');
            }

        })




    });



    //Check card ID
    function checkCardID(search, cardID) {
        let regex = new RegExp(search, 'gi');
        if (regex.test(cardID)) {
            return true;
        }
        else {
            return false;
        }
    }



    $('.dropdown-trigger').dropdown();
    addEvents()



}