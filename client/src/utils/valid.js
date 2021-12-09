const valid = ({ fullName, username, email, password }) => {
    const err = {};

    const format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

    if(!fullName){
        err.fullname = "Tên không được để trống";
    }else if(fullName.length > 25){
        err.fullname = "Tên lớn hơn 25 ký tự";
    }

    if (!username) {
      err.username = "Username không được để trống";
    }

    if (username.replace(/ /g, '').length > 25) {
        console.log("a");
      err.username = "Username lớn hơn 25 ký tự";
    }

    if (username.replace(/ /g, '').length < 5) {
        err.username = "Username nhỏ hơn 5 ký tự";
    }

    if (format.test(username)) {
        err.username = "Username chứa ký tự đặc biệt";
    }

    if (!email) {
      err.email = "Email không được để trống";
    }

    if (!password) {
      err.password = "Mật khẩu không được để trống";
    } else if (password.length < 6) {
      err.password = "Mật khẩu bé hơn 25 ký tự";
    }

    return {
        errMsg: err,
        errLength: Object.keys(err).length  
    }
};

export default valid;