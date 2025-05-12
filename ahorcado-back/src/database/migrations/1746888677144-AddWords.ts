import { MigrationInterface, QueryRunner } from "typeorm";

export class AddWords1746888677144 implements MigrationInterface {
    name = 'AddWords1746888677144'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "words" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "word" character varying(50) NOT NULL, "clue" character varying(50) NOT NULL, CONSTRAINT "UQ_38a98e41b6be0f379166dc2b58d" UNIQUE ("word"), CONSTRAINT "PK_feaf97accb69a7f355fa6f58a3d" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "words"`);
    }

}
