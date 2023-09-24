Create Table If Not Exists users (
    id         Int                    Not Null Auto_Increment,
    name       Varchar(255)           Not Null,
    nickname   Varchar(255)           Not Null,
    password   Varchar(255)           Not Null,
    email      Varchar(255)           Not Null,
    bio        Varchar(255)           Not Null Default 'hello!',
    avatar     Varchar(255)           Not Null Default '/placeholder.avatar.png',
    level      Enum ('admin', 'user') Not Null Default 'user',

    deleted    Boolean                Not Null Default False,
    deleted_at Timestamp              Not Null Default Current_Timestamp,
    created_at Timestamp              Not Null Default Current_Timestamp,
    updated_at Timestamp              Not Null Default Current_Timestamp,

    Primary Key (id),
    Unique (name, email)
) Engine = InnoDB
  Default Charset = utf8mb4
  Collate = utf8mb4_unicode_ci;

Create Table If Not Exists user_status (
    user_id         Int Primary Key,
    post_count      Int  Not Null Default 0,
    follower_count  Int  Not Null Default 0,
    following_count Int  Not Null Default 0,
    followers       Json Not Null Default ('[]'),
    following       Json Not Null Default ('[]'),

    Foreign Key (user_id) References users (id)
);

Create Table If Not Exists posts (
    id         Int Primary Key Auto_Increment,
    content    Text     Not Null,
    owner_id   Int      Not Null,
    deleted    Boolean  Not Null Default False,
    deleted_at Datetime Not Null Default '1970-01-01 00:00:00',
    created_at Datetime Not Null Default Current_Timestamp,
    isBody     Boolean  Not Null Default False,
    parentId   Int      Not Null Default -1 References posts (id)
);

Create Table If Not Exists post_status (
    post_id       Int Primary Key,
    like_count    Int  Not Null Default 0,
    comment_count Int  Not Null Default 0,
    repost_count  Int  Not Null Default 0,
    likes         Json Not Null Default ('[]'),
    comments      Json Not Null Default ('[]'),
    reposts       Json Not Null Default ('[]'),

    Foreign Key (post_id) References posts (id)
);

Create Trigger post_status_insert
    After Insert
    On posts
    For Each Row
Begin
    Insert Into post_status (post_id) Values (NEW.id);
    Update user_status
    Set post_count = post_count + 1
    Where id = NEW.owner_id;
End;
