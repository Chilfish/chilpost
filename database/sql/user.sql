-- Query: addUser
Insert Into users (email, name, nickname, password)
Values (:email, :name, :nickname, :password);

-- Query: getUser
Select *
From user_details As u
Where u.id = :id
  And u.deleted = False;

-- Query: getUserByName
Select *
From user_details As u
Where u.name = :name
  And u.deleted = False;

-- Query: authUser
Select id, name, email, password, level
From users
Where email = :email
  And deleted = False;

-- Query: upUser
Update users
Set name       = :name,
    password   = :password,
    email      = :email,
    nickname   = :nickname,
    bio        = :bio,
    avatar     = :avatar,
    updated_at = Current_Timestamp
Where id = :id
  And deleted = False;

-- Query: rmUser
Update users
Set deleted    = True,
    deleted_at = Current_Timestamp
Where id = :id
  And deleted = False;

-- Query: setFollowing
Update user_status
Set following       = Json_Array(:following),
    following_count = :following_count
Where user_id = :id;

-- Query: setFollowers
Update user_status
Set followers      = Json_Array(:followers),
    follower_count = :follower_count
Where user_id = :id;

-- Query: getUsers
Select *
From user_status As u
Order By u.user_id Desc;