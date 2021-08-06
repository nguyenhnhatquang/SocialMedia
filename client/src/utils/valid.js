const valid = ({ fullName, username, email, password }) => {
    const err = {};

    if(!fullName){
        err.fullname = "Tên không được để trống";
    }else if(fullName.length > 25){
        err.fullname = "Tên lớn hơn 25 ký tự";
    }

    if (!username) {
      err.username = "Username không được để trống";
    } else if (username.replace(/ /g, '').length > 25) {
      err.username = "Username lớn hơn 25 ký tự";
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