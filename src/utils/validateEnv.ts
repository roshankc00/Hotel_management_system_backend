import { cleanEnv,str,port } from "envalid";
export default  cleanEnv(process.env, {
    MONGO_URL:str(),
    SECRET:str(),
    PORT:port(),
    SMTP_USER:str(),
    SMTP_PASSWORD:str(),
    MAIL_SENDER:str()
});
