import { Field, ObjectType, registerEnumType } from "type-graphql";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { City } from "./City";

export enum UserRole {
    SUPER_ADMIN = "superadmin",
    CITY_ADMIN = "cityadmin",
    USER = "user",
    SUPER_USER = "superuser",
}

registerEnumType(UserRole, {
    name: "UserRole", // Nom utilisé dans le schéma GraphQL
    description: "Defines the role of the user",
});



@Entity()
@ObjectType()
export class User extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    id!: string;

    @Field()
    @Column()
    firstname!: string;

    @Field()
    @Column()
    lastname!: string;

    @Field()
    @Column()
    email!: string;

    @Field()
    @Column()
    password!: string;

    @Field(() => UserRole)
    @Column({type: "enum", enum: UserRole, default: UserRole.USER})
    role!: UserRole;

    @Field(() => [City])
    @ManyToOne(
        () => City,
        (city) => city.users,
    )
    city!: City[];
}