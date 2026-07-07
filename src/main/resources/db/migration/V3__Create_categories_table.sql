CREATE TABLE categories (

                            id BIGSERIAL PRIMARY KEY,

                            name VARCHAR(100) NOT NULL,

                            created_at TIMESTAMP NOT NULL,

                            updated_at TIMESTAMP NOT NULL,

                            user_id BIGINT NOT NULL,

                            CONSTRAINT fk_category_user
                                FOREIGN KEY (user_id)
                                    REFERENCES users(id)
                                    ON DELETE CASCADE
);