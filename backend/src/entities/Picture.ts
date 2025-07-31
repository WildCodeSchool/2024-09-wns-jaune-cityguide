import { Field, ObjectType } from "type-graphql";
import {
	BaseEntity,
	Column,
	Entity,
	PrimaryGeneratedColumn,
	ManyToOne,
	CreateDateColumn,
	UpdateDateColumn,
} from "typeorm";
import { InterestPoint } from "./InterestPoint";

@Entity()
@ObjectType()
export class Picture extends BaseEntity {
	@Field()
	@PrimaryGeneratedColumn()
	id!: string;

	@Field()
	@Column()
	name!: string;

	@Field()
	@Column()
	description!: string;

	@Field()
	@Column()
	url!: string;

	@Field(() => InterestPoint)
	@ManyToOne(
		() => InterestPoint,
		(interestPoint) => interestPoint.pictures,
		{ onDelete: "CASCADE" },
	)
	interestPoint!: InterestPoint;

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
