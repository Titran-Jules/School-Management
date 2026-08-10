CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ref VARCHAR(50) NOT NULL UNIQUE,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE students (
    user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    grade_level VARCHAR(10) NOT NULL,
    student_group VARCHAR(10) NOT NULL
);

CREATE TABLE ues (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(150) NOT NULL
);

CREATE TABLE teacher_ues (
    teacher_id UUID REFERENCES users(id) ON DELETE CASCADE,
    ue_id UUID REFERENCES ues(id) ON DELETE CASCADE,
    PRIMARY KEY (teacher_id, ue_id)
);