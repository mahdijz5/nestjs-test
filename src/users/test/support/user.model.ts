import { User } from "../../schemas/user.schema";
import { MockModel } from "../../../database/test/support/mock.model";
 import { UserStub } from "../stubs/user.stub";

export class UserModel extends MockModel<User> {
    protected entitySub: User = UserStub() 
}