import { UserStub } from "../test/stubs/user.stub";

export const UsersService =  jest.fn().mockReturnValue( {
    getUserById  : jest.fn().mockResolvedValue(UserStub()),
    getUsers : jest.fn().mockResolvedValue([UserStub()]),
    createUser : jest.fn().mockResolvedValue(UserStub()),
    updateUser : jest.fn().mockResolvedValue(UserStub()),

})