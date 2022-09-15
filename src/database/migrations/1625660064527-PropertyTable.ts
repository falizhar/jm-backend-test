import { MigrationInterface, QueryRunner } from 'typeorm';

export class PropertyTable1625660064527 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS property (
            property_id BIGINT(11) NOT NULL AUTO_INCREMENT,
            title VARCHAR(250) NOT NULL,
            description VARCHAR(250) NOT NULL,
            price VARCHAR(250) NOT NULL,
            location VARCHAR(250) NOT NULL,
            lat DECIMAL(10, 8) NULL,
            lng DECIMAL(11, 8) NULL,
            active BOOL NOT NULL DEFAULT 1,
            type BIGINT(11) NOT NULL,
            user BIGINT(11) NOT NULL,
            city BIGINT(11) NOT NULL,
            certification ENUM('ajb', 'shgb', 'shm', 'girik', 'shsrs') NULL,
            slug VARCHAR(250) NOT NULL,
            status ENUM('sell', 'rent', 'auction') NULL,
            unit ENUM('day', 'month', 'year') NULL,
            bedroom INTEGER(11) NULL, 
            bathroom INTEGER(11) NULL,
            square_meter VARCHAR(250) NULL,
            garage BOOL NULL,
            carport BOOL NULL,
            full_furnished BOOL NULL,
            created_at TIMESTAMP NOT NULL DEFAULT NOW(),
            updated_at TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE NOW(),
            PRIMARY KEY (property_id),
            FOREIGN KEY (type)
                REFERENCES type(type_id)
                ON DELETE CASCADE,
            FOREIGN KEY (user)
                REFERENCES user(user_id)
                ON DELETE CASCADE,   
            FOREIGN KEY (city)
                REFERENCES city(city_id)
                ON DELETE CASCADE
        )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`SET FOREIGN_KEY_CHECKS=0`);
    await queryRunner.query(`DROP TABLE property`);
  }
}
