import * as Yup from "yup"

export const BaseSchema = Yup.object().shape({
    fullname: Yup.string().required("نام و نام خانوادگی الزامی است."),
    mobile: Yup.number().required("شماره تلفن الزامی است"),
    email: Yup.string().email("آدرس ایمیل معتبر نیست.").required("ارسال ایمیل الزامی است."),
    job: Yup.string().required("انتخاب شغل الزامی است."),
    group: Yup.string().required('انتخاب گروه'),
});


export const creatContactSchema = Yup.object().shape({
    fullname: Yup.string().required("نام و نام خانوادگی الزامی است."),
    mobile: Yup.number().required("شماره تلفن الزامی است"),
    email: Yup.string().email("آدرس ایمیل معتبر نیست.").required("ارسال ایمیل الزامی است."),
    job: Yup.string().required("انتخاب شغل الزامی است."),
    group: Yup.string().required('انتخاب گروه'),
    photo: Yup.mixed().required('یک تصویر انتخاب کنید')
});