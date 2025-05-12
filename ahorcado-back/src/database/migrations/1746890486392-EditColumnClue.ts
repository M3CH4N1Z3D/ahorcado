import { MigrationInterface, QueryRunner } from "typeorm";

export class EditColumnClue1746890486392 implements MigrationInterface {
    name = 'EditColumnClue1746890486392'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "words" DROP COLUMN "clue"`);
        await queryRunner.query(`ALTER TABLE "words" ADD "clue" character varying(1024) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "words" DROP COLUMN "clue"`);
        await queryRunner.query(`ALTER TABLE "words" ADD "clue" character varying(50) NOT NULL`);
    }

}
