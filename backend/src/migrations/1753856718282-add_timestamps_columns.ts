import type { MigrationInterface, QueryRunner } from "typeorm";

export class AddTimestampsColumns1753856718282 implements MigrationInterface {
	name = "AddTimestampsColumns1753856718282";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "category" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
		);
		await queryRunner.query(
			`ALTER TABLE "category" ADD "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now()`,
		);
		await queryRunner.query(
			`ALTER TABLE "picture" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
		);
		await queryRunner.query(
			`ALTER TABLE "picture" ADD "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now()`,
		);
		await queryRunner.query(
			`ALTER TABLE "interest_point" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
		);
		await queryRunner.query(
			`ALTER TABLE "interest_point" ADD "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now()`,
		);
		await queryRunner.query(
			`ALTER TABLE "user" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
		);
		await queryRunner.query(
			`ALTER TABLE "user" ADD "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now()`,
		);
		await queryRunner.query(
			`ALTER TABLE "city" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
		);
		await queryRunner.query(
			`ALTER TABLE "city" ADD "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now()`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "city" DROP COLUMN "updated_at"`);
		await queryRunner.query(`ALTER TABLE "city" DROP COLUMN "created_at"`);
		await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "updated_at"`);
		await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "created_at"`);
		await queryRunner.query(
			`ALTER TABLE "interest_point" DROP COLUMN "updated_at"`,
		);
		await queryRunner.query(
			`ALTER TABLE "interest_point" DROP COLUMN "created_at"`,
		);
		await queryRunner.query(`ALTER TABLE "picture" DROP COLUMN "updated_at"`);
		await queryRunner.query(`ALTER TABLE "picture" DROP COLUMN "created_at"`);
		await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "updated_at"`);
		await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "created_at"`);
	}
}
