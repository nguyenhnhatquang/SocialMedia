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

module.exports = {validFullName, validUsername, validEmail, validPassword, validImages}