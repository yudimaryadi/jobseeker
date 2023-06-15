// get Product
$(document).ready(function () {
  var currentPage = 1;
  var candidatesPerPage = 6; // Number of candidates per page

  // Fetch candidate data
  function fetchCandidates(page) {
    $.ajax({
      url: "http://localhost:3000/candidates",
      method: "GET",
      data: { page: page, limit: candidatesPerPage },
      dataType: "json",
      success: function (response) {
        console.log(response);
        if (response.rows?.length) {
          displayCandidates(response.rows);
          displayPagination(Math.ceil(response.count / candidatesPerPage));
        } else {
          console.log(response.message);
        }
      },
      error: function (xhr, status, error) {
        console.log(error);
      },
    });
  }

  // Initial fetch
  fetchCandidates(currentPage);

  // Display candidates
  function displayCandidates(candidates) {
    var candidatesContainer = $("#candidatesContainer");
    candidatesContainer.empty();

    $.each(candidates, function (index, candidate) {
      var card = $('<div class="col-md-4"></div>');
      var cardBody = $('<div class="card-body"></div>');
      cardBody.css({
        "margin-left": "1px",
        "margin-bottom": "5px",
        "border-radius": "17px",
        "background-color": "#f8f9fa", // Set your desired background color here
      });
      card.append(cardBody);

      var fullName = $(
        '<h5 class="card-title">' + candidate.full_name + "</h5>"
      );
      cardBody.append(fullName);

      cardBody.append(
        '<p class="card-text">Date of Birth: ' + candidate.dob + "</p>"
      );
      cardBody.append(
        '<p class="card-text">Place of Birth: ' + candidate.pob + "</p>"
      );
      cardBody.append(
        '<p class="card-text">Gender: ' + candidate.gender + "</p>"
      );
      cardBody.append(
        '<p class="card-text">Years of Experience: ' +
          candidate.year_exp +
          "</p>"
      );
      cardBody.append(
        '<p class="card-text">Last Salary: ' + candidate.last_salary + "</p>"
      );

      var editButton = $('<a href="#" class="btn btn-primary" >Edit</a>');
      editButton.on("click", function () {
        console.log("Edit candidate: " + candidate.id);
        openEditModal(candidate);
      });
      cardBody.append(editButton);

      var deleteButton = $(
        '<a href="#" class="btn btn-danger ml-2">Delete</a>'
      );
      deleteButton.on("click", function (e) {
        e.preventDefault();
        console.log("Delete candidate: " + candidate.id);
        deleteProduct(candidate.id);
      });
      cardBody.append(deleteButton);

      candidatesContainer.append(card);
    });
  }

  // Display pagination links
  function displayPagination(totalPages) {
    var pagination = $("#pagination");
    pagination.empty();

    // Previous button
    if (currentPage > 1) {
      var previousLink = $(
        '<li class="page-item"><a class="page-link" href="#">Previous</a></li>'
      );
      previousLink.on("click", function () {
        currentPage--;
        fetchCandidates(currentPage);
      });
      pagination.append(previousLink);
    }

    // Page numbers
    for (var i = 1; i <= totalPages; i++) {
      var pageLink = $(
        '<li class="page-item"><a class="page-link" href="#">' + i + "</a></li>"
      );
      pageLink.on("click", function () {
        currentPage = parseInt($(this).text());
        fetchCandidates(currentPage);
      });
      if (i === currentPage) {
        pageLink.addClass("active");
      }
      pagination.append(pageLink);
    }

    // Next button
    if (currentPage < totalPages) {
      var nextLink = $(
        '<li class="page-item"><a class="page-link" href="#">Next</a></li>'
      );
      nextLink.on("click", function () {
        currentPage++;
        fetchCandidates(currentPage);
      });
      pagination.append(nextLink);
    }
  }

  $("#searchButton").click(function () {
    var searchQuery = $("#searchInput").val();
    searchCandidates(searchQuery);
  });

  function searchCandidates(query) {
    // Perform AJAX request to fetch search results
    $.ajax({
      url: `http://localhost:3000/candidates?search=${query}`,
      method: "GET",
      data: { query: query },
      success: function (response) {
        console.log(response);
        // Display search results
        displayCandidates(response.rows);
        displayPagination(1);
      },
      error: function () {
        console.log("Error occurred during search.");
      },
    });
  }
});

