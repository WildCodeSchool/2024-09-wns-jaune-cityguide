import { Field, ObjectType } from "type-graphql";
import {
	BaseEntity,
	Column,
	Entity,
	PrimaryGeneratedColumn,
	OneToMany,
	CreateDateColumn,
	UpdateDateColumn,
} from "typeorm";
import { InterestPoint } from "./InterestPoint";
import { User } from "./User";

@Entity()
@ObjectType()
export class City extends BaseEntity {
	@Field()
	@PrimaryGeneratedColumn()
	id!: string;

	@Field()
	@Column()
	name!: string;

	@Field()
	@Column()
	postalCode!: string;

	@Field()
	@Column("float")
	latitude!: number;

	@Field()
	@Column("float")
	longitude!: number;

	@Field(() => [InterestPoint])
	@OneToMany(
		() => InterestPoint,
		(interestPoint) => interestPoint.city,
	)
	interestPoints?: InterestPoint[];

	@Field(() => [User])
	@OneToMany(
		() => User,
		(user) => user.city,
	)
	users!: User[];

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
