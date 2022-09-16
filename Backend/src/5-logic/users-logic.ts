import hash from "../2-utils/cyber-hash";
import cyberToken from "../2-utils/cyber-token";
import { CredentialsModel, ICredentialsModel } from "../4-models/credentials-model";
import { ValidationError } from "../4-models/error-models";
import { IUserModel } from "../4-models/user-model";


async function register(user: IUserModel): Promise<string> {
    
    const errors = user.validateSync();
    user.password = hash(user.password);
    
    if (errors) {
        throw new ValidationError(errors.message);
    }

    user.role = "user";
    user.save();
    const token = cyberToken.getNewToken(user);

    return token;
}

async function login(credentials: ICredentialsModel): Promise<string> {
    credentials.password = hash(credentials.password);

    const user = await CredentialsModel.findOne({ email: credentials.email, password: credentials.password }).exec();

    if (!user) {
        throw new ValidationError(`שם משתמש או סיסמא שגויים`);
    }

    const userNoPassword: ICredentialsModel = user.toObject()
    delete userNoPassword.password
    const token = cyberToken.getNewToken(user);

    return token;
}


export default {
    register,
    login
};

