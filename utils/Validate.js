const validFullName = (fullName) => {
    if (!fullName) {
        return "Tên không được để trống";
    }
    if (fullName.length > 25) {
        return "Tên lớn hơn 25 ký tự";
    }
}

const validUsername = (username) => {
    if (!username) {
        return "Tên đăng nhập không được để trống";
    }
    if (username.length > 25) {
        return "Tên đăng nhập lớn hơn 25 ký tự";
    }
    if (username.length < 5) {
        return "Tên đăng nhập bé hơn 5 ký tự";
    }
    if (checkForSpecialChar(username)) {
        return "Tên đăng nhập chứa ký tự đặc biệt";
    }
}

const validEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(email).toLowerCase())) {
        return "Định dạng email không đúng";
    }
}

const validPassword = (password) => {
    if (!password) {
        return "Mật khẩu không được để trống";
    }
    if (password.length < 6) {
        return "Mật khẩu phải lớn hơn 6 ký tự";
    }
}

const validImages = (images) => {
    if (images.length === 0) {
        return "Phải có ít nhất 1 ảnh/video";
    }

    if (images.length > 5) {
        return "Tối đa 5 ảnh hoặc 1 video";
    }

    if (images.length > 1) {
        let check = false;
        images.forEach((image)=> {
            if (image.url.match(/video/i)){
                check = true;
            }
        })

        if (check)
            return "Tối đa 5 ảnh hoặc 1 video";
    }
}

const checkForSpecialChar = (str) => {
    const format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return format.test(str) ? true : false;
}

const removeAccents = (str) => {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    return str;
}

module.exports = {validFullName, validUsername, validEmail, validPassword, validImages, removeAccents}