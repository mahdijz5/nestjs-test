import { User } from "src/users/schemas/user.schema";

export const UserStub = (user?: User) => {
        return  <User>{ 
                age :23,
                userId : "123",
                email : "test@gmail.com",
                favoriteFoods : ["apples","pizza"],
                ...user
        }
}