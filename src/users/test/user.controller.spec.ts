import { Test } from "@nestjs/testing"
import { UsersController } from "../users.controller"
import { UsersService } from "../users.service"
import { UserStub } from "./stubs/user.stub"
import { User } from "../schemas/user.schema"
import { CreateUserDto } from "../dto/create-user.dto"
import { UpdateUserDto } from "../dto/update-user.dto"

jest.mock('../users.service.ts')
describe('UsersController', () => {
    let usersController: UsersController
    let usersService: UsersService

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [],
            controllers: [UsersController],
            providers: [UsersService],
        }).compile()

        usersController = moduleRef.get<UsersController>(UsersController)
        usersService = moduleRef.get<UsersService>(UsersService)
        jest.clearAllMocks()
    })

    describe("getUser", () => {
        describe("when getUser is called", () => {
            let user: User
            beforeEach(async () => {
                user = await usersController.getUser(UserStub().userId)
            })

            test('Then it Should call UserService', () => {
                expect(usersService.getUserById).toBeCalledWith(UserStub().userId)
            })

            test("then it should return user", () => {
                expect(user).toEqual(UserStub())
            })
        })
    })

    describe("getUsers", () => {
        describe("when getUsers is called", () => {
            let users: User[]
            beforeEach(async () => {
                users = await usersController.getUsers()
            })

            test('Then it Should call UserService.getUsers', () => {
                expect(usersService.getUsers).toBeCalled()
            })

            test("then it should return user", () => {
                expect(users).toEqual([UserStub()])
            })
        })
    })

    describe("createUser", () => {
        describe("Create user", () => {
            let user: User
            let createUser: CreateUserDto
            beforeEach(async () => {
                user = UserStub()
                createUser = {
                    age: user.age,
                    email: user.email
                }
                user = await usersController.createUser(createUser)
            })

            test('Then it Should call UserService.createUser', () => {
                expect(usersService.createUser).toBeCalledWith(createUser.email, createUser.age)
            })

            test("then it should return user", () => {
                expect(user).toEqual(UserStub())
            })
        })
    })

    describe("updateUser", () => {
        describe("update user", () => {
            let user: User
            let updateUser: UpdateUserDto
            beforeEach(async () => {
                user = UserStub()
                updateUser = {
                    age: user.age,
                    favoriteFoods: ["orange"]
                }
                user = await usersController.updateUser(user.userId,updateUser)
            })

            test('Then it Should call UserService.updateUser', () => {
                expect(usersService.updateUser).toBeCalledWith(user.userId,updateUser)
            })

            test("then it should return user", () => {
                expect(user).toEqual(UserStub())
            })
        })
    })
})