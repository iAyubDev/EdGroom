function Validation(values) {
    let errors = {};
  
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^\d+$/;
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
  
    if (values.firstName.length < 3) {
      errors.firstName = "First name should be at least 3 characters";
    }
  
    if (values.lastName.length < 3) {
      errors.lastName = "Last name should be at least 3 characters";
    }
  
    if (values.email === "") {
      errors.email = "Email should not be empty";
    } else if (!emailPattern.test(values.email)) {
      errors.email = "Invalid email format";
    }
  
    if (values.phone === "") {
      errors.phone = "Phone number should not be empty";
    } else if (!phonePattern.test(values.phone)) {
      errors.phone = "Phone number should contain only numbers";
    }
  
    if (!values.profilePic) {
      errors.profilePic = "Profile picture is required";
    } else if (values.profilePic.size > 2 * 1024 * 1024) {
      errors.profilePic = "Profile picture size should be less than 2MB";
    }
  
    if (values.gender === "") {
      errors.gender = "Gender is required";
    }
  
    if (values.password.length < 8) {
      errors.password = "Password should be at least 8 characters";
    } else if (!passwordPattern.test(values.password)) {
      errors.password =
        "Password should contain at least one uppercase letter, one lowercase letter, one number, and one special character";
    }
  
    return errors;
  }

export default Validation;