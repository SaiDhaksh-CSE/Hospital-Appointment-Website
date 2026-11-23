
// =====================================
// APPOINTMENT FORM VALIDATION
// =====================================

const form = document.getElementById("appointmentForm");

const fields = [
    "patientName",
    "email",
    "phone",
    "age",
    "gender",
    "department",
    "date",
    "problem"
];

form.addEventListener("submit", function(event) {

    event.preventDefault();

    let isValid = true;
    let firstInvalidField = null;

    // Clear previous errors
    document.querySelectorAll(".error-message").forEach(function(error) {
        error.textContent = "";
    });

    document.getElementById("formMessage").textContent = "";

    fields.forEach(function(fieldId) {

        const field = document.getElementById(fieldId);
        const error = document.getElementById(fieldId + "Error");

        let message = "";

        if (field.value.trim() === "") {
            message = "This field is required.";
        }

        else if (fieldId === "email" && !field.validity.valid) {
            message = "Please enter a valid email address.";
        }

        else if (fieldId === "phone" &&
                 !/^\+?[0-9\s-]{10,15}$/.test(field.value.trim())) {
            message = "Please enter a valid phone number.";
        }

        else if (fieldId === "age" &&
                 (Number(field.value) < 1 ||
                  Number(field.value) > 120)) {
            message = "Please enter an age between 1 and 120.";
        }

        if (message !== "") {

            error.textContent = message;
            field.setAttribute("aria-invalid", "true");

            if (!firstInvalidField) {
                firstInvalidField = field;
            }

            isValid = false;

        } else {

            field.removeAttribute("aria-invalid");

        }

    });

    if (!isValid) {

        document.getElementById("formMessage").textContent =
            "Please correct the errors in the form.";

        firstInvalidField.focus();

        return;
    }

    document.getElementById("formMessage").textContent =
        "Appointment request submitted successfully!";

    form.reset();

});
