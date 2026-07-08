ALTER TABLE expenses
    ADD COLUMN category_id BIGINT;

ALTER TABLE expenses
    ADD CONSTRAINT fk_expense_category
        FOREIGN KEY (category_id)
            REFERENCES categories(id);