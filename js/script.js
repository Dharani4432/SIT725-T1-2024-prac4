document.addEventListener('DOMContentLoaded', function() {
  var form = document.getElementById('myForm');
  form.addEventListener('submit', function(e) {
      e.preventDefault(); // Prevent default form submission behavior
      
      var formData = new FormData(this);
      var formObject = {};
      
      formData.forEach(function(value, key) {
          formObject[key] = value;
      });

      // Send form data to the server
      fetch('/submit-form', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(formObject)
      })
      .then(response => response.json())
      .then(data => {
          console.log(data); // Log server response
          alert("Form submitted successfully!");
          form.reset(); // Reset the form
      })
      .catch(error => {
          console.error('Error:', error);
          alert("Failed to submit form. Please try again later.");
      });
  });
});
