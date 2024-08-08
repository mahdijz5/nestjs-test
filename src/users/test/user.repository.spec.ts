import { Test } from "@nestjs/testing"
import { UsersRepository } from "../users.repository"
import { getModelToken } from "@nestjs/mongoose"
import { User } from "../schemas/user.schema"
import { UserModel } from "./support/user.model"
import { UserStub } from "./stubs/user.stub"

describe("UsersRepository", () => {

    let usersRepository: UsersRepository
    
    describe("find Operation", () => {
        let userModel: UserModel


        beforeEach(async () => {
            const moduleRef = await Test.createTestingModule({
                providers: [
                    UsersRepository,
                    {
                        provide: getModelToken(User.name),
                        useClass: UserModel
                    }
                ],
            }).compile()

            usersRepository = moduleRef.get<UsersRepository>(UsersRepository)
            userModel = moduleRef.get<UserModel>(UserModel)


            jest.clearAllMocks()
        })

        describe('find One', () => {
            describe("When findOne is called", () => {
                let user: User

                beforeEach(async () => {

                    jest.spyOn(userModel, "findOne")
                    user = await usersRepository.findOne({ userId: UserStub().userId })
                })

                test("then is should call the userModel", () => {
                    expect(userModel.findOne).toHaveBeenCalledWith({ userId: UserStub().userId }, { _id: 0, __v: 0 })
                })

                test("then it should return a user", () => {
                    expect(user).toEqual(UserStub())
                })
            })
        })

        describe('find', () => {
            describe("When find is called", () => {
                let users: User[]

                beforeEach(async () => {

                    jest.spyOn(userModel, "find")
                    users = await usersRepository.find({ userId: UserStub().userId })
                })

                test("then is should call the userModel", () => {
                    expect(userModel.find).toHaveBeenCalledWith({ userId: UserStub().userId })
                })

                test("then it should return a user", () => {
                    expect(users).toEqual([UserStub()])
                })
            })
        })

        describe('update', () => {
            describe("When update is called", () => {
                let user: User

                beforeEach(async () => {

                    jest.spyOn(userModel, "findOneAndUpdate")
                    user = await usersRepository.findOneAndUpdate({ userId: UserStub().userId }, UserStub())
                })

                test("then is should call the userModel", () => {
                    expect(userModel.findOneAndUpdate).toHaveBeenCalledWith({ userId: UserStub().userId }, UserStub(), { new: true })
                })

                test("then it should return a user", () => {
                    expect(user).toEqual(UserStub())
                })
            })
        })
    })

    describe("Create operation", () => {
        beforeEach(async () => {
            const moduleRef = await Test.createTestingModule({
                providers: [
                    UsersRepository,
                    {
                        provide: getModelToken(User.name),
                        useValue: UserModel
                    }
                ],
            }).compile()

            usersRepository = moduleRef.get<UsersRepository>(UsersRepository)
 

            // jest.clearAllMocks()
        })

        describe('create', () => {
            describe('when create is called', () => {
                let user: User;
                let saveSpy: jest.SpyInstance;
                let constructorSpy: jest.SpyInstance;
    
                beforeEach(async () => {
                    saveSpy = jest.spyOn(UserModel.prototype, 'save');
                    constructorSpy = jest.spyOn(UserModel.prototype, 'constructorSpy');
                    user = await usersRepository.create(UserStub());
                })
    
                test('then it should call the userModel', () => {
                    expect(saveSpy).toHaveBeenCalled();
                    expect(constructorSpy).toHaveBeenCalledWith(UserStub())
                })
    
                test('then it should return a user', () => {
                    expect(user).toEqual(UserStub());
                })
            })
        })
    })

   
})

