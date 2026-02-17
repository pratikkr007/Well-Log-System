```sql
CREATE TABLE wells (
    id SERIAL PRIMARY KEY,
    well_name VARCHAR(255) NOT NULL,
    s3_url TEXT NOT NULL,
    upload_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE curves (
    id SERIAL PRIMARY KEY,
    well_id INTEGER NOT NULL REFERENCES wells(id) ON DELETE CASCADE,
    curve_name VARCHAR(100) NOT NULL,
    unit VARCHAR(50),
    UNIQUE (well_id, curve_name)
);

CREATE TABLE curves (
    id SERIAL PRIMARY KEY,
    well_id INTEGER NOT NULL REFERENCES wells(id) ON DELETE CASCADE,
    curve_name VARCHAR(100) NOT NULL,
    unit VARCHAR(50),
    UNIQUE (well_id, curve_name)
);


CREATE TABLE well_log_data (
    id SERIAL PRIMARY KEY,
    well_id INTEGER NOT NULL REFERENCES wells(id) ON DELETE CASCADE,
    depth DOUBLE PRECISION NOT NULL,
    values JSONB NOT NULL
);