$(document).ready(function () {
  // Create Candidate Form Submission
  // $("#createCandidateButton").click(function () {
  //   $("#createCandidateModal").modal("show");
  // });
  $("#submitCandidateButton").click(function () {
    // Retrieve form field values
    var fullName = $("#fullName").val();
    var dob = $("#dob").val();
    var pob = $("#pob").val();
    var gender = $("#gender").val();
    var yearExp = $("#yearExp").val();
    var lastSalary = $("#lastSalary").val();

    // Perform data validation
    // ...

    // Create candidate object
    var candidate = {
      full_name: fullName,
      dob: dob,
      pob: pob,
      gender: gender,
      year_exp: yearExp,
      last_salary: lastSalary,
    };

    // Perform AJAX request to create the candidate
    $.ajax({
      url: "http://localhost:3000/candidates",
      method: "POST",
      data: candidate,
      success: function (response) {
        // Handle success response
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: response.message,
          showConfirmButton: false,
          timer: 1500,
        });
        $("#createCandidateModal").modal("hide");
        window.location.reload();
        // Refresh candidate list or perform any other necessary actions
      },
      error: function (xhr, status, error) {
        // Handle error response
        alert("Failed to create candidate. Error: " + error);
      },
    });
  });
});

function deleteProduct(id) {
  $.ajax({
    url: `http://localhost:3000/candidates/${id}`,
    method: "DELETE",
  })
    .done(() => {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500,
      });

      setTimeout(function () {
        window.location.reload();
      }, 1000);
    })
    .fail((err) => {
      handleError(err);
    });
}

function openEditModal(candidate) {
  // Set the form values with the candidate's details
  $("#editId").val(candidate.id);
  $("#editFullName").val(candidate.full_name);
  $("#editDob").val(candidate.dob);
  $("#editPob").val(candidate.pob);
  $("#editGender").val(candidate.gender);
  $("#editYearExp").val(candidate.year_exp);
  $("#editLastSalary").val(candidate.last_salary);

  // Open the edit modal
  $("#editModal").modal("show");
}

$("#closeEdit").click(function (e) {
  e.preventDefault();
  $("#editModal").modal("hide");
});

// Handle the form submission for editing a candidate
$("#editFormButton").click(function (e) {
  e.preventDefault();
  // Get the updated values from the form
  var updateId = $("#editId").val();
  var updatedFullName = $("#editFullName").val();
  var updatedDob = $("#editDob").val();
  var updatedPob = $("#editPob").val();
  var updatedGender = $("#editGender").val();
  var updatedYearExp = $("#editYearExp").val();
  var updatedLastSalary = $("#editLastSalary").val();

  // Perform data validation on the updated values if needed
  // ...

  // Prepare the updated candidate data
  var updatedCandidate = {
    id: updateId,
    full_name: updatedFullName,
    dob: updatedDob,
    pob: updatedPob,
    gender: updatedGender,
    year_exp: updatedYearExp,
    last_salary: updatedLastSalary,
  };
  // Perform AJAX request to update the candidate in the backend
  $.ajax({
    url: "http://localhost:3000/candidates/" + updatedCandidate.id,
    type: "PATCH",
    data: updatedCandidate,
    success: function (response) {
      console.log("Candidate updated successfully:", response);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500,
      });
      // Update the UI with the edited values
      // ...

      // Close the modal
      $("#editModal").modal("hide");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    },
    error: function (xhr, status, error) {
      console.error("Failed to update candidate:", error);
    },
  });
});

function handleError(err) {
  console.log(err);
  const { responseJSON } = err;
  const { message } = responseJSON;
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: message,
  });
}
