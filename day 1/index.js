function validate() {
  let x = document.forms["frm"]["name"].value;
  let valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (x == "") {
      alert("Please enter your name");
      return false;
  }
  let y = document.forms["frm"]["email"].value;
  if (y == "") {
      alert("Please enter your email");
      return false;
  }
  if (!valid.test(y)) {
      alert("Invalid email");
      document.forms["frm"]["email"].focus();
      return false;
  }
  let z = document.forms["frm"]["project"].value;
  if (z == '') {
      alert("Enter project details");
      return false;
  }
  alert("Form Submitted Successfully");
  return false;
}
