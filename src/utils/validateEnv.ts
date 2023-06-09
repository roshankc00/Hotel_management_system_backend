import { cleanEnv,str,port } from "envalid";
export default  cleanEnv(process.env, {
    MONGO_URL:str(),
    SECRET:str(),
    PORT:port()
});
