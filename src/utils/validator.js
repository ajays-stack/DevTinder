import validator from 'validator'
const validatesignupdata=(req)=>{
    const {firstName,lastName,emailId,password}=req.body;

    if(!firstName||!lastName){
        throw new Error("name is not valid")
    }
    if(firstName.length<4||firstName.length>50){
        throw new Error("first name should contain 4-50 characters")

    }
    if(!validator.isEmail(emailId)){
        throw new Error("emailId is not valid");
    }
    if(!validator.isStrongPassword(password)){
        throw new Error("enter a strong password");
    }

}
export default validatesignupdata