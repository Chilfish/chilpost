export const TABLE_USER = 'users'

export const initUserDB = `CREATE TABLE IF NOT EXISTS ${TABLE_USER} (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  nickname VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  bio VARCHAR(255) NOT NULL DEFAULT 'hello!',
  avatar VARCHAR(255) NOT NULL DEFAULT '/placeholder.avatar.png',
  level ENUM('admin', 'user') NOT NULL DEFAULT 'user',

  deleted BOOLEAN NOT NULL DEFAULT FALSE,
  deleted_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

  follower_count INT NOT NULL DEFAULT 0,
  following_count INT NOT NULL DEFAULT 0,
  post_count INT NOT NULL DEFAULT 0,

  followers JSON NOT NULL DEFAULT ('[]'), -- id[]
  following JSON NOT NULL DEFAULT ('[]'), -- id[]

  PRIMARY KEY (id),
  UNIQUE (name, email),
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
`

export const addUserSQL = `INSERT INTO ${TABLE_USER} (email, name, nickname, password)
 VALUES (:email, :name, :nickname, :password);
`

export const getUserSQL = `SELECT * FROM ${TABLE_USER}
 WHERE id = :id AND deleted = FALSE;
`

export const getUserByNameSQL = `SELECT * FROM ${TABLE_USER}
 WHERE name = :name AND deleted = FALSE;
`

export const authUserSQL = `SELECT * FROM ${TABLE_USER}
 WHERE email = :email AND password = :password AND deleted = FALSE;
`

export const upUserSQL = `UPDATE ${TABLE_USER} SET
  name = :name, password = :password,
  email = :email, nickname = :nickname,
  bio = :bio, avatar = :avatar,
  updated_at = CURRENT_TIMESTAMP
WHERE id = :id AND deleted = FALSE;
`

export const rmUserSQL = `UPDATE ${TABLE_USER} SET deleted = TRUE, deleted_at = CURRENT_TIMESTAMP
WHERE id = :id AND deleted = FALSE;
`

export const setFollowSQL = `UPDATE ${TABLE_USER} SET
  following = JSON_ARRAY(:following), following_count = :following_count
WHERE id = :id AND deleted = FALSE;
`

export const setFollowerSQL = `UPDATE ${TABLE_USER} SET
  followers = JSON_ARRAY(:followers), follower_count = :follower_count
WHERE id = :id AND deleted = FALSE;
`

// only for admin //

export const getUsersSQL = `SELECT * FROM ${TABLE_USER}
 ORDER BY id DESC;
`
