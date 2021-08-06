export const checkImage = (file) => {
    let err = "";
    if(!file){
        return err = "File không tồn tại";
    }

    if(file.size > 1024 * 1024){
         return (err = "File lớn hơn 1Mb");
    }

    if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
      return (err = "Sai định dạng ảnh");
    }

    return err;
}

export const imageUpload = async (images) => {
    let imgArr = [];
    for(const item of images){
        const formData = new FormData();

        if(item.camera){
            formData.append("file", item.camera);
        }else{
            formData.append("file", item);  
        }

        
        formData.append("upload_preset", "xqxi1mtl");
        formData.append("cloud_name", "nguyenhnhatquang");

        const res = await fetch("https://api.cloudinary.com/v1_1/nguyenhnhatquang/upload", {
            method: "POST",
            body: formData
        })

        const data = await res.json();
        imgArr.push({ public_id: data.public_id, url: data.secure_url });
        
      
    }
    return imgArr;
}