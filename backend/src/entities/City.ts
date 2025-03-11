import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";




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
    lattitiude!: number;

    @Field()
    @Column("float")
    longitude!: number;

    // @Field(() => [InterestPoint])
    // @OneToMany(
    //     () => InteresPoint,
    //     (interesPoint) => interestPoint.city,
    // )
    // interestPoints!: InterestPoint[]

    // @Field(() => [User])
    // @OneToMany(
    //     () => User,
    //     (user) => user.city,
    // )
    // users!: user[];
}