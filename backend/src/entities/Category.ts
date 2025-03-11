import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
@ObjectType()
export class Category extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    id!: string;

    @Field()
    @Column()
    name!: string;

    @Field({nullable: true})
    @Column({nullable: true})
    description?: string;
    
    @Field()
    @Column()
    color!: string;
}