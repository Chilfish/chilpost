export const TABLE_USER = 'users'

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
 WHERE email = :email AND deleted = FALSE;
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
