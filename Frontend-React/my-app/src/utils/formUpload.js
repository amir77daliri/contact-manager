const formUpload = (contact, image=null) => {
    let formData = new FormData()
    formData.append('fullname', contact.fullname)
    formData.append('email', contact.email)
    formData.append('job', contact.job)
    formData.append('mobile', contact.mobile)
    formData.append('group_id', contact.group)
    if(image) {
        formData.append('photo', image)
    }

    return formData
}

export default formUpload;