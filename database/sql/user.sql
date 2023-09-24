-- Query: addUserSQL
Insert Into users (email, name, nickname, password)
Values (:email, :name, :nickname, :password);

-- Query: getUserSQL
Select *
From users
Where id = :id
  And deleted = False;

-- Query: getUserByNameSQL
Select *
From users
Where name = :name
  And deleted = False;

-- Query: authUserSQL
Select *
From users
Where email = :email
  And deleted = False;

-- Query: upUserSQL
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

-- Query: rmUserSQL
Update users
Set deleted    = True,
    deleted_at = Current_Timestamp
Where id = :id
  And deleted = False;

-- Query: setFollowSQL
Update user_status
Set following       = Json_Array(:following),
    following_count = :following_count
Where id = :id
  And deleted = False;

-- Query: setFollowerSQL
Update user_status
Set followers      = Json_Array(:followers),
    follower_count = :follower_count
Where id = :id
  And deleted = False;

-- Query: getUsersSQL
Select *
From users
Order By id Desc;

