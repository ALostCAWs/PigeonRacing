// Validations

// Feeding bird
function feedValidation(){
    var hunger = localStorage.getItem("hunger");

    if (hunger != 10){
        restoreHunger();
    } else {
        alert("Your bird is full");
    }
}

// Bird name
function validate_frmBirdModify(){

    var form = $("#frmBirdModify");
    form.validate({
        rules:{
            txtNameModify:{
                required: true,
                rangelength: [2, 20]
            }
        },
        messages:{
            txtNameModify:{
                required: "Name must be entered",
                rangelength: "Name must be between 2 and 20 characters long"
            }
        }
    });
    return form.valid();
}

