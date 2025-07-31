import { Field, ObjectType, registerEnumType } from "type-graphql";
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";
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
	hashedPassword!: string;

	@Field(() => UserRole)
	@Column({ type: "enum", enum: UserRole, default: UserRole.USER })
	role!: UserRole;

	@Field(() => String, { nullable: true })
	@Column({ type: String, nullable: true })
	resetToken?: string | null;

	@Field(() => String, { nullable: true })
	@Column({ type: String, nullable: true })
	resetTokenExpiration?: Date | null;

	@Field(() => City)
	@ManyToOne(
		() => City,
		(city) => city.users,
		{
			nullable: true,
			onDelete: "CASCADE",
		},
	)
	@JoinColumn({ name: "cityId" })
	city!: City;

	@Field(() => Date)
	@CreateDateColumn({
		name: "created_at",
		type: "timestamptz",
		default: () => "CURRENT_TIMESTAMP",
	})
	createdAt!: Date;

	@Field(() => Date, { nullable: true })
	@UpdateDateColumn({
		name: "updated_at",
		type: "timestamptz",
		nullable: true,
	})
	updatedAt?: Date;
}
