CREATE TABLE budgets (

                         id BIGSERIAL PRIMARY KEY,

                         amount DECIMAL(10,2) NOT NULL,

                         month INT NOT NULL,

                         year INT NOT NULL,

                         created_at TIMESTAMP NOT NULL,

                         updated_at TIMESTAMP NOT NULL,

                         user_id BIGINT NOT NULL,

                         CONSTRAINT fk_budget_user
                             FOREIGN KEY (user_id)
                                 REFERENCES users(id)
                                 ON DELETE CASCADE
);