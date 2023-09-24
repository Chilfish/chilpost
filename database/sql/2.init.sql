Create Trigger post_status_insert
    After Insert
    On posts
    For Each Row
Begin
    Insert Into post_status (post_id) Values (NEW.id);
    Update user_status As us
    Set post_count = post_count + 1
    Where us.user_id = NEW.owner_id;
End;

Create Trigger user_status_insert
    After Insert
    On users
    For Each Row
Begin
    Insert Into user_status (user_id) Values (NEW.id);
End;

Create View user_details As
Select u.name,
       u.nickname,
       u.email,
       u.created_at As user_created_at,
       u.bio,
       u.avatar,
       u.level,
       us.*
From users As u
         Inner Join user_status As us
                    On us.user_id = u.id;

Create View post_details As
Select p.id         As post_id,
       p.content,
       p.created_at As post_created_at,
       p.deleted,
       p.owner_id,
       p.is_body,
       p.parent_id,
       ps.likes,
       ps.comments,
       ps.reposts,
       ps.like_count,
       ps.comment_count,
       ps.repost_count
From posts As p
         Inner Join post_status As ps
                    On ps.post_id = p.id;

Create View post_with_user As
Select Json_Object('post', Json_Object(
        'id', pd.post_id,
        'content', pd.content,
        'created_at', pd.post_created_at,
        'deleted', pd.deleted,
        'owner_id', pd.owner_id,
        'is_body', pd.is_body,
        'parent_id', pd.parent_id,
        'status', Json_Object(
                'likes', pd.likes,
                'comments', pd.comments,
                'reposts', pd.reposts,
                'like_count', pd.like_count,
                'comment_count', pd.comment_count,
                'repost_count', pd.repost_count
            )
    ))        As post,
       Json_Object('owner', Json_Object(
               'id', ud.user_id,
               'name', ud.name,
               'nickname', ud.nickname,
               'email', ud.email,
               'created_at', ud.user_created_at,
               'bio', ud.bio,
               'avatar', ud.avatar,
               'level', ud.level,
               'status', Json_Object(
                       'post_count', ud.post_count,
                       'follower_count', ud.follower_count,
                       'following_count', ud.following_count,
                       'followers', ud.followers,
                       'following', ud.following
                   )
           )) As owner
From post_details As pd
         Inner Join user_details As ud
                    On ud.user_id = pd.owner_id
Group By pd.post_id;