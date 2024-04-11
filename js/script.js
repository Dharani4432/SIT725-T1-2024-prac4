// Initialize the modal
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);

    // Handle click event for opening the modal
    var clickMeButton = document.getElementById('clickMeButton');
    clickMeButton.addEventListener('click', function() {
        var modalInstance = M.Modal.getInstance(document.getElementById('modal1'));
        modalInstance.open();
    });
});

$(document).ready(function() {
    // Function to handle form submission
    $('#myForm').submit(function(event) {
        event.preventDefault(); // Prevent default form submission

        // Get form data
        let formData = {
            title: $('#title').val(),
            subTitle: $('#subTitle').val(),
            image: $('#image').val(),
            description: $('#description').val()
        };

        // Submit data using AJAX
        $.ajax({
            url: '/api/tech',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(formData),
            success: function(response) {
                console.log(response);
                alert("Form submitted successfully!");
                $('#myForm')[0].reset(); // Reset the form
            },
            error: function(xhr, status, error) {
                console.error(error);
                alert("Failed to submit form. Please try again.");
            }
        });
    });

    // Function to fetch and display cards
    const fetchAndDisplayCards = () => {
        $.ajax({
            url: '/api/tech',
            method: 'GET',
            success: function(response) {
                const tech = response.data;
                tech.forEach(card => {
                    addCard(card);
                });
            },
            error: function(xhr, status, error) {
                console.error(error);
            }
        });
    };

    // Function to add card to the DOM
    const addCard = (item) => {
        const techHtml = `<div class="col s4 center-align">
            <div class="card medium">
                <div class="tech-image waves-effect waves-block waves-light tech-card">
                    <img class="activator tech-image" src="${item.image}">
                </div>
                <div class="card-content">
                    <span class="card-title activator grey-text text-darken-4">${item.title}<i class="material-icons right">more_vert</i></span>
                    <p><a href="#">${item.link}</a></p>
                </div>
                <div class="card-reveal">
                    <span class="card-title grey-text text-darken-4">${item.title}<i class="material-icons right">close</i></span>
                    <p class="card-text card-desc-color">${item.description}</p>
                </div>
            </div>
        </div>`;
        
        $("#card-section").append(techHtml);
    };

    // Fetch and display cards when the page is loaded
    fetchAndDisplayCards();
});
